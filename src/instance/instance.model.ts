import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { InstanceDescription } from 'src/instance-descriptions/instance-descriptions.model';
import { Subtype } from 'src/subtype/subtype.model';
import { Type } from 'src/type/type.model';
import { User } from 'src/user/user.model';
import { InstanceSubtype } from './instanceSubtype.model';

interface createInstanceInterface {
  name: string;
  fromYear: number;
  toYear: number;
  img: string;
  userId: number;
  typeId: number;
}

@Table({ tableName: 'instances' })
export class Instance extends Model<Instance, createInstanceInterface> {
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
  name: string;

  @Column({
    type: DataType.INTEGER,
  })
  fromYear: number;

  @Column({
    type: DataType.INTEGER,
  })
  toYear: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  img: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @HasOne(() => InstanceDescription, 'instanceId')
  instanceDescription: InstanceDescription;

  @BelongsToMany(() => Subtype, () => InstanceSubtype)
  subtypes: Subtype[];
}
