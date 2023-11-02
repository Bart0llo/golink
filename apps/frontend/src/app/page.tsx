import {
  Box,
  Container,
  Title,
  Image,
  Text,
  Input,
  BackgroundImage,
  Button,
} from "@mantine/core";
import style from "./style.module.css";
import { BsLink45Deg } from "react-icons/bs";
import { FaMagic } from "react-icons/fa";

export default function Home() {
  return (
    <BackgroundImage src="/bg.svg">
      <Container className={style.mainBox}>
        <Box className={style.content}>
          <Image p="sm" src="/logo.svg" alt="Logo" maw={270} fit="contain" />
          <Title order={3} ta="center" px="xl">
            Return of the iconic link shortener{" "}
            <Text span inherit c="pink.7" fw="bolder">
              GoLink
            </Text>{" "}
            in a refreshed version
          </Title>
          <Input
            classNames={{ input: style.linkInput }}
            w="100%"
            size="lg"
            required
            placeholder="Paste your link here"
            leftSection={<BsLink45Deg size={30} />}
          />
          <Button color="pink.7" size="md" leftSection={<FaMagic />}>
            Short link
          </Button>
        </Box>
      </Container>
    </BackgroundImage>
  );
}
