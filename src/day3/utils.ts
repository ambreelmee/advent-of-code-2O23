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
      let currentIndex = characterIndex;
      const firstIndexToCheck =
        characterIndex > 0 ? characterIndex - 1 : characterIndex;
      while (!isNaN(Number(line[currentIndex]))) {
        currentIndex++;
      }
      const lastIndexToCheck = currentIndex + 1;
      const valuesToCheck = getValuesToCheck(
        data,
        lineIndex,
        firstIndexToCheck,
        lastIndexToCheck
      );
      const isValidNumber = valuesToCheck.some((value) => symbols.has(value));
      if (isValidNumber) {
        const numberToAdd = Number(
          line.slice(characterIndex, lastIndexToCheck - 1)
        );
        sum = sum + numberToAdd;
      }
      characterIndex = lastIndexToCheck;
    }
  });
  return sum;
};

const getValuesToCheck = (
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
