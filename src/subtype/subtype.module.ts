import { Module } from '@nestjs/common';
import { SubtypeService } from './subtype.service';
import { SubtypeController } from './subtype.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstanceSubtype } from 'src/instance/instanceSubtype.model';
import { Type } from 'src/type/type.model';
import { Instance } from 'src/instance/instance.model';
import { User } from 'src/user/user.model';

@Module({
  providers: [SubtypeService],
  controllers: [SubtypeController],
  imports: [
    SequelizeModule.forFeature([Instance, InstanceSubtype, Type, User]),
  ],
})
export class SubtypeModule {}
