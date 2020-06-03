import { Entity, PrimaryColumn, Column } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { Expose, Exclude } from 'class-transformer';

import { Invite } from './Invite.entity';
import { PublishToken } from './PublishToken.entity';

@Entity({ name: 'collaborators' })
export class Collaborator {
  @PrimaryColumn({ name: 'user_id' })
  readonly userId: string;

  @Column({ name: 'sponsor_id' })
  @Exclude()
  readonly sponsorId: string;

  @Column({ name: 'invited_at' })
  @Exclude()
  readonly invitedAt: Date;

  @Column({ name: 'rating' })
  rating: number = 0;

  @Expose()
  get canInvite() {
    return this.rating >= Invite.COST;
  }

  @Expose()
  get canPublish() {
    return this.rating >= PublishToken.RATING_THRESHOLD;
  }

  constructor(userId: string, sponsorId: string, invitedAt: Date) {
    this.userId = userId;
    this.sponsorId = sponsorId;
    this.invitedAt = invitedAt;
  }

  createInvite(): Invite {
    if (!this.canInvite) {
      throw new BadRequestException('User can not invite other');
    }

    this.rating -= Invite.COST;

    return new Invite(this.userId);
  }

  createPublishToken(): PublishToken {
    if (!this.canPublish) {
      throw new BadRequestException(
        'User can not create drafts, rating to low',
      );
    }

    return new PublishToken(this.userId);
  }
}
