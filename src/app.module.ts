import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from './external/config.module';
import { typeOrmProvider } from './external/typeOrmProvider';
import { Invite } from './core/domain/Invite.entity';
import { Collaborator } from './core/domain/Collaborator.entity';
import { Initiator } from './core/application/Initiator';
import { InviteController } from './core/presentation/http/controller/InviteController';
import { TransformInterceptor } from './core/presentation/http/TransformInterceptor';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync(typeOrmProvider),
    TypeOrmModule.forFeature([Invite, Collaborator]),
  ],
  controllers: [InviteController],
  providers: [Initiator, TransformInterceptor],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
