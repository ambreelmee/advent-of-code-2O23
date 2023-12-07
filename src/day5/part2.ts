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
): SeedRange[] => {
  if (categoriesMapping.length === 0) {
    return [seedRange];
  }
  const ranges = [] as SeedRange[];
  const [firstMapping, ...otherMappings] = categoriesMapping;
  const seedRangeEnd = seedRange.start + seedRange.range;
  const mappingEnd = firstMapping.sourceStart + firstMapping.range;
  if (seedRange.start < firstMapping.sourceStart) {
    if (seedRangeEnd >= firstMapping.sourceStart) {
      const subRange = seedRangeEnd - firstMapping.sourceStart;

      ranges.push({
        start: firstMapping.destinationStart,
        range: subRange,
      });
      const seedRangePreMapping = firstMapping.sourceStart - seedRange.start;
      ranges.push(
        ...getCategoryDestinationRange(
          {
            start: seedRange.start,
            range: seedRangePreMapping,
          },
          otherMappings
        )
      );
      const seedRangePostMapping =
        seedRange.range - subRange - seedRangePreMapping;
      if (seedRangePostMapping > 0) {
        ranges.push(
          ...getCategoryDestinationRange(
            {
              start: firstMapping.sourceStart + firstMapping.range,
              range: seedRangePostMapping,
            },
            otherMappings
          )
        );
      }
    }
  } else if (seedRange.start < mappingEnd) {
    const subRange = mappingEnd - seedRange.start;
    ranges.push({
      start:
        firstMapping.destinationStart -
        firstMapping.sourceStart +
        seedRange.start,
      range: Math.min(subRange, seedRange.range),
    });
    const postMappingRange = seedRangeEnd - mappingEnd;
    if (postMappingRange > 0) {
      ranges.push(
        ...getCategoryDestinationRange(
          {
            start: mappingEnd,
            range: postMappingRange,
          },
          otherMappings
        )
      );
    }
  }
  console.log(ranges);
  return ranges.length > 0 ? ranges : [seedRange];
};
