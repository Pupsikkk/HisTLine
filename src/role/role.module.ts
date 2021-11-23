import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from './role.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    SequelizeModule.forFeature([Role]),
    forwardRef(() => AuthModule),
    JwtModule.register({}),
  ],
  exports: [RoleService],
})
export class RoleModule {}
