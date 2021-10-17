import React from "react";
import Time from "./Time";

function Question(props) {
  return (
    <div>
      <p>{props.index}/50</p>
      <Time onTimeUp={props.onTimeUp}></Time>
      <p>{props.value.question}</p>
      <form>
        {props.value.answers.map((answer, index) => {
          return (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                props.onAnswer(answer.isCorrect);
              }}
            >
              {answer.answer}
            </button>
          );
        })}
      </form>
    </div>
  );
}

export default Question;
