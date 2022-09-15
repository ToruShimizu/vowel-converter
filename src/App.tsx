import { Component, createSignal } from "solid-js";
import styles from "./App.module.css";
import { ERROR_MESSAGE, useHiraganaRepo } from "./repos/hiragana";
import { useConvertToVowel } from "./modules/useConvertToVowel";
import {
  Button,
  Heading,
  Stack,
  Container,
  Center,
  Textarea,
  Text,
  Box,
  notificationService,
  Notification,
  NotificationTitle,
  Icon,
} from "@hope-ui/solid";
import { CgDanger } from "solid-icons/cg";
const APP_ID = import.meta.env.VITE_APP_ID as string;
const EMPTY_VALUE = "文字を入力してください。";

const { convertToVowel } = useConvertToVowel();

const App: Component = () => {
  const [value, setValue] = createSignal("");
  const [convertedValue, setConvertedValue] = createSignal("");
  const [isLoading, setIsLoading] = createSignal(false);

  const [errorMessage, setErrorMessage] = createSignal("");
  const hiraganaRepo = useHiraganaRepo();

  const convertHiragana = async (value: string) => {
    setErrorMessage("");
    try {
      if (!value) {
        setErrorMessage(EMPTY_VALUE);
        return;
      }

      setIsLoading(true);

      const converted = await hiraganaRepo.fetch({
        app_id: APP_ID,
        sentence: value,
        output_type: "hiragana",
      });

      const convertedVowel = convertToVowel(converted);

      setConvertedValue(convertedVowel);
    } catch (e: unknown) {
      notificationService.show({
        render: () => (
          <Notification bg={"$danger4"}>
            <Icon boxSize="1.5em" color={"$danger11"} as={CgDanger} mr={2} />
            <NotificationTitle color={"$danger11"}>
              {ERROR_MESSAGE}
            </NotificationTitle>
          </Notification>
        ),
        duration: 2_000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" p={24}>
      <Center>
        <Heading level="1" size="4xl" my={24}>
          母音変換機
        </Heading>
      </Center>

      <Box>
        {errorMessage() !== "" && value() === "" && (
          <Text color={"$danger10"}>{errorMessage()}</Text>
        )}

        <Stack
          spacing={16}
          direction={{ "@initial": "column", "@md": "row" }}
          mb={36}
        >
          <Textarea
            value={value()}
            placeholder="母音に変換したい文字を入力してください"
            onInput={(event) => {
              setValue(event.currentTarget.value);
            }}
            invalid={errorMessage() !== "" && value() === ""}
            size="lg"
            h={200}
            required
            bg={errorMessage() !== "" && value() === "" ? "$danger6" : "fff"}
            class={styles.textarea}
          />

          <Textarea
            value={convertedValue()}
            placeholder="母音に変換後の文字が入ります"
            onInput={(event) => {
              setValue(event.currentTarget.value);
            }}
            readOnly={convertedValue() !== ""}
            variant="filled"
            size="lg"
            h={200}
            class={styles.textarea}
          />
        </Stack>
      </Box>

      <Center>
        <Button
          loading={isLoading()}
          loadingText="変換中"
          onclick={() => convertHiragana(value())}
          w={{ "@initial": "100%", "@md": "320px" }}
        >
          母音に変換する
        </Button>
      </Center>
    </Container>
  );
};

export default App;
