function MatchDetail(props) {
  const playerRecords = props.data;

  return (
    <div>
      <p> TEST TEST TEST TEST TEST </p>

      {/* ------- the code below is the starting point of details description of each match*/}
      {/* <ul className="col-6"> */
      /* {teamWin.map((player) => (
          <li className="row">
            <img
              className="champion-img col-2"
              src={
                src_location_front + champion.data[player.champion].image.full
              }
              width={10}
              height={10}
            />
            <p>{player.userName}</p>
          </li>
        ))}
      </ul>

      <ul className="col-6">
        {teamLose.map((player) => (
          <li className="row">
            <img
              className="champion-img col-2"
              src={
                src_location_front + champion.data[player.champion].image.full
              }
              width={10}
              height={10}
            />
            <p>{player.userName}</p>
          </li>
        ))}
      </ul>
      {match.map((data) => (
        <div>
          <p>{data.userName}</p>
          <p>{data.champion}</p>
          <p>{data.win}</p>
        </div>
      ))} */}
    </div>
  );
}

export default MatchDetail;
