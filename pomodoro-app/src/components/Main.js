import React from "react";
//firebase
import firebase from "./firebase.js";
//styling (material ui)
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "typeface-roboto";
//timer
import Time from "./Time.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container maxWidth="lg">
        <Paper>
          <Typography variant="h2">Pomodoro Tracker</Typography>
          <Typography variant="subtitle1" gutterBottom>
            25 on, 5 off
          </Typography>
          <Card>
            <CardContent>
              <Time />
            </CardContent>
          </Card>
        </Paper>
      </Container>
    );
  }
}
