import { Race, getWinningRaceCount } from "./utils";

export const getAllPossibilitiesToWin = (races: Race[]) =>
  races.reduce(
    (possibilities, race) => possibilities * getWinningRaceCount(race),
    1
  );

export const formatData = (input: string[]) => {
  const totalRaces = {
    time: formatRaces(input[0]),
    distance: formatRaces(input[1]),
  };
  return totalRaces.time.map((time, index) => ({
    time,
    distance: totalRaces.distance[index],
  }));
};

const formatRaces = (race: string) =>
  race
    .split(":")[1]
    .split(" ")
    .filter((value) => value !== "")
    .map((value) => Number(value));
