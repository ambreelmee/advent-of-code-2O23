type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | "S";
type Ground = ".";
type PointValue = Pipe | Ground;

type Direction = "top" | "bottom" | "left" | "right";
type Position = {
  lineIndex: number;
  columnIndex: number;
};
type DirectionPosition = Record<Direction, Position | null>;

type Point = DirectionPosition & { value: PointValue };
type PointInformation = Point & {
  connections: Record<Direction, boolean>;
};
type Area = PointInformation[][];

export const formatData = (input: string[]): Area => {
  const area = input.map((line, lineIndex) =>
    line.split("").map((point, pointIndex) => {
      const pointInformation = {
        value: point as PointValue,
        top:
          lineIndex > 0
            ? { lineIndex: lineIndex - 1, columnIndex: pointIndex }
            : null,
        bottom:
          lineIndex < input.length - 1
            ? { lineIndex: lineIndex + 1, columnIndex: pointIndex }
            : null,
        left:
          pointIndex > 0
            ? { lineIndex: lineIndex, columnIndex: pointIndex - 1 }
            : null,
        right:
          pointIndex < line.length - 1
            ? { lineIndex: lineIndex, columnIndex: pointIndex + 1 }
            : null,
      };
      return {
        ...pointInformation,
      };
    })
  );
  return area.map((line) =>
    line.map((point) => ({
      ...point,
      connections: getPipeConnections(area, point),
    }))
  );
};

export let stepCount = 0;

export const findLoop = (
  area: Area,
  currentPosition: Position,
  previousPosition: Position | null,
  SPosition: Position
): Position => {
  stepCount++;
  const nextPosition = getNextPosition(
    area[currentPosition.lineIndex][currentPosition.columnIndex],
    previousPosition
  );
  if (nextPosition === null) {
    return currentPosition;
  }

  if (isSamePosition(nextPosition, SPosition)) {
    return currentPosition;
  }
  console.log(stepCount);
  return findLoop(area, nextPosition, currentPosition, SPosition);
};

const getNextPosition = (
  pointInformation: PointInformation,
  previousPosition: Position | null
): Position | null => {
  if (isConnection("left", pointInformation, previousPosition)) {
    return pointInformation.left;
  }
  if (isConnection("right", pointInformation, previousPosition)) {
    return pointInformation.right;
  }
  if (isConnection("top", pointInformation, previousPosition)) {
    return pointInformation.top;
  }
  if (isConnection("bottom", pointInformation, previousPosition)) {
    return pointInformation.bottom;
  }
  return null;
};

const isConnection = (
  direction: Direction,
  pointInformation: PointInformation,
  previousPosition: Position | null
) =>
  pointInformation.connections[direction] &&
  !isSamePosition(previousPosition, pointInformation[direction]);

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

const getPipeConnections = (area: Point[][], point: Point) => {
  const connections = {
    top: false,
    bottom: false,
    left: false,
    right: false,
  };
  switch (point.value) {
    case ".":
      return connections;
    case "|":
      return {
        ...connections,
        top: hasConnection("top", area, point.top),
        bottom: hasConnection("bottom", area, point.bottom),
      };
    case "-":
      return {
        ...connections,
        left: hasConnection("left", area, point.left),
        right: hasConnection("right", area, point.right),
      };
    case "L":
      return {
        ...connections,
        top: hasConnection("top", area, point.top),
        right: hasConnection("right", area, point.right),
      };
    case "J":
      return {
        ...connections,
        top: hasConnection("top", area, point.top),
        left: hasConnection("left", area, point.left),
      };
    case "7":
      return {
        ...connections,
        bottom: hasConnection("bottom", area, point.bottom),
        left: hasConnection("left", area, point.left),
      };
    case "F":
      return {
        ...connections,
        bottom: hasConnection("bottom", area, point.bottom),
        right: hasConnection("right", area, point.right),
      };
    case "S":
      return {
        top: hasConnection("top", area, point.top),
        bottom: hasConnection("bottom", area, point.bottom),
        left: hasConnection("left", area, point.left),
        right: hasConnection("right", area, point.right),
      };
    default:
      throw new Error("unhandled case");
  }
};

const hasConnection = (
  type: Direction,
  area: Point[][],
  position: Position | null
) => {
  const possibleConnections = ["S"];
  switch (type) {
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
  return position &&
    possibleConnections.includes(
      area[position.lineIndex][position.columnIndex].value
    )
    ? true
    : false;
};
