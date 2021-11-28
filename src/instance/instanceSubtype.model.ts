import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Subtype } from 'src/subtype/subtype.model';
import { Instance } from './instance.model';

interface createInstanceSubtypeInterface {
  instanceId: number;
  subtypeId: number;
}

@Table({ tableName: 'instance-subtypes' })
export class InstanceSubtype extends Model<
  InstanceSubtype,
  createInstanceSubtypeInterface
> {
  @ForeignKey(() => Instance)
  @Column
  instanceId: number;

  @ForeignKey(() => Subtype)
  @Column
  subtypeId: number;
}
