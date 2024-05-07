import { Box, Container, Title, Image, Text } from "@mantine/core";
import style from "./style.module.css";
import { Metadata } from "next";
import ShortForm from "@/components/ShortForm/ShortForm";

export const metadata: Metadata = {
  title: "GoLink",
};

export default function Home() {
  return (
      <Container className={style.mainBox}>
        <Box className={style.content}>
          <Image p="sm" src="/logo.svg" alt="Logo" maw={270} fit="contain" />
          <Title order={3} ta="center" px="xl">
            Return of the iconic link shortener{" "}
            <Text span inherit c="pink.6" fw="bolder">
              GoLink
            </Text>{" "}
            in a refreshed version
          </Title>
          <ShortForm />
        </Box>
      </Container>
  );
}
