import { Mapping, formatCategories, formatSeed } from "./utils";

export const formatDataPart1 = (input: string[]) => {
  return {
    seeds: formatSeed(input[0]),
    categories: formatCategories(input),
  };
};

export const getLowestLocationNumberForSeedPart1 = (
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
