import { ApiProperty } from '@nestjs/swagger';

export class createSubtypeDto {
  @ApiProperty({
    example: 'Інженер',
    description: 'Назва підтипу',
  })
  subtype_name: string;

  @ApiProperty({
    example: '#FF0000',
    description: 'Колір в 16ому представленні',
  })
  subtype_color: string;

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор типу до якого відноситься',
  })
  typeId: number;
}
