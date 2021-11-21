import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 'user', description: 'Назва ролі' })
  readonly value: string;

  @ApiProperty({
    example: 'Простий користувач, без привілегій',
    description: 'Опис ролі',
  })
  readonly description: string;
}
