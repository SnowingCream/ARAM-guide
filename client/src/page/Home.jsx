import { useState } from "react";
import { regionList } from "../asset/var";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// helper function of map() to generate options for region selection
function createOptions(content, idx) {
  return (
    // the form of value is <index of input list_default tag of the region
    // index of input list is used to provide key for each option and will be used to update the default tag
    // the default tag will be sent with post request if user doesn't provide a tag
    <option key={idx} value={idx.toString() + "_" + content.abbrWithNum}>
      {content.full}
    </option>
  );
}

// shake function for the button in case of invalid input provided.
function stopShake() {
  document.getElementById("search-button").classList.remove("apply-shake");
}

function Body() {
  const navigate = useNavigate();

  // comeback later
  // const callRoot = async () => {
  //   axios.get("/api").then((res) => console.log(res.data.test));
  // };
  // const callChampion = async () => {
  //   axios.get("/api/champion").then((res) => console.log(res.data.test));
  // };

  // const callPlayer = async (data) => {
  //   console.log("sending data: ", data);
  //   axios.post(`/api/player/${data.name}#${data.tag}`, data).then((res) => {
  //     console.log(res.data);
  //     navigate(`/player/${data.name}#${data.tag}`, { state: res.data });
  //   });
  // };

  const callPlayer = async (data) => {
    console.log("sending data: ", data);
    axios.post("/api/player", data).then((res) => {
      console.log(res.data);

      // const final_address = `/player/${data.name}#${data.tag}`;
      // navigate(final_address, { state: res.data });
      navigate("/player", { state: res.data });
    });
  };

  // effect runs after DOM is rendered.
  // test purpose now, once button is connetecd to the function this will be removed.
  useEffect(() => {
    // callRoot();
    // callChampion();
    // callPlayer();
  }, []);

  // states for hook
  const [defaultTag, setDefaultTag] = useState("NA1");
  const [warningMessage, setWarningMessage] = useState(
    "Default warning message"
  );

  // update default tag per region based on user's selection
  function updateDefaultTag() {
    // fetch the index of selected region
    const idx = parseInt(document.getElementById("region").value.split("_")[0]);

    setDefaultTag(regionList[idx].abbrWithNum);
  }

  // response function for serach button
  function handleSearch() {
    // fetch required elements
    const warningMessageTag = document.getElementById("warning-message");
    const searchButton = document.getElementById("search-button");

    const championInputValue = document
      .getElementById("input-champion")
      .value.trim();
    const playerInputValue = document
      .getElementById("input-player")
      .value.trim();

    const dataToSend = {};

    // invalid case 1: both fields filled
    if (championInputValue && playerInputValue) {
      setWarningMessage("Please fill out only one of the input fields.");
      warningMessageTag.style.display = "inline";
      searchButton.classList.add("apply-shake");
      // invalid case 2: neither fields filled
    } else if (!championInputValue && !playerInputValue) {
      setWarningMessage("Please fill out at least one of the input fields.");
      warningMessageTag.style.display = "inline";
      searchButton.classList.add("apply-shake");
      // valid case 1: champion build search
    } else if (championInputValue) {
      setWarningMessage(
        "Valid search, but champion build feature has not been implemented yet."
      );
      warningMessageTag.style.display = "inline";
      // valid case 2: player record search
      // these 2 variables are sufficient for user search and match shistory serach.
    } else {
      // user has non-default tag
      if (playerInputValue.includes("#")) {
        dataToSend.name = playerInputValue.split("#")[0];
        dataToSend.tag = playerInputValue.split("#")[1];
        console.log("tag provided");
      }

      // user has not provided a tag
      else {
        dataToSend.name = playerInputValue;
        dataToSend.tag = defaultTag;
        console.log("tag not provided");
      }
      console.log(dataToSend);
      callPlayer(dataToSend);
    }
  }

  return (
    <div className="container px-3 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">ARAM Guide</h1>
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
      <div className="row g-0 d-sm-flex justify-content-sm-center">
        <div className="col-xxl-3 col-lg-4 col-md-5">
          <select
            id="region"
            name="region"
            onChange={updateDefaultTag}
            className="form-select"
            aria-label="Default select example"
            defaultValue="0_NA1"
          >
            {regionList.map(createOptions)}
          </select>
        </div>
        <div className="col-xxl-9 col-lg-8 col-md-7">
          <input
            type="text"
            className="form-control col-6"
            id="input-player"
            placeholder={"Player Name#" + defaultTag}
          />
        </div>
      </div>
      <small>
        If you are unsure about your tag, choosing the region may be sufficient.
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
  );
}

export default Body;
