import { Button } from "@hope-ui/solid";
import { Component } from "solid-js";

type TweetButtonProps = {
  disabled: boolean;
  text: string;
};

const TweetButton: Component<TweetButtonProps> = ({ disabled, text }) => {
  return (
    <Button
      variant="subtle"
      bg={"$info8"}
      color={"$whiteAlpha12"}
      w={{ "@initial": "100%", "@md": "320px" }}
      disabled={disabled}
    >
      <a
        href={`http://twitter.com/share?url=https://vowel-converter.vercel.app/&text=${text}&hashtags=母音変換機`}
        target="_blank"
      >
        ツイートする
      </a>
    </Button>
  );
};

export default TweetButton;
