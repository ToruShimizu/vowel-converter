import Typography from "@suid/material/Typography";
import { Component, createSignal } from "solid-js";
import Button from "@suid/material/Button";
import Container from "@suid/material/Container";
import styles from "./App.module.css";
import Stack from "@suid/material/Stack";
import Grid from "@suid/material/Grid";
import Box from "@suid/material/Box";

const App: Component = () => {
  const [value, setValue] = createSignal("");

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
            onchange={(event) => {
              setValue(event.currentTarget.value);
            }}
            class={styles.textarea}
          >
            {value()}
          </textarea>
          <Button variant="contained" size="large">
            母音に変換する
          </Button>
          <textarea
            id="value"
            aria-label="value"
            placeholder="母音に変換後の文字が入ります"
            rows="10"
            cols="50"
            readonly
            onchange={(event) => {
              setValue(event.currentTarget.value);
            }}
            class={styles.textarea}
          >
            {value()}
          </textarea>
        </Stack>
      </Grid>
    </Container>
  );
};

export default App;
