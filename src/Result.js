import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div>
        <p>Correct: {this.props.correct}</p>
        <p>Wrong: {this.props.wrong}</p>
        <button onClick={this.props.onTryAgain}>Try Again</button>
      </div>
    );
  }
}

export default Result;
