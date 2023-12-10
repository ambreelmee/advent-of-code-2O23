import { readTextFile } from "../utils";
import { getSumOfAllPreviousValues } from "./part2";
import { formatData } from "./utils";

const main = () => {
  const input = readTextFile(9, "input");
  const sequences = formatData(input);
  const result = getSumOfAllPreviousValues(sequences);
  console.log(result);
};

main();
