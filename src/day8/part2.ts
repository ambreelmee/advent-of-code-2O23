import { Direction, Nodes } from "./utils";

export const countStepToReachEndPart2 = (
  directions: Direction[],
  nodes: Nodes
) => {
  let nextNodeIds = getStartingNodeIds(nodes);
  let index = 0;
  let stepCount = 0;
  while (!isFinished(nextNodeIds)) {
    nextNodeIds = nextNodeIds.map((nodeId) => nodes[nodeId][directions[index]]);

    index = index < directions.length - 1 ? index + 1 : 0;
    stepCount++;
    console.log({
      nextNodeIds,
      nextIndex: index,
      stepCount,
    });
  }
  return stepCount;
};

const getStartingNodeIds = (nodes: Nodes) =>
  Object.keys(nodes).filter((nodeId) => nodeId.endsWith("A"));

const isFinished = (nodeIds: string[]) =>
  nodeIds.every((node) => node.endsWith("Z"));
