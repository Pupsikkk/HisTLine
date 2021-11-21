import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASS,
      database: process.env.POSTGRES_DB,
      models: [User, Role],
      autoLoadModels: true,
    }),
    UserModule,
    RoleModule,
    AuthModule,
  ],
  exports: [],
  providers: [],
  controllers: [],
})
export class AppModule {}
