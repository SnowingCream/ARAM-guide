import React from "react";
import { round } from "../asset/var.js";

function BarGraph(props) {
  const valueMax = props.valueMax;
  const valueNow = props.valueNow;
  const teamTotal = props.teamTotal;

  const percentage = (valueNow / valueMax) * 100;
  const shouldTextBeOutside = percentage < 5;

  return (
    <div className="progress-wrapper">
      <div className="progress mb-0">
        <div
          style={{ width: `${percentage}%` }}
          className={`progress-bar bg-secondary ${
            shouldTextBeOutside ? "text-transparent" : "text-dynamic"
          }`}
          aria-valuenow={valueNow}
          aria-valuemin="0"
          aria-valuemax={valueMax}
        ></div>
      </div>
      <span className="progress-text">
        {valueNow} ({round(valueNow / teamTotal, 1)}%)
      </span>
    </div>
  );
}
export default BarGraph;
