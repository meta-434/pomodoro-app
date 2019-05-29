import React from "react";
//firebase
import firebase from "./firebase.js";
//styling (material ui)
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";

import "typeface-roboto";
//timer
import Time from "./Time.js";
import Time2 from "./Time2.js";
import Profile from "./Profile.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//react-router

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
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

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pomodoros: [],
      text: ""
    };
  }

  handleClick = event => {
    const textRef = firebase.database().ref("text_entries");
    const user = {
      text: this.state.text
    };
    textRef.push(user);
  };

  handleValue = (event, value) => {
    this.setState({
      [value]: event.target.value
    });
  };

  componentDidMount() {
    const contractRef = firebase.database().ref("text_entries");

    contractRef.on("value", snap => {
      let update = snap.val() || [];
      console.log(update);
      this.updateSnap(update);
    });
  }

  updateSnap = value => {
    this.setState({
      pomodoros: value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Card>
          <Typography variant="h2">Pomodoro Tracker</Typography>
          <Typography variant="subtitle1" gutterBottom>
            25 on, 5 off
          </Typography>
        </Card>

        <Grid item xs={12}>
          <Time />
        </Grid>
        <Grid item xs={12}>
          <Time2 />
        </Grid>

        <Card>
          <TextField
            placeholder="Enter Text Here..."
            multiline={true}
            fullWidth
            required
            variant="outlined"
            margin="normal"
            rows={2}
            rowsMax={4}
            value={this.state.text}
            onChange={e => this.handleValue(e, "text")}
          />
        </Card>
        <Card>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleClick}
          >
            Submit
          </Button>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
