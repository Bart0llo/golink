import { ErrorMessage, SuccessMessage } from "../types/http";
import { CreateShortUrl, ICreateShortUrlSuccess } from "../types/short";

const api = process.env.NEXT_PUBLIC_API_URL;

const createShort = async (
  data: CreateShortUrl
): Promise<SuccessMessage<ICreateShortUrlSuccess> | ErrorMessage> => {
  return await (
    await fetch(`${api}/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
  ).json();
};

export { createShort };
