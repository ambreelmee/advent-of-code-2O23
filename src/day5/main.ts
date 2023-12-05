import { readTextFile } from "../utils";
import { formatData, getLowestLocationNumberForSeed } from "./utils";

const main = () => {
  const input = readTextFile(5, "input");
  const { seeds, categories } = formatData(input);
  const result = getLowestLocationNumberForSeed(seeds, categories);
  console.log(result);
};

main();
