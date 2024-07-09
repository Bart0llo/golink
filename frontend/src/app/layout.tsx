import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Script from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ColorSchemeScript forceColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <Notifications position="top-right" />
          {children}
        </MantineProvider>

        <Script
          async
          src="https://umami.bart0llo.dev/script.js"
          data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
        />
      </body>
    </html>
  );
}
