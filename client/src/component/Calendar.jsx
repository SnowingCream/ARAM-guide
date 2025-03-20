import React, { useState } from "react";
import ImportedCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../asset/App.css";
import { round } from "../asset/var.js";

function Calendar({
  matchRecords,
  selectedDate,
  selectedChampion,
  onDateClick,
}) {
  const [value, setValue] = useState(new Date());

  // extract keyDate from date object
  function getKeyDate(date) {
    return (
      date.getFullYear().toString() +
      " / " +
      date.getMonth().toString() +
      " / " +
      date.getDate().toString()
    );
  }

  function onChange(nextValue) {
    setValue(nextValue);

    const clickedKeyDate = getKeyDate(nextValue);
    if (selectedDate === clickedKeyDate) {
      onDateClick(null); // remove filter if the date is clicked again
    } else {
      onDateClick(clickedKeyDate); // notify parent if the date is clicked for the first time
    }
  }

  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear - 1, 0, 1); // January 1st of the current year
  const maxDate = new Date(currentYear, 11, 31);

  return (
    <ImportedCalendar
      className="mx-auto"
      onChange={onChange}
      // view={view}
      value={value}
      prev2Label={null}
      next2Label={null}
      minDate={minDate}
      maxDate={maxDate}
      minDetail="month"
      calendarType="gregory"
      // if there is a record for the given day, show win, lose, and winning rate.
      tileContent={({ date, view }) => {
        if (view !== "month") return null; // only apply on month view

        const keyDate = getKeyDate(date);

        let win = 0;
        let lose = 0;

        // Go through all filtered match records
        matchRecords.forEach((record) => {
          const recordDate = new Date(record.gameStart);
          const recordKeyDate =
            recordDate.getFullYear().toString() +
            " / " +
            recordDate.getMonth().toString() +
            " / " +
            recordDate.getDate().toString();

          // If date doesn't match → skip
          if (recordKeyDate !== keyDate) return;

          // Go through player records in that match
          record.playerRecords.forEach((player) => {
            if (player.user) {
              // Apply champion filter (if any)
              if (!selectedChampion || player.champion === selectedChampion) {
                if (player.win) {
                  win++;
                } else {
                  lose++;
                }
              }
            }
          });
        });

        // If no games → return null → nothing displayed
        if (win + lose === 0) {
          return null;
        }

        // Calculate win rate
        const winRate = round(win / (win + lose), 1);

        return (
          <p style={{ fontSize: "0.75rem", margin: 0 }}>
            <span style={{ color: "blue" }}>{win}</span>
            &nbsp;/&nbsp;
            <span style={{ color: "red" }}>{lose}</span>
            <br />
            {winRate}%
          </p>
        );
      }}
      tileDisabled={({ date }) => {
        const keyDate = getKeyDate(date);
        const hasRecord = matchRecords.some((record) => {
          const recordDate = new Date(record.gameStart);
          const recordKeyDate =
            recordDate.getFullYear().toString() +
            " / " +
            recordDate.getMonth().toString() +
            " / " +
            recordDate.getDate().toString();

          return recordKeyDate === keyDate;
        });

        return !hasRecord;
      }}
      tileClassName={({ date, view }) => {
        if (view !== "month") return null;
        const keyDate = getKeyDate(date);
        if (selectedDate === keyDate) {
          return "selected-date";
        }
        return null;
      }}
    />
  );
}

export default Calendar;
