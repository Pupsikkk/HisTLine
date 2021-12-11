import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/role/role.model';
import { rolesEnum } from 'src/role/roles-enum';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async getUser(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async addUser(newPotentialUser: CreateUserDto): Promise<User> {
    const { login, password } = newPotentialUser;
    const candidate = await this.userRepository.findOne({ where: { login } });

    if (candidate)
      throw new HttpException(
        'Користувач з таким логіном уже існує!',
        HttpStatus.BAD_REQUEST,
      );

    return this.userRepository.create({
      login: login,
      password: password,
      roleId: (
        (await Role.findOne({ where: { value: rolesEnum.USER } })) as any
      )?.dataValues?.id,
    });
  }

  async updateUser(userId: number, updatingUser: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const { password } = updatingUser;
    const hashedPassword = await bcrypt.hash(password, 5);
    await user.update({ ...updatingUser, password: hashedPassword });
    await user.save();
    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    return await user.destroy();
  }

  public async getUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  public async getUserByLogin(login: string) {
    return this.userRepository.findOne({ where: { login } });
  }
}

export const checkCoreAdmin = async () => {
  let checkAdminRole: any = await Role.findOne({
    where: { value: rolesEnum.ADMIN },
  });
  let checkUserRole: any = await Role.findOne({
    where: { value: rolesEnum.USER },
  });

  if (!checkAdminRole)
    checkAdminRole = await Role.create({
      value: rolesEnum.ADMIN,
      description: 'coreAdmin of whole app',
    });

  if (!checkUserRole)
    checkUserRole = await Role.create({
      value: rolesEnum.USER,
      description: 'coreAdmin of whole app',
    });

  const checkAdmin = await User.findOne({
    where: { roleId: checkAdminRole.dataValues.id },
  });

  if (!checkAdmin)
    await User.create({
      login: process.env.ADMIN_LOGIN,
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 5),
      roleId: checkAdminRole.dataValues.id as number,
    });

  console.log('Admin checked!');
};
