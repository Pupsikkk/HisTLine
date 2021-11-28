import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth-guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { rolesEnum } from 'src/role/roles-enum';
import { createInstanceDto } from './dto/create-instance.dto';
import { Instance } from './instance.model';
import { InstanceService } from './instance.service';

@Controller('instance')
export class InstanceController {
  constructor(private instanceService: InstanceService) {}

  @Roles(rolesEnum.USER, rolesEnum.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @Post('')
  createInstance(@Req() req: any, @Body() instance: createInstanceDto) {
    const user = req.user;
    return this.instanceService.createInstance(user, instance);
  }
}
