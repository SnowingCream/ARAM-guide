import React, { useState } from "react";
import ImportedCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../asset/App.css";
import { round } from "../asset/var.js";

function Calendar(props) {
  const [value, setValue] = useState(new Date());
  // const [view, setView] = useState("month");
  // const [activeStartDate, setActiveStartDate] = useState(new Date());

  // map with key: keyDate, values: win and lose of the keyDate
  const dailyRecords = props.userData.dailyRecords;

  // extract keyDate from date object
  function getKeyDate(date) {
    return date.getMonth().toString() + " / " + date.getDate().toString();
  }

  // compute the winning rate of the given rate.
  function getWinningRate(date) {
    const win = dailyRecords.get(getKeyDate(date)).win;
    const lose = dailyRecords.get(getKeyDate(date)).lose;

    return round(win / (win + lose), 1);
  }

  function onChange(nextValue) {
    setValue(nextValue);
  }

  const currentYear = new Date().getFullYear();
  const minDate = new Date(currentYear, 0, 1); // January 1st of the current year
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
      // activeStartDate={activeStartDate}
      // onDrillDown={(date) => {
      //   setView("month");
      //   setActiveStartDate(date);
      // }}
      // onDrillUp={() => setView("year")}
      // onDrillDown={console.log("or this")}
      // maxDetail="month"
      calendarType="gregory"
      // if there is a record for the given day, show win, lose, and winning rate.
      tileContent={({ date, view }) =>
        view === "month" && dailyRecords.get(getKeyDate(date)) ? (
          <p>
            <span style={{ color: "blue" }}>
              {dailyRecords.get(getKeyDate(date)).win}
            </span>
            &nbsp;/&nbsp;
            <span style={{ color: "red" }}>
              {dailyRecords.get(getKeyDate(date)).lose}
            </span>
            <br />
            {getWinningRate(date)}%
          </p>
        ) : // console.log(
        //   userData.dailyRecords.get(
        //     date.getMonth().toString() +
        //       " / " +
        //       date.getDate().toString()
        //   )
        // )
        null
      }
      // disable dates without record -> for date-based filtering feature in the future.
      tileDisabled={({ date }) =>
        dailyRecords.get(getKeyDate(date)) === undefined
      }
    />
  );
}

export default Calendar;
