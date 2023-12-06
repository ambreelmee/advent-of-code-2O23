export interface Mapping {
  sourceStart: number;
  destinationStart: number;
  range: number;
}

export const formatCategories = (input: string[]) => {
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

export const formatSeed = (seeds: string) =>
  seeds
    .split(":")[1]
    .split(" ")
    .filter((value) => value !== "")
    .map((value) => Number(value));
