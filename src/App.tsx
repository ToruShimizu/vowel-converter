import Typography from "@suid/material/Typography";
import { Component, createSignal } from "solid-js";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import styles from "./App.module.css";
import Stack from "@suid/material/Stack";
import Alert from "@suid/material/Alert";
import { ERROR_MESSAGE, useHiraganaRepo } from "./repos/hiragana";
import { useConvertToVowel } from "./modules/useConvertToVowel";
import useMediaQuery from "@suid/material/useMediaQuery";
import AlertTitle from "@suid/material/AlertTitle";

const APP_ID = import.meta.env.VITE_APP_ID as string;
const EMPTY_VALUE = "母音に変換したい文字を入力してください。";

const { convertToVowel } = useConvertToVowel();

const isSP = useMediaQuery("(max-width: 767px)");

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
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mt: 4 }}>
        母音変換機
      </Typography>

      <Stack
        sx={{ alignItems: "center", justifyContent: "center" }}
        direction={isSP() ? "column" : "row"}
        spacing={4}
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
      <Button
        sx={{ width: isSP() ? "100%" : 200, mt: 4 }}
        variant="contained"
        size="large"
        onclick={() => convertHiragana(value())}
      >
        母音に変換する
      </Button>
    </Container>
  );
};

export default App;
