import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import Header from "../../UI/Navbar/Header";
import Intro from "./Intro";
import axios from "axios";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

class Dashboard extends Component {
  render() {
    return (
      <>
        <Header page="dashboard" />
        <div className="container">
          <Intro />
        </div>
      </>
    );
  }
}

export default Dashboard;
