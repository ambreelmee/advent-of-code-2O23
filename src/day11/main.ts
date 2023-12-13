import { readTextFile } from "../utils";
import { addUniverseExpansion, getShortestPath } from "./utils";

const main = () => {
  const input = readTextFile(11, "input");
  const data = addUniverseExpansion(input);
  const result = getShortestPath(data);
  console.log({ result });
};

main();
