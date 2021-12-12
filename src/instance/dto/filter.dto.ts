import { ApiProperty } from '@nestjs/swagger';

export class filterDto {
  @ApiProperty({ example: 1856, description: 'З якого року' })
  fromYear: number;

  @ApiProperty({ example: 1943, description: 'По такий рік' })
  toYear: number;

  @ApiProperty({
    example: ['Інженер', 'Винахідник'],
    description: 'Підтипи колонки',
  })
  subtypes: string[];
}
