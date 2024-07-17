import { ShortUrl } from "@/lib/types/short";

export function userLinks() {
  try {
    const links: ShortUrl[] = JSON.parse(localStorage.getItem("links") || "[]");

    return links;
  } catch (error) {
    console.error(error);
  }
}

export function addLink(link: ShortUrl) {
  try {
    const links: ShortUrl[] = JSON.parse(localStorage.getItem("links") || "[]");
    localStorage.setItem("links", JSON.stringify([...links, link]));
  } catch (error) {
    console.error(error);
  }
}
