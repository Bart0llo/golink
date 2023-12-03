export type CreateShortUrl = {
  url: string;
};

export type CreateShortUrlSuccess = {
  id: string;
  target: string;
  shortID: string;
  deletionCode: string;
  createdAt: number;
};

