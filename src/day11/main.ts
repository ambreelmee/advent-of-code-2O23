import { readTextFile } from "../utils";
import { formatData, getPlanetPositionsWithUniverseExpansion } from "./part2";
import { getShortestPath } from "./utils";

const main = () => {
  const input = readTextFile(11, "input");
  const formattedData = formatData(input);
  const planetsPosition =
    getPlanetPositionsWithUniverseExpansion(formattedData);
  const result = getShortestPath(planetsPosition);
  console.log({ result });
};

main();
