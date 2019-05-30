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
      text: ""
    };
  }

  handleClick = event => {
    const textRef = firebaseConfig.database().ref(this.props.currentUser);
    const user = {
      entry: this.state.text,
      timestamp: new Date().toLocaleString()
    };
    textRef.push(user);
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
              fullWidth
              required
              variant="outlined"
              margin="normal"
              rows={2}
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
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(Main);
