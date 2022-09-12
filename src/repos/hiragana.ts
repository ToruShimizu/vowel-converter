import { hiraganaApiClient } from "../../apis/client";

export const ERROR_MESSAGE = "変換に失敗しました。もう一度実行してください。";

export const useHiraganaRepo = () => {
  return {
    fetch: async (body: {
      app_id: string;
      sentence: string;
      output_type: "hiragana" | "katakana";
    }) => {
      const { converted } = await hiraganaApiClient.hiragana.$post({
        body,
      });

      if (!converted) throw new Error(ERROR_MESSAGE);

      return converted;
    },
  };
};
