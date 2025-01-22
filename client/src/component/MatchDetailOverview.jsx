import {
  round,
  getChampionImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getSpellImageLocation,
  getItemImageLocation,
} from "../asset/var.js";

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

      <div className="col-5">
        <div className="row">
          <p className="mb-0">{`${player.userName} #${player.tag}`}</p>
        </div>
        <div className="row">
          <div className="col">
            {player.items.map((code) =>
              code !== 0 ? (
                <img
                  className="item-img-small"
                  src={getItemImageLocation(code)}
                  alt={`item ${code.index}`}
                />
              ) : null
            )}
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
