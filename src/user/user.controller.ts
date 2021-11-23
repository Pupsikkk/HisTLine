import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  UseGuards,
  Req,
  Query,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth-guard';
import { TokenPayload } from 'src/auth/auth.service';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { rolesEnum } from 'src/role/roles-enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

type ReqWithUserInfo = Request & { user: TokenPayload | null };

@ApiTags('Користувачі')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Отримати список усіх користувачів. Ролі: admin' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles(rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/')
  getAll() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({
    summary: 'Отримати одного користувача по його id. Ролі: admin',
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Roles(rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({
    summary: 'Отримати інформацію про користувача. Ролі: admin, user',
  })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/get-one')
  getYourself(@Req() req: ReqWithUserInfo) {
    return this.userService.getUser(req.user.userId);
  }

  @ApiOperation({ summary: 'Створити нового користувача. Ролі: admin' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Roles(rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.addUser(body);
  }

  @ApiOperation({ summary: 'Оновити поля користувача. Ролі: admin, user' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles(rolesEnum.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Put('')
  async updateUser(@Body() body: CreateUserDto, @Req() req: ReqWithUserInfo) {
    return this.userService.updateUser(req.user.userId, body);
  }

  @ApiOperation({ summary: 'Видалення користувача. Ролі: admin, user' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles(rolesEnum.USER)
  @UseGuards(AuthGuard, RolesGuard)
  @Delete('')
  async deleteUser(@Req() req: ReqWithUserInfo) {
    if (req.user.role.includes(rolesEnum.ADMIN))
      throw new HttpException(
        'Адмін не може видалити себе!',
        HttpStatus.BAD_REQUEST,
      );
    return this.userService.deleteUser(req.user.userId);
  }
}
