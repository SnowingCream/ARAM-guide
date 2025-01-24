import BarGraph from "./BarGraph";
import { getChampionImageLocation } from "../asset/var.js";

function MatchDetailGraph(props) {
  const info = props.data;

  return (
    <div>
      <h5>{info.description}</h5>
      <div className="row my-2 mx-1">
        <div className="team-win col-md-6 bg-primary">
          <p className="my-2">{info.teamWinTotal}</p>
          {info.teamWin.map((data, index) => (
            <div className="row my-1">
              <div className="col-2">
                <img
                  className="champion-img-small "
                  src={getChampionImageLocation(data.champion)}
                  alt="champion"
                />
              </div>
              <div className="col-10">
                <BarGraph
                  valueMax={info.max}
                  valueNow={data.val}
                  teamTotal={info.teamWinTotal}
                  key={index}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="team-lose col-md-6 bg-danger">
          <p className="my-2">{info.teamLoseTotal}</p>
          {info.teamLose.map((data, index) => (
            <div className="row my-1">
              <div className="col-2">
                <img
                  className="champion-img-small"
                  src={getChampionImageLocation(data.champion)}
                  alt="champion"
                />
              </div>
              <div className="col-10">
                <BarGraph
                  valueMax={info.max}
                  valueNow={data.val}
                  teamTotal={info.teamLoseTotal}
                  key={index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchDetailGraph;
