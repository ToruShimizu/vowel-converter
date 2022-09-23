import { Button, ButtonProps } from "@hope-ui/solid";
import { Component } from "solid-js";

const AppButton: Component<ButtonProps> = (props) => {
  return (
    <Button
      w={{ "@initial": "100%", "@lg": "320px" }}
      bg={"$primary9"}
      {...props}
    >
      母音に変換する
    </Button>
  );
};

export default AppButton;
