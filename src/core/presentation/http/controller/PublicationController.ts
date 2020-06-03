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
  ApiForbiddenResponse,
} from '@nestjs/swagger';

import { PublishToken } from '&app/core/domain/PublishToken.entity';
import { Publisher } from '&app/core/application/Publisher';

import { TransformInterceptor } from '../TransformInterceptor';
import { CreateForUserRequest } from '../request/CreateForUserRequest';
import { DraftCreateRequest } from '../request/DraftCreateRequest';

@Controller('v1/publication')
@UseInterceptors(TransformInterceptor)
@ApiTags('publication')
export class PublicationController {
  constructor(private readonly publisher: Publisher) {}

  @Post('draft/create')
  @ApiOkResponse({ description: 'Created' })
  @ApiForbiddenResponse({ description: 'Invalid token' })
  async publishDraft(@Body() request: DraftCreateRequest) {
    await this.publisher.publishDraft(request.token, request);
  }

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
