import { Direction, Nodes } from "./utils";

export const countStepToReachEndPart1 = (directions: Direction[], nodes: Nodes) => {
  const startingNode = "AAA";
  let nextNode = nodes[startingNode][directions[0]];
  let index = 1;
  let stepCount = 1;
  while (nextNode !== "ZZZ") {
    console.log({ nextNode });
    nextNode = nodes[nextNode][directions[index]];
    index = index < directions.length - 1 ? index + 1 : 0;
    stepCount++;
  }
  return stepCount;
};
