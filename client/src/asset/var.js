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

export { regionList, sortButtonList, ICON_SIZE_BIG, ICON_SIZE_SMALL, round };
