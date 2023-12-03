"use client";

import { Button, CopyButton, Group, Input } from "@mantine/core";
import { BsLink45Deg } from "react-icons/bs";
import { FaCopy, FaMagic } from "react-icons/fa";
import style from "../style.module.css";
import { useForm } from "@mantine/form";
import { CreateShortUrl } from "@/app/_types/short";
import { createShort } from "@/app/_services/short";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

export default function ShortForm() {
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState();

  const form = useForm({
    initialValues: {
      url: "",
    },
  });

  const formShort = async (data: CreateShortUrl) => {
    setLoading(true)
    const res = await createShort(data);

    if (res.statusCode !== 201) {
      notifications.show({
        message: res.message[0],
        color: "red",
        withCloseButton: false,
        autoClose: true,
      });
      setLoading(false)
      return;
    }

    setLoading(false)
    setShort(res.data);
  };

  return (
    <form
      className={style.form}
      onSubmit={form.onSubmit((values) => formShort(values))}
    >
      <Input
        name="url"
        classNames={{ input: style.linkInput }}
        w="100%"
        size="lg"
        placeholder="Paste your link here"
        leftSection={<BsLink45Deg size={30} />}
        required
        readOnly={short || loading}
        {...form.getInputProps("url")}
      />
      {short && (
        <Input.Wrapper w="100%">
          <Input
            styles={{
              input: {
                textAlign: "center",
              },
            }}
            classNames={{ input: style.linkInput }}
            w="100%"
            size="lg"
            readOnly
            value={`https://2bin.net/${short.shortID}`}
          />
        </Input.Wrapper>
      )}
      {short ? (
        <Group justify="center">
          <Button
            color="pink.6"
            size="md"
            leftSection={<FaMagic />}
            onClick={() => {
              setShort("");
              form.reset();
            }}
          >
            Next short
          </Button>

          <CopyButton value={`https://2bin.net/${short.shortID}`}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "pink.6"}
                size="md"
                onClick={copy}
                leftSection={<FaCopy />}
              >
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
        </Group>
      ) : (
        <Button
          type="submit"
          color="pink.6"
          size="md"
          loading={loading}
          leftSection={<FaMagic />}
        >
          Short link
        </Button>
      )}
    </form>
  );
}
