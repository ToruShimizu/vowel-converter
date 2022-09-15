import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";
import Alert from "@suid/material/Alert";
import { ERROR_MESSAGE, useHiraganaRepo } from "./repos/hiragana";
import { useConvertToVowel } from "./modules/useConvertToVowel";
import AlertTitle from "@suid/material/AlertTitle";
import { Button, Heading, Stack, Container, Center, Box } from "@hope-ui/solid";

const APP_ID = import.meta.env.VITE_APP_ID as string;
const EMPTY_VALUE = "母音に変換したい文字を入力してください。";

const { convertToVowel } = useConvertToVowel();

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [convertedValue, setConvertedValue] = createSignal("");

  const [errorMessage, setErrorMessage] = createSignal("");
  const hiraganaRepo = useHiraganaRepo();

  const convertHiragana = async (value: string) => {
    setErrorMessage("");

    try {
      if (!value) {
        throw new Error(EMPTY_VALUE);
      }

      const converted = await hiraganaRepo.fetch({
        app_id: APP_ID,
        sentence: value,
        output_type: "hiragana",
      });

      const convertedVowel = convertToVowel(converted);

      setConvertedValue(convertedVowel);
    } catch (e: unknown) {
      const errorResponse = e as { code: number; message: string };

      if (errorResponse.code && errorResponse.code !== 200) {
        setErrorMessage(ERROR_MESSAGE);
        return;
      }

      setErrorMessage(errorResponse.message);
      setConvertedValue("");
    }
  };

  return (
    <Container maxWidth="md" p={24}>
      <Center>
        <Heading level="1" size="4xl" my={24}>
          母音変換機
        </Heading>
      </Center>
      <Center>
        <Stack
          spacing={16}
          direction={{ "@initial": "column", "@sm": "row" }}
          mb={36}
        >
          <textarea
            id="value"
            aria-label="value"
            placeholder="母音に変換したい文字を入力してください"
            rows="10"
            cols="50"
            onInput={(event) => {
              setValue(event.currentTarget.value);
            }}
            class={styles.textarea}
          >
            {value()}
          </textarea>

          <textarea
            id="value"
            aria-label="value"
            placeholder="母音に変換後の文字が入ります"
            rows="10"
            cols="50"
            readonly
            class={styles.textarea}
          >
            {convertedValue()}
          </textarea>
        </Stack>
      </Center>
      {errorMessage() && (
        <Alert severity="error" sx={{ mt: 2 }}>
          <AlertTitle
            sx={{
              textAlign: "left",
            }}
          >
            {errorMessage()}
          </AlertTitle>
        </Alert>
      )}

      <Center>
        <Button onclick={() => convertHiragana(value())} size="lg">
          母音に変換する
        </Button>
      </Center>
    </Container>
  );
};

export default App;
