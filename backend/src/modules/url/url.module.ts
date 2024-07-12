import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from '../prisma/prisma.module';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}
