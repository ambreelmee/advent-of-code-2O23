type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | "S";
type Ground = ".";
type Tile = Pipe | Ground;

type Direction = "top" | "bottom" | "left" | "right";
type Position = {
  lineIndex: number;
  columnIndex: number;
};

type Point = {
  connections: Direction[];
  value: Tile;
  position: Position;
};
export type Area = Point[][];

export const formatData = (input: string[]): Area =>
  input.map((line, lineIndex) =>
    line.split("").map((point, columnIndex) => ({
      value: point as Tile,
      position: { lineIndex, columnIndex },
      connections: getPipeConnections(input, { lineIndex, columnIndex }),
    }))
  );

export const findLoop = (area: Area) => {
  const SPosition = findSPosition(area);
  const maxPosition = { lineIndex: area.length, columnIndex: area[0].length };
  const SPointWithConnection = area[SPosition.lineIndex][SPosition.columnIndex];
  const loop = [SPosition] as Position[];
  let nextPosition = getNextPosition(SPointWithConnection, null, maxPosition);
  while (!isSamePosition(nextPosition, SPosition)) {
    if (nextPosition === null) {
      return loop;
    }
    loop.push(nextPosition);
    const currentPointWithConnections =
      area[nextPosition.lineIndex][nextPosition.columnIndex];
    nextPosition = getNextPosition(
      currentPointWithConnections,
      loop[loop.length - 2],
      maxPosition
    );
  }
  return loop;
};

const getNextPosition = (
  pointInformation: Point,
  previousPosition: Position | null,
  maxPosition: Position
): Position | null => {
  const nextDirection = pointInformation.connections.find(
    (direction) =>
      !isSamePosition(
        previousPosition,
        getPosition(direction, pointInformation.position, maxPosition)
      )
  );
  return nextDirection
    ? getPosition(nextDirection, pointInformation.position, maxPosition)
    : null;
};

const isSamePosition = (
  position1: Position | null,
  position2: Position | null
) => {
  return (
    position1?.columnIndex === position2?.columnIndex &&
    position1?.lineIndex === position2?.lineIndex
  );
};

export const findSPosition = (area: Area): Position =>
  area
    .map((line) => line.findIndex((point) => point.value === "S"))
    .reduce(
      (position, line, index) => {
        if (line !== -1) {
          return {
            lineIndex: index,
            columnIndex: line,
          };
        }
        return position;
      },
      { lineIndex: -1, columnIndex: -1 }
    );

const getPipeConnections = (input: string[], position: Position) => {
  const value = input[position.lineIndex][position.columnIndex];
  const possibleDirections = getPossibleDirections(value as Tile);
  return possibleDirections.filter((direction) =>
    hasConnection(direction, input, position)
  );
};

const getPossibleDirections = (value: Tile): Direction[] => {
  switch (value) {
    case ".":
      return [];
    case "|":
      return ["top", "bottom"];
    case "-":
      return ["left", "right"];
    case "L":
      return ["top", "right"];
    case "J":
      return ["top", "left"];
    case "7":
      return ["bottom", "left"];
    case "F":
      return ["bottom", "right"];
    case "S":
      return ["top", "bottom", "left", "right"];
    default:
      throw new Error("unhandled case");
  }
};

const hasConnection = (
  direction: Direction,
  area: string[],
  position: Position
) => {
  const possibleConnections = ["S"];
  const line = area[position.lineIndex];
  const nextPosition = getPosition(direction, position, {
    lineIndex: area.length - 1,
    columnIndex: line.length - 1,
  });
  console.log({
    line: area[position.lineIndex][position.columnIndex],
    nextPosition,
  });
  switch (direction) {
    case "top":
      possibleConnections.push(...["7", "F", "|"]);
      break;
    case "bottom":
      possibleConnections.push(...["L", "J", "|"]);
      break;
    case "left":
      possibleConnections.push(...["L", "F", "-"]);
      break;
    case "right":
      possibleConnections.push(...["J", "7", "-"]);
      break;
    default:
      throw new Error("unhandled case");
  }
  return nextPosition &&
    possibleConnections.includes(
      area[nextPosition.lineIndex][nextPosition.columnIndex]
    )
    ? true
    : false;
};

const getPosition = (
  direction: Direction,
  { lineIndex, columnIndex }: Position,
  maxPosition: Position
) => {
  switch (direction) {
    case "top":
      return lineIndex > 0 ? { lineIndex: lineIndex - 1, columnIndex } : null;
    case "bottom":
      return lineIndex < maxPosition.lineIndex
        ? { lineIndex: lineIndex + 1, columnIndex }
        : null;
    case "left":
      return columnIndex > 0
        ? { lineIndex, columnIndex: columnIndex - 1 }
        : null;
    case "right":
      return columnIndex < maxPosition.columnIndex
        ? { lineIndex, columnIndex: columnIndex + 1 }
        : null;
  }
};
