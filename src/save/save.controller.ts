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
import { createSaveDto } from './dto/create-save.dto';
import { Save } from './save.model';
import { SaveService } from './save.service';

@ApiTags('Збереження фільтрів')
@Controller('save')
export class SaveController {
  constructor(private saveService: SaveService) {}

  @ApiOperation({
    summary: 'Збереження фільтрів користувача. Ролі: user, admin',
  })
  @ApiResponse({ status: HttpStatus.OK, type: Save })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: someErr })
  @ApiResponse({ status: 420, type: UnauthorizedErr })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createType(@Body() body: createSaveDto, @Req() req: any) {
    const user = req.user;
    return this.saveService.createSave(body, user.userId);
  }
}
