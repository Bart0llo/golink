import getLinkRedirect from "@/actions/getLinkRedirect";
import LinkRedirectPage from "@/container/LinkRedirectPage";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;

  const redirectURL = await getLinkRedirect(id);

  switch (redirectURL?.metaTags?.type) {
    case "image":
      return {
        title: {
          absolute: "",
        },
        description: "",
        openGraph: {
          images: redirectURL.metaTags.image,
        },
      };

    case "video":
      return {
        title: {
          absolute: "",
        },
        description: "",
        openGraph: {
          videos: {
            url: redirectURL.metaTags.image,
            secureUrl: redirectURL.metaTags.image,
          },
          type: "video.other",
        },
      };

    case "website":
      return {
        title: {
          absolute: redirectURL.metaTags.title,
        },
        description: redirectURL.metaTags.description,
        openGraph: {
          images: redirectURL.metaTags.image,
          url: redirectURL.metaTags.url,
        },
      };

    default:
      return {
        title: "Link Redirect",
      };
  }
}

// TODO: For the theme color
// https://nextjs.org/docs/app/api-reference/functions/generate-viewport

export default async function ShortRedirect({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const redirectURL = await getLinkRedirect(id);

  if (!redirectURL) return redirect("/?error=404");

  return <LinkRedirectPage {...redirectURL} />;
}
