import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Initiator } from '&app/core/application/Initiator';

import { ApplyInviteCodeRequest } from '../request/ApplyInviteCodeRequest';

@Controller('/v1/invite')
@ApiTags('invite')
export class InviteController {
  constructor(private readonly initiator: Initiator) {}

  @Post('apply')
  @ApiCreatedResponse({ description: 'User invited as collaborator ' })
  @ApiNotFoundResponse({ description: 'Invitation not found' })
  @ApiConflictResponse({ description: 'User is already collaborator ' })
  async applyInviteCode(@Body() { code, userId }: ApplyInviteCodeRequest) {
    await this.initiator.addNewCollaborator(code, userId);
  }
}
