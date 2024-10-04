import { useLocation } from "react-router-dom";
import profileIcon from "../asset/data_dragon/profileicon.json";

function Player() {
  // useLocation gives us access to the current location object
  const location = useLocation();

  // Destructure 'returnedData' from location.state,
  // or fallback to an empty object if state is undefined.
  const dataFromApi = location.state || {};

  console.log(dataFromApi);

  const userIndex = dataFromApi.matchRecords[0].metadata.participants.indexOf(
    dataFromApi.account.puuid
  );
  const userIconId =
    dataFromApi.matchRecords[0].info.participants[
      userIndex
    ].profileIcon.toString();

  let win = 0;
  // calculate the user's winning rate by going over all records.
  for (let i = 0; i < dataFromApi.matchRecords.length; i++) {
    const userIndex = dataFromApi.matchRecords[i].metadata.participants.indexOf(
      dataFromApi.account.puuid
    );

    console.log(dataFromApi.matchRecords[i].info.participants);
    console.log(userIndex);
    console.log(dataFromApi.matchRecords[i].info.participants[userIndex]);
    if (dataFromApi.matchRecords[i].info.participants[userIndex].win) {
      win += 1;
    }
  }

  let starting_time = [];
  for (let i = 0; i < dataFromApi.matchRecords.length; i++) {
    starting_time.push(
      new Date(dataFromApi.matchRecords[i].info.gameStartTimestamp)
    );
  }
  console.log(starting_time[0]);

  // img placed in public!
  const src_location =
    "asset/img/profileicon/" + profileIcon.data[userIconId].image.full;

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
            {Math.round((win / dataFromApi.matchRecords.length) * 10000) / 100}%
          </p>
          {/* <p>{starting_time}</p> */}

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
