import React, { Component } from "react";
import Timer from "react-compound-timer";

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }
  render() {
    return (
      <Timer initialTime={55000} direction="backward">
        {() => (
          <React.Fragment>
            <Timer.Days /> days
            <Timer.Hours /> hours
            <Timer.Minutes /> minutes
            <Timer.Seconds /> seconds
            <Timer.Milliseconds /> milliseconds
          </React.Fragment>
        )}
      </Timer>
    );
  }
}
