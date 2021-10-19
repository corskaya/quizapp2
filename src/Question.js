import React from "react";
import Time from "./Time";
import Box from "./Box";
import "./Question.css";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  answerCheck = (answer) => {
    if (this.props.value.answers[parseInt(this.props.answerIndex)] === answer && !answer.isCorrect) {
      return "buttonWrong";
    } else if (answer.isCorrect) {
      return "buttonCorrect";
    }
  }

  render() {
    return (
      <div>
        <p>{this.props.index}/50</p>
        <Time onTimeUp={this.props.onTimeUp}></Time>
        <p>{this.props.value.question}</p>
        <form>
          {this.props.value.answers.map((answer, index) => {
            return (
              <button
                className={this.props.isDisabled ? this.answerCheck(answer) : null}
                disabled={this.props.isDisabled}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onAnswer(answer.isCorrect, this.props.value.answers.indexOf(answer));
                }}
              >
                {answer.answer}
              </button>
            );
          })}
          <hr />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.props.onPrevious();
            }}
          > &lt;Prev </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.props.onFinish();
            }}
          > Finish </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              this.props.onNext();
            }}
          > Next&gt; </button>
        </form>
        <Box
          questions={this.props.questions}
          onBoxClick={this.props.onBoxClick}
          isDisabled={this.props.isDisabled}
          answeredQuestions={this.props.answeredQuestions}
        ></Box>
      </div>
    );
  }
}

export default Question;
