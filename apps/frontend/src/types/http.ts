export type ErrorMessage = {
  message: string | [string];
  error: string;
  statusCode: number;
};

export type SuccessMessage<T> = {
  success: true;
  message: string;
  data: T;
  statusCode: number;
  meta: {
    timestamp: Date;
    version: string;
    cache: boolean;
  };
};
