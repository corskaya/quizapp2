import React from "react";
import Start from "./Start";
import Question from "./Question";
import Result from "./Result";
import { decodeHtml, shuffle } from "./Utility";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isStarted: false,
      isFinished: false,
      isTimeUp: false,
      categories: [],
      questions: [],
      questionIndex: 0,
      correct: 0,
      wrong: 0,
    };
  }

  componentDidMount() {
    if (this.state.categories.length === 0) {
      fetch("https://opentdb.com/api_category.php", { method: "GET" })
        .then((results) => results.json())
        .then((data) => this.setState({ categories: data.trivia_categories }));
    }
  }

  handleStart(options) {
    let fetchQuestionsUrl = `https://opentdb.com/api.php?amount=50&category=${options.category}&difficulty=${options.difficulty}&type=multiple`;
    fetch(fetchQuestionsUrl, { method: "GET" })
      .then((results) => results.json())
      .then((data) => {
        let results = data.results;
        let questions = [];
        results.forEach((result) => {
          let answers = [];
          answers.push({ answer: result.correct_answer, isCorrect: true });
          result.incorrect_answers.forEach((answer) => {
            answers.push({ answer: answer, isCorrect: false });
          });
          questions.push({
            question: decodeHtml(result.question),
            answers: shuffle(answers),
          });
        });
        this.setState({
          isStarted: true,
          questions: questions,
        });
      });
  }

  handleAnswer = (isCorrect) => {
    this.setState({
      isFinished: this.state.questionIndex === 49,
      correct: this.state.correct + (isCorrect ? 1 : 0),
      wrong: this.state.wrong + (isCorrect ? 0 : 1),
      questionIndex:
        this.state.questionIndex + (this.state.questionIndex === 49 ? 0 : 1),
    });
  };

  handleTimeUp = () => {
    this.setState({ isFinished: true, isTimeUp: true });
  };

  handleTryAgain = () => {
    this.setState({
      isStarted: false,
      isFinished: false,
      isTimeUp: false,
      questions: [],
      questionIndex: 0,
      correct: 0,
      wrong: 0,
    });
  };

  render() {
    if (!this.state.isStarted) {
      return (
        <Start
          categories={this.state.categories}
          onClick={(options) => this.handleStart(options)}
        ></Start>
      );
    } else if (!this.state.isFinished) {
      return (
        <Question
          index={this.state.questionIndex + 1}
          value={this.state.questions[this.state.questionIndex]}
          onAnswer={this.handleAnswer}
          onTimeUp={this.handleTimeUp}
        ></Question>
      );
    } else {
      return (
        <Result
          correct={this.state.correct}
          wrong={this.state.wrong}
          isTimeUp={this.state.isTimeUp}
          onTryAgain={this.handleTryAgain}
        ></Result>
      );
    }
  }
}

export default App;
