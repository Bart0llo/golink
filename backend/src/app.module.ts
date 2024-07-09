import { IndexModule } from './modules/index.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    IndexModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
