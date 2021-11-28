import { Module } from '@nestjs/common';
import { InstanceDescriptionsService } from './instance-descriptions.service';
import { InstanceDescriptionsController } from './instance-descriptions.controller';
import { Instance } from 'src/instance/instance.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [InstanceDescriptionsService],
  controllers: [InstanceDescriptionsController],
  imports: [SequelizeModule.forFeature([Instance])],
})
export class InstanceDescriptionsModule {}
