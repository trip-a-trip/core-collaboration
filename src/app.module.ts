import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './external/config.module';
import { typeOrmProvider } from './external/typeOrmProvider';
import { Invite } from './core/domain/Invite.entity';
import { Collaborator } from './core/domain/Collaborator.entity';
import { Initiator } from './core/application/Initiator';
import { InviteController } from './core/presentation/http/controller/InviteController';
import { TransformInterceptor } from './core/presentation/http/TransformInterceptor';
import { PublishToken } from './core/domain/PublishToken.entity';
import { Publisher } from './core/application/Publisher';
import { PublicationController } from './core/presentation/http/controller/PublicationController';
import { CollaboratorController } from './core/presentation/http/controller/CollaboratorController';
import { Draft } from './core/domain/Draft.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync(typeOrmProvider),
    TypeOrmModule.forFeature([Invite, Collaborator, PublishToken, Draft]),
  ],
  controllers: [
    InviteController,
    PublicationController,
    CollaboratorController,
  ],
  providers: [Initiator, Publisher, TransformInterceptor],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
