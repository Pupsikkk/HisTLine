import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { someErr, UnauthorizedErr } from 'src/helpers/preparedTypes';
import { rolesEnum } from 'src/role/roles-enum';
import { createInstanceDto } from './dto/create-instance.dto';
import { filterDto } from './dto/filter.dto';
import { Instance } from './instance.model';
import { InstanceService } from './instance.service';

@ApiTags('Сущності')
@Controller('instance')
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @ApiOperation({ summary: 'Створити нову колонку. Ролі: user, admin' })
  @ApiResponse({ status: HttpStatus.OK, type: Instance })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createInstance(@Req() req: any, @Body() instance: createInstanceDto) {
    return this.instanceService.createInstance(req.user, instance);
  }

  @ApiOperation({ summary: 'Отримати фільтровані дані. Ролі: user, admin' })
  @ApiResponse({ status: HttpStatus.OK, type: [Instance] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('/filter')
  getFilteredInstance(@Req() req: any, @Body() filter: filterDto) {
    return this.instanceService.getFilteredInstances(req.user, filter);
  }

  @ApiOperation({ summary: 'Отримати дані.' })
  @ApiResponse({ status: HttpStatus.OK, type: [Instance] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @Get('')
  getInstances(@Req() req: any, @Body() filter: filterDto) {
    return this.instanceService.getInstances();
  }
}
