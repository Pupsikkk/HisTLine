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
import { Subtype } from './subtype.model';
import { SubtypeService } from './subtype.service';
import { createSubtypeDto } from './dto/create-subtype.dto';

@ApiTags('Підтипи')
@Controller('subtype')
export class SubtypeController {
  constructor(private subtypeService: SubtypeService) {}

  @ApiOperation({ summary: 'Створити новий підтип. Ролі: user, admin' })
  @ApiResponse({ status: HttpStatus.OK, type: Subtype })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createType(@Body() body: createSubtypeDto, @Req() req: any) {
    const user = req.user;
    return this.subtypeService.createSubtype(body, user.userId);
  }
}
