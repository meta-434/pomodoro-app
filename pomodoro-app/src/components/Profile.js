import React, { Component } from "react";
import { Card, Container, Typography } from "@material-ui/core";
import firebaseApp from "./firebaseConfig";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let pomodoros = this.props.pomodoros;
    let currentUser = this.props.currentUser;

    let onlyThisUser = pomodoros[currentUser];
    console.log(onlyThisUser);
    if (onlyThisUser != null) {
      return (
        <Container maxWidth="md">
        <Typography variant="h2">Pomodoro Tracker</Typography>
        <Typography variant="h6">Completed Tasks:</Typography>
          {Object.keys(onlyThisUser).map(key => {
            return <Card>{JSON.stringify(onlyThisUser[key]["entry"])} </Card>;
          })}
        </Container>
      );
    }
    return <div />;
  }
}

export default Profile;
