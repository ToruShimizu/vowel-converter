import api from "../api/$api";
import aspida from "@aspida/fetch";

export const hiraganaApiClient = api(
  aspida(fetch, { baseURL: "https://labs.goo.ne.jp/api" })
);
