export const formatData = (input: string[]) => {
  return {
    time: formatRaces(input[0]),
    distance: formatRaces(input[1]),
  };
};

const formatRaces = (race: string) =>
  Number(race.split(":")[1].replaceAll(" ", ""));
