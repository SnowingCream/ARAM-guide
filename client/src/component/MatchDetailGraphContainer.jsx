import MatchDetailGraph from "./MatchDetailGraph.jsx";

function MatchDetailGraphContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  const singleGraphNames = [
    "gold",
    "cs",
    "totalDamage", // stacked in the future
    "damaged", // stacked in the future
    "teamHeal", // stacked in the future
    "ccTo",
    "ccFrom",
    "timeDead",
  ];

  const singleGraphDescription = [
    "Gold",
    "CS",
    "Dealing",
    "Damaged",
    "Healing and Shielding on teammates",
    "CC to the opponent team (sec)",
    "CC'd by the opponent team (sec)",
    "Time being dead (sec)",
  ];
  const singleGraphObjects = [];

  for (let i = 0; i < singleGraphNames.length; i++) {
    singleGraphObjects.push({
      title: singleGraphNames[i],
      description: singleGraphDescription[i],
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
    <div className="row">
      {/* each row takes one graph -> gold for beginning */}

      {singleGraphObjects.map((data, index) => (
        <div className="col-6 my-2">
          <MatchDetailGraph data={data} key={index} />
        </div>
      ))}
    </div>
  );
}

export default MatchDetailGraphContainer;
