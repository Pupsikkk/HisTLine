import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async createRole(newRole: CreateRoleDto) {
    const roleFromDB = await this.getRoleByValue(newRole.value);
    if (roleFromDB)
      throw new HttpException('В базі уже є така роль', HttpStatus.BAD_GATEWAY);
    const role = await this.roleRepository.create(newRole);
    return role;
  }

  async getRoleByValue(value: string) {
    const roleFromDb = await this.roleRepository.findOne({ where: { value } });
    return roleFromDb;
  }
}
