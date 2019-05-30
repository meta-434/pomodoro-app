import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
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
        <Container>
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
