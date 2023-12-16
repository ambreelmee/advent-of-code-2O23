import { readTextFile } from "../utils";
import { formatData, getSummary } from "./utils";

const main = () => {
  const input = readTextFile(13, "input");
  const data = formatData(input);
  console.log(data);
  const result = getSummary(data);
  console.log(result);
};

main();
