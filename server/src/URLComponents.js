import { numMatches } from "./constants.js";

// first API call
// https://{accountServer}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{name}/{nag}
const URL_accountByNameAndTag =
  ".api.riotgames.com/riot/account/v1/accounts/by-riot-id/";

// second API call
// https://{matchServer}.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?queue=450
const URL_matchesByPuuid1 = ".api.riotgames.com/lol/match/v5/matches/by-puuid/";
const URL_matchesByPuuid2 = `ids?queue=450&count=${numMatches}`;

// third API call
// https://{matcherServer}.api.riotgames.com/lol/match/v5/matches/{matchID}
const URL_matchByMatchid = ".api.riotgames.com/lol/match/v5/matches/";

export {
  URL_accountByNameAndTag,
  URL_matchesByPuuid1,
  URL_matchesByPuuid2,
  URL_matchByMatchid,
};
