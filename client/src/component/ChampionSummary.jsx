import { round, getChampionImageLocation } from "../asset/var.js";

function ChampionSummary(props) {
  return (
    <div className="row champion-summary-container align-items-center justify-content-center">
      <img
        className="champion-img col-2"
        src={getChampionImageLocation(props.name)}
        alt="champion"
      />

      <span className="col-3 mb-0" id="num-games">
        {props.win + props.lose} Games
      </span>

      <p className="col-2 mb-0">
        <span style={{ color: "blue" }}>{props.win}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "red" }}>{props.lose}</span>
        <br />
        {round(props.win / (props.win + props.lose), 1)}%
      </p>
      <p className="col-5 mb-0">
        <span>{round(props.kill / (props.win + props.lose), 1, false)}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "maroon" }}>
          {round(props.death / (props.win + props.lose), 1, false)}
        </span>
        &nbsp;/&nbsp;
        <span>{round(props.assist / (props.win + props.lose), 1, false)}</span>
        <br />
        KDA:&nbsp;
        {props.death === 0
          ? "Perfect"
          : round((props.kill + props.assist) / props.death, 2, false)}
      </p>
    </div>
  );
}

export default ChampionSummary;
