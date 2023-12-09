import { readTextFile } from "../utils";
import { formatData, getSumOfAllNextValue } from "./utils";

const main = () => {
  const input = readTextFile(9, "input");
  const sequences = formatData(input);
  const result = getSumOfAllNextValue(sequences);
  console.log(result);
};

main();
