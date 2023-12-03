export type CreateShortUrl = {
  url: string;
};

export type ICreateShortUrlSuccess = {
  id: string;
  target: string;
  shortID: string;
  deletionCode: string;
  createdAt: number;
};

export type IGetShortUrl = {
  id: string;
  target: string;
  shortID: string;
  clicks: number;
  deletionCode: string;
  createdAt: number;
};
