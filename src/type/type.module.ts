import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Subtype } from 'src/subtype/subtype.model';
import { Instance } from 'src/instance/instance.model';
import { JwtModule } from '@nestjs/jwt';
import { Type } from './type.model';

@Module({
  providers: [TypeService],
  controllers: [TypeController],
  imports: [
    SequelizeModule.forFeature([Instance, Subtype, User, Type]),
    JwtModule.register({}),
  ],
})
export class TypeModule {}
