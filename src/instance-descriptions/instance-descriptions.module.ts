import { Module } from '@nestjs/common';
import { InstanceDescService } from './instance-descriptions.service';
import { InstanceDescriptionsController } from './instance-descriptions.controller';
import { Instance } from 'src/instance/instance.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstanceDescription } from './instance-descriptions.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [InstanceDescService],
  controllers: [InstanceDescriptionsController],
  imports: [
    SequelizeModule.forFeature([Instance, InstanceDescription]),
    JwtModule.register({}),
  ],
})
export class InstanceDescriptionsModule {}
