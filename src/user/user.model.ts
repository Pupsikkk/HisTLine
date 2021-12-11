import {
  Table,
  Model,
  Column,
  DataType,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Instance } from 'src/instance/instance.model';
import { Type } from 'src/type/type.model';
import { Subtype } from 'src/subtype/subtype.model';
import { Save } from 'src/save/save.model';
import { Role } from 'src/role/role.model';

interface createUserInterface {
  login: string;
  password: string;
  roleId: number;
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

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  roleId: number;

  @HasMany(() => Instance)
  instance: Instance[];

  @HasMany(() => Type)
  type: Type[];

  @HasMany(() => Subtype)
  subtype: Subtype[];

  @HasOne(() => Save)
  mySave: Save;

  @BelongsTo(() => Role)
  role: Role;
}
