type Pipe = "|" | "-" | "L" | "J" | "7" | "F" | "S";
type Ground = ".";
type Tile = Pipe | Ground;

type Direction = "top" | "bottom" | "left" | "right";
type Position = {
  lineIndex: number;
  columnIndex: number;
};
type DirectionPosition = Record<Direction, Position | null>;

type Point = DirectionPosition & { value: Tile };
type PointInformation = Point & {
  connections: Record<Direction, boolean>;
};
type Area = PointInformation[][];

export const formatData = (input: string[]): Area => {
  const area = input.map((line, lineIndex) =>
    line.split("").map((point, pointIndex) => {
      const pointInformation = {
        value: point as Tile,
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


export const findLoopWithoutRecurrence = (area: Area) => {
  const SPosition = findSPosition(area);
  const SPointInformation = area[SPosition.lineIndex][SPosition.columnIndex];
  const loopPositions = [SPosition] as Position[];
  let nextPosition = getNextPosition(SPointInformation, null);
  while (!isSamePosition(nextPosition, SPosition)) {
    if (nextPosition === null) {
      return loopPositions;
    }
    loopPositions.push(nextPosition);
    const currentPointInformation =
      area[nextPosition.lineIndex][nextPosition.columnIndex];
    nextPosition = getNextPosition(
      currentPointInformation,
      loopPositions[loopPositions.length - 2]
    );
  }
  return loopPositions;
};


export let stepCount = 0;

//for some reason it's not working on the input
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
  const nextDirection = Object.entries(pointInformation.connections)
    .filter(([, value]) => value)
    .map(([string]) => string as Direction)
    .find((direction) =>
      isConnection(direction, pointInformation, previousPosition)
    );
  return nextDirection ? pointInformation[nextDirection] : null;
};

const isConnection = (
  direction: Direction,
  pointInformation: PointInformation,
  previousPosition: Position | null
) => {
  return (
    pointInformation.connections[direction] &&
    !isSamePosition(previousPosition, pointInformation[direction])
  );
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
