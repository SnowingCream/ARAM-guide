import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import profileIcon from "../asset/data_dragon/profileicon.json";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../asset/App.css";

function Player() {
  // useLocation gives us access to the current location object
  const location = useLocation();

  // Destructure 'returnedData' from location.state,
  // or fallback to an empty object if state is undefined.
  const dataFromApi = location.state || {};

  // console.log(dataFromApi);

  // userIndex of first game to fetch the userIconId
  const userIndex = dataFromApi.matchRecords[0].metadata.participants.indexOf(
    dataFromApi.account.puuid
  );

  // used to render corresponding userIcon image
  const userIconId =
    dataFromApi.matchRecords[0].info.participants[
      userIndex
    ].profileIcon.toString();

  const userData = {
    win: 0,
    dailyRecords: new Map(),
  };

  for (let i = 0; i < dataFromApi.matchRecords.length; i++) {
    const userIndex = dataFromApi.matchRecords[i].metadata.participants.indexOf(
      dataFromApi.account.puuid
    );

    // console.log(dataFromApi.matchRecords[i].info.participants);
    // console.log(userIndex);
    // console.log(dataFromApi.matchRecords[i].info.participants[userIndex]);

    const userWin =
      dataFromApi.matchRecords[i].info.participants[userIndex].win;
    // if (dataFromApi.matchRecords[i].info.participants[userIndex].win) {
    //   userData.win += 1;
    // }

    const recordDate = new Date(
      dataFromApi.matchRecords[i].info.gameStartTimestamp
    );

    const mapKeyDate =
      recordDate.getMonth().toString() +
      " / " +
      recordDate.getDate().toString();

    if (userWin) {
      userData.win += 1;
    }

    // if the date is already key, add win or lose accordingly to that existing key-value pair.
    // if the date has not been the key yet, create a new key-value with according initial value.
    userData.dailyRecords.has(mapKeyDate)
      ? userWin
        ? (userData.dailyRecords.get(mapKeyDate).win += 1)
        : (userData.dailyRecords.get(mapKeyDate).lose += 1)
      : userData.dailyRecords.set(mapKeyDate, {
          win: userWin ? 1 : 0,
          lose: userWin ? 0 : 1,
        });
  }

  console.log(userData);

  // img placed in public!
  const src_location =
    "asset/img/profileicon/" + profileIcon.data[userIconId].image.full;

  const [value, setValue] = useState(new Date());

  function onChange(nextValue) {
    setValue(nextValue);
  }

  return (
    <div>
      <h1>This is the Player page.</h1>
      {/* Conditionally render the returned data */}
      {console.log(location)}
      {dataFromApi ? (
        <div>
          <h2>
            Records of : {dataFromApi.account.userName} #
            {dataFromApi.account.tag}
          </h2>
          <img src={src_location} alt="profileIcon" />

          <p>
            winning rate:{" "}
            {Math.round(
              (userData.win / dataFromApi.matchRecords.length) * 10000
            ) / 100}
            %
          </p>
          <Calendar
            onChange={onChange}
            value={value}
            prev2Label={null}
            next2Label={null}
            calendarType="gregory"
            tileContent={({ activeStartDate, date, view }) =>
              view === "month" ? (
                <p>
                  {
                    userData.dailyRecords.get(
                      date.getMonth.toString() + " / " + date.getDate.toString()
                    ).win
                  }
                </p>
              ) : null
            }
          />
          <h2>Data from Backend:</h2>

          {/* Display the returned data in a formatted way */}
          <pre>{JSON.stringify(dataFromApi, null, 2)}</pre>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Player;
