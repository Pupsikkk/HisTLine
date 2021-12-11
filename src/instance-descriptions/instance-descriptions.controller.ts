import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { someErr, UnauthorizedErr } from 'src/helpers/preparedTypes';
import { rolesEnum } from 'src/role/roles-enum';
import { createDescriptionDto } from './dto/create-description.dto';
import { InstanceDescription } from './instance-descriptions.model';
import { InstanceDescService } from './instance-descriptions.service';

@ApiTags('Опис')
@Controller('instance-descriptions')
export class InstanceDescriptionsController {
  constructor(private instanceDescService: InstanceDescService) {}

  @ApiOperation({ summary: 'Створити опис для колонки. Ролі: user, admin' })
  @ApiResponse({ status: HttpStatus.OK, type: InstanceDescription })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createType(@Body() body: createDescriptionDto, @Req() req: any) {
    const user = req.user;
    return this.instanceDescService.createDescription(body);
  }
}
