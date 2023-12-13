type Universe = string[][];
interface Position {
  lineIndex: number;
  columnIndex: number;
}

export const getShortestPath = (universe: Universe) => {
  const planetsPosition = getPlanetsPositions(universe);
  const allPaths = planetsPosition.reduce(
    (shortestPathsBetweenPairs, originPlanet, planetIndex) => [
      ...shortestPathsBetweenPairs,
      ...planetsPosition
        .slice(planetIndex + 1)
        .map((targetPlanet) => getShortestDistance(originPlanet, targetPlanet)),
    ],
    [] as number[]
  );
  return allPaths.reduce((sum, distance) => sum + distance, 0)
};

const getShortestDistance = (planet1: Position, planet2: Position) => {
  return (
    Math.abs(planet2.columnIndex - planet1.columnIndex) +
    Math.abs(planet2.lineIndex - planet1.lineIndex)
  );
};

const getPlanetsPositions = (universe: Universe) => {
  const planetsPosition: Position[] = [];
  universe.forEach((line, lineIndex) => {
    line.forEach((point, columnIndex) => {
      if (point === "#") {
        planetsPosition.push({ columnIndex, lineIndex });
      }
    });
  });
  return planetsPosition;
};

export const addUniverseExpansion = (data: string[]) => {
  const formattedData = data.map((line) => line.split(""));
  const withHorizontalExpansion = doubleEmptyLines(formattedData);

  return transposeArray(
    doubleEmptyLines(transposeArray(withHorizontalExpansion))
  );
};

const doubleEmptyLines = (data: Universe) => {
  const dataWithExtraLines = [] as Universe;
  data.forEach((line) => {
    dataWithExtraLines.push(line);
    const isEmpty = new Set(line).size === 1;
    if (isEmpty) {
      dataWithExtraLines.push(line);
    }
  });
  return dataWithExtraLines;
};

const transposeArray = (array: Universe) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
