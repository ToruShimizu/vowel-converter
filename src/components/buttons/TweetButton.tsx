import { Button } from "@hope-ui/solid";
import { Component, splitProps } from "solid-js";

type TweetButtonProps = {
  disabled: boolean;
  text: string;
};

const TweetButton: Component<TweetButtonProps> = (props) => {
  const [local] = splitProps(props, ["disabled", "text"]);

  return (
    <Button
      variant="subtle"
      bg={"$info8"}
      color={"$whiteAlpha12"}
      w={{ "@initial": "100%", "@md": "320px" }}
      disabled={local.disabled}
    >
      <a
        href={`http://twitter.com/share?url=https://vowel-converter.vercel.app/&text=${local.text}&hashtags=母音変換機`}
        target="_blank"
      >
        ツイートする
      </a>
    </Button>
  );
};

export default TweetButton;
