import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EatClient } from '@trip-a-trip/lib';

import { ConfigModule } from '&app/external/config.module';

import { coreEatProvider } from './coreEatProvider';

@Module({
  imports: [ConfigModule],
  providers: [coreEatProvider],
  exports: [EatClient],
})
export class PlatformModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    // pass
  }
}
