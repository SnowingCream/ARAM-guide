import champion from "../asset/data_dragon/champion.json";
import { ICON_SIZE, round } from "../asset/var.js";

function ChampionSummary(props) {
  const src_location =
    "asset/img/champion/" + champion.data[props.name].image.full;
  return (
    // <div>
    //   <img src={src_location} alt="championIcon" />
    //   {console.log(`I am here with location: ${src_location}`)}
    //   <li className="list-group-item">
    //     {(props.kill + props.assist) / props.death}
    //   </li>
    // </div>
    <div className="row">
      <img
        className="champion-img col-2"
        src={src_location}
        // className="card-img-top"
        alt="..."
        width={ICON_SIZE}
        height={ICON_SIZE}
      />

      <p className="col-5">
        <span style={{ color: "blue" }}>{props.win}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "red" }}>{props.lose}</span>
        <br />
        {round(props.win / (props.win + props.lose), 1)}%
      </p>
      <p className="col-5">
        <span>{round(props.kill / (props.win + props.lose), 1, false)}</span>
        &nbsp;/&nbsp;
        <span style={{ color: "maroon" }}>
          {round(props.death / (props.win + props.lose), 1, false)}
        </span>
        &nbsp;/&nbsp;
        <span>{round(props.assist / (props.win + props.lose), 1, false)}</span>
        <br />
        KDA:&nbsp;
        {round((props.kill + props.assist) / props.death, 2, false)}
      </p>
    </div>
  );
}

export default ChampionSummary;
