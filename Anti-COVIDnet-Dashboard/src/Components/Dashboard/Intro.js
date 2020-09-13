import React, { Component } from "react";
import classes from "./Dashboard.module.css";
import data from "../../Data/Data";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import background from "../../Assets/background.svg";
import fire from "../../Config/fire";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

class Intro extends Component {
  state = {
    email: "",
    password: "",
  };
  handleChange = (event) => {
    let stateObj = this.state;
    stateObj[event.target.name] = event.target.value;
    this.setState({
      ...stateObj,
    });
  };

  login = (e) => {
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  signup = (e) => {
    e.preventDefault();
    fire
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((u) => {
        console.log(u);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className={classes.introText}>
        <div className="row">
          <div className="col-8">
            <h2>Want to see the insights of social distancing?</h2>
            <h1>Welcome to Anti-Covidnet.</h1>
            {/* <h2 className="text-left">We have got a solution for you</h2> */}
            {/* <h1>Introducing, Anti-COVIDnet (v2).</h1> */}
            {/* <p>Looking at the drastic change the society has gone through due to the current situations, we have come up with a new tool "Anti-Covidnet" which is an end to end application with the concepts of Artificial Intelligence and Object tracking. We are proud to say that our tool is easy to understand and use by everybody and does provide a clean interface for performing all the tasks.
                        The tool can :</p> */}
            <div className={classes.card}>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <AccountCircleIcon />
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email id"
                  aria-label="Email id"
                  name="email"
                  onChange={this.handleChange}
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    <VpnKeyIcon />
                  </span>
                </div>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  aria-label="Password"
                  name="password"
                  onChange={this.handleChange}
                />
              </div>
              <div className="text-center">
                <div className={classes.mybuttons + " text-center"}>
                  <button
                    onClick={this.login}
                    className="btn btn-danger m-auto"
                  >
                    Login
                  </button>
                </div>
                <div className={classes.mybuttons + " text-center"}>
                  <button
                    onClick={this.signup}
                    className="btn btn-danger m-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-4">
            <img src={background} style={{ width: "100%" }} />
          </div>
        </div>

        {/* <div className="row justify-content-center">
          {data.useCase.map((use, index) => {
            return (
              <div key={index} className="col-4 mt-2">
                <div className="card" style={{ border: "none" }}>
                  <img
                    src={use.imageUrl}
                    alt={index}
                    className="card-img-top"
                    style={{ maxHeight: "170px" }}
                  />
                  <div className="card-body p-1">
                    <p>
                      <span style={{ color: "lightseagreen" }}>
                        <CheckCircleOutlineIcon />
                      </span>{" "}
                      {use.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div> */}
      </div>
    );
  }
}

export default Intro;
