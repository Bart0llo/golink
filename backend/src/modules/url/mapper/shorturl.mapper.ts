import { Url } from '@prisma/client';
import { IShortUrlMapper } from '../interface/shorturl.interface';

export class ShortUrlMapper implements IShortUrlMapper {
  id: number;
  target: string;
  shortCode: string;
  createdAt: number;

  constructor(values: IShortUrlMapper) {
    Object.assign(this, values);
  }

  public static map(data: Url) {
    return new ShortUrlMapper({
      id: data.id,
      target: data.protocol + data.longUrl,
      shortCode: data.shortCode,
      createdAt: data.createdAt,
    });
  }
}
