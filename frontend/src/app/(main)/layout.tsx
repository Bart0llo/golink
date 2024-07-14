"use client";
import { AppShell } from "@mantine/core";

import styles from "./layout.module.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell className={styles.backgroundImg}>
      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
