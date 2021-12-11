import { ApiProperty } from '@nestjs/swagger';

export class createTypeDto {
  @ApiProperty({ example: 'Історична особистість', description: 'Назва типу' })
  readonly type_name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Колір в 16ому представленні',
  })
  readonly type_color: string;
}
