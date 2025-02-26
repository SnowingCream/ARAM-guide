import MatchDetailOverviewContainer from "./MatchDetailOverviewContainer";
import MatchDetailGraphContainer from "./MatchDetailGraphContainer";
import React, { useState } from "react";

function MatchDetailContainer(props) {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="row bg-secondary text-muted">
        <ul className="nav nav-pills nav-fill match-detail-tab-holder">
          <li className="nav-item w-50">
            <button
              className={`nav-link match-detail-tab ${
                activeTab === "overview" ? "active" : ""
              } `}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="nav-item w-50">
            <button
              className={`nav-link match-detail-tab ${
                activeTab === "graph" ? "active" : ""
              }`}
              onClick={() => setActiveTab("graph")}
            >
              Graph Analysis
            </button>
          </li>
        </ul>
      </div>
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
