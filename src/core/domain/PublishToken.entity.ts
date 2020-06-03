import { Entity, PrimaryColumn, Column } from 'typeorm';
import uid from 'uid';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

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
  readonly used: boolean = false;

  constructor(userId: string) {
    this.token = uid(20);
    this.userId = userId;
  }
}
