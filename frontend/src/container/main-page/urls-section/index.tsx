"use client";

import { useEffect, useState } from "react";
import { Container, Table } from "@mantine/core";
import style from "./style.module.css";
import Link from "next/link";
import { truncateText } from "@/lib/utils/truncateText";
import { env } from "next-runtime-env";
import { epochToDatetime } from "@/lib/utils/epochToDatetime";
import { useUrls } from "@/lib/context/UrlsContext";

type TimeStamps = {
  [key: string]: string;
};

export default function MainUrlsSection() {
  const { urls } = useUrls();
  const [timeStamps, setTimeStamps] = useState<TimeStamps>({});

  const redirectLink = env("NEXT_PUBLIC_REDIRECT_URL");

  useEffect(() => {
    const updateTimestamps = () => {
      const newTimeStamps: TimeStamps = {};
      const now = new Date().getTime();

      urls.forEach((link) => {
        const createdTime = link.createdAt * 1000;
        const diffMinutes = (now - createdTime) / (1000 * 60);

        if (diffMinutes < 2) {
          newTimeStamps[link.shortCode] = epochToDatetime(link.createdAt);
        } else if (!timeStamps[link.shortCode]) {
          newTimeStamps[link.shortCode] = epochToDatetime(link.createdAt);
        }
      });

      setTimeStamps((prev) => ({ ...prev, ...newTimeStamps }));
    };

    updateTimestamps();

    const interval = setInterval(() => {
      updateTimestamps();

      const allOlderThan2Minutes = urls.every((link) => {
        const now = new Date().getTime();
        const createdTime = link.createdAt * 1000;
        const diffMinutes = (now - createdTime) / (1000 * 60);
        return diffMinutes >= 2;
      });

      if (allOlderThan2Minutes) {
        clearInterval(interval);
      }
    }, 10000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls]);

  const renderLinks = urls.map((link) => (
    <Table.Tr key={link.shortCode}>
      <Table.Td>
        <Link href={`${redirectLink}/${link.shortCode}`} target="_blank">
          {redirectLink}/{link.shortCode}
        </Link>
      </Table.Td>
      <Table.Td>
        <Link href={link.target} target="_blank">
          {truncateText(link.target, 30)}
        </Link>
      </Table.Td>
      <Table.Td>{link.clicks || 0}</Table.Td>
      <Table.Td>{timeStamps[link.shortCode] || "-"}</Table.Td>
    </Table.Tr>
  ));

  return (
    <section className={style.container}>
      <Container size="xl" pt="xl">
        <Table.ScrollContainer minWidth={700}>
          <Table className={style.content} striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Td>Short link</Table.Td>
                <Table.Td>Original link</Table.Td>
                <Table.Td>Clicks</Table.Td>
                <Table.Td>Created at</Table.Td>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {!urls.length ? (
                <Table.Tr>
                  <Table.Td colSpan={4}>No links found</Table.Td>
                </Table.Tr>
              ) : (
                renderLinks
              )}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Container>
    </section>
  );
}
