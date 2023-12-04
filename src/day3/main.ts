import { readTextFile } from "../utils";
import { getGearRatio } from "./utils";

const main = () => {
  const input = readTextFile(3, "input");

  //   const result = getSumOfValidNumbers(input);
  const result = getGearRatio(input);
  console.log(result);
};

main();
