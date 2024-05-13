import { API_URL, REDIRECT_SHORT_URL } from "@/utils/constants";
import { redirect } from "next/navigation";

export default async function ShortRedirect({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await fetch(`${API_URL}/${REDIRECT_SHORT_URL}/${id}`);

  const data = await res.json();

  if (res.status == 200) {
    if (
      !data.url.startsWith("http://") &&
      !data.url.startsWith("https://")
    ) {
      return redirect("https://" + data.url);
    } else if (
      data.url.startsWith("http://") ||
      data.url.startsWith("https://")
    ) {
      return redirect(data.url);
    }
  }

  return redirect("/?error=404");
}
