import MatchDetailOverview from "./MatchDetailOverview";

function MatchDetailOverviewContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  return (
    <div className="row">
      <div className="team-win col-md-6 bg-primary">
        {teamWin.map((data, index) => (
          <MatchDetailOverview data={data} key={index} />
        ))}
      </div>
      <div className="team-lose col-md-6 bg-danger">
        {teamLose.map((data, index) => (
          <MatchDetailOverview data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MatchDetailOverviewContainer;
