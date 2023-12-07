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
  return Math.min(...allRanges.map(({ start }) => start));
};

const getCategoryDestinationRange = (
  seedRange: SeedRange,
  categoriesMapping: Mapping[]
): SeedRange[] => {
  if (categoriesMapping.length === 0) {
    return [seedRange];
  }
  const [firstMapping, ...otherMappings] = categoriesMapping;
  const seedRangeEnd = seedRange.start + seedRange.range;
  const mappingEnd = firstMapping.sourceStart + firstMapping.range;
  if (
    seedRange.start < firstMapping.sourceStart &&
    seedRangeEnd >= firstMapping.sourceStart
  ) {
    const subRange = seedRangeEnd - firstMapping.sourceStart;
    const seedRangePreMapping = firstMapping.sourceStart - seedRange.start;
    const seedRangePostMapping =
      seedRange.range - subRange - seedRangePreMapping;
    return [
      {
        start: firstMapping.destinationStart,
        range: subRange,
      },
      ...getCategoryDestinationRange(
        {
          start: seedRange.start,
          range: seedRangePreMapping,
        },
        otherMappings
      ),
      ...(seedRangePostMapping > 0
        ? getCategoryDestinationRange(
            {
              start: firstMapping.sourceStart + firstMapping.range,
              range: seedRangePostMapping,
            },
            otherMappings
          )
        : []),
    ];
  }
  if (
    seedRange.start >= firstMapping.sourceStart &&
    seedRange.start < mappingEnd
  ) {
    const subRange = mappingEnd - seedRange.start;
    const postMappingRange = seedRangeEnd - mappingEnd;
    return [
      {
        start:
          firstMapping.destinationStart -
          firstMapping.sourceStart +
          seedRange.start,
        range: Math.min(subRange, seedRange.range),
      },
      ...(postMappingRange > 0
        ? getCategoryDestinationRange(
            {
              start: mappingEnd,
              range: postMappingRange,
            },
            otherMappings
          )
        : []),
    ];
  }
  return getCategoryDestinationRange(seedRange, otherMappings);
};
