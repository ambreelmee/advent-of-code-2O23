import console from "console";
import { readTextFile } from "../utils";
import { getTotalNumberOfArrangementsPart2 } from "./part2";
import { formatData } from "./utils";

const main = () => {
  const input = readTextFile(12, "example");
  const data = formatData(input);
  const conditions = getTotalNumberOfArrangementsPart2(data);
  console.log(conditions);
};

main();
