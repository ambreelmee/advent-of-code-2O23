const getSymbols = (data: string[]) =>
  new Set(
    data
      .join(",")
      .split("")
      .filter(
        (character) =>
          isNaN(Number(character)) && ![".", ","].includes(character)
      )
  );

export const getSumOfValidNumbers = (data: string[]) => {
  const symbols = getSymbols(data);
  let sum = 0;
  data.forEach((line, lineIndex) => {
    let characterIndex = 0;
    while (characterIndex < line.length) {
      if (isNaN(Number(line[characterIndex]))) {
        characterIndex++;
        continue;
      }
      const { numberToAdd, firstIndexToCheck, lastIndexToCheck } =
        getNumberAndIndexes(line, characterIndex);

      const valuesToCheck = aggregateAllValuesToCheck(
        data,
        lineIndex,
        firstIndexToCheck,
        lastIndexToCheck
      );
      const isValidNumber = valuesToCheck.some((value) => symbols.has(value));
      if (isValidNumber) {
        sum = sum + numberToAdd;
      }
      characterIndex = lastIndexToCheck;
    }
  });
  return sum;
};

const aggregateAllValuesToCheck = (
  data: string[],
  lineIndex: number,
  firstIndexToCheck: number,
  lastIndexToCheck: number
) => {
  const valuesToCheckInPreviousLine =
    lineIndex > 0
      ? data[lineIndex - 1].slice(firstIndexToCheck, lastIndexToCheck).split("")
      : [];

  const valuesToCheckInNextLine =
    lineIndex < data.length - 1
      ? data[lineIndex + 1].slice(firstIndexToCheck, lastIndexToCheck).split("")
      : [];

  return [
    ...valuesToCheckInPreviousLine,
    ...data[lineIndex].slice(firstIndexToCheck, lastIndexToCheck),
    ...valuesToCheckInNextLine,
  ];
};

const getStarCoordinates = (data: string[]) => {
  const coordinates = {} as any;
  data.forEach((line, lineIndex) => {
    line.split("").forEach((character, characterIndex) => {
      if (character === "*") {
        coordinates[`${lineIndex},${characterIndex}`] = [];
      }
    });
  });
  return coordinates;
};

export const getGearRatio = (data: string[]) => {
  const starCoordinates = getStarCoordinates(data);
  data.forEach((line, lineIndex) => {
    let characterIndex = 0;
    while (characterIndex < line.length) {
      if (isNaN(Number(line[characterIndex]))) {
        characterIndex++;
        continue;
      }
      const { numberToAdd, firstIndexToCheck, lastIndexToCheck } =
        getNumberAndIndexes(line, characterIndex);
      const starCoordinatesForNumber = getStarCoordinatesForNumber(
        data,
        line,
        lineIndex,
        firstIndexToCheck,
        lastIndexToCheck
      );
      starCoordinatesForNumber.forEach((coordinates) => {
        starCoordinates[coordinates].push(numberToAdd);
      });
      characterIndex = lastIndexToCheck;
    }
  });
  const gearsRatio = Object.values(starCoordinates)
    .filter((numbers: any) => numbers.length === 2)
    .map((numbers: any) => numbers[0] * numbers[1]);
  let sum = 0;
  gearsRatio.forEach((ratio) => {
    sum += ratio;
  });
  return sum;
};

const getStarCoordinatesForNumber = (
  data: string[],
  line: string,
  lineIndex: number,
  firstIndexToCheck: number,
  lastIndexToCheck: number
) => {
  const result = [];
  const previousLineStarRelativeIndex =
    lineIndex > 0
      ? getStarIndexInLine(
          data[lineIndex - 1],
          firstIndexToCheck,
          lastIndexToCheck
        )
      : -1;

  const nextLineStartRelativeIndex =
    lineIndex < data.length - 1
      ? getStarIndexInLine(
          data[lineIndex + 1],
          firstIndexToCheck,
          lastIndexToCheck
        )
      : -1;

  if (previousLineStarRelativeIndex >= 0) {
    result.push(
      `${lineIndex - 1},${previousLineStarRelativeIndex + firstIndexToCheck}`
    );
  }
  if (nextLineStartRelativeIndex >= 0) {
    result.push(
      `${lineIndex + 1},${nextLineStartRelativeIndex + firstIndexToCheck}`
    );
  }
  if (line[firstIndexToCheck] === "*") {
    result.push(`${lineIndex},${firstIndexToCheck}`);
  }
  if (line[lastIndexToCheck - 1] === "*") {
    result.push(`${lineIndex},${lastIndexToCheck - 1}`);
  }
  return result;
};

const getNumberAndIndexes = (line: string, startingIndex: number) => {
  let currentIndex = startingIndex;
  const firstIndexToCheck =
    startingIndex > 0 ? startingIndex - 1 : startingIndex;
  while (!isNaN(Number(line[currentIndex]))) {
    currentIndex++;
  }
  const lastIndexToCheck = currentIndex + 1;
  return {
    firstIndexToCheck: startingIndex > 0 ? startingIndex - 1 : startingIndex,
    lastIndexToCheck: currentIndex + 1,
    numberToAdd: Number(line.slice(startingIndex, lastIndexToCheck - 1)),
  };
};

const getStarIndexInLine = (
  line: string,
  firstIndexToCheck: number,
  lastIndexToCheck: number
) => line.slice(firstIndexToCheck, lastIndexToCheck).split("").indexOf("*");
