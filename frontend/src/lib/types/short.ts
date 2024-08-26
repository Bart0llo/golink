export type CreateShortUrlDto = {
  target: string;
  withMetatags: boolean;
};

export type ShortUrlResponse = {
  id: number;
  target: string;
  shortCode: string;
  createdAt: number;
};

export interface ShortUrl extends ShortUrlResponse {}

export type IGetShortUrl = {
  target: string;
  shortID: string;
  createdAt: number;
};
