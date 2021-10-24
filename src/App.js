import React from "react";
import Start from "./Start";
import Question from "./Question";
import Result from "./Result";
import {decodeHtml, shuffle} from "./Utility";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isStarted: false,
      isFinished: false,
      isTimeUp: false,
      categories: [],
      questions: [],
      answeredQuestions: [],
      questionIndex: 0,
      correct: 0,
      wrong: 0,
      disabled: false,
    };
  }

  componentDidMount() {
    if (this.state.categories.length === 0) {
      fetch("https://opentdb.com/api_category.php", {method: "GET"})
        .then((results) => results.json())
        .then((data) => this.setState({categories: data.trivia_categories}));
    }
  }

  handleStart(options) {
    let fetchQuestionsUrl = `https://opentdb.com/api.php?amount=50&category=${options.category}&difficulty=${options.difficulty}&type=multiple`;
    fetch(fetchQuestionsUrl, {method: "GET"})
      .then((results) => results.json())
      .then((data) => {
        let results = data.results;
        let questions = [];
        results.forEach((result) => {
          let answers = [];
          answers.push({answer: decodeHtml(result.correct_answer), isCorrect: true});
          result.incorrect_answers.forEach((answer) => {
            answers.push({answer: decodeHtml(answer), isCorrect: false});
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

  handleAnswer = (isCorrect, answerIndex) => {
    this.state.answeredQuestions.push(this.state.questionIndex, answerIndex.toString(), isCorrect);
    this.setState({
      correct: this.state.correct + (isCorrect ? 1 : 0),
      wrong: this.state.wrong + (isCorrect ? 0 : 1),
    });
  };

  handleBoxClick = (boxIndex) => {
    this.setState({
      questionIndex: boxIndex,
    });
  };

  handleTimeUp = () => {
    this.setState({isFinished: true, isTimeUp: true});
  };

  handleTryAgain = () => {
    this.setState({
      isStarted: false,
      isFinished: false,
      isTimeUp: false,
      questions: [],
      answeredQuestions: [],
      questionIndex: 0,
      correct: 0,
      wrong: 0,
      disabled: false,
    });
  };

  handlePrevious = () => {
    if (this.state.questionIndex > 0) {
      this.setState({questionIndex: this.state.questionIndex - 1});
    }
  }

  handleNext = () => {
    if (this.state.questionIndex < 49) {
      this.setState({questionIndex: this.state.questionIndex + 1});
    }
  }

  handleFinish = () => {
    this.setState({isFinished: true})
  }

  isAnswered = () => {
    for (let i = 0; i < this.state.answeredQuestions.length; i = i + 3) {
      if (this.state.answeredQuestions[i] === this.state.questionIndex) {
        return true;
      }
    }
    return false;
  }

  answerIndex = () => {
    if (typeof this.state.answeredQuestions.indexOf(this.state.questionIndex) === "number") {
      return this.state.answeredQuestions[this.state.answeredQuestions.indexOf(this.state.questionIndex) + 1];
    } else {
      return null;
    }
  }

  render() {
    if (!this.state.isStarted) {
      return (
        <Start
          categories={this.state.categories}
          onClick={(options) => this.handleStart(options)}
        />
      );
    } else if (!this.state.isFinished) {
      return (
        <Question
          questionIndex={this.state.questionIndex}
          value={this.state.questions[this.state.questionIndex]}
          questions={this.state.questions}
          answeredQuestions={this.state.answeredQuestions}
          onAnswer={this.handleAnswer}
          onTimeUp={this.handleTimeUp}
          onPrevious={this.handlePrevious}
          onNext={this.handleNext}
          onFinish={this.handleFinish}
          onBoxClick={this.handleBoxClick}
          isDisabled={this.isAnswered()}
          answerIndex={this.answerIndex()}
        />
      );
    } else {
      return (
        <Result
          correct={this.state.correct}
          wrong={this.state.wrong}
          isTimeUp={this.state.isTimeUp}
          onTryAgain={this.handleTryAgain}
        />
      );
    }
  }
}

export default App;
