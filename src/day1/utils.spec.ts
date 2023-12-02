import { getCalibrationValues } from "./utils";

describe("getCalibrationValues", () => {
  it("should throw if text does not contain a digit", () => {
    expect(() => getCalibrationValues("acdefef")).toThrow();
  });

  it.each([
    // ['1abc2', 12],
    // ['pqr3stu8vwx', 38],
    // ['a1b2c3d4e5f', 15],
    // ['treb7uchet', 77],
    // ['two1nine', 29],
    // ['eightwothree', 83],
    // ['abcone2threexyz', 13],
    // ['xtwone3four', 24],
    // ['4nineeightseven2', 42],
    // ['zoneight234', 14],
    // ['7pqrstsixteen', 76],
    // ['1oneight', 18],
    ["cpneightwofive3fourtwo", 82],
  ])(
    "returns an number which is the first aggregated with last digit found in the text",
    (text, expectedResult) => {
      const result = getCalibrationValues(text);
      expect(result).toBe(expectedResult);
    }
  );
});
