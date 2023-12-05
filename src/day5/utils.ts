interface Mapping {
  sourceStart: number;
  destinationStart: number;
  range: number;
}

export const getLowestLocationNumberForSeed = (
  seeds: number[],
  categories: Record<string, Mapping[]>
) => Math.min(...seeds.map((seed) => getLocationNumber(seed, categories)));

const getLocationNumber = (
  sourceNumber: number,
  categories: Record<string, Mapping[]>
) =>
  Object.values(categories).reduce(
    (number, categoryMappings) =>
      getCategoryDestinationNumber(number, categoryMappings),
    sourceNumber
  );

const getCategoryDestinationNumber = (
  sourceNumber: number,
  categoryMappings: Mapping[]
) => {
  for (const mapping of categoryMappings) {
    if (
      sourceNumber >= mapping.sourceStart &&
      sourceNumber < mapping.sourceStart + mapping.range
    ) {
      return mapping.destinationStart + sourceNumber - mapping.sourceStart;
    }
  }
  return sourceNumber;
};

export const formatData = (input: string[]) => {
  const seeds = input[0]
    .split(":")[1]
    .split(" ")
    .filter((value) => value !== "")
    .map((value) => Number(value));
  const categories = {} as Record<string, Mapping[]>;
  let index = 0;
  while (index < input.length) {
    if (input[index].includes("map")) {
      const categoryName = input[index].split(" ")[0];
      categories[categoryName] = [];
      let categoryIndex = index + 1;
      while (
        categoryIndex < input.length &&
        !input[categoryIndex].includes("map")
      ) {
        const values = input[categoryIndex]
          .split(" ")
          .map((value) => Number(value));

        categories[categoryName].push({
          destinationStart: values[0],
          sourceStart: values[1],
          range: values[2],
        });
        categoryIndex++;
      }
      index = categoryIndex - 1;
    }
    index++;
  }
  return { seeds, categories };
};
