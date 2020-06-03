import { Entity, PrimaryColumn, Column } from 'typeorm';
import uid from 'uid';

import { DraftFields } from './DraftFields';

@Entity({ name: 'drafts' })
export class Draft {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'fields', type: 'jsonb' })
  fields: DraftFields;

  @Column({ name: 'approved' })
  approved: boolean = false;

  @Column({ name: 'moderated' })
  moderated: boolean = false;

  @Column({ name: 'author_id' })
  authorId: string;

  @Column({ name: 'moderator_id' })
  moderatorId?: string;

  constructor(fields: DraftFields, authorId: string) {
    this.id = uid(20);

    this.fields = fields;
    this.authorId = authorId;
  }

  approve(moderatorId: string) {
    this.approved = true;
    this.moderated = true;
    this.moderatorId = moderatorId;
  }

  decline(moderatorId: string) {
    this.approved = false;
    this.moderated = true;
    this.moderatorId = moderatorId;
  }
}
