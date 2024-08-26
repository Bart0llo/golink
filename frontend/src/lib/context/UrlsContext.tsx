"use client";
import React, { useEffect } from "react";
import { ShortUrl } from "../types/short";

const Context = React.createContext({
  urls: [] as ShortUrl[],
  addLink: (link: ShortUrl) => {},
});

const LINKS_VERSION = "v1";
const LINKS_KEY = `links-${LINKS_VERSION}`;

export function UrlsProvider({ children }: any) {
  const [urls, setUrls] = React.useState<ShortUrl[]>([]);

  // First load
  useEffect(() => {
    const links: ShortUrl[] = JSON.parse(
      localStorage.getItem(LINKS_KEY) || "[]"
    );

    if (links && links.length > 0) {
      links.sort((a, b) => b.createdAt - a.createdAt);
      setUrls(links);
    }
  }, []);

  // Update links
  useEffect(() => {
    localStorage.setItem(LINKS_KEY, JSON.stringify(urls));
  }, [urls]);

  // Add link
  const addLink = (link: ShortUrl) => {
    setUrls((prevItems) => [link, ...prevItems]);
  };

  return (
    <Context.Provider
      value={{
        urls,
        addLink,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useUrls() {
  return React.useContext(Context);
}
