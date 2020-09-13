import React, { Component } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import fire from "../../Config/fire";

class Header extends Component {
  logout = () => {
    fire.auth().signOut();
  };
  render() {
    let bgClass = "";
    if (this.props.page === "home") {
      bgClass = classes.transparent + " navbar-dark";
    } else bgClass = " " + classes.actualNavbar;
    return (
      <nav class={bgClass + " navbar fixed-top navbar-expand-lg "}>
        <div className="container">
          <a class={classes.brand + " navbar-brand"} href="/">
            Anti-<span>COVID</span>net
            <br />
            <p>The social distancing analyzer</p>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              {this.props.user ? (
                <Link to="/">
                  <li className={classes.navLink} onClick={this.logout}>
                    Logout
                  </li>
                </Link>
              ) : (
                <Link to="/">
                  <li className={classes.navLink}>Login</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
