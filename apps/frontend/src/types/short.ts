export type CreateShortUrlDto = {
  target: string;
};

export type ShortUrlResponse = {
  id: number;
  target: string;
  shortCode: string;
  createdAt: number;
};

export type IGetShortUrl = {
  target: string;
  shortID: string;
  createdAt: number;
};
