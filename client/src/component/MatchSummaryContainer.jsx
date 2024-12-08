import MatchSummary from "./MatchSummary.jsx";

function MatchSummaryContainer(props) {
  const matchList = props.data;

  return (
    <div>
      <p>placeholder: will be necessary for implementing filter</p>
      {matchList.map((data) => (
        <MatchSummary data={data} />
      ))}
    </div>
  );
}

export default MatchSummaryContainer;
