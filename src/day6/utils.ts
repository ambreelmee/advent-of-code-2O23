export interface Race {
  time: number;
  distance: number;
}

export const getWinningRaceCount = (race: Race) => {
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
