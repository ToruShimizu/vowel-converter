const VOWEL_A = [
  "あ",
  "か",
  "さ",
  "た",
  "な",
  "は",
  "ま",
  "や",
  "ら",
  "わ",
  "が",
  "ざ",
  "だ",
  "ば",
  "ぱ",
];

const VOWEL_I = [
  "い",
  "き",
  "し",
  "ち",
  "に",
  "ひ",
  "み",
  "り",
  "ぎ",
  "じ",
  "ぢ",
  "び",
  "ぴ",
];

const VOWEL_U = [
  "う",
  "く",
  "す",
  "つ",
  "ぬ",
  "ふ",
  "む",
  "ゆ",
  "る",
  "を",
  "ゔ",
  "ぐ",
  "づ",
  "ぶ",
  "ぷ",
];

const VOWEL_E = [
  "え",
  "け",
  "せ",
  "て",
  "ね",
  "へ",
  "め",
  "れ",
  "げ",
  "ぜ",
  "で",
  "べ",
  "ぺ",
];
const VOWEL_O = [
  "お",
  "こ",
  "そ",
  "と",
  "の",
  "ほ",
  "も",
  "よ",
  "ろ",
  "ご",
  "ぞ",
  "ど",
  "ぼ",
  "ぽ",
];

/**
 * @param char ひらがなに変換された文字列
 * @return 小文字以外のひらがなを母音で返す。小文字やハイフンが渡された場合はそのまま返す
 */
export const getVowel = (char: string) => {
  if (VOWEL_A.includes(char)) return "あ";
  if (VOWEL_I.includes(char)) return "い";
  if (VOWEL_U.includes(char)) return "う";
  if (VOWEL_E.includes(char)) return "え";
  if (VOWEL_O.includes(char)) return "お";
  return char;
};

/**
 * @param char ひらがなに変換された文字列
 * @return 拗音を母音に変換して返す
 */
export const replaceContractedSounds = (char: string) => {
  return char
    .replace(/[あ-ん][ゃ]/g, "あ")
    .replace(/[あ-ん][ゅ]/g, "う")
    .replace(/[あ-ん][ょ]/g, "お");
};

/**
 * @param char ひらがなに変換された文字列
 * @return ハイフンがある場合、ハイフンの一つ前の母音を返す。ない場合は受け取った文字列をそのまま帰す
 */
export const replaceHyphen = (
  char: string,
  vowels: string[],
  index: number
) => {
  if (!["-", "ー"].includes(char)) return char;

  return vowels[index - 1];
};

export const useConvertToVowel = () => {
  /**
   * @param char ひらがなに変換された文字列
   * @return 母音のみに変換して返す
   */
  const convertToVowel = (char: string) => {
    const replacedChar = replaceContractedSounds(char);
    const vowels = [...replacedChar].map((char) => getVowel(char));

    const replacedHyphen = vowels.map((char, index) =>
      replaceHyphen(char, vowels, index)
    );
    return replacedHyphen.join("");
  };

  return {
    convertToVowel,
  };
};
