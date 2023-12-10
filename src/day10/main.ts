import { readTextFile } from "../utils";
import { findLoop, findSPosition, formatData, stepCount } from "./utils";

const main = () => {
  const input = readTextFile(10, "input");
  const data = formatData(input);
  const SPosition = findSPosition(data);
  const result = findLoop(data, SPosition, null, SPosition);
  console.log(stepCount / 2);
};

main();
