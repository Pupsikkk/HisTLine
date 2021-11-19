import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'userLogin', description: 'Логін користувача' })
  readonly login: string;

  @ApiProperty({ example: '12345', description: 'Пароль користувача' })
  readonly password: string;
}
