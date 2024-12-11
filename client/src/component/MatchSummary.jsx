import {
  ICON_SIZE_BIG,
  ICON_SIZE_SMALL,
  round,
  getChampionImageLocation,
  getSpellImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
} from "../asset/var.js";
import React, { useState } from "react";
import MatchDetailContainer from "./MatchDetailContainer.jsx";

function MatchSummary(props) {
  const [isMatchDetailVisible, setIsMatchDetailVisible] = useState(false);

  const playerRecords = props.data.playerRecords;
  const matchRecord = props.data;

  const teamWin = [];
  const teamLose = [];
  let userIndex;

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
            src={getChampionImageLocation(user.champion)}
            width={ICON_SIZE_BIG}
            height={ICON_SIZE_BIG}
            alt="..."
          />
        </div>
        <div className="col-2">
          <div className="row">
            <img
              className="rune-spell-img col-6"
              src={getPrimaryRuneImageLocation(user.primaryRune)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
            <img
              className="rune-spell-img col-6"
              src={getSecondRuneStyleImageLocation(user.secondaryRuneStyle)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
          </div>
          <div className="row">
            <img
              className="rune-spell-img col-6"
              src={getSpellImageLocation(user.spell1)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />

            <img
              className="rune-spell-img col-6"
              src={getSpellImageLocation(user.spell2)}
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
      {isMatchDetailVisible && (
        <MatchDetailContainer win={teamWin} lose={teamLose} />
      )}
    </div>
  );
}

export default MatchSummary;
