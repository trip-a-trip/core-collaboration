import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bull';
import {
  MODERATION_REQUEST_QUEUE,
  MODERATION_NOTIFY_QUEUE,
  REVIEW_REQUEST_QUEUE,
  REVIEW_NOTIFY_QUEUE,
} from '@trip-a-trip/lib';

import { PublicationController } from './core/presentation/http/controller/PublicationController';
import { CollaboratorController } from './core/presentation/http/controller/CollaboratorController';
import { InviteController } from './core/presentation/http/controller/InviteController';
import { TransformInterceptor } from './core/presentation/http/TransformInterceptor';
import { Collaborator } from './core/domain/Collaborator.entity';
import { PublishToken } from './core/domain/PublishToken.entity';
import { typeOrmProvider } from './external/typeOrmProvider';
import { TaskManager } from './core/application/TaskManager';
import { PlatformModule } from './platform/platform.module';
import { Initiator } from './core/application/Initiator';
import { Publisher } from './core/application/Publisher';
import { Moderator } from './core/application/Moderator';
import { ConfigModule } from './external/config.module';
import { bullProvider } from './external/bullProvider';
import { Invite } from './core/domain/Invite.entity';
import { Draft } from './core/domain/Draft.entity';

@Module({
  imports: [
    ConfigModule,
    PlatformModule,
    TypeOrmModule.forRootAsync(typeOrmProvider),
    TypeOrmModule.forFeature([Invite, Collaborator, PublishToken, Draft]),
    BullModule.registerQueueAsync(
      bullProvider(MODERATION_REQUEST_QUEUE),
      bullProvider(MODERATION_NOTIFY_QUEUE),
      bullProvider(REVIEW_REQUEST_QUEUE),
      bullProvider(REVIEW_NOTIFY_QUEUE),
    ),
  ],
  controllers: [
    InviteController,
    PublicationController,
    CollaboratorController,
  ],
  providers: [
    Initiator,
    Publisher,
    TransformInterceptor,
    TaskManager,
    Moderator,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
