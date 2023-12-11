export const addUniverseExpansion = (data: string[]) => {
  const formattedData = data.map((line) => line.split(""));
  const withHorizontalExpansion = doubleEmptyLines(formattedData);

  return transposeArray(
    doubleEmptyLines(transposeArray(withHorizontalExpansion))
  );
};

const doubleEmptyLines = (data: string[][]) => {
  const dataWithExtraLines = [] as string[][];
  data.forEach((line) => {
    dataWithExtraLines.push(line);
    const isEmpty = new Set(line).size === 1;
    if (isEmpty) {
      dataWithExtraLines.push(line);
    }
  });
  return dataWithExtraLines;
};

const transposeArray = (array: string[][]) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
