import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Script from "next/script";
import { PublicEnvScript, env } from "next-runtime-env";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "GoLink",
    template: "%s | GoLink",
  },
  description: "GoLink - the classic link shortener",
  authors: [{ name: "Bart0llo", url: "https://bart0llo.dev" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const analyticsID = env("NEXT_PUBLIC_ANALYTICS_ID");
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ColorSchemeScript forceColorScheme="dark" />
        <PublicEnvScript />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>

        <Script
          async
          src="https://umami.bart0llo.dev/script.js"
          data-website-id={analyticsID}
        />
      </body>
    </html>
  );
}
