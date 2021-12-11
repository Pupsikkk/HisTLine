import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { JwtModule } from '@nestjs/jwt';
import { Instance } from 'src/instance/instance.model';
import { Save } from 'src/save/save.model';
import { Type } from 'src/type/type.model';
import { Role } from 'src/role/role.model';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([User, Instance, Type, Save, Role]),
    JwtModule.register({}),
  ],
  exports: [UserService],
})
export class UserModule {}
