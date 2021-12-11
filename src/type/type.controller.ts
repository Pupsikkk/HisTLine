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
import { createTypeDto } from './dto/create-type.dto';
import { Type } from './type.model';
import { TypeService } from './type.service';

@ApiTags('Типи')
@Controller('type')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @ApiOperation({ summary: 'Створити новий тип. Ролі: user, admin' })
  @ApiResponse({ status: HttpStatus.OK, type: Type })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createType(@Body() body: createTypeDto, @Req() req: any) {
    const user = req.user;
    return this.typeService.createType(body, user.userId);
  }
}
