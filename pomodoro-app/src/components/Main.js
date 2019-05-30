import React from "react";
//firebase
import firebase from "./firebase.js";
//styling (material ui)
import { Button, TextField, Grid, Typography, Card } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
//timer
import Time from "./Time.js";
import Time2 from "./Time2.js";
import axios from 'axios';

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
      text: "",
      motivation : "",
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
    axios.get('http://localhost:9000/quotes')
      .then(res => {
        this.setState({motivation : res.data.slip.advice}, console.log(this.state.motivation))
      })

      

    console.log(this.state.motivation)
    const contractRef = firebase.database().ref("text_entries");

    contractRef.on("value", snap => {
      let update = snap.val() || [];
      console.log(update);
      this.updateSnap(update);
      console.log("trying!");
      this.props.changeParent(update);
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
          <Typography>{this.state.motivation}</Typography>
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
