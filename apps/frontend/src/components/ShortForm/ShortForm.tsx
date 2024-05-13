"use client";

import { Button, CopyButton, Group, Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useState } from "react";

import { CreateShortUrlDto, ShortUrlResponse } from "@/types/short";
import { createShort } from "@/services/url";

import style from "./shortform.module.css";

import { BsLink45Deg } from "react-icons/bs";
import { FaCopy, FaMagic } from "react-icons/fa";
import { REDIRECT_URL } from "@/utils/constants";

export default function ShortForm() {
  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState<ShortUrlResponse>();

  const form = useForm({
    initialValues: {
      target: "",
    },
  });

  const formShort = async (data: CreateShortUrlDto) => {
    setLoading(true);
    const res = await createShort(data);

    if ("error" in res) {
      notifications.show({
        message: "Url could not be created",
        color: "red",
        withCloseButton: false,
        autoClose: true,
      });
      setLoading(false);
      return;
    }

    setLoading(false);
    setShort(res);
    window.umami.track("Short url created", { shortCode: res.shortCode });
  };

  return (
    <form
      className={style.form}
      onSubmit={form.onSubmit((values) => formShort(values))}
    >
      <Input
        name="target"
        classNames={{ input: style.linkInput }}
        w="100%"
        size="lg"
        placeholder="Paste your link here"
        leftSection={<BsLink45Deg size={30} />}
        required
        readOnly={!!short || loading}
        {...form.getInputProps("target")}
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
            value={`${REDIRECT_URL}/${short.shortCode}`}
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
              setShort(undefined);
              form.reset();
            }}
            data-umami-event="Next short button"
          >
            Next short
          </Button>

          <CopyButton value={`${REDIRECT_URL}/${short.shortCode}`}>
            {({ copied, copy }) => (
              <Button
                color={copied ? "teal" : "pink.6"}
                size="md"
                onClick={copy}
                leftSection={<FaCopy />}
                data-umami-event="Copy url button"
                data-umami-event-shortCode={short.shortCode}
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
