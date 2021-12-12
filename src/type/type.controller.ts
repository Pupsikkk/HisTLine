import {
  Body,
  Controller,
  Get,
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
import { UserService } from 'src/user/user.service';
import { createTypeDto } from './dto/create-type.dto';
import { Type } from './type.model';
import { TypeService } from './type.service';

@ApiTags('Типи')
@Controller('type')
export class TypeController {
  constructor(
    private typeService: TypeService,
    private userService: UserService,
  ) {}

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

  @ApiOperation({ summary: 'Отримати усі типи.' })
  @ApiResponse({ status: HttpStatus.OK, type: [Type] })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @Get('')
  async getAllSubtypes(@Req() req: any) {
    // const user = req.user;
    // const possibleUserId = [user.userId];
    const adminId: number = (
      await this.userService.getUserByLogin(process.env.ADMIN_LOGIN)
    ).id;
    // if (user.userId !== adminId) possibleUserId.push(adminId);
    return this.typeService.getAllTypesForUsers([adminId]);
  }
}
