export type Direction = "L" | "R";
type NodeDirections = Record<Direction, string>;
export type Nodes = Record<string, NodeDirections>;

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
