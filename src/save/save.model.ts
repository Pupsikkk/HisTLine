import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface createSaveInterface {
  fromYear: number;
  toYear: number;
  type_raw: string;
  subtype_raw: string;
  userId: number;
}

@Table({ tableName: 'saves' })
export class Save extends Model<Save> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column({ type: DataType.INTEGER })
  fromYear: number;

  @Column({ type: DataType.INTEGER })
  toYear: number;

  @Column({ type: DataType.STRING })
  type_raw: string;

  @Column({ type: DataType.STRING })
  subtype_raw: string;

  @BelongsTo(() => User)
  user: User;
}
