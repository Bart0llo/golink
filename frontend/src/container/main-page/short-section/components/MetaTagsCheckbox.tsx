import { Checkbox, Text, Tooltip } from "@mantine/core";

type MetaTagsCheckboxProps = {
  form: any;
};

export default function MetaTagsCheckbox({ form }: MetaTagsCheckboxProps) {
  return (
    <Checkbox
      size="md"
      color="pink.6"
      label={
        <Tooltip
          multiline
          w={250}
          events={{ hover: true, focus: true, touch: true }}
          label="Use this function if you want to display a link of a video or photo on, for example, the Discord platform"
        >
          <Text>
            Display original url meta tags.{" "}
            <Text span fw="bold" c="pink.6">
              Info
            </Text>
          </Text>
        </Tooltip>
      }
      {...form.getInputProps("withMetatags", { type: "checkbox" })}
    />
  );
}
