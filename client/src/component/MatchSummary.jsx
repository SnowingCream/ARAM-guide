import champion from "../asset/data_dragon/champion.json";
import rune from "../asset/data_dragon/runesReforged.json";
import spell from "../asset/data_dragon/summoner.json";
import { ICON_SIZE_BIG, ICON_SIZE_SMALL, round } from "../asset/var.js";

function MatchSummary(props) {
  const match = props.data;

  const championLocationFront = "asset/img/champion/";
  const runeLocationFront = "asset/img/";
  const spellLocationFront = "asset/img/spell/";

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

  function getSpellLocation(code, spellLocationFront) {
    for (let spellName in spell.data) {
      // console.log(spellName);
      if (code.toString() === spell.data[spellName].key) {
        return spellLocationFront + spell.data[spellName].image.full;
      }
    }

    console.log(`Failed to find any spell match with given code: ${code}`);
  }

  function getPrimaryRuneLocation(code, runeLocationFront) {
    // Hail of Blades -> doesn't follow the logic below (exception)
    if (code === 9923) {
      return (
        runeLocationFront +
        "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png"
      );
    }

    const codeId = Math.floor(code / 100) * 100;

    for (let i = 0; i < rune.length; i++) {
      if (codeId === rune[i].id) {
        for (let j = 0; j < rune[i].slots[0].runes.length; j++) {
          if (code === rune[i].slots[0].runes[j].id) {
            return runeLocationFront + rune[i].slots[0].runes[j].icon;
          }
        }
      }
    }
    console.log(
      `Failed to find any primary rune match with given code: ${code}`
    );
  }

  function getSecondRuneStyleLocation(code, runeLocationFront) {
    for (let i = 0; i < rune.length; i++) {
      if (code === rune[i].id) {
        return runeLocationFront + rune[i].icon;
      }
    }
    console.log(
      `Failed to find any secondary rune style match with given code: ${code}`
    );
  }

  return (
    // update color in the future
    <div className={`row ${user.win ? "bg-primary" : "bg-danger"}`}>
      <div className="col-2">
        <img
          className="champion-img "
          src={championLocationFront + champion.data[user.champion].image.full}
          width={ICON_SIZE_BIG}
          height={ICON_SIZE_BIG}
          alt="..."
        />
      </div>
      <div className="col-4">
        <div className="row">
          <img
            className="rune-spell-img col-6"
            src={getPrimaryRuneLocation(user.primaryRune, runeLocationFront)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
          <img
            className="rune-spell-img col-6"
            src={getSecondRuneStyleLocation(
              user.secondaryRuneStyle,
              runeLocationFront
            )}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
        </div>
        <div className="row">
          <img
            className="rune-spell-img col-6"
            src={getSpellLocation(user.spell1, spellLocationFront)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />

          <img
            className="rune-spell-img col-6"
            src={getSpellLocation(user.spell2, spellLocationFront)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
        </div>
      </div>

      <p className="col">
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
