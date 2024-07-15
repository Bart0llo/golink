import { Checkbox } from "@mantine/core";

type MetaTagsCheckboxProps = {
  form: any;
};

export default function MetaTagsCheckbox({ form }: MetaTagsCheckboxProps) {
  return (
    <Checkbox
      size="md"
      color="pink.6"
      label="Display original url meta tags"
      {...form.getInputProps("withMetatags", { type: "checkbox" })}
    />
  );
}
