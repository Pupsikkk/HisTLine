import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
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
import { Roles } from './roles-auth.decorator';
import { RolesGuard } from './roles.guard';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

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
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Логін користувача' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Post('/login')
  async login(@Body() authData: AuthDataDto, @Req() req: Request) {
    const { user, accessToken, refreshToken } = await this.authService.login(
      authData,
    );
    req.res.setHeader('Set-Cookie', [accessToken, refreshToken]);
    return user;
  }

  @ApiOperation({ summary: 'Реєстрація користувача' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Post('/registration')
  async registration(@Req() req: Request, @Body() authData: AuthDataDto) {
    const { user, accessToken, refreshToken } =
      await this.authService.registration(authData);
    req.res.setHeader('Set-Cookie', [accessToken, refreshToken]);
    return user;
  }

  @ApiOperation({ summary: 'Видача нового рефреш токену' })
  @ApiResponse({ status: HttpStatus.OK, type: JWTResponse })
  @Get('/refresh')
  async refresh(@Req() req: Request) {
    const { Refresh: refreshToken } = req.cookies;
    const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
    const info = await this.authService.verifyUser(refreshToken, secret);
    if (!info)
      throw new HttpException(
        'Необхідно отримати новий рефреш токен',
        HttpStatus.FORBIDDEN,
      );
    const userRefreshTokenFormDB = (
      await this.userService.getUserById(info.userId)
    ).hashedRefreshToken;
    const refreshTokensEquals = await bcrypt.compare(
      refreshToken,
      userRefreshTokenFormDB,
    );
    if (!refreshTokensEquals)
      throw new HttpException('Невірний рефреш токен', HttpStatus.FORBIDDEN);
    const { exp, iat, ...payload } = info;
    const accessTokenCookie =
      this.authService.getCookieWithJwtAccessToken(payload);
    const { cookie: refreshTokenCookie, refreshToken: newRefreshToken } =
      this.authService.getCookieWithJwtRefreshToken(payload);

    this.authService.setCurrentRefreshToken(info.userId, newRefreshToken);

    req.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    return;
  }
}
