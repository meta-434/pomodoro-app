import React, { Component } from "react";
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseApp from "./firebaseConfig";
import logo from "../logo.svg";
import "../App.css";
import { Container, Paper, Card, Chip, Button } from "@material-ui/core";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: ""
    };
  }
  componentDidMount() {
    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState(
          {
            currentUser: user.uid
          },
          () => this.props.changeParentUser(this.state.currentUser)
        );
      } else {
        this.setState(
          {
            currentUser: "no_login"
          },
          () => this.props.changeParentUser(this.state.currentUser)
        );
      }
    });
  }

  render() {
    const { user, signOut, signInWithGoogle } = this.props;
    return (
      <Container maxWidth="sm">
        <Paper>
          <p>{"\n"}</p>
          <Card>
            <p>{"\n"}</p>
            <Chip
              label={
                user ? <p>Hello, {user.displayName}</p> : <p>Please sign in.</p>
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
