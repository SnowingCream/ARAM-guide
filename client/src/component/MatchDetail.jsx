import {
  ICON_SIZE_BIG,
  ICON_SIZE_SMALL,
  round,
  getChampionImageLocation,
  getPrimaryRuneImageLocation,
  getSecondRuneStyleImageLocation,
  getSpellImageLocation,
  getItemImageLocation,
} from "../asset/var.js";

function MatchDetail(props) {
  const player = props.data;

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-2">
        <img
          className=" champion-img"
          src={getChampionImageLocation(player.champion)}
          width={ICON_SIZE_BIG}
          height={ICON_SIZE_BIG}
          alt="..."
        />
      </div>
      <div className="col-2">
        <div className="row">
          <img
            className="rune-spell-img col-6"
            src={getPrimaryRuneImageLocation(player.primaryRune)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
          <img
            className="rune-spell-img col-6"
            src={getSecondRuneStyleImageLocation(player.secondaryRuneStyle)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
        </div>
        <div className="row">
          <img
            className="rune-spell-img col-6"
            src={getSpellImageLocation(player.spell1)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />

          <img
            className="rune-spell-img col-6"
            src={getSpellImageLocation(player.spell2)}
            width={ICON_SIZE_SMALL}
            height={ICON_SIZE_SMALL}
            alt="..."
          />
        </div>
      </div>

      <p className="col-2"> {`${player.userName} #${player.tag}`}</p>

      <div className="col-3">
        {player.items.map((code) =>
          code !== 0 ? (
            <img
              className="item-img"
              src={getItemImageLocation(code)}
              width={ICON_SIZE_SMALL}
              height={ICON_SIZE_SMALL}
              alt="..."
            />
          ) : null
        )}
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

export default MatchDetail;
