"use client";
import { Container, Title, Text } from "@mantine/core";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  redirect: string;
};
export default function LinkRedirectPage({ redirect }: Props) {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      window.location.replace(redirect);
    }, 5000);

    return () => clearInterval(interval);
  }, [redirect]);

  return (
    <Container className={style.container}>
      <Title size={40}>
        Redirecting you to website in {counter} seconds...
      </Title>
      <Text size="lg">
        Redirect doeasn&apos;t work? <Link href={redirect}>Click here</Link>
      </Text>
    </Container>
  );
}
