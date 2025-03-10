import express from "express";
import axios from "axios";
import pool from "./db.js";
import {
  apiKey,
  URL_accountByNameAndTag,
  URL_matchesByPuuid1,
  URL_matchesByPuuid2,
  URL_matchByMatchid,
  DB_accounts_query,
  DB_match_account_query,
  DB_matches_query,
  round,
} from "./var.js";

const router = express.Router();

// sleep function to handle rate limit
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function axiosGet(URL) {
  try {
    const response = await axios.get(URL, {
      headers: {
        "X-Riot-Token": apiKey,
      },
    });
    // Extract a value from the first API call's response (e.g., `id`)
    const data = response.data;

    // Return the value to be used in the second API call
    return data;
  } catch (error) {
    if (error.response) {
      console.error("Error Response Data:", error.response.data);
      console.error("Error Response Status:", error.response.status);
    } else if (error.request) {
      console.error("Error Request:", error.request);
    } else {
      console.error("Error Message:", error.message);
    }
    throw error;
  }
}

// batch call for the third api call (each match's details)
// rate limit is 20 per sec
async function batchApiCalls(urls, batchSize) {
  const results = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const batchResults = await Promise.all(
      batch.map((url) => axiosGet(URL_matchByMatchid + url))
    );
    results.push(...batchResults);
    console.log(
      `record ${i + 1} ~ ${Math.min(i + batchSize, urls.length)} has been done!`
    );
    await sleep(1000);
  }
  return results;
}

router.get("/", (req, res) => {
  res.send({ test: "hi from ARAM!!!!!!!!" });
});

router.get("/champion", (req, res) => {
  res.send({ test: "champion detected" });
});

router.post(`/player`, (req, res) => {
  (async function () {
    let firstResult;
    let secondResult;
    let thirdResult;

    try {
      // First call
      const firstURL =
        URL_accountByNameAndTag + req.body.name + "/" + req.body.tag;
      firstResult = await axiosGet(firstURL);
      console.log("First API call completed");

      // Second call using the result from the first call
      const secondURL =
        URL_matchesByPuuid1 + firstResult.puuid + "/" + URL_matchesByPuuid2;
      secondResult = await axiosGet(secondURL);
      console.log("Second API call completed");
      await sleep(1000);

      // Third call using the result from the second call: batch (faster)
      const startTime = performance.now(); // Record start time
      thirdResult = await batchApiCalls(secondResult, 20); // Batch size of 10
      const endTime = performance.now(); // Record end time

      // Third call using the result from the second call: linear (slower)
      // const startTime = performance.now(); // Record start time
      // // Third call using the result from the second call
      // const thirdResult = [];
      // for (let i = 0; i < secondResult.length; i++) {
      //   const thirdURL = URL_matchByMatchid + secondResult[i];
      //   thirdResult.push(await axiosGet(thirdURL));
      // }
      // const endTime = performance.now(); // Record end time

      console.log("Third API call completed");

      console.log(
        `Execution time: ${(endTime - startTime).toFixed(2)} milliseconds`
      );

      res.send({
        account: {
          userName: req.body.name,
          tag: req.body.tag,
          puuid: firstResult.puuid,
        },
        matchRecords: thirdResult,
      });
      console.log("API call successfully sent to Frontend");
    } catch (error) {
      res.send(error.message);
    }

    // DB store data
    const client = await pool.connect();
    try {
      // like a "for a in b" in python
      for (const match of thirdResult) {
        // need to check 14 >= version[0] to prevent going too far for recursive search in the production.
        const version = match.info.gameVersion.split(".");

        /* const DB_matches_query = `
      INSERT INTO matches (match_id, game_duration, remake, game_start, game_end, version_1, version_2)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (match_id)
      DO NOTHING`; */

        // matches table
        // not sure about type conversion, give a shot wi
        await client.query(DB_matches_query, [
          match.metadata.matchId,
          match.info.gameDuration,
          match.info.participants[0].gameEndedInEarlySurrender,
          new Date(match.info.gameStartTimestamp),
          new Date(match.info.gameEndTimestamp),
          version[0],
          version[1],
        ]);

        // my gut is that avoiding challenges will be the best, since it seems to be missing some attributes if there are no updates for those attributes in that game.
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
          /* const DB_accounts_query = `
          INSERT INTO accounts (puuid, user_name, tag, lvl, icon_id)
          VALUES ($1, $2, $3, $4, $5)
          ON CONFLICT (puuid)
          DO UPDATE SET
          user_name = EXCLUDED.user_name,
          tag = EXCLUDED.tag,
          lvl = EXCLUDED.lvl,
          icon_id = EXCLUDED.icon_id`;*/

          // accounts table
          await client.query(DB_accounts_query, [
            match.info.participants[i].puuid,
            match.info.participants[i].riotIdGameName,
            match.info.participants[i].riotIdTagline,
            match.info.participants[i].summonerLevel,
            match.info.participants[i].profileIcon,
          ]);

          /* const DB_match_account_query = `
      INSERT INTO match_account (match_id, puuid, win, champ_name, champ_id, champ_lvl, gold, cs, kill, death, assist, kda,
      damage_to_total, damaged_by, heal_team, shield_team, time_cc_to, time_ccd_by, kill_participation_pct, damage_pct,
      damaged_pct, spell_1, spell_2, rune_main, rune_sub, rune_main_1, rune_main_2, rune_main_3, rune_main_4, rune_sub_1,
      rune_sub_2, stat_off, stat_flex, stat_def, item_1, item_2, item_3, item_4, item_5, item_6, double_kill, triple_kill,
      quadra_kill, penta_kill, damage_to_physical, damage_to_magic, damage_to_true, damaged_mitigated, damaged_self_healed,
      item_0)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27,
      $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50)
      ON CONFLICT (match_id, puuid)
      DO NOTHING`;*/

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

          // account_match table
          await client.query(DB_match_account_query, [
            match.metadata.matchId,
            match.info.participants[i].puuid,
            match.info.participants[i].win,
            match.info.participants[i].championName,
            match.info.participants[i].championId,
            match.info.participants[i].champLevel,
            match.info.participants[i].goldEarned,
            match.info.participants[i].totalMinionsKilled,
            match.info.participants[i].kills,
            match.info.participants[i].deaths,
            match.info.participants[i].assists,
            kda,
            match.info.participants[i].totalDamageDealtToChampions,
            match.info.participants[i].totalDamageTaken,
            match.info.participants[i].totalHealsOnTeammates,
            match.info.participants[i].totalDamageShieldedOnTeammates,
            match.info.participants[i].timeCCingOthers,
            match.info.participants[i].totalTimeCCDealt,
            killParticipation,
            teamDamagePercentage,
            damageTakenOnTeamPercentage,
            match.info.participants[i].summoner1Id,
            match.info.participants[i].summoner2Id,
            match.info.participants[i].perks.styles[0].style,
            match.info.participants[i].perks.styles[1].style,
            match.info.participants[i].perks.styles[0].selections[0].perk,
            match.info.participants[i].perks.styles[0].selections[1].perk,
            match.info.participants[i].perks.styles[0].selections[2].perk,
            match.info.participants[i].perks.styles[0].selections[3].perk,
            match.info.participants[i].perks.styles[1].selections[0].perk,
            match.info.participants[i].perks.styles[1].selections[1].perk,
            match.info.participants[i].perks.statPerks.offense,
            match.info.participants[i].perks.statPerks.flex,
            match.info.participants[i].perks.statPerks.defense,
            match.info.participants[i].item1,
            match.info.participants[i].item2,
            match.info.participants[i].item3,
            match.info.participants[i].item4,
            match.info.participants[i].item5,
            match.info.participants[i].item6,
            match.info.participants[i].doubleKills,
            match.info.participants[i].tripleKills,
            match.info.participants[i].quadraKills,
            match.info.participants[i].pentaKills,
            match.info.participants[i].physicalDamageDealtToChampions,
            match.info.participants[i].magicDamageDealtToChampions,
            match.info.participants[i].trueDamageDealtToChampions,
            match.info.participants[i].damageSelfMitigated,
            match.info.participants[i].totalHeal -
              match.info.participants[i].totalHealsOnTeammates, // self heal = total heal - team heal
            match.info.participants[i].item0,
          ]);
        }
      }
      client.release();
      console.log("DB query processed");
    } catch (err) {
      client.release();
      console.error("Database Error:", err);
      throw err;
    }
  })();
});

export default router;
