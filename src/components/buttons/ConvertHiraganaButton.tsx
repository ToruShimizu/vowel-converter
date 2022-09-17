import { Button } from "@hope-ui/solid";
import { Component } from "solid-js";

type ConvertHiraganaButtonProps = {
  isLoading: boolean;
  text: string;
  onclick: (value: string) => Promise<void>;
};

const ConvertHiraganaButton: Component<ConvertHiraganaButtonProps> = ({
  isLoading,
  text,
  onclick,
}) => {
  return (
    <Button
      loading={isLoading}
      onclick={() => onclick(text)}
      w={{ "@initial": "100%", "@md": "320px" }}
      bg={"$primary9"}
    >
      母音に変換する
    </Button>
  );
};

export default ConvertHiraganaButton;
