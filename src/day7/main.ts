import { readTextFile } from "../utils";
import { formatData, getTotalWinning, orderHands } from "./utils";

const main = () => {
  const input = readTextFile(7, "input");
  const hands = formatData(input);
  const orderedHands = orderHands(hands);
  const result = getTotalWinning(orderedHands);
  console.log({
    hands,
    orderedHands: orderedHands.map(({ hand }) => hand),
    result,
  });
};

main();
