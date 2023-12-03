const maximums = {
  red: 12,
  green: 13,
  blue: 14,
};

export type Color = "red" | "blue" | "green";

interface Item {
  color: Color;
  value: number;
}
type Subset = Item[];
type Game = Subset[];

const getIsSubsetPossible = (subset: Subset) =>
  subset.every((item) => item.value <= maximums[item.color]);

const getIsGamePossible = (game: Game) =>
  game.every((subset) => getIsSubsetPossible(subset));

export const getSumOfPossibleGames = (games: Game[]) => {
  let sum = 0;
  games.forEach((game, index) => {
    if (getIsGamePossible(game)) {
      sum = sum + index + 1;
    }
  });
  return sum;
};

const getMinNumberOfEachColorPerGame = (game: Game) => {
  const min = {
    red: 0,
    green: 0,
    blue: 0,
  };
  game.forEach((subset) =>
    subset.forEach((item) => {
      if (item.value > min[item.color]) {
        min[item.color] = item.value;
      }
    })
  );
  return min;
};

const getGamePower = (game: Game) => {
  const mins = getMinNumberOfEachColorPerGame(game);
  return mins.red * mins.green * mins.blue;
};

export const getAllGamePower = (games: Game[]) => {
  let sum = 0;
  games.forEach((game) => {
    sum = sum + getGamePower(game);
  });
  return sum;
};
