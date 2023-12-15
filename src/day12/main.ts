import console from "console";
import { readTextFile } from "../utils";
import { formatData, getTotalNumberOfArrangements } from "./utils";

const main = () => {
  const input = readTextFile(12, "input");
  const data = formatData(input);
  const conditions = getTotalNumberOfArrangements(data);
  console.log(conditions);
};

main();
