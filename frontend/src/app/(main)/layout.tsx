"use client";
import { AppShell } from "@mantine/core";

import styles from "./layout.module.css";
import Header from "@/components/Header/Header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 80 }} className={styles.backgroundMain}>
      <AppShell.Header
        withBorder={false}
        style={{ backgroundColor: "transparent", position: "absolute" }}
      >
        <Header />
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
