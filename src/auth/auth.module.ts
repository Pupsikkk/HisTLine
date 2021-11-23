import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({}),
    UserModule,
    forwardRef(() => RoleModule),
    SequelizeModule.forFeature([Role]),
  ],
})
export class AuthModule {}
