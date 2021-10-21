import React from "react";
import "./Start.css";

class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      difficulty: "easy",
    };
  }

  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleDifficultyChange = (event) => {
    this.setState({ difficulty: event.target.value });
  };

  render() {
    return (
      <div className="startContainer">
        <form>
          <h2>Welcome to the Quiz App!</h2>
          <p className="marginTop">Please select category and difficulty to start</p>
          <div className="selection">
            <label htmlFor="categories">Category</label>
            <select
              name="categories"
              id="categories"
              value={this.state.category}
              onChange={this.handleCategoryChange}
            >
              {this.props.categories.map((key) => (
                <option key={key.id} value={key.id}>
                  {key.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              value={this.state.difficulty}
              onChange={this.handleDifficultyChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button
            className="btnStart"
            onClick={(e) => {
              e.preventDefault();
              this.props.onClick({
                category:
                  this.state.category === ""
                    ? this.props.categories[0].id
                    : this.state.category,
                difficulty: this.state.difficulty,
              });
            }}
          >
            Start
          </button>
        </form>
      </div>
    );
  }
}

export default Start;
