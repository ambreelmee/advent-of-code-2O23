import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
import { getGearRatio } from "./utils";

const main = () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n")
    .filter((line) => line !== "");
  //   const result = getSumOfValidNumbers(input);
  const result = getGearRatio(input);
  console.log(result);
};

main();
