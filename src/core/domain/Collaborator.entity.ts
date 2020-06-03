import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

import { Invite } from './Invite.entity';
import { PublishToken } from './PublishToken.entity';

@Entity({ name: 'collaborators' })
export class Collaborator {
  @PrimaryColumn({ name: 'user_id' })
  readonly userId: string;

  @Column({ name: 'sponsor_id' })
  readonly sponsorId: string;

  @Column({ name: 'invited_at' })
  readonly invitedAt: Date;

  @Column({ name: 'rating' })
  rating: number = 0;

  constructor(userId: string, sponsorId: string, invitedAt: Date) {
    this.userId = userId;
    this.sponsorId = sponsorId;
    this.invitedAt = invitedAt;
  }

  createInvite(): Invite {
    if (this.rating < Invite.COST) {
      throw new BadRequestException('User can not invite other');
    }

    this.rating -= Invite.COST;

    return new Invite(this.userId);
  }

  createPublishToken(): PublishToken {
    if (this.rating < PublishToken.RATING_THRESHOLD) {
      throw new BadRequestException(
        'User can not create drafts, rating to low',
      );
    }

    return new PublishToken(this.userId);
  }
}
