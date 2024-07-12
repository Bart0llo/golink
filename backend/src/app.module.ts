import { IndexModule } from './modules/index.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    HttpModule,
    IndexModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
