import { Area, Point, Position, findLoop, isSamePosition } from "./utils";

export const countNestedTiles = (data: Area) => {
  const loop = findLoop(data);
  console.log({ loop });
  const innerTiles = [] as Position[];
  data.forEach((line) => {
    const linePointsInLoop = [] as Point[];
    line.forEach((point) => {
      if (
        loop.some((loopPosition) =>
          isSamePosition(loopPosition, point.position)
        )
      ) {
        linePointsInLoop.push(point);
      }
    });
    line.forEach(({ position }, columnIndex) => {
      const loopItemBefore = linePointsInLoop.filter(
        (point) => point.position.columnIndex < columnIndex
      );
      if (
        getIsLoopOpen(loopItemBefore) &&
        !linePointsInLoop.find(
          (point) => point.position.columnIndex === columnIndex
        )
      ) {
        innerTiles.push(position);
      }
    });
  });
  return innerTiles;
};

const getIsLoopOpen = (loopItemBefore: Point[]) => {
  let isLoopOpen = false;
  loopItemBefore.filter((point) => point.value !== "-");
  const filteredLoop = loopItemBefore.filter((point) => point.value !== "-");
  filteredLoop.forEach((point, index) => {
    const isPipe = point.value === "|";
    const isS = point.value === "S";
    const isFJ =
      point.value === "F" &&
      filteredLoop[index + 1] &&
      filteredLoop[index + 1].value === "J";
    const isL7 =
      point.value === "L" &&
      filteredLoop[index + 1] &&
      filteredLoop[index + 1].value === "7";

    if (isPipe || isS || isFJ || isL7) {
      isLoopOpen = !isLoopOpen;
    }
  });
  return isLoopOpen;
};
