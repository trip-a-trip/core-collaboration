import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'collaborators' })
export class Collaborator {
  @PrimaryColumn({ name: 'user_id' })
  readonly userId: string;

  @Column({ name: 'sponsor_id' })
  readonly sponsorId: string;

  @Column({ name: 'invited_at' })
  readonly invitedAt: Date;

  @Column({ name: 'rating' })
  readonly rating: number = 0;

  constructor(userId: string, sponsorId: string, invitedAt: Date) {
    this.userId = userId;
    this.sponsorId = sponsorId;
    this.invitedAt = invitedAt;
  }
}
