"use server";
import getLinkRedirect from "@/actions/getLinkRedirect";
import LinkRedirectPage from "@/container/link-redirect-page";
import { redirect } from "next/navigation";

export default async function ShortRedirect({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const redirectURL = await getLinkRedirect(id);

  if (!redirectURL) return redirect("/?error=404");

  return <LinkRedirectPage redirect={redirectURL} />;
}
