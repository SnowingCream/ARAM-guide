import MatchDetailGraph from "./MatchDetailGraph.jsx";

function MatchDetailGraphContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  const singleGraphNames = ["gold", "cs", "totalDamage", "damaged", "teamHeal"];
  const singleGraphObjects = [];

  for (let i = 0; i < singleGraphNames.length; i++) {
    singleGraphObjects.push({
      title: singleGraphNames[i],
      max: 0,
      teamWinTotal: 0,
      teamLoseTotal: 0,
      teamWin: [],
      teamLose: [],
    });
  }

  // teamWin iteration
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < singleGraphObjects.length; j++) {
      const sgo = singleGraphObjects[j];
      const attr = sgo.title;
      sgo.max = Math.max(sgo.max, teamWin[i][attr]);
      sgo.teamWinTotal += teamWin[i][attr];
      sgo.teamWin.push({
        val: teamWin[i][attr],
        champion: teamWin[i].champion,
      });
    }
  }

  // teamLose iteration
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < singleGraphObjects.length; j++) {
      const sgo = singleGraphObjects[j];
      const attr = sgo.title;
      sgo.max = Math.max(sgo.max, teamLose[i][attr]);
      sgo.teamLoseTotal += teamLose[i][attr];
      sgo.teamLose.push({
        val: teamLose[i][attr],
        champion: teamLose[i].champion,
      });
    }
  }

  return (
    // outside container
    <div>
      {/* each row takes one graph -> gold for beginning */}
      <div className="row my-2">
        {singleGraphObjects.map((data, index) => (
          <MatchDetailGraph data={data} key={index} />
        ))}
      </div>
    </div>
  );
}

export default MatchDetailGraphContainer;
