import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';
import { rolesEnum } from './roles-enum';

@ApiTags('Ролі')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Створення нової ролі. Ролі: admin' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Roles(rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  addRoles(@Body() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @ApiOperation({ summary: 'Інформація по певній ролі. Ролі: admin' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Roles(rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
