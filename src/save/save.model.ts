import { ApiProperty } from '@nestjs/swagger';
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
export class Save extends Model<Save, createSaveInterface> {
  @ApiProperty({ example: 1, description: 'Ідентифікатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор батьківського користувача',
  })
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ApiProperty({ example: 1856, description: 'З якого року' })
  @Column({ type: DataType.INTEGER })
  fromYear: number;

  @ApiProperty({ example: 1943, description: 'По такий рік' })
  @Column({ type: DataType.INTEGER })
  toYear: number;

  @ApiProperty({
    example: 'Історична особистість$#$Будівля',
    description: 'Збережені типи',
  })
  @Column({ type: DataType.STRING })
  type_raw: string;

  @ApiProperty({
    example: ['Інженер$#$Собор'],
    description: 'Збережені підтипи',
  })
  @Column({ type: DataType.STRING })
  subtype_raw: string;

  @BelongsTo(() => User)
  user: User;
}
