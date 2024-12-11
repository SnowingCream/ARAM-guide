import champion from "./data_dragon/champion.json";
import spell from "../asset/data_dragon/summoner.json";
import rune from "../asset/data_dragon/runesReforged.json";
// import item from "../asset/data_dragon/item.json";

const regionList = [
  {
    full: "North America",
    abbr: "NA",
    abbrWithNum: "NA1",
  },
  {
    full: "Brazil",
    abbr: "BR",
    abbrWithNum: "BR1",
  },
  {
    full: "Europe Nordic & East",
    abbr: "EUNE",
    abbrWithNum: "EUN1",
  },
  {
    full: "Europe West",
    abbr: "EUW",
    abbrWithNum: "EUW1",
  },
  {
    full: "Japan",
    abbr: "JP",
    abbrWithNum: "JP1",
  },
  {
    full: "Korea",
    abbr: "KR",
    abbrWithNum: "KR1",
  },
  {
    full: "Latin America North",
    abbr: "LAN",
    abbrWithNum: "LA1",
  },
  {
    full: "Latin America South",
    abbr: "LAS",
    abbrWithNum: "LA2",
  },
  {
    full: "Middle East",
    abbr: "ME",
    abbrWithNum: "ME1",
  },
  {
    full: "Oceania",
    abbr: "OCE",
    abbrWithNum: "OCE",
  },
  {
    full: "Philippine",
    abbr: "PH",
    abbrWithNum: "PH2",
  },
  {
    full: "Russia",
    abbr: "RU",
    abbrWithNum: "RU1",
  },
  {
    full: "Singapore, Malaysia & Indonesia",
    abbr: "SG",
    abbrWithNum: "SG2",
  },
  {
    full: "Taiwan, Hong Kong & Macao",
    abbr: "TW",
    abbrWithNum: "TW2",
  },
  {
    full: "Thailand",
    abbr: "TH",
    abbrWithNum: "TH2",
  },
  {
    full: "Turkey",
    abbr: "TR",
    abbrWithNum: "TR1",
  },
  {
    full: "Vietnam",
    abbr: "VN",
    abbrWithNum: "TR2",
  },
];

const sortButtonList = [
  {
    id: "btnradio1",
    criterion: "numberOfPlays",
    label: "# Games",
  },
  {
    id: "btnradio2",
    criterion: "winningRate",
    label: "Winning Rate",
  },
  {
    id: "btnradio3",
    criterion: "KDA",
    label: "KDA",
  },
];

// these are not working... the actual size is handled at App.css
const ICON_SIZE_BIG = 48;
const ICON_SIZE_SMALL = 24;

function round(value, digitAfterDecimal, percent = true) {
  if (percent) {
    return (
      Math.round(value * 10 ** (digitAfterDecimal + 2)) /
      10 ** digitAfterDecimal
    );
  } else {
    return (
      Math.round(value * 10 ** digitAfterDecimal) / 10 ** digitAfterDecimal
    );
  }
}

// functions below work based on the assumption that the location of file that imports these are under components folder (direct child of it)

function getChampionImageLocation(championName) {
  const championImageLocationFront = "asset/img/champion/";

  return championImageLocationFront + champion.data[championName].image.full;
}

function getSpellImageLocation(code) {
  const spellLocationFront = "asset/img/spell/";

  for (let spellName in spell.data) {
    // console.log(spellName);
    if (code.toString() === spell.data[spellName].key) {
      return spellLocationFront + spell.data[spellName].image.full;
    }
  }

  // console.log(`Failed to find any spell match with given code: ${code}`);
}

function getPrimaryRuneImageLocation(code) {
  const runeLocationFront = "asset/img/";
  // Hail of Blades -> doesn't follow the logic below (exception)
  if (code === 9923) {
    return (
      runeLocationFront +
      "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png"
    );
  }

  // ~~ stands for Math.floor
  const codeId = ~~(code / 100) * 100;

  for (let i = 0; i < rune.length; i++) {
    if (codeId === rune[i].id) {
      for (let j = 0; j < rune[i].slots[0].runes.length; j++) {
        if (code === rune[i].slots[0].runes[j].id) {
          return runeLocationFront + rune[i].slots[0].runes[j].icon;
        }
      }
    }
  }
  console.log(`Failed to find any primary rune match with given code: ${code}`);
}

function getSecondRuneStyleImageLocation(code) {
  const runeLocationFront = "asset/img/";

  for (let i = 0; i < rune.length; i++) {
    if (code === rune[i].id) {
      return runeLocationFront + rune[i].icon;
    }
  }
  console.log(
    `Failed to find any secondary rune style match with given code: ${code}`
  );
}

// fast track? if finds error go back to the traditional way using json
function getItemImageLocation(code) {
  if (code === 0) {
    return null;
  }

  return `asset/img/item/${code}.png`;
}

export {
  regionList,
  sortButtonList,
  ICON_SIZE_BIG,
  ICON_SIZE_SMALL,
  round,
  getChampionImageLocation,
  getSpellImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getItemImageLocation,
};
