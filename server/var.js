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

const URL_matchesByPuuid2 = `ids?queue=450&count=${numMatches}`;

// https://americas.api.riotgames.com/lol/match/v5/matches/{testMatchID}
const URL_matchByMatchid =
  "https://americas.api.riotgames.com/lol/match/v5/matches/";

// test purpose, my puuid, one of my matches
const EXAMPLE_puuid =
  "orEJpBer82qo9-KurbjHH8uzfLoNMkUlndOxw2XEi6ArUnCQPNDoXqcNFopMN76WLevfYQg9fsC_6Q";
const EXAMPLE_matchid = "NA1_5015950651";

const DB_matches_query = `
  INSERT INTO matches (match_id, game_duration, remake, game_start, game_end, version_1, version_2)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  ON CONFLICT (match_id)
  DO NOTHING`;

const DB_accounts_query = `
  INSERT INTO accounts (puuid, user_name, tag, lvl, icon_id)
  VALUES ($1, $2, $3, $4, $5)
  ON CONFLICT (puuid)
  DO UPDATE SET
    user_name = EXCLUDED.user_name,
    tag = EXCLUDED.tag,
    lvl = EXCLUDED.lvl,
    icon_id = EXCLUDED.icon_id`;

const DB_match_account_query = `
  INSERT INTO match_account (match_id, puuid, win, champ_name, champ_id, champ_lvl, gold, cs, kill, death, assist, kda,
  damage_to_total, damaged_by, heal_team, shield_team, time_cc_to, time_ccd_by, kill_participation_pct, damage_pct,
  damaged_pct, spell_1, spell_2, rune_main, rune_sub, rune_main_1, rune_main_2, rune_main_3, rune_main_4, rune_sub_1,
  rune_sub_2, stat_off, stat_flex, stat_def, item_1, item_2, item_3, item_4, item_5, item_6, double_kill, triple_kill,
  quadra_kill, penta_kill, damage_to_physical, damage_to_magic, damage_to_true, damaged_mitigated, damaged_self_healed,
  item_0)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, 
  $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50) 
  ON CONFLICT (match_id, puuid)
  DO NOTHING`;

function round(value, digitAfterDecimal, percent = true) {
  if (percent) {
    return (
      Math.round(value * 10 ** (digitAfterDecimal + 2)) /
      10 ** digitAfterDecimal
    );
  } else {
    return (
      Math.round(value * 10 ** digitAfterDecimal) / 10 ** digitAfterDecimal
    );
  }
}

export {
  apiKey,
  URL_accountByNameAndTag,
  URL_matchesByPuuid1,
  URL_matchesByPuuid2,
  URL_matchByMatchid,
  EXAMPLE_puuid,
  EXAMPLE_matchid,
  DB_accounts_query,
  DB_matches_query,
  DB_match_account_query,
  round,
};
