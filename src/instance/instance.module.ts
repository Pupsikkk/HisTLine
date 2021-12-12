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
import { TypeModule } from 'src/type/type.module';
import { UserModule } from 'src/user/user.module';
import { InstanceDescriptionsModule } from 'src/instance-descriptions/instance-descriptions.module';
import { SubtypeModule } from 'src/subtype/subtype.module';

@Module({
  providers: [InstanceService],
  controllers: [InstanceController],
  imports: [
    SequelizeModule.forFeature([
      Instance,
      InstanceDescription,
      Type,
      Subtype,
      User,
      InstanceSubtype,
    ]),
    JwtModule.register({}),
    TypeModule,
    UserModule,
    InstanceDescriptionsModule,
    SubtypeModule,
  ],
})
export class InstanceModule {}
