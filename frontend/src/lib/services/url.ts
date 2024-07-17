import { env } from "next-runtime-env";
import { CreateShortUrlDto } from "@/lib/types/short";
import { SHORT_URL } from "@/lib/utils/constants";

const createShort = async (data: CreateShortUrlDto) => {
  const apiURL = env("NEXT_PUBLIC_API_URL");
  return await (
    await fetch(`${apiURL}/${SHORT_URL}`, {
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
