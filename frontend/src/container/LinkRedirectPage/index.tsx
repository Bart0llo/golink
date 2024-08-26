"use client";
import { Container, Title, Text } from "@mantine/core";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IRedirectResponse } from "@/lib/types/redirect";

export default function LinkRedirectPage({ redirectUrl }: IRedirectResponse) {
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      window.location.replace(redirectUrl);
    }, 5000);

    return () => clearInterval(interval);
  }, [redirectUrl]);

  return (
    <Container p={0} fluid className={style.container}>
      <Title ta="center" size={40}>
        Redirecting you to website in {counter} seconds...
      </Title>
      <Text size="lg">
        Redirect doeasn&apos;t work? <Link href={redirectUrl}>Click here</Link>
      </Text>
    </Container>
  );
}
