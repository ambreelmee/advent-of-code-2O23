import { readTextFile } from "../utils";
import { countStepToReachEndPart2 } from "./part2";
import { formatData } from "./utils";

const main = () => {
  const input = readTextFile(8, "input");
  const { nodes, directions } = formatData(input);
  console.log({ nodes, directions });
  const result = countStepToReachEndPart2(directions, nodes);
  console.log({ result });
};

main();
