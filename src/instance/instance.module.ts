import { Module } from '@nestjs/common';
import { InstanceService } from './instance.service';
import { InstanceController } from './instance.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstanceDescription } from 'src/instance-descriptions/instance-descriptions.model';
import { Instance } from './instance.model';
import { Type } from 'src/type/type.model';
import { Subtype } from 'src/subtype/subtype.model';
import { User } from 'src/user/user.model';
import { InstanceSubtype } from './instanceSubtype.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [InstanceService],
  controllers: [InstanceController],
  imports: [
    SequelizeModule.forFeature([
      InstanceDescription,
      Type,
      Subtype,
      User,
      InstanceSubtype,
    ]),
    JwtModule.register({}),
  ],
})
export class InstanceModule {}
