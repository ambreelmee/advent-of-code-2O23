import { getNextSubsequence, isZeroSequence } from "./utils";

export const getSumOfAllPreviousValues = (sequences: number[][]) =>
  sequences.reduce((sum, sequence) => sum + findPreviousNumber(sequence), 0);

const findPreviousNumber = (sequence: number[]) => {
  let nextNumber = sequence[0];
  let nextSubSequence = sequence;
  let shouldAdd = false;
  while (!isZeroSequence(nextSubSequence)) {
    nextSubSequence = getNextSubsequence(nextSubSequence);
    if (shouldAdd) {
      nextNumber = nextNumber + nextSubSequence[0];
    } else {
      nextNumber = nextNumber - nextSubSequence[0];
    }
    shouldAdd = !shouldAdd;
  }
  console.log(nextNumber);
  return nextNumber;
};
