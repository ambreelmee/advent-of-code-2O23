import { readTextFile } from "../utils";
import { getAllCardsCount } from "./utils";

const main = () => {
  const input = readTextFile(4, "input");
  //   const result = getAllCardsValue(input);
  const result = getAllCardsCount(input);
  console.log(result);
};

main();
