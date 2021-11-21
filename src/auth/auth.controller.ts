import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiProperty,
} from '@nestjs/swagger';
import { AuthDataDto } from './dto/auth-data.dto';
import { Request } from 'express';
import { AuthService } from './auth.service';

class JWTResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'JsonWebToken',
  })
  jwt: string;
}

@ApiTags('Авторизація')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Логін користувача' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Post('/login')
  login(@Body() authData: AuthDataDto) {
    return authData;
  }

  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Post('/registration')
  registration(@Body() authData: AuthDataDto) {
    return authData;
  }

  @ApiOperation({ summary: 'Видача нового рефреш токену' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Get('/refresh')
  refresh(@Req() req: Request) {
    return req.headers;
  }

  @Get('/test/:id')
  testFunc(@Param('id') id: number) {
    return this.authService.getCookieWithJwtAccessToken(id);
  }
}
