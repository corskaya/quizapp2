import React from "react";

class Time extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 500 };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.time(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  time() {
    if (this.state.time > 0) {
      this.setState({ time: this.state.time - 1 });
    } else {
      this.props.onTimeUp();
    }
  }

  render() {
    return <p>Time: 🕒 {this.state.time}</p>;
  }
}

export default Time;
