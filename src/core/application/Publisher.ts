import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Collaborator } from '../domain/Collaborator.entity';
import { PublishToken } from '../domain/PublishToken.entity';
import { DraftFields } from '../domain/DraftFields';

@Injectable()
export class Publisher {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    @InjectRepository(Collaborator)
    private readonly collaboratorRepo: Repository<Collaborator>,
    @InjectRepository(PublishToken)
    private readonly publishTokenRepo: Repository<PublishToken>,
  ) {}

  async publishDraft(code: string, fields: DraftFields) {
    const token = await this.publishTokenRepo.findOne(code);

    if (!token) {
      throw new ForbiddenException('Token not found');
    }

    await this.em.transaction(async (em) => {
      const draft = token.apply(fields);

      await Promise.all([em.save(token), em.save(draft)]);
    });
  }

  async getNewToken(userId: string): Promise<PublishToken> {
    const user = await this.collaboratorRepo.findOne(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.em.transaction(async (em) => {
      const token = user.createPublishToken();

      await Promise.all([em.save(token), em.save(user)]);

      return token;
    });
  }

  async publishTokenIsValid(code: string): Promise<boolean> {
    const token = await this.publishTokenRepo.findOne(code);

    if (!token) {
      return false;
    }

    return !token.used;
  }
}
