import aspida from "@aspida/fetch";
import api from "./$api";

export const hiraganaApiClient = api(
  aspida(fetch, { baseURL: "https://labs.goo.ne.jp/api" })
);
