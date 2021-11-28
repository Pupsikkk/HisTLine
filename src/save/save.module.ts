import { Module } from '@nestjs/common';
import { SaveService } from './save.service';
import { SaveController } from './save.controller';
import { User } from 'src/user/user.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [SaveService],
  controllers: [SaveController],
  imports: [SequelizeModule.forFeature([User])],
})
export class SaveModule {}
