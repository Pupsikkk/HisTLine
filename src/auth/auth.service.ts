import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface TokenPayload {
  userId: number;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  public login() {}

  public registration() {}

  public getCookieWithJwtAccessToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.generateToken(
      payload,
      process.env.JWT_ACCESS_TOKEN_SECRET,
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}`;
  }

  public getCookieWithJwtRefreshToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.generateToken(
      payload,
      process.env.JWT_REFRESH_TOKEN_SECRET,
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    );
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}`;
  }

  public setCurrentRefreshToken(userId: number) {}

  private generateToken(payload: TokenPayload, secret, expiresIn) {
    return this.jwtService.sign(payload, {
      secret: secret,
      expiresIn: expiresIn,
    });
  }
}
