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
  target: string;
  shortID: string;
  createdAt: number;
};
