import { suite } from "uvu";
import * as assert from "uvu/assert";
import { useConvertToVowel } from "../useConvertToVowel";

const { convertToVowel } = useConvertToVowel();

const test = suite("convertToVowel");

test("convertToVowel => ひらがなに変換された任意の文字列を渡した場合、母音のみに変換されている", () => {
  const actual_ka = convertToVowel("こくごさんすうりかえいご");

  assert.equal(actual_ka, "おうおあんうういあえいお");
});

test("convertToVowel => ひらがなに変換された任意の文字列に拗音が含まれている場合、母音のみに変換されている", () => {
  const actual_ka = convertToVowel("しゃいんしょくどう");

  assert.equal(actual_ka, "あいんおうおう");
});

test("convertToVowel => ひらがなに変換された任意の文字列にハイフンが含まれている場合、母音のみに変換されている", () => {
  const actual_1 = convertToVowel("うーばーいーつ");

  assert.equal(actual_1, "ううああいいう");
});

test.run();
