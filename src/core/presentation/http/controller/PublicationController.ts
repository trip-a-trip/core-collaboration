import {
  Controller,
  UseInterceptors,
  Post,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { PublishToken } from '&app/core/domain/PublishToken.entity';
import { Publisher } from '&app/core/application/Publisher';

import { TransformInterceptor } from '../TransformInterceptor';
import { CreateForUserRequest } from '../request/CreateForUserRequest';

@Controller('v1/publication')
@UseInterceptors(TransformInterceptor)
@ApiTags('publication')
export class PublicationController {
  constructor(private readonly publisher: Publisher) {}

  @Post('token/create')
  @ApiCreatedResponse({ description: 'Token created', type: PublishToken })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'User can not create drafts' })
  async getToken(
    @Body() { userId }: CreateForUserRequest,
  ): Promise<PublishToken> {
    const token = await this.publisher.getNewToken(userId);

    return token;
  }

  @Get('token/validate/:token')
  @ApiOkResponse({ description: 'Validated', type: Boolean })
  async validateToken(@Param('token') token: string): Promise<boolean> {
    const isValid = await this.publisher.publishTokenIsValid(token);

    return isValid;
  }
}
