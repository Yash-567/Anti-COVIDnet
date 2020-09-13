import React, { Component } from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Models from "./Components/Models/Models";
import fire from "./Config/fire";
import { withRouter } from "react-router-dom";
class App extends Component {
  state = {
    user: {},
  };

  authListener() {
    // fire.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     this.setState({ user });
    //   } else {
    //     console.log("no user logon");
    //     this.setState({ user: null });
    //   }
    // });
  }

  componentDidMount() {
    this.authListener();
  }

  render() {
    return (
      <>{this.state.user ? <Models user={this.state.user} /> : <Dashboard />}</>
    );
  }
}

export default withRouter(App);
