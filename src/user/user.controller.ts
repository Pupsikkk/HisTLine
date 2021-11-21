import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('Користувачі')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Отримати список усіх користувачів' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Get('')
  getAll() {
    // return this.userService.getAllUsers();
    return this.userService.getUserById(1);
  }

  @ApiOperation({ summary: 'Отримати одного користувача по його id' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.getUser(id);
  }

  @ApiOperation({ summary: 'Створити нового користувача' })
  @ApiResponse({ status: HttpStatus.CREATED, type: User })
  @Post('')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.addUser(body);
  }

  @ApiOperation({ summary: 'Оновити поля користувача' })
  @ApiResponse({ status: HttpStatus.OK })
  @Put('')
  updateUser(@Body() body: CreateUserDto) {
    return this.userService.updateUser(body);
  }

  @ApiOperation({ summary: 'Видалення користувача' })
  @ApiResponse({ status: HttpStatus.OK })
  @Delete('')
  deleteUser(@Body() body: CreateUserDto) {
    return this.userService.deleteUser(body);
  }
}
