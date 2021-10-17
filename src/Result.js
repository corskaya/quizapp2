import React from "react";

function Result(props) {
  return (
    <div>
      <p>{props.isTimeUp ? "Time is up!" : "Finished"}</p>
      <p>Correct: {props.correct}</p>
      <p>Wrong: {props.wrong}</p>
      <button onClick={props.onTryAgain}>Try Again</button>
    </div>
  );
}

export default Result;
