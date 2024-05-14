"use server";

import { API_URL, REDIRECT_SHORT_URL } from "@/utils/constants";

export default async function getLinkRedirect(
  id: string
): Promise<string | null> {
  const res = await fetch(`${API_URL}/${REDIRECT_SHORT_URL}/${id}`);

  const data = await res.json();

  if (res.status == 200) {
    if (!data.url.startsWith("http://") && !data.url.startsWith("https://")) {
      return "https://" + data.url;
    } else if (
      data.url.startsWith("http://") ||
      data.url.startsWith("https://")
    ) {
      return data.url;
    }
  }

  return null;
}
