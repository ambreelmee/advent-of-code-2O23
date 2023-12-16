export const formatData = (input: string[]) => {
  return input
    .join("j")
    .split("jj")
    .map((pattern) => pattern.split("j"));
};

export const getSummary = (patterns: string[][]) => {
  return patterns.reduce(
    (sum, pattern) => findLineOfReflection(pattern) + sum,
    0
  );
};

const findLineOfReflection = (pattern: string[]) => {
  const horizontalLine = findHorizontalReflection(pattern);
  if (horizontalLine) {
    return 100 * horizontalLine;
  }
  const verticalLine = findHorizontalReflection(transposeArray(pattern));
  return verticalLine!;
};

const findHorizontalReflection = (pattern: string[]) => {
  const uniqueRows = new Set(pattern);
  if (uniqueRows.size === pattern.length) {
    console.log("no horizontal reflection");
    return null;
  }
  let index = 0;
  while (index < pattern.length - 1) {
    if (pattern[index] === pattern[index + 1]) {
      console.log("equality");
      if (isLineOfReflection(pattern, index)) {
        return index + 1;
      }
    }
    index++;
  }
  return null;
};

const isLineOfReflection = (pattern: string[], index: number) => {
  const mirrorLength = Math.min(index + 1, pattern.length - index - 1);
  const firstPart = pattern.slice(index + 1 - mirrorLength, index + 1);
  const secondPart = pattern
    .slice(index + 1, index + 1 + mirrorLength)
    .reverse();
  console.log({ pattern, firstPart, secondPart });
  return firstPart.every((element, index) => element === secondPart[index]);
};

export const transposeArray = (pattern: string[]) =>
  pattern[0]
    .split("")
    .map((_, colIndex) => pattern.map((row) => row[colIndex]).join(""));
