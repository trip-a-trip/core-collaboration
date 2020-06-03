import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Collaborator } from '../domain/Collaborator.entity';
import { PublishToken } from '../domain/PublishToken.entity';

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
