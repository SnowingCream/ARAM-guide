import React, { useState, useEffect } from "react";
import ChampionSummary from "./ChampionSummary.jsx";
import SortButton from "./SortButton.jsx";
import { sortButtonList, round } from "../asset/var.js";

function ChampionSummaryContainer({
  matchRecords,
  selectedDate,
  selectedChampion,
  onChampionClick,
}) {
  const [sortedChampions, setSortedChampions] = useState([]);
  const [sortCriterion, setSortCriterion] = useState("numberOfPlays");
  const [isDescending, setIsDescending] = useState(true);

  useEffect(() => {
    // empty data guard
    if (!matchRecords || matchRecords.length === 0) {
      setSortedChampions([]);
      return;
    }

    // Dynamically recompute champion stats
    const dynamicChampionRecords = new Map();

    matchRecords.forEach((record) => {
      // check if selected date matches.
      const recordDate = new Date(record.gameStart);
      const recordKeyDate =
        recordDate.getFullYear().toString() +
        " / " +
        recordDate.getMonth().toString() +
        " / " +
        recordDate.getDate().toString();

      if (selectedDate && recordKeyDate !== selectedDate) return;

      // calculate stat of matching champions
      record.playerRecords.forEach((player) => {
        if (player.user) {
          const champ = player.champion;
          const existing = dynamicChampionRecords.get(champ) || {
            win: 0,
            lose: 0,
            kill: 0,
            death: 0,
            assist: 0,
          };

          if (player.win) {
            existing.win++;
          } else {
            existing.lose++;
          }

          existing.kill += player.kill;
          existing.death += player.death;
          existing.assist += player.assist;

          dynamicChampionRecords.set(champ, existing);
        }
      });
    });

    // sorting
    const championArray = Array.from(dynamicChampionRecords);

    const sortedArray = championArray.sort((a, b) => {
      const championA = isDescending ? b[1] : a[1];
      const championB = isDescending ? a[1] : b[1];

      const comparedNumberOfPlays =
        championA.win + championA.lose - (championB.win + championB.lose);
      const comparedWinningRate =
        round(championA.win / (championA.win + championA.lose), 2) -
        round(championB.win / (championB.win + championB.lose), 2);
      const comparedKDA =
        round((championA.kill + championA.assist) / championA.death, 2) -
        round((championB.kill + championB.assist) / championB.death, 2);

      if (sortCriterion === "numberOfPlays") {
        if (comparedNumberOfPlays !== 0) return comparedNumberOfPlays;
        if (comparedWinningRate !== 0) return comparedWinningRate;
        return comparedKDA;
      } else if (sortCriterion === "winningRate") {
        if (comparedWinningRate !== 0) return comparedWinningRate;
        if (comparedNumberOfPlays !== 0) return comparedNumberOfPlays;
        return comparedKDA;
      } else if (sortCriterion === "KDA") {
        if (comparedKDA !== 0) return comparedKDA;
        if (comparedNumberOfPlays !== 0) return comparedNumberOfPlays;
        return comparedWinningRate;
      } else {
        return 0;
      }
    });

    setSortedChampions(sortedArray);
  }, [matchRecords, selectedDate, sortCriterion, isDescending]);

  // Sorting button handler
  function sortChampions(criterion) {
    // if sorting button is selected and clicked twice, flip the sorting order.
    if (sortCriterion === criterion) {
      setIsDescending(!isDescending);
      // if sorting button is selected for the first time, default sorting order is descending.
    } else {
      setSortCriterion(criterion);
      setIsDescending(true);
    }
  }

  // Apply champion filter (show only selected if applied)
  const visibleChampions = selectedChampion
    ? sortedChampions.filter(([key]) => key === selectedChampion)
    : sortedChampions;

  return (
    <div className="mx-auto">
      <div
        className="btn-group mb-3"
        role="group"
        aria-label="Sorting toggle button group"
      >
        {sortButtonList.map((data) => (
          <SortButton
            key={data.id}
            id={data.id}
            criterion={data.criterion}
            label={data.label}
            sortCriterion={sortCriterion}
            sortChampions={sortChampions}
            isDescending={isDescending}
          />
        ))}
      </div>

      {visibleChampions.map(([key, value]) => (
        <div
          key={key}
          onClick={() => onChampionClick(selectedChampion === key ? null : key)}
          style={{
            border: "none",
            cursor: "pointer",
          }}
        >
          <ChampionSummary
            name={key}
            win={value.win}
            lose={value.lose}
            kill={value.kill}
            death={value.death}
            assist={value.assist}
          />
        </div>
      ))}
    </div>
  );
}

export default ChampionSummaryContainer;
