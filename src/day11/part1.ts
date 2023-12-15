import { Universe, transposeArray } from "./utils";

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
