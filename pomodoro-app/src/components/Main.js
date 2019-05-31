import React from "react";
//firebase
import firebaseConfig from "./firebaseConfig.js";
//styling (material ui)
import {
  Button,
  TextField,
  Grid,
  Typography,
  Card,
  Container,
  Paper
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
//timer
import Time from "./Time.js";
import Time2 from "./Time2.js";
//axios
import axios from "axios";

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
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pomodoros: [],
      text: "",
      wolfram: null,
      query: null,
      sendQuery: null
    };
  }

  mapPods = () => {
    return(this.state.wolfram.map(sub => {
      return console.log(sub.subpods[0].img.src);
    }));
  };

  handleClick = event => {
    const textRef = firebaseConfig.database().ref(this.props.currentUser);
    const user = {
      entry: this.state.text,
      timestamp: new Date().toLocaleString()
    };
    textRef.push(user);
  };

  handleQueryClick = event => {
    console.log(this.state.query)
    this.setState(
      { sendQuery: this.state.query },
      axios
        .get("http://loclahost:9000/main/wolfram/" + this.state.sendQuery)
        .then(res => {
          console.log(res.data)
        })
    );
  };
 handleQuery(e) {
    
    this.setState({
      query: e.target.value
    },
    console.log(e.target.value));
  };

  handleValue = (event, value) => {
    this.setState({
      [value]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth="md">
        <div className={classes.root}>
          <Card>
            <Typography variant="h2">Pomodoro Tracker</Typography>
            <Typography variant="subtitle1" gutterBottom>
              25 on, 5 off
            </Typography>
          </Card>
          <Grid container spacing={12}>
            <Grid item xs={6}>
              <p>{"\n"}</p>
              <Paper>
                <Time />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <p>{"\n"}</p>
              <Paper>
                <Time2 />
              </Paper>
            </Grid>
          </Grid>
          <Card>
            <TextField
              placeholder="Enter Text Here..."
              multiline={true}
              required
              fullWidth
              variant="outlined"
              margin="normal"
              rows={1}
              rowsMax={4}
              value={this.state.text}
              onChange={e => this.handleValue(e, "text")}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleClick}
            >
              Submit
            </Button>
          </Card>
          <Card>
            {/* <TextField
              placeholder="Have a question?"
              multiline={false}
              required
              variant="outlined"
              margin="normal"
              onChange={(e)=>this.handleQuery(e)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.handleQueryClick()}
            >
              Submit
            </Button>

            <img src={this.state.wolfram !== null ? this.mapPods() : null} /> */}
          </Card>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Main);
