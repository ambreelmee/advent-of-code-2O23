import { Springs, getPossibleArrangements } from "./utils";

export const getTotalNumberOfArrangementsPart2 = (allSPrings: Springs[]) => {
  return allSPrings.reduce((sum, springs) => {
    return sum + getUnfoldedPossibleArrangements(springs);
  }, 0);
};

const getUnfoldedPossibleArrangements = (springs: Springs) => {
  const basePossibleArrangements = getPossibleArrangements(
    springs.conditions,
    springs.damagedGroups
  );
  const lastValue = springs.conditions[springs.conditions.length - 1];
  const firstValue = springs.conditions[0];
  const unfoldedPossibleArrangements = getPossibleArrangements(
    [
      lastValue === "#" ? "." : "?",
      ...springs.conditions,
      firstValue === "#" ? "." : "?",
    ],
    springs.damagedGroups
  );
  // const firstPossibleArrangement = getPossibleArrangements(
  //   [...springs.conditions, "?"],
  //   springs.damagedGroups
  // );
  // const lastPossibleArrangement = getPossibleArrangements(
  //   ["?", ...springs.conditions],
  //   springs.damagedGroups
  // );

  const count =
    basePossibleArrangements * Math.pow(unfoldedPossibleArrangements, 4);
  console.log({
    count,
    basePossibleArrangements,
    unfoldedPossibleArrangements,
    firstValue,
    lastValue,
  });

  return count;
};

// Things I tried that worked on the example but not on the input:
// 10373458082190 too high basePossibleArrangements * Math.pow(unfoldedPossibleArrangements, 4)
// 11086654422244 too high firstPossibleArrangement *  Math.pow(unfoldedPossibleArrangements, 3) * lastPossibleArrangement
// 10730056252217 didn't try average of two formulas above
// 10332788787077 not right
// DIDN'T TRY 10333067553737 that could be the right answer => tried :'(
// 10319472592949
