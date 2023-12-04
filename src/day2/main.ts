import { readTextFile } from "../utils";
import { Color, getAllGamePower, getSumOfPossibleGames } from "./utils";

const formatData = (input: string[]) => {
  const inputWithoutGameId = input.map((game) => game.split(":")[1]);
  const gameSets = inputWithoutGameId.map((game) => game.split(";"));
  return gameSets.map((sets) =>
    sets.map((subset) =>
      subset.split(",").map((subset) => ({
        color: subset.split(" ")[2] as Color,
        value: Number(subset.split(" ")[1]),
      }))
    )
  );
};

const main = () => {
  const input = readTextFile(2, "input");

  const formattedData = formatData(input);
  const total = getSumOfPossibleGames(formattedData);
  const power = getAllGamePower(formattedData);

  console.log(power);
};

main();
