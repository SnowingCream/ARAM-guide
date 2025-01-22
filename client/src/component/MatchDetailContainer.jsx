import MatchDetailOverviewContainer from "./MatchDetailOverviewContainer";
import MatchDetailGraphContainer from "./MatchDetailGraphContainer";
import React, { useState } from "react";

function MatchDetailContainer(props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="row bg-secondary text-muted">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <button
              className={`nav-link ${
                activeTab === "overview" ? "active" : ""
              } `}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li class="nav-item">
            <button
              className={`nav-link ${activeTab === "graph" ? "active" : ""}`}
              onClick={() => setActiveTab("graph")}
            >
              Graph Analysis
            </button>
          </li>
        </ul>
      </div>
      {/* {activeTab === "graph" && (
        <div className="row">
          <div className="team col-md-6 bg-primary">
            {teamWin.map((data, index) => (
              <MatchDetailGraph data={data} key={index} />
            ))}
          </div>
          <div className="team col-md-6 bg-danger">
            {teamLose.map((data, index) => (
              <MatchDetailGraph data={data} key={index} />
            ))}
          </div>
        </div>
      )} */}
      {activeTab === "overview" && (
        <MatchDetailOverviewContainer win={props.win} lose={props.lose} />
      )}
      {activeTab === "graph" && (
        <MatchDetailGraphContainer win={props.win} lose={props.lose} />
      )}
    </div>
  );
}

export default MatchDetailContainer;
