import React, { useState, useEffect, useRef } from "react";
import ChampionSummary from "./ChampionSummary.jsx";
import SortButton from "./SortButton.jsx";
import { sortButtonList, round } from "../asset/var.js";

function ChampionSummaryContainer(props) {
  const championArray = Array.from(props.data); // starting point: input map converted to array with each element: [key, value]

  const [sortedChampions, setSortedChampions] = useState([]); // ending point: the result of sort in which map() will be called upon, used for rendering the champion summary as well.
  const [sortCriterion, setSortCriterion] = useState("numberOfPlays"); // sorting criterion, used for updating the button as well.
  const [isDescending, setIsDescending] = useState(false); // sorting order condition, used for updating the sorting order icon as well.
  const isInitialRender = useRef(true); // to disable useEfect() for the initial setup of state.

  // set up the proper sorting conditions: criterion and order.
  // setting those states will trigger useEffect(), in which the actual sort takes place.
  function sortChampions(criterion) {
    // If the same criterion button is clicked more than once, shift between sorting order conditions.
    if (sortCriterion === criterion) {
      setIsDescending(!isDescending);
      // If the criterion changes, start from descending sort.
    } else {
      setSortCriterion(criterion);
      setIsDescending(true);
    }
  }

  useEffect(() => {
    sortChampions("numberOfPlays");
    // don't touch the comment below! it is to remove the warning message.
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // Skip sorting for the initial setup of states.
    if (isInitialRender.current) {
      isInitialRender.current = false;
    } else {
      console.log(`triggered with isAscending: ${isDescending}`);

      const sortedArray = championArray.sort((a, b) => {
        const championA = isDescending ? b[1] : a[1];
        const championB = isDescending ? a[1] : b[1];

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

        if (sortCriterion === "numberOfPlays") {
          if (comparedNumberOfPlays !== 0) {
            return comparedNumberOfPlays;
          }
          if (comparedWinningRate !== 0) {
            return comparedWinningRate;
          }
          return comparedKDA;
        } else if (sortCriterion === "winningRate") {
          if (comparedWinningRate !== 0) {
            return comparedWinningRate;
          }
          if (comparedNumberOfPlays !== 0) {
            return comparedNumberOfPlays;
          }
          return comparedKDA;
        } else if (sortCriterion === "KDA") {
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

    // don't touch the comment below! it is to remove the warning message.
    // eslint-disable-next-line
  }, [sortCriterion, isDescending]);

  return (
    <div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        {sortButtonList.map((data) => (
          <SortButton
            key={data.id}
            id={data.id}
            criterion={data.criterion}
            sortCriterion={sortCriterion}
            sortChampions={sortChampions}
            isDescending={isDescending}
          />
        ))}
      </div>

      {sortedChampions.map(([key, value]) => (
        <ChampionSummary
          key={key}
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
