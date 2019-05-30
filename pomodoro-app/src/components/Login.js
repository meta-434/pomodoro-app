import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import axios from 'axios'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      motivation : "",
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/quotes')
      .then(res => {
        this.setState({motivation : res.data.slip.advice}, console.log(this.state.motivation))
      })
  }
  render() {
    return (
      <div>
      <Typography variant="h2">{this.state.motivation}</Typography>
      <Container>
        <Card>Login Page</Card>
      </Container>
      </div>
    );
  }
}

export default Profile;
