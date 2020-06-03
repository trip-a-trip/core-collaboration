import { Entity, PrimaryColumn, Column } from 'typeorm';
import uid from 'uid';
import { Exclude } from 'class-transformer';
import { ForbiddenException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Draft } from './Draft.entity';
import { DraftFields } from './DraftFields';

@Entity({ name: 'publish_tokens' })
export class PublishToken {
  static RATING_THRESHOLD = -5;

  @PrimaryColumn({ name: 'token' })
  @ApiProperty({ example: 'fsdkljasjlm' })
  readonly token: string;

  @Column({ name: 'user_id' })
  @Exclude()
  readonly userId: string;

  @Column({ name: 'used' })
  @Exclude()
  used: boolean = false;

  constructor(userId: string) {
    this.token = uid(20);
    this.userId = userId;
  }

  apply(fields: DraftFields): Draft {
    if (this.used) {
      throw new ForbiddenException('Used token');
    }

    this.used = true;

    return new Draft(fields, this.userId);
  }
}
