type SpringCondition = "." | "#" | "?";

export interface Springs {
  conditions: string[];
  damagedGroups: number[];
}

export const formatData = (input: string[]) =>
  input.map((row) => {
    const [conditions, damagedGroups] = row.split(" ");
    return {
      conditions: conditions.split(""),
      damagedGroups: damagedGroups.split(",").map((value) => Number(value)),
    };
  });

export const getTotalNumberOfArrangements = (allSPrings: Springs[]) => {
  return allSPrings.reduce((sum, springs) => {
    return (
      sum + getPossibleArrangements(springs.conditions, springs.damagedGroups)
    );
  }, 0);
};

export const getPossibleArrangements = (
  conditions: string[],
  damagedGroups: number[]
) => {
  const allArrangements = generateAllConditions(conditions);
  return allArrangements.filter((arrangement) =>
    isArrangementValid(arrangement, damagedGroups)
  ).length;
};

export const generateAllConditions = (conditions: string[]) => {
  return conditions.reduce(
    (possibleConditions, condition) => {
      if (condition === "?") {
        return possibleConditions
          .map((possibleCondition) => [
            [...possibleCondition, "#"],
            [...possibleCondition, "."],
          ])
          .flat();
      }
      return possibleConditions.map((possibleCondition) => [
        ...possibleCondition,
        condition,
      ]);
    },
    [[]] as string[][]
  );
};

export const isArrangementValid = (
  conditions: string[],
  damagedGroups: number[]
) => {
  const groups = getGroup(conditions);
  return (
    groups.length == damagedGroups.length &&
    groups.every((group, index) => group === damagedGroups[index])
  );
};

const getGroup = (conditions: string[]) => {
  return conditions
    .join("")
    .split(".")
    .filter((group) => group !== "")
    .map((value) => value.length);
};
