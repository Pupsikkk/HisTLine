import { ApiProperty } from '@nestjs/swagger';

export class createInstanceDto {
  @ApiProperty({ example: 'Нікола Тесла', description: 'Назва колонки' })
  readonly name: string;

  @ApiProperty({
    example: 'Великий винахідник, родився в....',
    description: 'Короткий опис користувача',
  })
  readonly description?: string;

  @ApiProperty({ example: 1856, description: 'З якого року' })
  readonly fromYear: number;

  @ApiProperty({ example: 1943, description: 'По такий рік' })
  readonly toYear: number;

  @ApiProperty({
    example:
      'https://lh3.googleusercontent.com/proxy/u_kU7ZJHxLSHxLP2GCB-QUD25ICBCDD7GjOdnkFj3FifCyVtIUC6ZjoLrQFm_paSvwAfG-H9U-VcCyF8x3SJQdR-bgrKutg',
    description: 'URL зображення',
  })
  readonly img?: string;

  @ApiProperty({
    example: 'Історична особистість',
    description: 'Тип до якого відноситься',
  })
  readonly type: string;

  @ApiProperty({
    example: ['Інженер', 'Винахідник'],
    description: 'Підтипи колонки',
  })
  readonly subtypes: string[];

  @ApiProperty({
    example: [
      'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D0%BB%D0%B0,_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0',
    ],
    description: 'Посилання на зовнішні ресурси',
  })
  readonly links?: string[];
}
