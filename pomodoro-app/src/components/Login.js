import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseApp from "./firebaseConfig";
import {
  Container,
  Paper,
  Card,
  Chip,
  Button,
  Typography
} from "@material-ui/core";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: "",
      motivation: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:9000/login/quotes").then(res => {
      this.setState(
        { motivation: res.data.slip.advice },
        console.log(this.state.motivation)
      );
    });
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <Container maxWidth="sm">
        <Typography variant="h2">Pomodoro Tracker</Typography>
        <Typography variant="h6">Login</Typography>
        <Typography variant="subtitle2">"{this.state.motivation}"</Typography>
        <Paper>
          <p>{"\n"}</p>
          <Card>
            <p>{"\n"}</p>
            <Card>
              <p>{"\n"}</p>
              <Chip
                label={
                  user ? (
                    <p>Hello, {user.displayName}</p>
                  ) : (
                    <p>Please sign in.</p>
                  )
                }
              />
              <p>{"\n"}</p>

              {user ? (
                <Button variant="outlined" onClick={signOut}>
                  Sign out
                </Button>
              ) : (
                <Button variant="outlined" onClick={signInWithGoogle}>
                  Sign in with Google
                </Button>
              )}
              <p>{"\n"}</p>
            </Card>
            <p>{"\n"}</p>
          </Paper>
        </Container>
        <Paper>
          <Card>
            The Pomodoro Technique is a time management method developed by
            Francesco Cirillo in the late 1980s.[1] The technique uses a timer
            to break down work into intervals, traditionally 25 minutes in
            length, separated by short breaks. Each interval is known as a
            pomodoro, from the Italian word for 'tomato', after the
            tomato-shaped kitchen timer that Cirillo used as a university
            student.
          </Card>
        </Paper>
      </div>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider()
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(Login);
