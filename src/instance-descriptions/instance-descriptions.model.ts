import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Instance } from 'src/instance/instance.model';

interface createInstanceDescriptionInterface {
  description_text: string;
  link_raw: string;
  instanceId: number;
}

@Table({ tableName: 'instance-descriptions' })
export class InstanceDescription extends Model<
  InstanceDescription,
  createInstanceDescriptionInterface
> {
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
  description_text: string;

  @Column({
    type: DataType.STRING,
  })
  link_raw: string;

  @ForeignKey(() => Instance)
  @Column
  instanceId: number;

  @BelongsTo(() => Instance, 'instanceId')
  instance: Instance;
}
