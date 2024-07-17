"use client";

import { useEffect, useState } from "react";
import { Container, Table } from "@mantine/core";
import style from "./style.module.css";
import { userLinks } from "@/lib/utils/userLinks";
import Link from "next/link";
import { truncateText } from "@/lib/utils/truncateText";
import { env } from "next-runtime-env";
import { ShortUrl } from "@/lib/types/short";
import { epochToDatetime } from "@/lib/utils/epochToDatetime";

export default function MainUrlsSection() {
  const [links, setLinks] = useState<ShortUrl[]>([]);

  useEffect(() => {
    // TODO: make a request handler to the backend for clicks and sync data from backend to local storage
    const fetchedLinks = userLinks();
    if (fetchedLinks) {
      setLinks(fetchedLinks);
    }
  }, []);

  const redirectLink = env("NEXT_PUBLIC_REDIRECT_URL");

  const renderLinks = links.map((link) => (
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
      <Table.Td>{epochToDatetime(link.createdAt)}</Table.Td>
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
              {!links.length ? (
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
