import { suite } from "uvu";
import * as assert from "uvu/assert";
import { replaceHyphen } from "../useConvertToVowel";

const test = suite("replaceHyphen");

test("replaceContractedSound => 母音に変換された文字の配列の中に全角ハイフンがある場合、ハイフンの一つ前にある母音に変換されている", () => {
  const values = ["あ", "ー", "い", "ー", "う", "ー", "え", "ー", "お"];

  const replacedHyphen = values.map((str, index) =>
    replaceHyphen(str, values, index)
  );

  console.log({ replacedHyphen });

  const expected = "ああいいううええお";

  assert.equal(replacedHyphen.join(""), expected);
});

test("replaceContractedSound => 母音に変換された文字の配列の中に半角ハイフンがある場合、ハイフンの一つ前にある母音に変換されている", () => {
  const values = ["あ", "-", "い", "-", "う", "-", "え", "-", "お"];

  const replacedHyphen = values.map((str, index) =>
    replaceHyphen(str, values, index)
  );

  console.log({ replacedHyphen });

  const expected = "ああいいううええお";

  assert.equal(replacedHyphen.join(""), expected);
});

test.run();
