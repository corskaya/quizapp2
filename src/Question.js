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
      return "btnWrong";
    } else if (answer.isCorrect) {
      return "btnCorrect";
    } else {
      return "btnChoiceDisabled"
    }
  }

  render() {
    return (
      <div>
        <div className="questionTop">
          <p className="questionIndex">{this.props.questionIndex + 1}/50</p>
          <Time onTimeUp={this.props.onTimeUp}></Time>
        </div>
        <div className="questionContainer">
          <p className="question">{this.props.value.question}</p>
          <form>
            <div className="choices">
              {this.props.value.answers.map((answer, index) => {
                return (
                  <button
                    className={this.props.isDisabled ? this.answerCheck(answer) : "btnChoice"}
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
            </div>
            <div className="btnToggle">
              <button
                className="btnNext"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onPrevious();
                }}
              > &lt;Prev </button>
              <button
                className="btnNext"
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onNext();
                }}
              > Next&gt; </button>
            </div>
            <button
              className="btnFinish"
              onClick={(e) => {
                e.preventDefault();
                this.props.onFinish();
              }}
            > Finish </button>
          </form>
        </div>
        <Box
          questionIndex={this.props.questionIndex}
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
