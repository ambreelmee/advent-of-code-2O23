interface Race {
  time: number;
  distance: number;
}

export const getAllPossibilitiesToWin = (races:Race[]) => 
    races.reduce((possibilities,race) => possibilities * getWinningRaceCount(race), 1)


const getWinningRaceCount = (race: Race) => {
  let buttonHeld = 0;
  let winningCombinationCount = 0;
  while (buttonHeld < race.time) {
    const distance = calculateDistance(buttonHeld, race.time - buttonHeld);
    if (distance > race.distance) {
      winningCombinationCount++;
    }
    buttonHeld++;
  }
  return winningCombinationCount;
};

const calculateDistance = (velocity: number, time: number) => velocity * time;

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
