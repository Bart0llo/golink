import { ErrorMessage, SuccessMessage } from "../_types/http";
import { CreateShortUrl, ICreateShortUrlSuccess } from "../_types/short";

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
