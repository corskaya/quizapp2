import React from "react";

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 10 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.time(), 1000);
  }

  time() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    } else {
      clearInterval(this.timerID);
      this.props.onTimeUp();
    }
  }

  render() {
    return <p>Time: 🕒 {this.state.time}</p>;
  }
}

export default Time;
