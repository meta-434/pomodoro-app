import React, { Component } from "react";
import Timer from "react-compound-timer";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";

class Time extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timerVal: 1500000,
      data: null
    };
  }
  //this is not correctly triggering the timer to update it's start value.
  //re-render is happening, however.
  resetHandler() {
    if (this.state.timerVal === 10000) {
      this.setState({ timerVal: 30000 }); //should be 300000
    } else if (this.state.timerVal === 30000) {
      this.setState({ timerVal: 10000 }); //should be 1500000
    }
    console.log(" timerVal ", this.state.timerVal);
  }

  timeUp() {
    console.log("time's up");
  }

  timerUp() {
    console.log("time's up!");
  }

  render() {
    return (
      <Timer
        initialTime={this.state.timerVal} //normally 1500000
        direction="backward"
        startImmediately={false}
        onReset={() => this.resetHandler()} //use to switch to 5 minute timer (use a state or prop change?)
        checkpoints={[
          {
            time: 1200000, //20 minutes
            callback: () => console.log("20 minutes left")
          },
          {
            time: 900000, // 15 minutes
            callback: () => console.log("15 minutes left")
          },
          {
            time: 600000, // 10 minutes
            callback: () => console.log("10 minutes left")
          },
          {
            time: 300000, // 5 minutes
            callback: () => console.log("5 minutes left")
          },
          {
            time: 0, // 5 minutes
            callback: () => this.timeUp()
          }
        ]}
      >
        {({ start, stop, reset, timerState }) => (
          <React.Fragment>
            <div>
              <Timer.Minutes /> minutes <br />
              <Timer.Seconds /> seconds
            </div>
            <div>
              <Chip label={timerState} />
            </div>
            <br />
            <div>
              <Button variant="contained" color="primary" onClick={start}>
                Start
              </Button>
              {/* <Button onClick={pause}> Pause </Button>
              <Button onClick={resume}> Resume </Button> */}
              <Button variant="contained" color="secondary" onClick={stop}>
                Stop
              </Button>
              <Button variant="outlined" color="primary" onClick={reset}>
                Next
              </Button>
            </div>
          </React.Fragment>
        )}
      </Timer>
    );
  }
}

export default Time;
