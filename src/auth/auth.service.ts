import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/role.model';
import { rolesEnum } from './../role/roles-enum';

export interface TokenPayload {
  userId: number;
  role: rolesEnum[];
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  public async login(user: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(user.login);
    if (!candidate)
      throw new HttpException(
        'Такого користувача не існує',
        HttpStatus.BAD_REQUEST,
      );

    const passwordEquals = await bcrypt.compare(
      user.password,
      candidate.password,
    );

    if (!passwordEquals)
      throw new HttpException('Невірний пароль', HttpStatus.BAD_REQUEST);
    const payload = {
      userId: candidate.id,
      role: [this.roleService.rolesEnum.USER],
    };
    const accessTokenCookie = this.getCookieWithJwtAccessToken(payload);
    const { cookie: refreshTokenCookie, refreshToken } =
      this.getCookieWithJwtRefreshToken(payload);

    this.setCurrentRefreshToken(candidate.id, refreshToken);

    return {
      user: candidate,
      accessToken: accessTokenCookie,
      refreshToken: refreshTokenCookie,
    };
  }

  public async registration(user: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(user.login);
    if (candidate)
      throw new HttpException(
        'Такий користувач уже існує',
        HttpStatus.BAD_REQUEST,
      );

    const hashedPassword = await bcrypt.hash(user.password, 5);

    const userFromDB = await this.userService.addUser({
      login: user.login,
      password: hashedPassword,
    });
    const payload = {
      userId: userFromDB.id,
      role: [this.roleService.rolesEnum.USER],
    };
    const accessTokenCookie = this.getCookieWithJwtAccessToken(payload);
    const { cookie: refreshTokenCookie, refreshToken } =
      this.getCookieWithJwtRefreshToken(payload);

    this.setCurrentRefreshToken(userFromDB.id, refreshToken);

    return {
      user: userFromDB,
      accessToken: accessTokenCookie,
      refreshToken: refreshTokenCookie,
    };
  }

  public getCookieWithJwtAccessToken(payload: TokenPayload) {
    const token = this.generateToken(
      { ...payload },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }

  public getCookieWithJwtRefreshToken(payload: TokenPayload) {
    const token = this.generateToken(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );
    return {
      cookie: `Refresh=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`,
      refreshToken: token,
    };
  }

  public async setCurrentRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const user = await this.userService.getUserById(userId);
    if (!user)
      throw new HttpException(
        'Внутрішня функція звертається до неіснуючого користувача',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 5);
    await user.update({ hashedRefreshToken });
  }

  private generateToken(payload: TokenPayload, secret, expiresIn) {
    try {
      return this.jwtService.sign(payload, {
        secret: secret,
        expiresIn: expiresIn,
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public async verifyUser(token, secret) {
    try {
      const user = await this.jwtService.verify(token, { secret: secret });
      return user;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
