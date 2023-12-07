import { readTextFile } from "../utils";
import { formatData } from "./part2";
import { getWinningRaceCount } from "./utils";

const main = () => {
  const input = readTextFile(6, "input");
  const races = formatData(input);
  console.log(races);
  const result = getWinningRaceCount(races);
  console.log(result);
};

main();
