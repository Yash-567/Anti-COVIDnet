import React, { Component } from "react";
import classes from "./Models.module.css";
import Header from "../../UI/Navbar/Header";
import MyDrawer from "./Drawer/Drawer";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import LiveGraph from "../LiveGraph/LiveGraph";
import CasesGraph from "../CasesGraph/CasesGraph";
import Gallery from "../Gallery/Gallery";
import Temperature from "../Temperature/Temperature";
import Thermal from "../ThermalDetector/Thermal";
import Mask from "../MaskDetector/Mask";

class Models extends Component {
  render() {
    return (
      <>
        <Header page="models" user={this.props.user} />
        {this.props.user ? (
          <div style={{ marginTop: "80px" }}>
            <MyDrawer>
              <div className="mt-3">
                <Link to="/dashboard/live_demo">
                  <div className={classes.drawerLink}>Violation Detector</div>
                </Link>
                {/* <Link to="/dashboard/case_predictor">
                  <div className={classes.drawerLink}>Case Predictor</div>
                </Link> */}

                <Link to="/dashboard/mask">
                  <div className={classes.drawerLink}>Mask Detector</div>
                </Link>
                <Link to="/dashboard/thermal">
                  <div className={classes.drawerLink}>Thermal Detector</div>
                </Link>
                <Link to="/dashboard/gallery">
                  <div className={classes.drawerLink}>Gallery</div>
                </Link>
              </div>
            </MyDrawer>
            <div style={{ marginLeft: "250px" }}>
              <div className="container-fluid">
                <Switch>
                  <Route exact path="/">
                    <Redirect to="/dashboard/live_demo" />
                  </Route>
                  <Route
                    exact
                    path="/dashboard/case_predictor"
                    component={CasesGraph}
                  />
                  <Route
                    exact
                    path="/dashboard/live_demo"
                    component={LiveGraph}
                  />
                  <Route exact path="/dashboard/thermal" component={Thermal} />
                  <Route exact path="/dashboard/mask" component={Mask} />
                  <Route exact path="/dashboard/gallery" component={Gallery} />
                </Switch>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  }
}

export default Models;
