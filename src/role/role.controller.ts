import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { RoleService } from './role.service';

@ApiTags('Ролі')
@Controller('roles')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({ summary: 'Створення нової ролі, доступно тільки адмінам' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Role })
  @Post('')
  getRoles(@Body() role: CreateRoleDto) {
    return this.roleService.createRole(role);
  }

  @ApiOperation({ summary: 'Інформація по певній ролі' })
  @ApiResponse({ status: HttpStatus.OK, type: Role })
  @Get(':value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value);
  }
}
