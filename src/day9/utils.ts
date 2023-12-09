export const formatData = (input: string[]) =>
  input.map((sequence) => sequence.split(" ").map((number) => Number(number)));

export const getSumOfAllNextValue = (sequences: number[][]) =>
  sequences.reduce((sum, sequence) => sum + findNextNumber(sequence), 0);

const findNextNumber = (sequence: number[]) => {
  let nextNumber = 0;
  let nextSubSequence = sequence;
  while (!isZeroSequence(nextSubSequence)) {
    nextNumber = nextNumber + getLastElement(nextSubSequence);
    nextSubSequence = getNextSubsequence(nextSubSequence);
  }
  return nextNumber;
};

const getNextSubsequence = (sequence: number[]) =>
  sequence.reduce((subsequence, number, index) => {
    if (index < sequence.length - 1) {
      return [...subsequence, sequence[index + 1] - number];
    }
    return subsequence;
  }, [] as number[]);

const getLastElement = (sequence: number[]) => sequence[sequence.length - 1];

const isZeroSequence = (sequence: number[]) =>
  sequence.every((number) => number === 0);
