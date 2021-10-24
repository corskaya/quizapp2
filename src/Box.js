import React from "react";
import "./Box.css"

class Box extends React.Component {
  boxCheck = (currentIndex) => {
    if (this.props.questionIndex === currentIndex) {
      for (let i = 0; i < this.props.answeredQuestions.length; i = i + 3) {
        if (this.props.answeredQuestions[i] === currentIndex) {
          return (this.props.answeredQuestions[i + 2] ? "currentBoxCorrect" : "currentBoxWrong");
        }
      }
      return "btnBox currentBtnBox";
    }
    for (let i = 0; i < this.props.answeredQuestions.length; i = i + 3) {
      if (this.props.answeredQuestions[i] === currentIndex) {
        return (this.props.answeredQuestions[i + 2] ? "btnBox boxCorrect" : "btnBox boxWrong");
      }
    }
    return "btnBox";
  }

  render() {
    return (
      <div className="boxContainer">
        <h3>Questions</h3>
        <form className="boxes">
          {this.props.questions.map((question, index) => {
            return (
              <button
                className={this.boxCheck(index)}
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.onBoxClick(index);
                }}
              >
                {(index + 1).toString()}
              </button>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Box;
