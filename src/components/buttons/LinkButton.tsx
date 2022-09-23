import { Box, Button, ButtonProps } from "@hope-ui/solid";
import { children, Component, JSX, splitProps } from "solid-js";

type LinkButtonProps = {
  disabled: boolean;
  href: string;
  children: JSX.Element;
};

const LinkButton: Component<LinkButtonProps & ButtonProps> = (
  props,
  ...buttonProps
) => {
  const [local] = splitProps(props, ["disabled", "href"]);
  const c = children(() => props.children);

  return (
    <Box
      as="a"
      href={local.href}
      target="_blank"
      rel="noopener noreferrer"
      w={{ "@initial": "100%", "@lg": "320px" }}
    >
      <Button
        variant="subtle"
        bg={"$info8"}
        color={"$whiteAlpha12"}
        w={"$full"}
        {...buttonProps}
        disabled={local.disabled}
      >
        {c}
      </Button>
    </Box>
  );
};

export default LinkButton;
