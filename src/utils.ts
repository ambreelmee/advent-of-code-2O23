import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const readTextFile = (day: number, filename: string) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const input = fs
    .readFileSync(path.join(__dirname, `./day${day}/${filename}.txt`))
    .toString()
    .split("\n")
    .slice(0, -1);
  return input;
};
