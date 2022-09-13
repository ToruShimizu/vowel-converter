import { suite } from "uvu";
import * as assert from "uvu/assert";
import { getVowel } from "../useConvertToVowel";

const test = suite("getVowel");

test("getVowel => あ行以外の文字を渡した場合、母音に変換されている", () => {
  const actual_ka = getVowel("か");
  const actual_ki = getVowel("き");
  const actual_ku = getVowel("く");
  const actual_ke = getVowel("け");
  const actual_ko = getVowel("こ");

  assert.equal(actual_ka, "あ");
  assert.equal(actual_ki, "い");
  assert.equal(actual_ku, "う");
  assert.equal(actual_ke, "え");
  assert.equal(actual_ko, "お");
});

test("getVowel => 濁点がついている文字を渡した場合、母音に変換されている", () => {
  const actual_ka = getVowel("が");
  const actual_ki = getVowel("ぎ");
  const actual_ku = getVowel("ぐ");
  const actual_ke = getVowel("げ");
  const actual_ko = getVowel("ご");

  assert.equal(actual_ka, "あ");
  assert.equal(actual_ki, "い");
  assert.equal(actual_ku, "う");
  assert.equal(actual_ke, "え");
  assert.equal(actual_ko, "お");
});

test("getVowel => 半濁点がついている文字を渡した場合、母音に変換されている", () => {
  const actual_ka = getVowel("ぱ");
  const actual_ki = getVowel("ぴ");
  const actual_ku = getVowel("ぷ");
  const actual_ke = getVowel("ぺ");
  const actual_ko = getVowel("ぽ");

  assert.equal(actual_ka, "あ");
  assert.equal(actual_ki, "い");
  assert.equal(actual_ku, "う");
  assert.equal(actual_ke, "え");
  assert.equal(actual_ko, "お");
});

test("getVowel => あ行の文字を渡した場合、そのまま返ってくる", () => {
  const actual_ka = getVowel("あ");
  const actual_ki = getVowel("い");
  const actual_ku = getVowel("う");
  const actual_ke = getVowel("え");
  const actual_ko = getVowel("お");

  assert.equal(actual_ka, "あ");
  assert.equal(actual_ki, "い");
  assert.equal(actual_ku, "う");
  assert.equal(actual_ke, "え");
  assert.equal(actual_ko, "お");
});

test("getVowel => 「ん」を渡した場合、渡した文字がそのまま返ってくる", () => {
  const actual = getVowel("ん");

  assert.equal(actual, "ん");
});

test("getVowel => 「っ」を渡した場合、渡した文字がそのまま返ってくる", () => {
  const actual = getVowel("っ");

  assert.equal(actual, "っ");
});

test("getVowel => ひらがな以外の文字を渡した場合、渡した文字がそのまま返ってくる", () => {
  const actual_1 = getVowel("a");
  const actual_2 = getVowel("A");
  const actual_3 = getVowel("ア");
  const actual_4 = getVowel("1");
  const actual_5 = getVowel("-");
  const actual_6 = getVowel("ー");

  assert.equal(actual_1, "a");
  assert.equal(actual_2, "A");
  assert.equal(actual_3, "ア");
  assert.equal(actual_4, "1");
  assert.equal(actual_5, "-");
  assert.equal(actual_6, "ー");
});

test.run();
