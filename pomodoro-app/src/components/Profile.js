import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        {Object.keys(this.props.pomodoros).map(key => {
          return (
            <Card>{JSON.stringify(this.props.pomodoros[key]["text"])} </Card>
          );
        })}
      </Container>
    );
  }
}

export default Profile;
