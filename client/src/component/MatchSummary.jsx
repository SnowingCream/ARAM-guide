function MatchSummary(props) {
  const match = props.data;

  return (
    <div className="row">
      {match.map((data) => (
        <div>
          <p>{data.userName}</p>
          <p>{data.champion}</p>
          <p>{data.win}</p>
        </div>
      ))}
    </div>
  );
}

export default MatchSummary;
