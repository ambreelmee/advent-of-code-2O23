import { readTextFile } from "../utils";
import { formatDataPart2, orderedCardPart2 } from "./part2";
import { getTotalWinning, orderHands } from "./utils";

const main = () => {
  const input = readTextFile(7, "input");
  const hands = formatDataPart2(input);
  const orderedHands = orderHands(hands, orderedCardPart2);
  const result = getTotalWinning(orderedHands);
  console.log({
    hands,
    orderedHands: orderedHands.map(({ hand }) => hand),
    result,
  });
};

main();
