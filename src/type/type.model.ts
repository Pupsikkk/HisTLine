import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';
import { Subtype } from 'src/subtype/subtype.model';
import { User } from 'src/user/user.model';

interface createTypeInterface {
  type_name: string;
  type_color: string;
  userId: number;
}

@Table({ tableName: 'types' })
export class Type extends Model<Type, createTypeInterface> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  type_name: string;

  @Column({
    type: DataType.STRING,
  })
  type_color: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => Instance)
  instance: Instance;

  @HasMany(() => Subtype)
  subtype: Subtype[];
}
