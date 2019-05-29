import React, { Component } from "react";
import "./App.css";
import Main from "./components/Main.js";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import RestoreIcon from "@material-ui/icons/Assignment";
import AccountIcon from "@material-ui/icons/AccountBox";
import LocationOnIcon from "@material-ui/icons/Backup";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";


const styles = theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <div className="App">
          <Router>
            <Route exact={true} path="/" component={Main} />
            <Route exact={true} path="/profile" component={Profile} />
            {/*add <Route path="/login" component={Login} /> once Login.js is complete and imported. */}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {" "}
              <Link to="/"> Main </Link>
              <RestoreIcon className={classes.rightIcon} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {" "}
              <Link to="/profile"> Profile </Link>
              <AccountIcon className={classes.rightIcon} />
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
            >
              {" "}
              <Link to="/login"> Login </Link>
              <LocationOnIcon className={classes.rightIcon} />
            </Button>
          </Router>
        </div>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
