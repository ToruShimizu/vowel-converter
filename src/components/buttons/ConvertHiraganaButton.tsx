import { Button } from "@hope-ui/solid";
import { Component, splitProps } from "solid-js";

type ConvertHiraganaButtonProps = {
  isLoading: boolean;
  text: string;
  onclick: (value: string) => Promise<void>;
};

const ConvertHiraganaButton: Component<ConvertHiraganaButtonProps> = (
  props
) => {
  const [local] = splitProps(props, ["isLoading", "text", "onclick"]);

  return (
    <Button
      loading={local.isLoading}
      onclick={() => local.onclick(local.text)}
      w={{ "@initial": "100%", "@lg": "320px" }}
      bg={"$primary9"}
    >
      母音に変換する
    </Button>
  );
};

export default ConvertHiraganaButton;
