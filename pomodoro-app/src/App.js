import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main.js";
import Profile from "./components/Profile";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RestoreIcon from "@material-ui/icons/Assignment";
import AccountIcon from "@material-ui/icons/AccountBox";
import LocationOnIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import firebaseApp from "./components/firebaseConfig.js";

const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pomodoros: []
    };
  }

  componentDidMount() {
    const contractRef = firebaseApp.database().ref(this.props.currentUser);

    contractRef.on("value", snap => {
      let update = snap.val() || [];
      this.updateSnap(update);
    });

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          currentUser: user.uid
        });
      } else {
        this.setState({
          currentUser: "no_login"
        });
      }
    });
  }

  updateSnap = value => {
    this.setState({
      pomodoros: value
    });
  };

  changeParentUser = value => {
    this.setState({
      currentUser: value
    });
    console.log(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Router>
          <Route
            exact={true}
            path="/"
            render={props => (
              <Main
                {...props}
                changeParent={this.changeParent}
                currentUser={this.state.currentUser}
                isAuthed={true}
              />
            )}
          />
          <Route
            exact={true}
            path="/profile"
            render={props => (
              <Profile
                {...props}
                pomodoros={this.state.pomodoros}
                currentUser={this.state.currentUser}
                isAuthed={true}
              />
            )}
          />
          <Route
            exact={true}
            path="/login"
            render={props => (
              <Login
                {...props}
                changeParentUser={this.changeParentUser}
                isAuthed={true}
              />
            )}
          />
          {/*add <Route path="/login" component={Login} /> once Login.js is complete and imported. */}
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            {" "}
            <Link to="/"> Main </Link>
            <RestoreIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            {" "}
            <Link to="/profile"> Profile </Link>
            <AccountIcon className={classes.rightIcon} />
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
          >
            {" "}
            <Link to="/login"> Login </Link>
            <LocationOnIcon className={classes.rightIcon} />
          </Button>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
