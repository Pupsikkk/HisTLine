import { ApiProperty } from '@nestjs/swagger';

export class createDescriptionDto {
  @ApiProperty({
    example: 'Великий архітектор XVI стол...',
    description: 'Текст колонки',
  })
  description_text: string;

  @ApiProperty({
    example: [
      'https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D0%BB%D0%B0,_%D0%9D%D0%B8%D0%BA%D0%BE%D0%BB%D0%B0',
    ],
    description: 'Посилання на зовнішній ресурс',
  })
  links?: [string];

  @ApiProperty({
    example: 1,
    description: 'Ідентифікатор колонки якій коментар належить',
  })
  instanceId: number;
}
