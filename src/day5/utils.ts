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

export const formatData = (problemPart: "1" | "2", input: string[]) => {
  const seedFormattingFunction =
    problemPart === "1" ? formatSeedPart1 : formatSeedPart2;
  return {
    seeds: seedFormattingFunction(input[0]),
    categories: formatCategories(input),
  };
};

const formatSeedPart2 = (seedRanges: string) => {
  const rawSeeds = formatSeedPart1(seedRanges);
  const seeds = [];
  let index = 0;
  while (index < rawSeeds.length) {
    const startSeed = rawSeeds[index];
    const range = rawSeeds[index + 1];
    const seedsToAdd = new Array(range)
      .fill(0)
      .map((_, index) => index + startSeed);
    seeds.push(...seedsToAdd);
    index += 2;
  }
  return seeds;
};

const formatCategories = (input: string[]) => {
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
  return categories;
};

const formatSeedPart1 = (seeds: string) =>
  seeds
    .split(":")[1]
    .split(" ")
    .filter((value) => value !== "")
    .map((value) => Number(value));
