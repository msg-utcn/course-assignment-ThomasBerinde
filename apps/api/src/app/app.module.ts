import { Module } from '@nestjs/common';
import { QuestionManagementModule } from './question-management/question-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    QuestionManagementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
