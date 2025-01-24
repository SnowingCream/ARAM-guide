import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

// process.cwd() = current working directory
// __dirname = directory of the current module

const numMatches = 80;

const apiKey = fs
  .readFileSync(__dirname + "/apiKey.txt")
  .toString()
  .trim();

// https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{Name}/{Tag}
const URL_accountByNameAndTag =
  "https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/";

// https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{Puuid}/ids?queue=450
const URL_matchesByPuuid1 =
  "https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/";

// const URL_matchesByPuuid2 = `ids?queue=450&count=${numMatches}`;
// BUG on riot side: queue param doesn't work. use this for now and once fixed go back to the one above.
const URL_matchesByPuuid2 = `ids?count=${numMatches}`;

// https://americas.api.riotgames.com/lol/match/v5/matches/{testMatchID}
const URL_matchByMatchid =
  "https://americas.api.riotgames.com/lol/match/v5/matches/";

// test purpose, my puuid, one of my matches
const EXAMPLE_puuid =
  "orEJpBer82qo9-KurbjHH8uzfLoNMkUlndOxw2XEi6ArUnCQPNDoXqcNFopMN76WLevfYQg9fsC_6Q";
const EXAMPLE_matchid = "NA1_5015950651";

export {
  apiKey,
  URL_accountByNameAndTag,
  URL_matchesByPuuid1,
  URL_matchesByPuuid2,
  URL_matchByMatchid,
  EXAMPLE_puuid,
  EXAMPLE_matchid,
};
