"use server";

import { REDIRECT_SHORT_URL } from "@/utils/constants";
import { env } from "next-runtime-env";

export default async function getLinkRedirect(
  id: string
): Promise<string | null> {
  const apiURL = env("NEXT_PUBLIC_API_URL");
  const res = await fetch(`${apiURL}/${REDIRECT_SHORT_URL}/${id}`);

  const data = await res.json();

  if (res.status == 200) {
    return data.url;
  }

  return null;
}
