import { Universe, getPlanetsPositions, transposeArray } from "./utils";

export const formatData = (data: string[]) =>
  data.map((line) => line.split(""));

export const getPlanetPositionsWithUniverseExpansion = (universe: Universe) => {
  const planetsPositions = getPlanetsPositions(universe);

  const emptyLineIndexes = getEmptyLineIndexes(universe);

  const emptyColumnIndexes = getEmptyLineIndexes(transposeArray(universe));


  return planetsPositions.map(({ lineIndex, columnIndex }) => ({
    lineIndex: getIndexAfterUniverseExpansion(lineIndex, emptyLineIndexes),
    columnIndex: getIndexAfterUniverseExpansion(
      columnIndex,
      emptyColumnIndexes
    ),
  }));
};

const getEmptyLineIndexes = (universe: Universe) =>
  universe.reduce((emptyLineIndexes, line, lineIndex) => {
    if (isLineEmpty(line)) {
      return [...emptyLineIndexes, lineIndex];
    }
    return emptyLineIndexes;
  }, [] as number[]);

const isLineEmpty = (line: string[]) => line.every((item) => item === ".");

const getIndexAfterUniverseExpansion = (
  index: number,
  emptyIndexes: number[]
) => {
  const emptyLinesBeforeIndex = emptyIndexes.filter(
    (emptyIndex) => emptyIndex < index
  ).length;
  if (emptyLinesBeforeIndex) {
    return index + emptyLinesBeforeIndex * (1000000 - 1);
  }
  return index;
};
