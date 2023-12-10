import { readTextFile } from "../utils";
import { findLoop, formatData } from "./utils";

const main = () => {
  const input = readTextFile(10, "input");
  const data = formatData(input);
  const loop = findLoop(data);
  console.log({ loop, result: loop.length / 2 });
};

main();
