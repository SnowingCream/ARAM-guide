import Form from "react-bootstrap/Form";

const region = "Region";
// const tag = "tag";

const region_list = [
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

function createList(content) {
  return (
    // <li>
    //   <a class="dropdown-item" href="#">
    //     {content.full}
    //   </a>
    // </li>
    <option>{content.full}</option>
  );
}

function BodyTest() {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold text-body-emphasis">ARAM Guide</h1>
      <div class="col-lg-8 mx-auto">
        <p class="lead mb-4">
          Track your ARAM records, or find the popular builds for champions.
        </p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          {/* <div class="dropdown">
            <button
              class="btn btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Region
            </button>
            <ul class="dropdown-menu">{region_list.map(createList)}</ul>
           
          </div> */}
          <select class="form-select" aria-label="Default select example">
            <option selected>Region</option>
            {region_list.map(createList)}
          </select>
          <Form.Control type="text" id="homeInput" placeholder="Player Name" />
          <p class="lead mb-2 mx-3"> or </p>
          <Form.Control type="text" id="homeInput" placeholder="Champion" />
        </div>
        <button
          class="btn btn-secondary col-12 my-4"
          type="button"
          data-bs-toggle="button"
          aria-pressed="false"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default BodyTest;
