import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const cookies = req.cookies;
    try {
      const user = this.jwtService.verify(cookies.Authentication, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      req.user = user;
      return true;
    } catch (err) {
      // console.log(err);
      throw new HttpException('Не авторизований', 420);
    }
  }
}
