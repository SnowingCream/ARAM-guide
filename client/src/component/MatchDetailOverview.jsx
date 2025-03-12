import {
  round,
  getChampionImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getSpellImageLocation,
  getItemImageLocation,
  masterpiece,
} from "../asset/var.js";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

function MatchDetailOverview(props) {
  const player = props.data;

  return (
    <div className="row align-items-center justify-content-center my-2">
      <div className="col-2">
        <img
          className=" champion-img"
          src={getChampionImageLocation(player.champion)}
          alt="champion"
        />
      </div>
      <div className="col-2">
        <div className="row">
          <img
            className="rune-spell-img-small col-6"
            src={getPrimaryRuneImageLocation(player.primaryRune)}
            alt="primary rune"
          />
          <img
            className="rune-spell-img-small col-6"
            src={getSecondRuneStyleImageLocation(player.secondaryRuneStyle)}
            alt="secondary rune style"
          />
        </div>
        <div className="row">
          <img
            className="rune-spell-img-small col-6"
            src={getSpellImageLocation(player.spell1)}
            alt="spell 1"
          />

          <img
            className="rune-spell-img-small col-6"
            src={getSpellImageLocation(player.spell2)}
            alt="spell 2"
          />
        </div>
      </div>

      <div className="col-5 align-items-center justify-content-center">
        <div className="row">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="tooltip">{`${player.userName} #${player.tag}`}</Tooltip>
            }
          >
            <p className="mb-0 text-truncate">{`${player.userName}`}</p>
          </OverlayTrigger>
        </div>
        <div className="col d-flex align-items-center justify-content-center">
          <div className="row item-grid-one-row">
            {player.items.map((code, idx) => {
              if (code === 0) return null; // Skip rendering if code is 0

              // Check if the code exists in masterpiece map
              const isMasterpiece = masterpiece.has(code);
              const itemCode = isMasterpiece ? masterpiece.get(code) : code;

              return (
                <div key={idx} className="col-2 px-0 position-relative">
                  {/* Base Item Image */}
                  <img
                    className="item-img-small"
                    src={getItemImageLocation(itemCode)}
                    alt={`item ${idx + 1}`}
                  />

                  {/* Overlaying Border Image if it's a masterpiece item */}
                  {isMasterpiece && (
                    <img
                      className="item-img-small item-overlay position-absolute top-0 start-0 w-100 h-100"
                      src={"asset/img/BorderTreatmentOrnn.png"}
                      alt="Masterpiece Border"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="col-3 mb-0">
        <span>{player.kill}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "maroon" }}>{player.death}</span>
        &nbsp;/&nbsp;
        <span>{player.assist}</span>
        <br />
        KDA:&nbsp;
        {round((player.kill + player.assist) / player.death, 2, false)}
      </p>
    </div>
  );
}

export default MatchDetailOverview;
