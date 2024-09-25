import { useState } from "react";
import { region_list } from "../asset/var";

function createList(content, idx) {
  return (
    <option key={idx} value={idx.toString() + "_" + content.abbrWithNum}>
      {content.full}
    </option>
  );
}

function createAbbrList(content, idx) {
  return <option key={idx}>{content.abbr}</option>;
}

function stopShake() {
  document.getElementById("search-button").classList.remove("apply-shake");
}

function Body() {
  const [placeHolder, setPlaceHolder] = useState("Player Name#NA1");
  const [warningMessage, setWarningMessage] = useState(
    "Default warning message"
  );

  function updatePlaceHolder() {
    console.log(document.getElementById("region2").value);

    const idx = parseInt(
      document.getElementById("region2").value.split("_")[0]
    );

    setPlaceHolder("Player Name#" + region_list[idx].abbrWithNum);

    document.getElementById("region1").selectedIndex =
      document.getElementById("region2").selectedIndex;

    document.getElementById("region2").style.display = "none";
    document.getElementById("region1").style.display = "inline-block";
  }

  function handleSearch() {
    const warningMessageTag = document.getElementById("warning-message");
    const searchButton = document.getElementById("search-button");

    const championInputValue = document
      .getElementById("input-champion")
      .value.trim();
    const playerInputValue = document
      .getElementById("input-player")
      .value.trim();

    if (championInputValue && playerInputValue) {
      setWarningMessage("Please fill out just one of the input fields.");
      warningMessageTag.style.display = "inline";
      searchButton.classList.add("apply-shake");
    } else if (!championInputValue && !playerInputValue) {
      setWarningMessage("Please fill out at least one of the input fields.");
      warningMessageTag.style.display = "inline";
      searchButton.classList.add("apply-shake");
    } else {
      // post request starts here
      setWarningMessage("Valid search, we will process your request shortly.");
      warningMessageTag.style.display = "inline";
    }
  }

  return (
    <div className="container px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">ARAM Guide</h1>
      <div className="col-lg-8 mx-auto">
        <p className="lead mb-4">
          Check out most popular ARAM builds for champions, and track your ARAM
          records.
        </p>
        <input
          type="text"
          className="form-control col-sm"
          id="input-champion"
          placeholder="Champion"
        />
        <p className="lead my-2 mx-3 pb-1"> or </p>
        <div className="row d-sm-flex justify-content-sm-center">
          <div className="col-3 px-2">
            <select
              id="region2"
              name="region"
              onChange={updatePlaceHolder}
              className="form-select"
              aria-label="Default select example"
              defaultValue="0_NA1"
            >
              {region_list.map(createList)}
            </select>

            <select
              id="region1"
              name="region"
              onMouseOver={() => {
                document.getElementById("region2").style.display =
                  "inline-block";
                document.getElementById("region1").style.display = "none";
              }}
              className="form-select"
              aria-label="Default select example"
              // defaultValue="0_NA1"
            >
              {region_list.map(createAbbrList)}
            </select>
          </div>
          <div className="col-9">
            <input
              type="text"
              className="form-control col-6"
              id="input-player"
              placeholder={placeHolder}
            />
          </div>
        </div>
        <small>
          If you are unsure about your tag, choosing the region may be
          sufficient.
        </small>

        <button
          id="search-button"
          className="btn btn-secondary col-12 my-4"
          type="submit"
          onClick={handleSearch}
          onAnimationEnd={stopShake}
          data-bs-toggle="button"
          aria-pressed="false"
        >
          Search
        </button>
        <small id="warning-message">{warningMessage}</small>
      </div>
    </div>
  );
}

export default Body;
