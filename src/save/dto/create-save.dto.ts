import { ApiProperty } from '@nestjs/swagger';

export class createSaveDto {
  @ApiProperty({ example: 1856, description: 'З якого року' })
  fromYear: number;

  @ApiProperty({ example: 1943, description: 'По такий рік' })
  toYear: number;

  @ApiProperty({
    example: ['Історична особистість', 'Будівля'],
    description: 'Збережені типи',
  })
  types: [string];

  @ApiProperty({
    example: ['Інженер', 'Собор'],
    description: 'Збережені підтипи',
  })
  subtypes: [string];
}
