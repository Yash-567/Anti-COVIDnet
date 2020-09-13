import React, { Component } from "react";
import classes from "./Temperature.module.css";
import { tempdata } from "../../Mock/Mock";
import { db } from "../../Config/firestore";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import MaterialTable from "material-table";
import { Grid, Button } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class Temperature extends Component {
  state = {
    data: [],
    alldata: [],
    value: "1",
    date: new Date(),
  };
  componentDidMount() {
    this.getDataFromFirebase();
  }

  getDataFromFirebase = () => {
    var dd = this.state.date.getDate();

    var mm = this.state.date.getMonth() + 1;
    var yyyy = this.state.date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }
    let dateString = yyyy + "-" + mm + "-" + dd;
    console.log(dateString);
    db.collection(dateString + "-critical")
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        const data = querySnapshot.docs.map((doc) => doc.data());
        console.log(data); // array of cities objects
        this.setState({
          ...this.state,
          data,
        });
      });
    db.collection(dateString)
      .get()
      .then((querySnapshot) => {
        console.log(querySnapshot);
        const alldata = querySnapshot.docs.map((doc) => doc.data());
        this.setState({
          ...this.state,
          alldata,
        });
      });
  };
  handleChange = (e, newValue) => {
    this.setState({
      ...this.state,
      value: newValue,
    });
  };

  handleInputChange = (date) => {
    this.setState({
      ...this.state,
      date: date,
    });
  };

  onModifyDate = () => {
    this.getDataFromFirebase()
  }

  render() {
    return (
      <div className="container mt-5 pt-4">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={this.state.date}
                onChange={this.handleInputChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button onClick={this.onModifyDate}variant="contained" color="secondary">
              Modify Date
            </Button>
          </Grid>
        </Grid>
        <TabContext value={this.state.value}>
          <TabList
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="All Data" value="1" />
            <Tab label="Violators" value="2" />
          </TabList>
          <TabPanel value="1">
            <div style={{ maxWidth: "100%", padding: "20px 0" }}>
              <MaterialTable
                title="All Staff and Students"
                data={this.state.alldata}
                columns={[
                  { title: "Enrollment Number", field: "Enrollment Number" },
                  { title: "Temperature", field: "Temperature" },
                  { title: "Time Stamp", field: "Time" },
                ]}
              ></MaterialTable>
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div style={{ maxWidth: "100%", padding: "20px 0" }}>
              <MaterialTable
                title="Violators"
                data={this.state.data}
                columns={[
                  { title: "Enrollment Number", field: "Enrollment Number" },
                  { title: "Temperature", field: "Temperature" },
                  { title: "Time Stamp", field: "Time" },
                ]}
              ></MaterialTable>
            </div>
          </TabPanel>
        </TabContext>
      </div>
    );
  }
}

export default Temperature;
