import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'invites' })
export class Invite {
  @PrimaryColumn({ name: 'code' })
  readonly code: string;

  @Column({ name: 'author_id' })
  readonly authorId: string;

  @Column({ name: 'used' })
  used: boolean = false;

  constructor(code: string, authorId: string) {
    this.code = code;
    this.authorId = authorId;
  }
}
