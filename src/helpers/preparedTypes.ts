import { ApiProperty } from '@nestjs/swagger';

export class someErr {
  @ApiProperty({
    example: 'some err info',
    description: 'Інформація про помилку',
  })
  readonly message: string;
}

export class UnauthorizedErr {
  @ApiProperty({
    example: 420,
    description: 'Статус код',
  })
  readonly statusCode: number;
  @ApiProperty({
    example: 'Не авторизований',
    description: 'Інформація про помилку',
  })
  readonly message: string;
}
