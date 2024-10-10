import React, { useState, useEffect } from "react";
import ChampionSummary from "./ChampionSummary.jsx";
import { round } from "../asset/var.js";

function ChampionSummaryContainer(props) {
  // starting point: input map converted to array with each element: [key, value]
  const championArray = Array.from(props.data);

  const [sortCriterion, setSortCriterion] = useState("numberOfPlays");

  // ending point: the result of sort in which map() will be called upon
  const [sortedChampions, setSortedChampions] = useState([]);

  const [isAscending, setIsAscending] = useState(false);
  // let isAscending = false;
  // sortChampions("numberOfPlays");

  function sortChampions(criterion) {
    console.log(
      `At the beinning: criterion: ${criterion}, sortCriterion: ${sortCriterion}, isAsending: ${isAscending}`
    );

    if (sortCriterion === criterion) {
      // If the same criterion is selected, toggle sorting order
      // console.log("I fall here1");
      setIsAscending(!isAscending);
      // isAscending = !isAscending;
    } else {
      // console.log("I fall here2");
      setSortCriterion(criterion);
      setIsAscending(false);
      // isAscending = false;
    }

    // console.log(
    //   `After evaluation: criterion: ${criterion}, sortCriterion: ${sortCriterion}, isAsending: ${isAscending}`
    // );

    const sortedArray = championArray.sort((a, b) => {
      const championA = isAscending ? a[1] : b[1];
      const championB = isAscending ? b[1] : a[1];

      // sorting order: NumberOfPlays, WinningRate, KDA
      // if one of them is selected by the user, that goes to the first, and the rest is still in the order above.

      const comparedNumberOfPlays =
        championA.win + championA.lose - (championB.win + championB.lose);
      const comparedWinningRate =
        round(championA.win / (championA.win + championA.lose), 2) -
        round(championB.win / (championB.win + championB.lose), 2);
      const comparedKDA =
        round((championA.kill + championA.assist) / championA.death, 2) -
        round((championB.kill + championB.assist) / championB.death, 2);

      if (criterion === "numberOfPlays") {
        if (comparedNumberOfPlays !== 0) {
          return comparedNumberOfPlays;
        }
        if (comparedWinningRate !== 0) {
          return comparedWinningRate;
        }
        return comparedKDA;
      } else if (criterion === "winningRate") {
        if (comparedWinningRate !== 0) {
          return comparedWinningRate;
        }
        if (comparedNumberOfPlays !== 0) {
          return comparedNumberOfPlays;
        }
        return comparedKDA;
      } else if (criterion === "KDA") {
        if (comparedKDA !== 0) {
          return comparedKDA;
        }
        if (comparedNumberOfPlays !== 0) {
          return comparedNumberOfPlays;
        }
        return comparedWinningRate;
      } else {
        return 0;
      }
    });
    setSortedChampions(sortedArray);
  }

  useEffect(() => {
    sortChampions("numberOfPlays");
    // don't touch the comment below! it is to remove the warning message.
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          readOnly
          checked={sortCriterion === "numberOfPlays"}
          onClick={() => {
            sortChampions("numberOfPlays");
          }}
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio1">
          # Games{" "}
          {sortCriterion === "numberOfPlays" &&
            (isAscending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                />
              </svg>
            ))}
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          readOnly
          checked={sortCriterion === "winningRate"}
          onClick={() => {
            sortChampions("winningRate");
          }}
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio2">
          Winning Rate{" "}
          {sortCriterion === "winningRate" &&
            (isAscending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                />
              </svg>
            ))}
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
          readOnly
          checked={sortCriterion === "KDA"}
          onClick={() => {
            sortChampions("KDA");
          }}
        />
        <label className="btn btn-outline-secondary" htmlFor="btnradio3">
          KDA{" "}
          {sortCriterion === "KDA" &&
            (isAscending ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-down"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-chevron-up"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                />
              </svg>
            ))}
        </label>
      </div>

      {sortedChampions.map(([key, value]) => (
        <ChampionSummary
          key={key} // Use the key from the map
          name={key}
          win={value.win}
          lose={value.lose}
          kill={value.kill}
          death={value.death}
          assist={value.assist}
        />
      ))}
    </div>
  );
}

export default ChampionSummaryContainer;
