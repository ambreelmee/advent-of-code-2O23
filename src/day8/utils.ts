type Direction = "L" | "R";
type NodeDirections = Record<Direction, string>;
type Nodes = Record<string, NodeDirections>;

export const formatData = (input: string[]) => {
  const directions = input[0].split("") as Direction[];
  const nodes = {} as Nodes;
  input.slice(1).forEach((node) => {
    const [nodeId, nodeDestinations] = node.split("=");
    const [left, right] = nodeDestinations.split(",");

    const nodeValue = formatValue(nodeId);

    nodes[nodeValue] = {
      L: formatValue(left),
      R: formatValue(right),
    };
  });
  return { directions, nodes };
};

const formatValue = (node: string) =>
  node.replaceAll("(", "").replaceAll(")", "").trim();

export const countStepToReachEnd = (directions: Direction[], nodes: Nodes) => {
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

// const getNextNode = (currentNode: string, direction: Direction, nodes: Nodes) =>
//   nodes[currentNode][direction];
