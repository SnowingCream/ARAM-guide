import champion from "../asset/data_dragon/champion.json";
import rune from "../asset/data_dragon/runesReforged.json";
import { ICON_SIZE, round } from "../asset/var.js";

function MatchSummary(props) {
  const match = props.data;

  const champion_location_front = "asset/img/champion/";

  const teamWin = [];
  const teamLose = [];
  let userIndex;

  for (let i = 0; i < 10; i++) {
    if (match[i].win) {
      teamWin.push(match[i]);
    } else {
      teamLose.push(match[i]);
    }
    if (match[i].user) {
      userIndex = i;
    }
  }

  const user = match[userIndex];

  function findSpellLocation(code) {
    const rune_location_front = "asset/img/";

    for (let i = 0; i < rune.length; i++) {
      if (code === rune[i].id) {
        console.log(`found the match: ${rune_location_front + rune[i].icon}`);
        return rune_location_front + rune[i].icon;
      }
    }

    console.log("Failed to find any match");
  }

  return (
    // update color in the future
    <div className={`row ${user.win ? "bg-primary" : "bg-danger"}`}>
      <img
        className="champion-img col-2"
        src={champion_location_front + champion.data[user.champion].image.full}
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt="..."
      />

      <img
        className="champion-img col-2"
        src={findSpellLocation(user.primaryRune)}
        width={ICON_SIZE}
        height={ICON_SIZE}
        alt="..."
      />

      <p className="col-5">
        <span>{user.kill}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "maroon" }}>{user.death}</span>
        &nbsp;/&nbsp;
        <span>{user.assist}</span>
        <br />
        KDA:&nbsp;
        {round((user.kill + user.assist) / user.death, 2, false)}
      </p>

      {/* ------- the code below is the starting point of details description of each match*/}
      {/* <ul className="col-6"> */
      /* {teamWin.map((player) => (
          <li className="row">
            <img
              className="champion-img col-2"
              src={
                src_location_front + champion.data[player.champion].image.full
              }
              width={10}
              height={10}
            />
            <p>{player.userName}</p>
          </li>
        ))}
      </ul>

      <ul className="col-6">
        {teamLose.map((player) => (
          <li className="row">
            <img
              className="champion-img col-2"
              src={
                src_location_front + champion.data[player.champion].image.full
              }
              width={10}
              height={10}
            />
            <p>{player.userName}</p>
          </li>
        ))}
      </ul>
      {match.map((data) => (
        <div>
          <p>{data.userName}</p>
          <p>{data.champion}</p>
          <p>{data.win}</p>
        </div>
      ))} */}
    </div>
  );
}

export default MatchSummary;
