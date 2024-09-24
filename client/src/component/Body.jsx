import { useState } from "react";
import { region_list } from "../asset/var";

function createList(content, idx) {
  return (
    <option value={idx.toString() + "_" + content.abbrWithNum}>
      {content.full}
    </option>
  );
}

function Body() {
  const [placeHolder, setPlaceHolder] = useState("Player Name#Tag");

  function updatePlaceHolder() {
    console.log(document.getElementById("region").value.split("_")[0]);
    console.log(document.getElementById("selected").value);

    const idx = parseInt(document.getElementById("region").value.split("_")[0]);

    setPlaceHolder("Player Name#" + region_list[idx].abbrWithNum);
  }

  return (
    <div class="container px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold text-body-emphasis">ARAM Guide</h1>
      <div class="col-lg-8 mx-auto">
        <p class="lead mb-4">
          Check out most popular ARAM builds for champions, and track your ARAM
          records.
        </p>
        <input
          type="text"
          class="form-control col-sm"
          id="info-email"
          placeholder="Champion"
        />
        <p class="lead my-2 mx-3 pb-1"> or </p>
        <div class="row d-sm-flex justify-content-sm-center">
          <div class="col-3 px-2">
            <select
              id="region"
              name="region"
              onChange={updatePlaceHolder}
              class="form-select"
              aria-label="Default select example"
            >
              <option selected id="selected">
                Region
              </option>
              {region_list.map(createList)}
            </select>
          </div>
          <div class="col-9">
            <input
              type="text"
              class="form-control col-6"
              id="info-email"
              placeholder={placeHolder}
            />
          </div>
        </div>
        <small>
          If you are unsure about your tag, choosing your region may be
          sufficient.
        </small>

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

export default Body;
