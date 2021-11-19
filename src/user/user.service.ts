import { HttpStatus, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';

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
    const hashPassword = await bcrypt.hash(password, 5);
    // console.dir({ login, hashPassword });
    return this.userRepository.create({ login: login, password: hashPassword });
  }

  async updateUser(updatingUser: CreateUserDto) {
    // const { login, password: receivedPassword } = updatingUser;
    // const candidate = await this.userRepository.findOne({ where: { login } });
    // if (!candidate)
    //   throw new HttpException(
    //     'Користувача з таким логіном не існує!',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // // const hashPassword = await bcrypt.hash(receivedPassword, 5);
    // // console.dir({ login, hashPassword });
    // return this.userRepository.create({ login: login, password: hashPassword });
  }

  async deleteUser(candidateForDeleting: CreateUserDto) {}
}
