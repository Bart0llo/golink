import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { toEpochTime, generateID, detectProtocol } from '../../lib/functions';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) {}

  async short(urlBody: string) {
    const { protocol, url } = detectProtocol(urlBody);

    const urlSave = await this.prisma.url.create({
      data: {
        shortCode: generateID(7, {
          customAlb:
            '0123456789ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz',
        }),
        protocol: protocol,
        longUrl: url,
        createdAt: toEpochTime(),
      },
    });

    return urlSave;
  }

  async redirect(id: string) {
    const url = await this.prisma.url.findUnique({
      where: {
        shortCode: id,
      },
    });
    if (!url) {
      throw new NotFoundException('Url not found');
    }

    await this.prisma.url.update({
      where: {
        shortCode: id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return url.protocol + url.longUrl;
  }
}
