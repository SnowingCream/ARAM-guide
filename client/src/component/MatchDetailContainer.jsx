import MatchDetail from "./MatchDetail";

function MatchDetailContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  return (
    <div className="row">
      <div className="team col-md-6 bg-primary">
        {teamWin.map((data, index) => (
          <MatchDetail data={data} key={index} />
        ))}
      </div>
      <div className="team col-md-6 bg-danger">
        {teamLose.map((data, index) => (
          <MatchDetail data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MatchDetailContainer;
