export const formatData = (input: string[]) =>
  input.map((sequence) => sequence.split(" ").map((number) => Number(number)));

export const getNextSubsequence = (sequence: number[]) =>
  sequence.reduce((subsequence, number, index) => {
    if (index < sequence.length - 1) {
      return [...subsequence, sequence[index + 1] - number];
    }
    return subsequence;
  }, [] as number[]);

export const isZeroSequence = (sequence: number[]) =>
  sequence.every((number) => number === 0);
