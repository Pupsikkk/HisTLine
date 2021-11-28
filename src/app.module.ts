import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { Role } from './role/role.model';
import { AuthModule } from './auth/auth.module';
import { InstanceModule } from './instance/instance.module';
import { TypeModule } from './type/type.module';
import { InstanceDescriptionsModule } from './instance-descriptions/instance-descriptions.module';
import { SubtypeModule } from './subtype/subtype.module';
import { SaveModule } from './save/save.module';
import { Instance } from './instance/instance.model';
import { Type } from './type/type.model';
import { Subtype } from './subtype/subtype.model';
import { InstanceSubtype } from './instance/instanceSubtype.model';
import { InstanceDescription } from './instance-descriptions/instance-descriptions.model';
import { Save } from './save/save.model';

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
      models: [
        User,
        Save,
        Type,
        Subtype,
        Instance,
        InstanceSubtype,
        InstanceDescription,
        Role,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    UserModule,
    RoleModule,
    AuthModule,
    InstanceModule,
    TypeModule,
    InstanceDescriptionsModule,
    SubtypeModule,
    SaveModule,
  ],
  exports: [],
  providers: [],
  controllers: [],
})
export class AppModule {}
