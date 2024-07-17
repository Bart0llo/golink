"use client";

import { useState } from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";

import { CreateShortUrlDto, ShortUrlResponse } from "@/lib/types/short";
import { createShort } from "@/lib/services/url";

import style from "./shortform.module.css";
import { env } from "next-runtime-env";

import TargetInput from "./TargetInput";
import MetaTagsCheckbox from "./MetaTagsCheckbox";
import ShortenedUrl from "./ShortenedUrl";
import Actions from "./Actions";
import { addLink } from "@/lib/utils/userLinks";

export default function ShortForm() {
  const redirectDomain = env("NEXT_PUBLIC_REDIRECT_URL");

  const [loading, setLoading] = useState(false);
  const [short, setShort] = useState<ShortUrlResponse>();

  const form = useForm({
    initialValues: {
      target: "",
      withMetatags: false,
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
    addLink(res);
    window.umami.track("Short url created", { shortCode: res.shortCode });
  };

  return (
    <form
      className={style.form}
      onSubmit={form.onSubmit((values) => formShort(values))}
    >
      <TargetInput form={form} short={short} loading={loading} />
      {form.values.target && !short && <MetaTagsCheckbox form={form} />}
      {short && <ShortenedUrl short={short} redirectDomain={redirectDomain} />}
      <Actions
        short={short}
        loading={loading}
        redirectDomain={redirectDomain}
        setShort={setShort}
        form={form}
      />
    </form>
  );
}
