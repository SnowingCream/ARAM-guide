import pool from "../db.js";
import { round, DBResultHandle } from "./helperFunctions.js";
import {
  DB_accounts_query,
  DB_match_account_query,
  DB_matches_query,
} from "./DBQueries.js";

async function insertMatches(client, match, version) {
  try {
    const result = await client.query(DB_matches_query, [
      match.metadata.matchId,
      match.info.gameDuration,
      match.info.participants[0].gameEndedInEarlySurrender,
      new Date(match.info.gameStartTimestamp),
      new Date(match.info.gameEndTimestamp),
      version[0],
      version[1],
    ]);
    // result will contain inserted info if given match is new and inserted.
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in insertMatches(): ", error.message);
  }
}

async function insertAccounts(client, account) {
  try {
    const result = await client.query(DB_accounts_query, [
      account.puuid,
      account.riotIdGameName,
      account.riotIdTagline,
      account.summonerLevel,
      account.profileIcon,
    ]);
    // xmax = 0 for insertion, > 0 for update
    if (parseInt(result.rows[0].xmax) === 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in insertMatches(): ", error.message);
  }
}

// most of info in account; columns that cannot be found from account are exclusively provided.
async function insertMatchAccount(
  client,
  account,
  matchId,
  kda,
  killParticipation,
  teamDamagePercentage,
  damageTakenOnTeamPercentage
) {
  try {
    const result = await client.query(DB_match_account_query, [
      matchId,
      account.puuid,
      account.win,
      account.championName,
      account.championId,
      account.champLevel,
      account.goldEarned,
      account.totalMinionsKilled,
      account.kills,
      account.deaths,
      account.assists,
      kda,
      account.totalDamageDealtToChampions,
      account.totalDamageTaken,
      account.totalHealsOnTeammates,
      account.totalDamageShieldedOnTeammates,
      account.timeCCingOthers,
      account.totalTimeCCDealt,
      killParticipation,
      teamDamagePercentage,
      damageTakenOnTeamPercentage,
      account.summoner1Id,
      account.summoner2Id,
      account.perks.styles[0].style,
      account.perks.styles[1].style,
      account.perks.styles[0].selections[0].perk,
      account.perks.styles[0].selections[1].perk,
      account.perks.styles[0].selections[2].perk,
      account.perks.styles[0].selections[3].perk,
      account.perks.styles[1].selections[0].perk,
      account.perks.styles[1].selections[1].perk,
      account.perks.statPerks.offense,
      account.perks.statPerks.flex,
      account.perks.statPerks.defense,
      account.item1,
      account.item2,
      account.item3,
      account.item4,
      account.item5,
      account.item6,
      account.doubleKills,
      account.tripleKills,
      account.quadraKills,
      account.pentaKills,
      account.physicalDamageDealtToChampions,
      account.magicDamageDealtToChampions,
      account.trueDamageDealtToChampions,
      account.damageSelfMitigated,
      account.totalHeal - account.totalHealsOnTeammates, // self heal = total heal - team heal
      account.item0,
    ]);
    if (result.rows.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error in insertMatchAccount(): ", error.message);
  }
}

async function flow(data) {
  const client = await pool.connect();

  const result = {
    match: [0, 0, 0],
    account: [0, 0, 0],
    matchAccount: [0, 0, 0],
  };

  for (const match of data) {
    // data preparation for match table insertion
    const version = match.info.gameVersion.split(".");
    // match table insertion
    const matchInsertionResult = await insertMatches(client, match, version);
    DBResultHandle(matchInsertionResult, result.match);

    // data preparation for matchAccount table insertion 1
    const teamKills = [0, 0];
    const teamDamage = [0, 0];
    const teamDamaged = [0, 0];
    for (let i = 0; i < 10; i++) {
      // team1 = 0 ~ 4, team2 = 5 ~ 9
      teamKills[Math.floor(i / 5)] += match.info.participants[i].kills;
      teamDamage[Math.floor(i / 5)] +=
        match.info.participants[i].totalDamageDealtToChampions;
      teamDamaged[Math.floor(i / 5)] +=
        match.info.participants[i].totalDamageTaken;
    }
    for (let i = 0; i < 10; i++) {
      // accounts table insertion
      const accountInsertionResult = await insertAccounts(
        client,
        match.info.participants[i]
      );
      DBResultHandle(accountInsertionResult, result.account);

      // data preparation for matchAccount table insertion 2
      // if death is 0, store null to indicate infinity.
      const kda =
        match.info.participants[i].deaths === 0
          ? null
          : round(
              (match.info.participants[i].kills +
                match.info.participants[i].assists) /
                match.info.participants[i].deaths,
              2,
              false
            );
      const killParticipation =
        teamKills[Math.floor(i / 5)] === 0
          ? 0
          : round(
              (match.info.participants[i].kills +
                match.info.participants[i].assists) /
                teamKills[Math.floor(i / 5)],
              4,
              false
            );
      const teamDamagePercentage =
        teamDamage[Math.floor(i / 5)] === 0
          ? 0
          : round(
              match.info.participants[i].totalDamageDealtToChampions /
                teamDamage[Math.floor(i / 5)],
              4,
              false
            );
      const damageTakenOnTeamPercentage =
        teamDamaged[Math.floor(i / 5)] === 0
          ? 0
          : round(
              match.info.participants[i].totalDamageTaken /
                teamDamaged[Math.floor(i / 5)],
              4,
              false
            );
      // matchAccount table insertion
      const matchAccountInsertionResult = await insertMatchAccount(
        client,
        match.info.participants[i],
        match.metadata.matchId,
        kda,
        killParticipation,
        teamDamagePercentage,
        damageTakenOnTeamPercentage
      );
      DBResultHandle(matchAccountInsertionResult, result.matchAccount);
    }
  }

  client.release();

  // count report
  console.log("DB insertion successfully processed");
  console.log(
    `matches: new = ${result.match[0]}, duplicated = ${result.match[1]}, error: ${result.match[2]}`
  );
  console.log(
    `accounts: new = ${result.account[0]}, duplicated = ${result.account[1]}, error: ${result.account[2]}`
  );
  console.log(
    `match_account: new = ${result.matchAccount[0]}, duplicated = ${result.matchAccount[1]}, error: ${result.matchAccount[2]}`
  );
}

export default flow;
