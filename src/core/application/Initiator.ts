import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Invite } from '../domain/Invite.entity';
import { Collaborator } from '../domain/Collaborator.entity';

@Injectable()
export class Initiator {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    @InjectRepository(Invite)
    private readonly inviteRepo: Repository<Invite>,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepo: Repository<Collaborator>,
  ) {}

  async addNewCollaborator(inviteCode: string, userId: string): Promise<void> {
    const [invite, existCollaborator] = await Promise.all([
      this.inviteRepo.findOne(inviteCode),
      this.collaboratorRepo.findOne(userId),
    ]);

    if (existCollaborator) {
      throw new ConflictException('User already is collaborator');
    }
    if (!invite) {
      throw new NotFoundException('Invitation not found');
    }

    await this.em.transaction(async (em) => {
      invite.used = true;

      const collaborator = new Collaborator(
        userId,
        invite.authorId,
        new Date(),
      );

      await Promise.all([em.save(invite), em.save(collaborator)]);
    });
  }
}
