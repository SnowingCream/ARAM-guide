import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

/* 
process.cwd() = current working directory
__dirname = directory of the current module 
*/
const __dirname = dirname(fileURLToPath(import.meta.url));

const numMatches = 80; // number of match records fetched per the second API call

const apiKey = fs
  .readFileSync(__dirname + "/secrets/apiKey.txt")
  .toString()
  .trim();

export { numMatches, apiKey };
