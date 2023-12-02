const matching = [
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
];

interface ReducerArg {
  min: number;
  max: number;
  minIndex: number | null;
  maxIndex: number | null;
}

const replaceLettersByDigit = (text: string): string => {
  const spelledNumberPositionInText = matching.map(([spelledNumber]) => [
    text.indexOf(spelledNumber),
    text.lastIndexOf(spelledNumber),
  ]);

  const digits = matching.map(([, digits]) => digits);

  const firstDigitPosition = text
    .split("")
    .findIndex((character: string) => digits.includes(character));

  const defaultValue: ReducerArg = {
    min:
      firstDigitPosition === -1
        ? spelledNumberPositionInText.length
        : firstDigitPosition,
    max: 0,
    minIndex: null,
    maxIndex: null,
  };

  const { minIndex, maxIndex } = spelledNumberPositionInText.reduce(
    ({ min, max, minIndex, maxIndex }: ReducerArg, positions, index) => {
      const isMin = positions[0] >= 0 && positions[0] < min;
      const isMax = positions[1] > max;
      return {
        min: isMin ? positions[0] : min,
        minIndex: isMin ? index : minIndex,
        max: isMax ? positions[1] : max,
        maxIndex: isMax ? index : maxIndex,
      };
    },
    defaultValue
  );
  const updatedText =
    minIndex !== null
      ? text.replace(`${matching[minIndex][0]}`, `${matching[minIndex][1]}`)
      : text;
  return maxIndex !== null
    ? updatedText.replaceAll(
        `${matching[maxIndex][0]}`,
        `${matching[maxIndex][1]}`
      )
    : updatedText;
};

export const getCalibrationValues = (text: string) => {
  const formattedText = replaceLettersByDigit(text);
  const lettersAndDigits = formattedText.split("");
  const digitsOnly = lettersAndDigits.filter(
    (character) => !isNaN(Number(character))
  );
  if (digitsOnly.length === 0) {
    throw new Error(`text ${text} does not contain any number`);
  }
  const firstAndLastDigit = [digitsOnly[0], digitsOnly.pop()];
  return Number(firstAndLastDigit.join(""));
};
