import { getNextSubsequence, isZeroSequence } from "./utils";

export const getSumOfAllNextValues = (sequences: number[][]) =>
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

const getLastElement = (sequence: number[]) => sequence[sequence.length - 1];
