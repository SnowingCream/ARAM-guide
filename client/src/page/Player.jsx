import { useLocation } from "react-router-dom";
import profileIcon from "../asset/data_dragon/profileicon.json";
import Calendar from "../component/Calendar.jsx";
import ChampionSummary from "../component/ChampionSummary.jsx";
import { ICON_SIZE, round } from "../asset/var.js";
import ChampionSummaryContainer from "../component/ChampionSummaryContainer.jsx";

function Player() {
  // useLocation gives us access to the current location object
  const location = useLocation();

  // Destructure 'returnedData' from location.state,
  // or fallback to an empty object if state is undefined.
  const dataFromApi = location.state || {};

  // console.log(dataFromApi);

  // get a userIndex of the record of given index.
  function getUserindex(recordIdx) {
    return dataFromApi.matchRecords[recordIdx].metadata.participants.indexOf(
      dataFromApi.account.puuid
    );
  }

  // userIndex of first game to fetch the userIconId
  const userFirstIndex = getUserindex(0);

  // used to render corresponding userIcon image
  const userIconId =
    dataFromApi.matchRecords[0].info.participants[
      userFirstIndex
    ].profileIcon.toString();

  const userData = {
    win: 0,
    dailyRecords: new Map(),
    championRecords: new Map(),
  };

  for (let i = 0; i < dataFromApi.matchRecords.length; i++) {
    const userIndex = getUserindex(i);

    const userWin =
      dataFromApi.matchRecords[i].info.participants[userIndex].win;

    const recordDate = new Date(
      dataFromApi.matchRecords[i].info.gameStartTimestamp
    );

    const mapKeyDate =
      recordDate.getMonth().toString() +
      " / " +
      recordDate.getDate().toString();

    // Wukong has different name Monkey King
    const championName =
      dataFromApi.matchRecords[i].info.participants[userIndex].championName ===
      "Wukong"
        ? "MonkeyKing"
        : dataFromApi.matchRecords[i].info.participants[userIndex].championName;

    // total win accumulation for given records.
    if (userWin) {
      userData.win += 1;
    }

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

    // if the champion ID is already key, add win or lose and k, d, a accordingly to that existing key-value pair.
    if (userData.championRecords.has(championName)) {
      userWin
        ? (userData.championRecords.get(championName).win += 1)
        : (userData.championRecords.get(championName).lose += 1);

      userData.championRecords.get(championName).kill +=
        dataFromApi.matchRecords[i].info.participants[userIndex].kills;
      userData.championRecords.get(championName).death +=
        dataFromApi.matchRecords[i].info.participants[userIndex].deaths;
      userData.championRecords.get(championName).assist +=
        dataFromApi.matchRecords[i].info.participants[userIndex].assists;
      // if the champion ID has not been the key yet, create a new key-value with according initial value.
    } else {
      userData.championRecords.set(championName, {
        win: userWin ? 1 : 0,
        lose: userWin ? 0 : 1,
        kill: dataFromApi.matchRecords[i].info.participants[userIndex].kills,
        death: dataFromApi.matchRecords[i].info.participants[userIndex].deaths,
        assist:
          dataFromApi.matchRecords[i].info.participants[userIndex].assists,
      });
    }
  }

  // img placed in public!
  const src_location =
    "asset/img/profileicon/" + profileIcon.data[userIconId].image.full;

  return (
    <div className="container px-3 py-5 my-5 text-center">
      {dataFromApi ? (
        <div className="valid-input">
          <div className="user-info">
            <h2>
              {dataFromApi.account.userName} #{dataFromApi.account.tag}
            </h2>
            <img
              src={src_location}
              alt="profileIcon"
              width={ICON_SIZE}
              height={ICON_SIZE}
            />

            <p>
              winning rate:
              {round(userData.win / dataFromApi.matchRecords.length, 2)}%
            </p>
          </div>
          <div className="summery-overview">
            <div className="row">
              <div className="overview-calendar col-md-6 justify-content-center">
                <Calendar userData={userData} />
              </div>
              <div className="overview-champion col-md-6 overflow-auto">
                {/* {[...userData.championRecords.entries()].map(([key, value]) => (
                  <ChampionSummary
                    key={key} // Use the key from the map
                    name={key}
                    win={value.win}
                    lose={value.lose}
                    kill={value.kill}
                    death={value.death}
                    assist={value.assist}
                  />
                ))} */}
                <ChampionSummaryContainer data={userData.championRecords} />
              </div>
            </div>
          </div>
          <div className="summary">
            <p>Placeholder for game summary</p>
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
