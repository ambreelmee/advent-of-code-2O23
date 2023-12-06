import { Mapping, formatCategories, formatSeed } from "./utils";

interface SeedRange {
  start: number;
  range: number;
}

export const formatDataPart2 = (input: string[]) => {
  return {
    seeds: formatSeedPart2(input[0]),
    categories: formatCategories(input),
  };
};

const formatSeedPart2 = (rawSeeds: string) => {
  const formattedSeeds = formatSeed(rawSeeds);
  const seedRanges = [] as SeedRange[];
  let index = 0;
  while (index < formattedSeeds.length) {
    const startSeed = formattedSeeds[index];
    const range = formattedSeeds[index + 1];

    seedRanges.push({ start: startSeed, range });
    index += 2;
  }
  return seedRanges;
};

export const getLowestLocationNumberForSeedPart2 = (
  seedRanges: SeedRange[],
  categories: Record<string, Mapping[]>
) =>
  Math.min(
    ...seedRanges.map((range) =>
      getLowestLocationNumberForSeedRange(range, categories)
    )
  );

const getLowestLocationNumberForSeedRange = (
  seedRange: SeedRange,
  categories: Record<string, Mapping[]>
) => {
  const allRanges = Object.values(categories).reduce(
    (ranges, categoryMapping) => {
      return ranges
        .map((range) => getCategoryDestinationRange(range, categoryMapping))
        .flat();
    },
    [seedRange]
  );
  console.log({ allRanges });
  return Math.min(...allRanges.map(({ start }) => start));
};

const getCategoryDestinationRange = (
  seedRange: SeedRange,
  categoriesMapping: Mapping[]
) => {
  const ranges = [];
  for (const mapping of categoriesMapping) {
    const seedRangeEnd = seedRange.start + seedRange.range;
    const mappingEnd = mapping.sourceStart + mapping.range;
    if (seedRange.start < mapping.sourceStart) {
      if (seedRangeEnd >= mapping.sourceStart) {
        const seedRangePreMapping = mapping.sourceStart - seedRange.start;
        ranges.push({
          start: seedRange.start,
          range: seedRangePreMapping,
        });
        const subRange = seedRangeEnd - mapping.sourceStart;
        const seedRangePostMapping =
          seedRange.range - subRange - seedRangePreMapping;
        if (seedRangePostMapping > 0) {
          ranges.push({
            start: mapping.sourceStart + mapping.range,
            range: seedRangePostMapping,
          });
        }
        ranges.push({
          start: mapping.destinationStart,
          range: subRange,
        });
      }
    }
    if (seedRange.start >= mapping.sourceStart) {
      if (seedRange.start < mappingEnd) {
        const subRange = mappingEnd - seedRange.start;
        if (subRange < seedRange.range) {
          ranges.push({
            start: seedRange.start + subRange,
            range: seedRange.range - subRange,
          });
        }
        ranges.push({
          start:
            mapping.destinationStart - mapping.sourceStart + seedRange.start,
          range: Math.min(subRange, seedRange.range),
        });
      }
    }
  }
  return ranges.length ? ranges : [seedRange];
};
