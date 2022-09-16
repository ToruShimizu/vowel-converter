import { suite } from "uvu";
import * as assert from "uvu/assert";
import { replaceContractedSounds } from "../useConvertToVowel";

const CONTRACTED_SOUNDS =
  "きゃきゅきょしゃしゅしょちゃちゅちょにゃにゅにょひゃひゅひょみゃみゅみょりゃりゅりょぎゃぎゅぎょじゃじゅじょぢゃぢゅぢょびゃびゅびょぴゃぴゅぴょゔぁ";

const test = suite("replaceContractedSounds");

test("replaceContractedSound => 拗音だけの場合、拗音が母音に変換されている", () => {
  const actual = replaceContractedSounds(CONTRACTED_SOUNDS);

  const expected =
    "あうおあうおあうおあうおあうおあうおあうおあうおあうおあうおあうおあうおあ";

  assert.equal(actual, expected);
});

test("replaceContractedSound => 拗音以外も混ざっている場合、拗音だけが母音に変換されている", () => {
  const value = "ちゅうかじんみんきょうわこく";
  const actual = replaceContractedSounds(value);

  const expected = "ううかじんみんおうわこく";

  assert.equal(actual, expected);
});

test("replaceContractedSound => 拗音がない場合、渡した文字列がそのまま返ってくる", () => {
  const value = "きたあいるらんど";
  const actual = replaceContractedSounds(value);

  const expected = "きたあいるらんど";

  assert.equal(actual, expected);
});

test.run();
