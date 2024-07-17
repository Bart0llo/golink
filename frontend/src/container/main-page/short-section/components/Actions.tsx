import { ShortUrlResponse } from "@/lib/types/short";
import { Button, CopyButton, Group } from "@mantine/core";
import { FaCopy, FaMagic } from "react-icons/fa";

type Props = {
  short?: ShortUrlResponse;
  loading: boolean;
  setShort: (short?: ShortUrlResponse) => void;
  form: any;
  redirectDomain?: string;
};

export default function Actions({
  short,
  loading,
  redirectDomain,
  setShort,
  form,
}: Props) {
  return short ? (
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

      <CopyButton value={`${redirectDomain}/${short.shortCode}`}>
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
  );
}
