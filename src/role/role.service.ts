import {
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './role.model';
import { rolesEnum } from './roles-enum';

@Injectable()
export class RoleService {
  public readonly rolesEnum = rolesEnum;

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
