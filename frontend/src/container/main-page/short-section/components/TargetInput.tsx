import { Input } from "@mantine/core";
import { BsLink45Deg } from "react-icons/bs";
import style from "./shortform.module.css";
import { ShortUrlResponse } from "@/lib/types/short";

type TargetInputProps = {
  form: any;
  short?: ShortUrlResponse;
  loading: boolean;
};

export default function TargetInput({
  form,
  short,
  loading,
}: TargetInputProps) {
  return (
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
  );
}
