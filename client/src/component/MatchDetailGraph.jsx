import React from "react";

function MatchDetailGraph(props) {
  return (
    <div>
      <h5>LABEL</h5>
      <div className="progress">
        <div
          style={{ width: `${30}%` }}
          className="progress-bar"
          aria-valuenow="30"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {`30%`}
        </div>
      </div>
    </div>
  );
}

export default MatchDetailGraph;
