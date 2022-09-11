import Typography from "@suid/material/Typography";
import { Component, createSignal } from "solid-js";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import styles from "./App.module.css";
import Stack from "@suid/material/Stack";
import Grid from "@suid/material/Grid";
import Box from "@suid/material/Box";
import { hiraganaApiClient } from "../api/client";
import Alert from "@suid/material/Alert";

const APP_ID = import.meta.env.VITE_APP_ID as string;
const ERROR_MESSAGE = "変換に失敗しました。もう一度実行してください。";
const EMPTY_VALUE = "母音に変換したい文字を入力してください。";

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [convertedValue, setConvertedValue] = createSignal("");

  const [errorMessage, setErrorMessage] = createSignal("");

  const convertHiragana = async (value: string) => {
    setErrorMessage("");

    try {
      if (!value) {
        throw new Error(EMPTY_VALUE);
      }
      const { converted } = await hiraganaApiClient.hiragana.$post({
        body: {
          app_id: APP_ID,
          sentence: value,
          output_type: "hiragana",
        },
      });
      if (!converted) throw new Error(ERROR_MESSAGE);

      setConvertedValue(converted);
    } catch (e: any) {
      setErrorMessage(e.message);
      setConvertedValue("");
    }
  };

  return (
    <Container sx={{ p: 3 }}>
      <Grid container justifyContent="center">
        <Box>
          <Typography variant="h3" component="h1" gutterBottom>
            ライムジェネレーター
          </Typography>
        </Box>

        <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
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
          <Button
            variant="contained"
            size="large"
            onclick={() => convertHiragana(value())}
          >
            母音に変換する
          </Button>
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
            {errorMessage()}
          </Alert>
        )}
      </Grid>
    </Container>
  );
};

export default App;
