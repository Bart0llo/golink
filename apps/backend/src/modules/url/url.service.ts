import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toEpochTime, generateID } from 'tools';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async short(url: string) {
    const urlSave = await this.prisma.url.create({
      data: {
        shortCode: generateID(7, {
          customAlb:
            '0123456789ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz',
        }),
        longUrl: url,
        createdAt: toEpochTime(),
      },
    });

    return urlSave;
  }
}
