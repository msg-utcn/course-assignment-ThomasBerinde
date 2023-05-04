import { Module } from '@nestjs/common';
import { QuestionManagementModule } from './question-management/question-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: parseInt(configService.get('DATABASE_PORT')),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [],
        synchronize: configService.get('PRODUCTION_FLAG') == 'false',
        autoLoadEntities: configService.get('PRODUCTION_FLAG') == 'false',
      }),
      imports: [ConfigModule],
      inject: [ConfigService]
    }),
    QuestionManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
