import MatchDetailGraph from "./MatchDetailGraph";

import { getChampionImageLocation } from "../asset/var.js";

function MatchDetailGraphContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  var maxKill = 0;
  var teamWinTotalKill = 0;
  var teamLoseTotalKill = 0;

  for (let i = 0; i < 5; i++) {
    maxKill = Math.max(maxKill, teamWin[i].kill);
    teamWinTotalKill += teamWin[i].kill;
  }

  for (let i = 0; i < 5; i++) {
    maxKill = Math.max(maxKill, teamLose[i].kill);
    teamLoseTotalKill += teamLose[i].kill;
  }

  return (
    // outside container
    <div>
      {/* each row takes one graph -> gold for beginning */}
      <div className="row my-2">
        <h5>Kill</h5>
        <div className="team-win col-md-6 bg-primary">
          <p>{teamWinTotalKill}</p>
          {teamWin.map((data, index) => (
            <div className="row my-1 ">
              <div className="col-1">
                <img
                  className="champion-img-small"
                  src={getChampionImageLocation(data.champion)}
                  alt="champion"
                />
              </div>
              <div className="col-11 align-items-center justify-content-center">
                <MatchDetailGraph
                  valueMax={maxKill}
                  valueNow={data.kill}
                  teamTotal={teamWinTotalKill}
                  key={index}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="team-lose col-md-6 bg-danger">
          <p>{teamLoseTotalKill}</p>
          {teamLose.map((data, index) => (
            <div className="row my-1">
              <div className="col-1">
                <img
                  className="champion-img-small"
                  src={getChampionImageLocation(data.champion)}
                  alt="champion"
                />
              </div>
              <div className="col-11">
                <MatchDetailGraph
                  valueMax={maxKill}
                  valueNow={data.kill}
                  teamTotal={teamLoseTotalKill}
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

export default MatchDetailGraphContainer;
