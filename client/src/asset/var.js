import champion from "./data_dragon/champion.json";
import spell from "../asset/data_dragon/summoner.json";
import rune from "../asset/data_dragon/runesReforged.json";

/*
full: region option display
abbr: region acronym. Not sure where it can be used, but let's keep it for now.
abbrWithNum: default tag display
accountServer: api endpoint component for the account call (1st call)
  - choose the closest among america, asia, europe
matchServer: api endpoint component for the match call (2nd and 3rd call)
  - america: NA, BR, LAN, LAS
  - asia: KR, JP
  - europe: EUNE, EUW, ME1, TR, RU
  - sea: OCE, SG2 (TH2 & PH2), TW2, VN2
*/

/*
 */
const regionList = [
  {
    full: "North America",
    abbr: "NA",
    abbrWithNum: "NA1",
    accountServer: "americas",
    matchServer: "americas",
  },
  {
    full: "Brazil",
    abbr: "BR",
    abbrWithNum: "BR1",
    accountServer: "americas",
    matchServer: "americas",
  },
  {
    full: "Europe Nordic & East",
    abbr: "EUNE",
    abbrWithNum: "EUN1",
    accountServer: "europe",
    matchServer: "europe",
  },
  {
    full: "Europe West",
    abbr: "EUW",
    abbrWithNum: "EUW1",
    accountServer: "europe",
    matchServer: "europe",
  },
  {
    full: "Japan",
    abbr: "JP",
    abbrWithNum: "JP1",
    accountServer: "asia",
    matchServer: "asia",
  },
  {
    full: "Korea",
    abbr: "KR",
    abbrWithNum: "KR1",
    accountServer: "asia",
    matchServer: "asia",
  },
  {
    full: "Latin America North",
    abbr: "LAN",
    abbrWithNum: "LA1",
    accountServer: "americas",
    matchServer: "americas",
  },
  {
    full: "Latin America South",
    abbr: "LAS",
    abbrWithNum: "LA2",
    accountServer: "americas",
    matchServer: "americas",
  },
  {
    full: "Middle East",
    abbr: "ME",
    abbrWithNum: "ME1",
    accountServer: "europe",
    matchServer: "europe",
  },
  {
    full: "Oceania",
    abbr: "OCE",
    abbrWithNum: "OCE",
    accountServer: "asia",
    matchServer: "sea",
  },
  // merged to SG2
  // {
  //   full: "Philippine",
  //   abbr: "PH",
  //   abbrWithNum: "PH2",
  // },
  {
    full: "Russia",
    abbr: "RU",
    abbrWithNum: "RU1",
    accountServer: "europe",
    matchServer: "europe",
  },
  {
    full: "Singapore, Malaysia & Indonesia",
    abbr: "SG",
    abbrWithNum: "SG2",
    accountServer: "asia",
    matchServer: "sea",
  },
  {
    full: "Taiwan, Hong Kong & Macao",
    abbr: "TW",
    abbrWithNum: "TW2",
    accountServer: "asia",
    matchServer: "sea",
  },
  // merged to SG2
  // {
  //   full: "Thailand",
  //   abbr: "TH",
  //   abbrWithNum: "TH2",
  // },
  {
    full: "Turkey",
    abbr: "TR",
    abbrWithNum: "TR1",
    accountServer: "europe",
    matchServer: "europe",
  },
  {
    full: "Vietnam",
    abbr: "VN",
    abbrWithNum: "TR2",
    accountServer: "asia",
    matchServer: "sea",
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
  round,
  getChampionImageLocation,
  getSpellImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getItemImageLocation,
};
