import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';
import { InstanceSubtype } from 'src/instance/instanceSubtype.model';
import { Type } from 'src/type/type.model';
import { User } from 'src/user/user.model';

interface createSubtypeInterface {
  subtype_name: string;
  subtype_color: string;
  userId: number;
  typeId: number;
}

@Table({ tableName: 'subtypes' })
export class Subtype extends Model<Subtype, createSubtypeInterface> {
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
  subtype_name: string;

  @Column({
    type: DataType.STRING,
  })
  subtype_color: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Type)
  @Column
  typeId: number;

  @BelongsToMany(() => Instance, () => InstanceSubtype)
  instances: Instance[];
}
