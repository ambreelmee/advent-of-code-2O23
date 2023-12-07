import { readTextFile } from "../utils";
import { formatData, getAllPossibilitiesToWin } from "./part1";

const main = () => {
  const input = readTextFile(6, "input");
  const races = formatData(input);
  console.log(races);
  const result = getAllPossibilitiesToWin(races);
  console.log(result);
};

main();
