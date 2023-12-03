import fs from "fs";
import path from "path";

import { fileURLToPath } from "url";
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
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const input = fs
    .readFileSync(path.join(__dirname, "./input.txt"))
    .toString()
    .split("\n")
    .filter((game) => game !== "");

  const formattedData = formatData(input);
  const total = getSumOfPossibleGames(formattedData);
  const power = getAllGamePower(formattedData);

  console.log(power);
};

main();
