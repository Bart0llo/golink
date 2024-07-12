import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  toEpochTime,
  generateID,
  detectProtocol,
  parseContentType,
} from '../../lib/functions';
import * as urlMetadata from 'url-metadata';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Metadata, MetadataType, Url } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async short(urlBody: string) {
    const { protocol, url } = detectProtocol(urlBody);
    const urlSave = await this.createShortUrlEntry(protocol, url);

    if (protocol === 'https://' || protocol === 'http://') {
      await this.saveUrlMetadata(urlSave.id, protocol + url);
    }

    return urlSave;
  }

  async redirect(id: string): Promise<Url & { metadata: Metadata }> {
    const url = await this.prisma.url.findUnique({
      where: {
        shortCode: id,
      },
      include: {
        metadata: true,
      },
    });

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    await this.incrementClickCount(id);

    return url;
  }

  private async createShortUrlEntry(protocol: string, url: string) {
    return this.prisma.url.create({
      data: {
        shortCode: generateID(7, {
          customAlb:
            '0123456789ABCDEFGHJKMNOPQRSTUVWXYZabcdefghjkmnopqrstuvwxyz',
        }),
        protocol,
        longUrl: url,
        createdAt: toEpochTime(),
      },
    });
  }

  private async saveUrlMetadata(urlId: number, fullUrl: string) {
    try {
      const metaTags = await this.fetchUrlMetadata(fullUrl);

      await this.prisma.metadata.create({
        data: {
          urlId,
          type: metaTags.type,
          title: metaTags.data?.title || null,
          description: metaTags.data?.description || null,
          contentUrl:
            metaTags.type === 'video' || metaTags.type === 'image'
              ? fullUrl
              : metaTags.data?.image || metaTags.data['og:image'] || null,
        },
      });
    } catch (error) {
      console.error(`Failed to fetch metadata for ${fullUrl}`);
    }
  }

  private async fetchUrlMetadata(url: string) {
    const response = await lastValueFrom(this.httpService.get(url));
    const contentType = parseContentType(response.headers['content-type']);

    if (contentType.type === 'video') {
      return { type: MetadataType.video };
    } else if (contentType.type === 'image') {
      return { type: MetadataType.image };
    } else {
      const metaTags = await urlMetadata(url);
      return { type: MetadataType.website, data: metaTags };
    }
  }

  private async incrementClickCount(shortCode: string) {
    await this.prisma.url.update({
      where: {
        shortCode,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });
  }
}
