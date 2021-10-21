import React from "react";
import "./Result.css";

function Result(props) {
  return (
    <div className="resultContainer">
      <h2>{props.isTimeUp ? "Time is up!" : "Finished"}</h2>
      <p className="result">Correct: {props.correct}</p>
      <p className="result">Wrong: {props.wrong}</p>
      <button
        className="btnTryAgain"
        onClick={props.onTryAgain}>
        Try Again
      </button>
    </div>
  );
}

export default Result;
