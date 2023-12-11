import { readTextFile } from "../utils";
import { countNestedTiles } from "./part2";
import { formatData } from "./utils";

const main = () => {
  const input = readTextFile(10, "input");
  const data = formatData(input);
  const nestedTiles = countNestedTiles(data);
  console.log({ nestedTiles, result: nestedTiles.length });
};

main();
