import { Module } from '@nestjs/common';
import { SubtypeService } from './subtype.service';
import { SubtypeController } from './subtype.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstanceSubtype } from 'src/instance/instanceSubtype.model';
import { Type } from 'src/type/type.model';
import { Instance } from 'src/instance/instance.model';
import { User } from 'src/user/user.model';
import { Subtype } from './subtype.model';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [SubtypeService],
  controllers: [SubtypeController],
  imports: [
    SequelizeModule.forFeature([
      Instance,
      InstanceSubtype,
      Type,
      User,
      Subtype,
    ]),
    JwtModule.register({}),
    UserModule,
  ],
  exports: [SubtypeService],
})
export class SubtypeModule {}
