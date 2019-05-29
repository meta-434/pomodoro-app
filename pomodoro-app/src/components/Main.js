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
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Assignment";
import AccountIcon from "@material-ui/icons/AccountBox";
import LocationOnIcon from "@material-ui/icons/Backup";
import "typeface-roboto";
//timer
import Time from "./Time.js";
//react-router
import { BrowserRouter as Route, Link } from "react-router-dom";
import { MemoryRouter as Router } from "react-router";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const CollisionLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} to="/getting-started/installation/" {...props} />
));

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
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
});

class App extends React.Component {
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
      <Router>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />

          <Grid item xs={false} sm={4} md={7} component={Paper}>
            <Typography variant="h2">Pomodoro Tracker</Typography>
            <Typography variant="subtitle1" gutterBottom>
              25 on, 5 off
            </Typography>
            <Card>
              <CardContent>
                <Time />
              </CardContent>
            </Card>
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

            <Card>
              <BottomNavigation showLabels>
                <BottomNavigationAction label="Main" icon={<RestoreIcon />} component={AdapterLink} to="/test"/>
                <BottomNavigationAction
                  label="Profile"
                  icon={<AccountIcon />}
                />
                <BottomNavigationAction
                  label="Login"
                  icon={<LocationOnIcon />}
                />
              </BottomNavigation>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={5} elevation={6}>
            {Object.keys(this.state.pomodoros).map(key => {
              return <p>{JSON.stringify(this.state.pomodoros[key]["text"])}</p>;
            })}
          </Grid>
        </Grid>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
