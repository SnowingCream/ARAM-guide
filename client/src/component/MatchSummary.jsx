import champion from "../asset/data_dragon/champion.json";
import rune from "../asset/data_dragon/runesReforged.json";
import spell from "../asset/data_dragon/summoner.json";
import { ICON_SIZE_BIG, ICON_SIZE_SMALL, round } from "../asset/var.js";
import React, { useState } from "react";
import MatchDetail from "./MatchDetail.jsx";

function MatchSummary(props) {
  const [isMatchDetailVisible, setIsMatchDetailVisible] = useState(false);

  const playerRecords = props.data.playerRecords;
  const matchRecord = props.data;

  const championLocationFront = "asset/img/champion/";
  const runeLocationFront = "asset/img/";
  const spellLocationFront = "asset/img/spell/";

  const teamWin = [];
  const teamLose = [];
  let userIndex;

  for (let i = 0; i < 10; i++) {
    if (playerRecords[i].win) {
      teamWin.push(playerRecords[i]);
    } else {
      teamLose.push(playerRecords[i]);
    }
    if (playerRecords[i].user) {
      userIndex = i;
    }
  }

  const user = playerRecords[userIndex];

  function getSpellLocation(code, spellLocationFront) {
    for (let spellName in spell.data) {
      // console.log(spellName);
      if (code.toString() === spell.data[spellName].key) {
        return spellLocationFront + spell.data[spellName].image.full;
      }
    }

    console.log(`Failed to find any spell match with given code: ${code}`);
  }

  function getPrimaryRuneLocation(code, runeLocationFront) {
    // Hail of Blades -> doesn't follow the logic below (exception)
    if (code === 9923) {
      return (
        runeLocationFront +
        "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png"
      );
    }

    // ~~ stands for Math.floor
    const codeId = ~~(code / 100) * 100;

    for (let i = 0; i < rune.length; i++) {
      if (codeId === rune[i].id) {
        for (let j = 0; j < rune[i].slots[0].runes.length; j++) {
          if (code === rune[i].slots[0].runes[j].id) {
            return runeLocationFront + rune[i].slots[0].runes[j].icon;
          }
        }
      }
    }
    console.log(
      `Failed to find any primary rune match with given code: ${code}`
    );
  }

  function getSecondRuneStyleLocation(code, runeLocationFront) {
    for (let i = 0; i < rune.length; i++) {
      if (code === rune[i].id) {
        return runeLocationFront + rune[i].icon;
      }
    }
    console.log(
      `Failed to find any secondary rune style match with given code: ${code}`
    );
  }

  function formatGameStart(gameStartInEpoch) {
    // date object format option object
    const options = {
      dateStyle: "short",
      timeStyle: "short",
      // era: "long",
      // year: "numeric",
      // month: "numeric",
      // weekday: "long",
      // day: "numeric",
      // dayPeriod: "long",
      // hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
      // timeZoneName: "long",
    };

    const date = new Date(gameStartInEpoch);

    return date.toLocaleString("en-US", options);
  }

  function formatGameDuration(gameDurationInSeconds) {
    const minutes = ~~(gameDurationInSeconds / 60);
    const seconds = gameDurationInSeconds - minutes * 60;

    return `${minutes}m ${seconds}s`;
  }

  function getMatchDetail() {
    setIsMatchDetailVisible(!isMatchDetailVisible);
    // probably set some border to indicate that the match summary has been chosen
  }

  return (
    // update color in the future
    <div>
      <div
        className={`row py-1 align-items-center justify-content-center ${
          user.win ? "bg-primary" : "bg-danger"
        }`}
        onClick={getMatchDetail}
      >
        <p className="col-4 mb-0 match-time">
          <span>{formatGameStart(matchRecord.gameStart)}</span>
          <br />
          <span>{formatGameDuration(matchRecord.gameDuration)}</span>
        </p>

        <div className="col-2 mx-0 pl-0 match-summary-champion-img-container">
          <img
            className="champion-img"
            src={
              championLocationFront + champion.data[user.champion].image.full
            }
            width={ICON_SIZE_BIG}
            height={ICON_SIZE_BIG}
            alt="..."
          />
        </div>
        <div className="col-2">
          <div className="row">
            <img
              className="rune-spell-img col-6"
              src={getPrimaryRuneLocation(user.primaryRune, runeLocationFront)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
            <img
              className="rune-spell-img col-6"
              src={getSecondRuneStyleLocation(
                user.secondaryRuneStyle,
                runeLocationFront
              )}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
          </div>
          <div className="row">
            <img
              className="rune-spell-img col-6"
              src={getSpellLocation(user.spell1, spellLocationFront)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />

            <img
              className="rune-spell-img col-6"
              src={getSpellLocation(user.spell2, spellLocationFront)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
          </div>
        </div>

        <p className="col-4 mb-0">
          <span>{user.kill}</span>
          &nbsp;/&nbsp;
          <span style={{ color: "maroon" }}>{user.death}</span>
          &nbsp;/&nbsp;
          <span>{user.assist}</span>
          <br />
          KDA:&nbsp;
          {round((user.kill + user.assist) / user.death, 2, false)}
        </p>
      </div>
      {isMatchDetailVisible && <MatchDetail data={playerRecords} />}
    </div>
  );
}

export default MatchSummary;
