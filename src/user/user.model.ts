import { APP_INTERCEPTOR } from '@nestjs/core';
import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { col } from 'sequelize/types';

interface createUserInterface {
  login: string;
  password: string;
  hashedRefreshToken?: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, createUserInterface> {
  @ApiProperty({ example: '1', description: 'Унікальний ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'userLogin', description: 'Логін користувача' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  login: string;

  @ApiProperty({ example: 'somePass1234', description: 'Пароль користувача' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    description: 'Хешований рефреш токен',
  })
  @Column({ type: DataType.STRING, allowNull: true, defaultValue: null })
  hashedRefreshToken: string;
}
