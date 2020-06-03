import { Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';

import { Draft } from '../domain/Draft.entity';
import { TaskManager } from './TaskManager';

@Injectable()
export class Moderator {
  constructor(
    @InjectEntityManager()
    private readonly em: EntityManager,
    @InjectRepository(Draft)
    private readonly draftRepo: Repository<Draft>,
    private readonly tasks: TaskManager,
  ) {}

  async approve(draftId: string, moderatorId: string) {
    const draft = await this.draftRepo.findOne(draftId);

    if (!draft) {
      throw new NotFoundException('Draft not found');
    }

    draft.approve(moderatorId);

    await this.em.transaction(async (em) => {
      await em.save(draft);
      await this.tasks.notifyAboutModeration(draft);
      // TODO: create venue in core-eat
    });
  }

  async decline(draftId: string, moderatorId: string) {
    const draft = await this.draftRepo.findOne(draftId);

    if (!draft) {
      throw new NotFoundException('Draft not found');
    }

    draft.decline(moderatorId);

    await this.em.transaction(async (em) => {
      await em.save(draft);
      await this.tasks.notifyAboutModeration(draft);
    });
  }
}
