"use client";
import { AppShell } from "@mantine/core";

import styles from "./layout.module.css";
import { usePathname } from "next/navigation";
import Header from "@/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const pathIsRedirect = pathname?.startsWith("/link");

  return (
    <AppShell
      disabled={pathIsRedirect}
      header={{ height: 80 }}
      className={styles.backgroundImg}
    >
      <AppShell.Header
        withBorder={false}
        style={{ backgroundColor: "transparent" }}
      >
        <Header />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
