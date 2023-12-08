import { readTextFile } from "../utils";
import { countStepToReachEnd, formatData } from "./utils";

const main = () => {
  const input = readTextFile(8, "input");
  const { nodes, directions } = formatData(input);
  console.log({ nodes, directions });
  const result = countStepToReachEnd(directions, nodes);
  console.log({ result });
};

main();
