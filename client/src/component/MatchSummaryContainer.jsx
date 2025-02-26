import MatchSummary from "./MatchSummary.jsx";

function MatchSummaryContainer(props) {
  const matchList = props.data;

  return (
    <div className="mb-1">
      {matchList.map((data, index) => (
        <MatchSummary data={data} key={index} />
      ))}
    </div>
  );
}

export default MatchSummaryContainer;
