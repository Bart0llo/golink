import { ShortUrl } from "@/lib/types/short";

const LINKS_VERSION = "v1";
const LINKS_KEY = `links-${LINKS_VERSION}`;

export function userLinks() {
  try {
    const links: ShortUrl[] = JSON.parse(
      localStorage.getItem(LINKS_KEY) || "[]"
    );

    return links;
  } catch (error) {
    console.error(error);
  }
}

export function addLink(link: ShortUrl) {
  try {
    const links: ShortUrl[] = JSON.parse(
      localStorage.getItem(LINKS_KEY) || "[]"
    );
    localStorage.setItem("links", JSON.stringify([...links, link]));
  } catch (error) {
    console.error(error);
  }
}
