import { CreateShortUrlDto } from "../types/short";
import { API_URL, SHORT_URL } from "@/utils/constants";

const createShort = async (data: CreateShortUrlDto) => {
  return await (
    await fetch(`${API_URL}/${SHORT_URL}`, {
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
