import React, { Component } from "react";
import { Card, Container, Typography } from "@material-ui/core";
import firebaseApp from "./firebaseConfig";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let pomodoros = this.props.pomodoros;
    let currentUser = this.props.currentUser;

    let onlyThisUser = pomodoros[currentUser];
    console.log(onlyThisUser);

    if (onlyThisUser != null) {
      return (
        <Container maxWidth="md">
          <Typography variant="h2">Pomodoro Tracker</Typography>
          <Typography variant="h6">Completed Tasks:</Typography>

          <Table>
            <TableHead>
              <TableCell align="left">Entry</TableCell>
              <TableCell align="right">Date Submitted</TableCell>
            </TableHead>
            {Object.keys(onlyThisUser).map(key => {
              return (
                <TableRow>
                  <TableCell align="left">
                    {onlyThisUser[key]["entry"]}
                  </TableCell>
                  <TableCell align="right">
                    {onlyThisUser[key]["timestamp"]}
                  </TableCell>
                </TableRow>
              );
            })}
          </Table>
        </Container>
      );
    }
    return <div />;
  }
}

export default Profile;
