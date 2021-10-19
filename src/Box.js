import React from "react";
import "./Question.css"

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  boxCheck = (currentIndex) => {
    for (let i = 0; i < this.props.answeredQuestions.length; i = i + 3) {
      if (this.props.answeredQuestions[i] === currentIndex) {
        return (this.props.answeredQuestions[i + 2] ? "boxCorrect" : "boxWrong");
      }
    } return null;
  }

  render() {
    return (
      <div>
        <p>Questions</p>
        <form>
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
                {index + 1}
              </button>
            );
          })}
        </form>
      </div>
    );
  }
}

export default Box;
