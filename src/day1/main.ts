import { readTextFile } from "../utils";
import { getCalibrationValues } from "./utils";

const main = () => {
  const input = readTextFile(1, "input");

  const result = input.reduce(
    (total, text) => total + getCalibrationValues(text),
    0
  );
  console.log(result);
};

main();
