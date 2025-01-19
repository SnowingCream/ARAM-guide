import MatchDetailOverview from "./MatchDetailOverview";
import MatchDetailGraph from "./MatchDetailGraph";
import React, { useState } from "react";

function MatchDetailContainer(props) {
  const teamWin = props.win;
  const teamLose = props.lose;

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <div className="row">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <a
              className={`nav-link ${
                activeTab === "overview" ? "active" : ""
              } `}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </a>
          </li>
          <li class="nav-item">
            <a
              className={`nav-link ${activeTab === "graph" ? "active" : ""}`}
              onClick={() => setActiveTab("graph")}
            >
              Graph Analysis
            </a>
          </li>
        </ul>
      </div>
      {activeTab === "overview" && (
        <div className="row">
          <div className="team col-md-6 bg-primary">
            {teamWin.map((data, index) => (
              <MatchDetailOverview data={data} key={index} />
            ))}
          </div>
          <div className="team col-md-6 bg-danger">
            {teamLose.map((data, index) => (
              <MatchDetailOverview data={data} key={index} />
            ))}
          </div>
        </div>
      )}
      {activeTab === "graph" && <MatchDetailGraph />}
    </div>
  );
}

export default MatchDetailContainer;
