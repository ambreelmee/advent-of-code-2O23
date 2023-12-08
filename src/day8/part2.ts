import { Direction, Nodes } from "./utils";

export const countStepToReachEndPart2 = (
  directions: Direction[],
  nodes: Nodes
) => {
  return getStartingNodeIds(nodes).reduce(
    (result, nodeId) =>
      findPPMC(result, getOutputNodes(nodeId, directions, nodes).endingIndex),
    1
  );
};

const findPPMC = (number1: number, number2: number) => {
  let greatestNumber = Math.max(number1, number2);
  let smallestNumber = Math.min(number1, number2);
  let rest = greatestNumber % smallestNumber;
  if (rest === 0) {
    return greatestNumber;
  }
  while (rest > 0) {
    greatestNumber = smallestNumber;
    smallestNumber = rest;
    rest = greatestNumber % smallestNumber;
  }
  return (number1 * number2) / smallestNumber;
};

const getStartingNodeIds = (nodes: Nodes) =>
  Object.keys(nodes).filter((nodeId) => nodeId.endsWith("A"));

interface NodeInfo {
  nodeId: string;
  directionIndex: number;
}
const getOutputNodes = (
  nodeId: string,
  directions: Direction[],
  nodes: Nodes
) => {
  let index = 0;
  const outputNodes = [] as NodeInfo[];
  let nextNode = { nodeId, directionIndex: index };
  let nodeIndex = outputNodes.findIndex(
    (node) =>
      node.nodeId === nextNode.nodeId &&
      node.directionIndex == nextNode.directionIndex
  );

  while (nodeIndex === -1) {
    outputNodes.push(nextNode);
    index = index < directions.length - 1 ? index + 1 : 0;
    nextNode = {
      nodeId: nodes[nextNode.nodeId][directions[nextNode.directionIndex]],
      directionIndex: index,
    };
    nodeIndex = outputNodes.findIndex(
      (node) =>
        node.nodeId === nextNode.nodeId &&
        node.directionIndex == nextNode.directionIndex
    );
  }
  const endingIndex = outputNodes.findIndex(
    (outputNode, index) => outputNode.nodeId.endsWith("Z")!
  );
  return { outputNodes, nodeIndex, endingIndex };
};
