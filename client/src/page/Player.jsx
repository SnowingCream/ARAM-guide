import { useLocation } from "react-router-dom";
import profileIcon from "../asset/data_dragon/profileicon.json";
import Calendar from "../component/Calendar.jsx";
import { round } from "../asset/var.js";
import ChampionSummaryContainer from "../component/ChampionSummaryContainer.jsx";
import MatchSummaryContainer from "../component/MatchSummaryContainer.jsx";

function Player() {
  // useLocation gives us access to the current location object
  const location = useLocation();

  // Destructure 'returnedData' from location.state,
  // or fallback to an empty object if state is undefined.
  const dataFromApi = location.state || {};

  // get a userIndex of the game record of given index.
  function getUserindex(recordIdx) {
    return dataFromApi.matchRecords[recordIdx].metadata.participants.indexOf(
      dataFromApi.account.puuid
    );
  }

  // userIndex of first game to fetch the userIconId
  const userFirstIndex = getUserindex(0);

  // object for user summary
  const user = {
    userName: dataFromApi.account.userName,
    tag: dataFromApi.account.tag,
    iconId:
      dataFromApi.matchRecords[0].info.participants[
        userFirstIndex
      ].profileIcon.toString(),
    level:
      dataFromApi.matchRecords[0].info.participants[
        userFirstIndex
      ].summonerLevel.toString(),
    win: 0,
  };

  const userData = {
    dailyRecords: new Map(),
    championRecords: new Map(),
    matchRecords: [],
  };

  for (let i = 0; i < dataFromApi.matchRecords.length; i++) {
    const userIndex = getUserindex(i);

    const userWin =
      dataFromApi.matchRecords[i].info.participants[userIndex].win;

    const recordDate = new Date(
      dataFromApi.matchRecords[i].info.gameStartTimestamp
    );

    const mapKeyDate =
      recordDate.getFullYear().toString() +
      " / " +
      recordDate.getMonth().toString() +
      " / " +
      recordDate.getDate().toString();

    function checkChampionName(championName) {
      // Wukong has a different name: Monkey King
      if (championName === "Wukong") {
        return "MonkeyKing";
      }
      // The image file has a name  Fiddlesticks (lower s).
      if (championName === "FiddleSticks") {
        return "Fiddlesticks";
      }
      return championName;
    }

    const userChampionName = checkChampionName(
      dataFromApi.matchRecords[i].info.participants[userIndex].championName
    );

    // total win accumulation for given records.
    if (userWin) {
      user.win += 1;
    }

    /// ---------------------- userData.dailyRecords setup ------------------

    // if the date is already key, add win or lose accordingly to that existing key-value pair.
    if (userData.dailyRecords.has(mapKeyDate)) {
      userWin
        ? (userData.dailyRecords.get(mapKeyDate).win += 1)
        : (userData.dailyRecords.get(mapKeyDate).lose += 1);
    }
    // if the date has not been the key yet, create a new key-value with according initial value.
    else {
      userData.dailyRecords.set(mapKeyDate, {
        win: userWin ? 1 : 0,
        lose: userWin ? 0 : 1,
      });
    }

    /// ---------------------- userData.championRecords setup ------------------

    // if the champion ID is already key, add win or lose and k, d, a accordingly to that existing key-value pair.
    if (userData.championRecords.has(userChampionName)) {
      userWin
        ? (userData.championRecords.get(userChampionName).win += 1)
        : (userData.championRecords.get(userChampionName).lose += 1);

      userData.championRecords.get(userChampionName).kill +=
        dataFromApi.matchRecords[i].info.participants[userIndex].kills;
      userData.championRecords.get(userChampionName).death +=
        dataFromApi.matchRecords[i].info.participants[userIndex].deaths;
      userData.championRecords.get(userChampionName).assist +=
        dataFromApi.matchRecords[i].info.participants[userIndex].assists;
      // if the champion ID has not been the key yet, create a new key-value with according initial value.
    } else {
      userData.championRecords.set(userChampionName, {
        win: userWin ? 1 : 0,
        lose: userWin ? 0 : 1,
        kill: dataFromApi.matchRecords[i].info.participants[userIndex].kills,
        death: dataFromApi.matchRecords[i].info.participants[userIndex].deaths,
        assist:
          dataFromApi.matchRecords[i].info.participants[userIndex].assists,
      });
    }

    /// ---------------------- userData.matchRecords setup ------------------

    const matchRecord = {};

    matchRecord.gameStart = dataFromApi.matchRecords[i].info.gameStartTimestamp;
    matchRecord.gameDuration = dataFromApi.matchRecords[i].info.gameDuration;

    // container of a single match
    const playerRecords = [];

    // each player's record in that match
    for (let j = 0; j < 10; j++) {
      const playerRecord = {
        userName:
          dataFromApi.matchRecords[i].info.participants[j].riotIdGameName,
        tag: dataFromApi.matchRecords[i].info.participants[j].riotIdTagline,
        level: dataFromApi.matchRecords[i].info.participants[j].summonerLevel,
        champion: checkChampionName(
          dataFromApi.matchRecords[i].info.participants[j].championName
        ),
        kill: dataFromApi.matchRecords[i].info.participants[j].kills,
        death: dataFromApi.matchRecords[i].info.participants[j].deaths,
        assist: dataFromApi.matchRecords[i].info.participants[j].assists,
        win: dataFromApi.matchRecords[i].info.participants[j].win,
        user: j === getUserindex(i),
        spell1: dataFromApi.matchRecords[i].info.participants[j].summoner1Id,
        spell2: dataFromApi.matchRecords[i].info.participants[j].summoner2Id,
        primaryRune:
          dataFromApi.matchRecords[i].info.participants[j].perks.styles[0]
            .selections[0].perk,
        secondaryRuneStyle:
          dataFromApi.matchRecords[i].info.participants[j].perks.styles[1]
            .style,
        earlySurrendered:
          dataFromApi.matchRecords[i].info.participants[j].teamEarlySurrendered,
        items: [
          dataFromApi.matchRecords[i].info.participants[j].item0,
          dataFromApi.matchRecords[i].info.participants[j].item1,
          dataFromApi.matchRecords[i].info.participants[j].item2,
          dataFromApi.matchRecords[i].info.participants[j].item3,
          dataFromApi.matchRecords[i].info.participants[j].item4,
          dataFromApi.matchRecords[i].info.participants[j].item5,
        ],
        gold: dataFromApi.matchRecords[i].info.participants[j].goldEarned,
        cs: dataFromApi.matchRecords[i].info.participants[j].totalMinionsKilled,
        totalDamage:
          dataFromApi.matchRecords[i].info.participants[j]
            .totalDamageDealtToChampions,
        physicalDamage:
          dataFromApi.matchRecords[i].info.participants[j]
            .physicalDamageDealtToChampions,
        magicDamage:
          dataFromApi.matchRecords[i].info.participants[j]
            .magicDamageDealtToChampions,
        trueDamage:
          dataFromApi.matchRecords[i].info.participants[j]
            .trueDamageDealtToChampions,
        damaged:
          dataFromApi.matchRecords[i].info.participants[j].totalDamageTaken,
        mitigated:
          dataFromApi.matchRecords[i].info.participants[j].damageSelfMitigated,
        selfHealed:
          dataFromApi.matchRecords[i].info.participants[j].totalHeal -
          dataFromApi.matchRecords[i].info.participants[j]
            .totalHealsOnTeammates,
        teamHeal:
          dataFromApi.matchRecords[i].info.participants[j]
            .totalHealsOnTeammates,
        teamShield:
          dataFromApi.matchRecords[i].info.participants[j]
            .totalDamageShieldedOnTeammates,
        ccTo: dataFromApi.matchRecords[i].info.participants[j].timeCCingOthers,
        ccFrom:
          dataFromApi.matchRecords[i].info.participants[j].totalTimeCCDealt,
        timeDead:
          dataFromApi.matchRecords[i].info.participants[j].totalTimeSpentDead,
      };
      playerRecords.push(playerRecord);
    }

    matchRecord.playerRecords = playerRecords;
    userData.matchRecords.push(matchRecord);
  }

  // img placed in public!
  const src_location =
    "asset/img/profileicon/" + profileIcon.data[user.iconId].image.full;

  return (
    <div className="container px-3 py-5 my-5 text-center">
      {dataFromApi ? (
        <div className="valid-input">
          <div className="user-info">
            <h2>
              {user.userName} #{user.tag}
            </h2>
            <img
              className="profile-img"
              src={src_location}
              alt="profile icon"
            />

            <p>
              level: {user.level} <br /> winning rate:
              {round(user.win / dataFromApi.matchRecords.length, 2)}%
            </p>
          </div>
          {/* <div className="summary-overview"> */}
          <div className="row my-3">
            <div className="d-flex overview-calendar col-md-6 mx-auto my-3">
              <Calendar data={userData.dailyRecords} />
            </div>
            <div className="d-flex overview-champion col-md-6 mx-auto overflow-auto my-3">
              <ChampionSummaryContainer data={userData.championRecords} />
            </div>
          </div>
          <div className="row my-3 justify-content-center">
            <div className="col-md-12">
              <MatchSummaryContainer data={userData.matchRecords} />
            </div>
          </div>
        </div>
      ) : (
        <div className="invalid-input">
          <p>No data available</p>
        </div>
      )}
    </div>
  );
}

export default Player;
