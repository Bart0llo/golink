import {
  Burger,
  Container,
  Drawer,
  Group,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import Link from "next/link";
import GolinkBig from "../logo/GolinkBig";
import { useDisclosure } from "@mantine/hooks";

import style from "./header.module.css";
import { usePathname } from "next/navigation";

const links = [
  { link: "/", name: "Home" },
  { link: "/statistics", name: "URL Stats" },
  { link: "/reports", name: "Report URL" },
];

export default function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <UnstyledButton
      component={Link}
      href={link.link}
      key={link.link}
      className={style.link}
      data-active={link.link === pathname ? true : false}
    >
      {link.name}
    </UnstyledButton>
  ));

  return (
    <>
      <Container size="md" className={style.container}>
        <GolinkBig size={130} />
        <Group visibleFrom="xs" gap={5}>
          {items}
        </Group>

        <Burger size="md" hiddenFrom="xs" onClick={toggle} opened={opened} />
      </Container>

      <Drawer opened={opened} onClose={close}>
        <Stack mt="lg" gap={5}>
          {items}
        </Stack>
      </Drawer>
    </>
  );
}
