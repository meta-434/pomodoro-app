import React, { Component } from "react";
import Card from "@material-ui/core/Card";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        {Object.keys(this.props.pomodoros).map(key => {
          return (
            <Card>{JSON.stringify(this.props.pomodoros[key]["text"])} </Card>
          );
        })}
      </div>
    );
  }
}

export default Profile;
