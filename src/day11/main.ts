import { readTextFile } from "../utils";
import { addUniverseExpansion } from "./utils";

const main = () => {
  const input = readTextFile(11, "example");
  const data = addUniverseExpansion(input);
  console.log({ data });
};

main();
