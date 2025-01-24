import React from "react";
import { round } from "../asset/var.js";

function BarGraph(props) {
  const valueMax = props.valueMax;
  const valueNow = props.valueNow;
  const teamTotal = props.teamTotal;

  return (
    <div>
      <div className="progress mb-0">
        <div
          style={{ width: `${(valueNow / valueMax) * 100}%` }}
          className="progress-bar bg-secondary"
          aria-valuenow={valueNow}
          aria-valuemin="0"
          aria-valuemax={valueMax}
        >
          {`${valueNow} (${round(valueNow / teamTotal, 1)}%)`}
        </div>
      </div>
    </div>
  );
}
export default BarGraph;
