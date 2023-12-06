import { readTextFile } from "../utils";
import { formatDataPart2, getLowestLocationNumberForSeedPart2 } from "./part2";

const main = () => {
  const input = readTextFile(5, "input");
  const { seeds, categories } = formatDataPart2(input);
  console.log(seeds);
  const result = getLowestLocationNumberForSeedPart2(seeds, categories);
  console.log(result);
};

main();
