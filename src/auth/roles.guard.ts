import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      const req = context.switchToHttp().getRequest();
      const cookie = req.cookies;

      const user = this.jwtService.verify(cookie.Authentication, {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
      });

      req.user = user;
      return true;
    } catch (e) {
      console.log(e);
      if (e.message === 'jwt expired') {
        throw new HttpException('Необхідно отримати новий рефреш токен', 420);
      }
      throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    }
  }
}
