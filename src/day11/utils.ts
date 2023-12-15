export type Universe = string[][];
export interface Position {
  lineIndex: number;
  columnIndex: number;
}

export const getShortestPath = (planetsPosition: Position[]) => {
  const allPaths = planetsPosition.reduce(
    (shortestPathsBetweenPairs, originPlanet, planetIndex) => [
      ...shortestPathsBetweenPairs,
      ...planetsPosition
        .slice(planetIndex)
        .map((targetPlanet) => getShortestDistance(originPlanet, targetPlanet)),
    ],
    [] as number[]
  );
  return allPaths.reduce((sum, distance) => sum + distance, 0);
};

const getShortestDistance = (planet1: Position, planet2: Position) => {
  return (
    Math.abs(planet2.columnIndex - planet1.columnIndex) +
    Math.abs(planet2.lineIndex - planet1.lineIndex)
  );
};

export const getPlanetsPositions = (universe: Universe) => {
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

export const transposeArray = (array: Universe) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
