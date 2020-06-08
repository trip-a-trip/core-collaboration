import { InjectRepository } from '@nestjs/typeorm';
import { Processor, Process } from '@nestjs/bull';
import { Repository } from 'typeorm';
import { Job } from 'bull';

import { CHECK_UNMODERATED_QUEUE } from '&app/external/queue';
import { Draft } from '&app/core/domain/Draft.entity';
import { TaskManager } from '&app/core/application/TaskManager';

@Processor(CHECK_UNMODERATED_QUEUE)
export class UnmoderatedProcessor {
  constructor(
    @InjectRepository(Draft)
    private readonly repo: Repository<Draft>,
    private readonly tasks: TaskManager,
  ) {}

  @Process()
  async handle(job: Job) {
    const drafts = await this.repo.find({
      moderated: false,
    });

    await Promise.all(drafts.map(this.tasks.requestModeration));

    try {
      await job.moveToCompleted();
    } catch (error) {
      console.error(error);
      await job.moveToFailed(error);
    }
  }
}
