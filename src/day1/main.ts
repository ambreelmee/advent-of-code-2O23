import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { getCalibrationValues } from "./utils";

const main = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const data = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n");

  const result = data.reduce(
    (total, text) => total + getCalibrationValues(text),
    0
  );
  console.log(result);
};

main();
