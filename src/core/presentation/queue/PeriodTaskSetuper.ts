import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import { CHECK_UNMODERATED_QUEUE } from '&app/external/queue';

@Injectable()
export class PeriodTaskSetuper implements OnApplicationBootstrap {
  private EVERY_DAY = { cron: '0 2 * * *' };

  constructor(
    @InjectQueue(CHECK_UNMODERATED_QUEUE)
    private readonly unmoderatedQueue: Queue<object>,
  ) {}

  async onApplicationBootstrap() {
    await this.unmoderatedQueue.empty();

    await this.unmoderatedQueue.add(
      { name: CHECK_UNMODERATED_QUEUE },
      {
        jobId: CHECK_UNMODERATED_QUEUE,
        repeat: this.EVERY_DAY,
      },
    );
  }
}
