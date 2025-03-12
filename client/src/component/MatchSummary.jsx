import {
  round,
  getChampionImageLocation,
  getSpellImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getItemImageLocation,
  masterpiece,
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
          user.earlySurrendered
            ? "bg-secondary"
            : user.win
            ? "bg-primary"
            : "bg-danger"
        }`}
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
            alt="champion"
          />
        </div>
        <div className="col-2">
          <div className="row">
            <img
              className="rune-spell-img-small col-6"
              src={getPrimaryRuneImageLocation(user.primaryRune)}
              alt="primary rune"
            />
            <img
              className="rune-spell-img-small col-6"
              src={getSecondRuneStyleImageLocation(user.secondaryRuneStyle)}
              alt="secondary rune style"
            />
          </div>
          <div className="row">
            <img
              className="rune-spell-img-small col-6"
              src={getSpellImageLocation(user.spell1)}
              alt="spell 1"
            />

            <img
              className="rune-spell-img-small col-6"
              src={getSpellImageLocation(user.spell2)}
              alt="spell 2"
            />
          </div>
        </div>

        <div className="col-2 d-flex align-items-center justify-content-center">
          <div className="row item-grid-two-rows">
            {user.items.map((code, idx) => {
              if (code === 0) return null; // Skip rendering if code is 0

              // Check if the code exists in masterpiece map
              const isMasterpiece = masterpiece.has(code);
              const itemCode = isMasterpiece ? masterpiece.get(code) : code;

              return (
                <div key={idx} className="col-4 px-0 position-relative">
                  {/* Base Item Image */}
                  <img
                    className="item-img-small"
                    src={getItemImageLocation(itemCode)}
                    alt={`item ${idx + 1}`}
                  />

                  {/* Overlaying Border Image if it's a masterpiece item */}
                  {isMasterpiece && (
                    <img
                      className="item-img-small item-overlay position-absolute top-0 start-0 w-100 h-100"
                      src={"asset/img/BorderTreatmentOrnn.png"}
                      alt="Masterpiece Border"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <p className="col-3 mb-0">
          <span>{user.kill}</span>
          &nbsp;/&nbsp;
          <span style={{ color: "maroon" }}>{user.death}</span>
          &nbsp;/&nbsp;
          <span>{user.assist}</span>
          <br />
          KDA:&nbsp;
          {user.death === 0
            ? "Perfect"
            : round((user.kill + user.assist) / user.death, 2, false)}
        </p>
        <button className="col-1 btn rounded-pill" onClick={getMatchDetail}>
          <p className="mb-0">Details</p>
        </button>
      </div>
      {isMatchDetailVisible && (
        <MatchDetailContainer win={teamWin} lose={teamLose} />
      )}
    </div>
  );
}

export default MatchSummary;
