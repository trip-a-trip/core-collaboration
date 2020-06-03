import { Injectable } from '@nestjs/common';

import { Draft } from '../domain/Draft.entity';

@Injectable()
export class TaskManager {
  async requestModeration(draft: Draft) {
    // pass
  }

  async notifyAboutModeration(draft: Draft) {
    // pass
  }

  async requestReview(collaboratorId: string) {
    // pass
  }

  async notifyAboutReview(review: any) {
    // pass
  }
}
