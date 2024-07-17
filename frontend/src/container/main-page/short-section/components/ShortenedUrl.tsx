import { Input } from "@mantine/core";
import style from "./shortform.module.css";
import { ShortUrlResponse } from "@/lib/types/short";

type ShortenedUrlProps = {
  short: ShortUrlResponse;
  redirectDomain?: string;
};

export default function ShortenedUrl({
  short,
  redirectDomain,
}: ShortenedUrlProps) {
  return (
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
        value={`${redirectDomain}/${short.shortCode}`}
      />
    </Input.Wrapper>
  );
}
