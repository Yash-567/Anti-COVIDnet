import React, { Component } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import classes from "./Thermal.module.css"
import { TextField } from "@material-ui/core";

let i = 0;

class Thermal extends Component {

    state = {
        timeStamp: [],
        violationPercentage: [],
        activatingDetector: false,
        liveDataOn: false,
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [],
                labels: {
                    hideOverlappingLabels: true
                },
                tickAmount: 6,
                range: 20
            }
        },
        series: [
            {
                name: "Violation Percentge",
                data: []
            }
        ]

    }

    activateDetector = () => {
        this.setState({
            ...this.state,
            activatingDetector: true
        })
        axios.get(process.env.REACT_APP_SERVER + '/activateThermal')
            .then(response => {
                console.log(response.data)
            }).catch(err => {
                console.log(err)
            })
        this.interval = setInterval(() => {
            this.getViolations();
        }, 2000)
    }

    getViolations = () => {
        // axios.get(process.env.REACT_APP_SERVER + '/getViolation')
        //     .then(response => {
        //         if (response.data !== "No processing detected") {
        //             i = i + 2;
        //             let timeStamp = this.state.timeStamp;
        //             timeStamp.push(i);
        //             let violationPercentage = this.state.violationPercentage;
        //             violationPercentage.push(Math.round(response.data));
        //             let series = this.state.series[0];
        //             series.data = violationPercentage
        //             this.setState({
        //                 ...this.state,
        //                 liveDataOn: true,
        //                 activatingDetector: false,
        //                 options: {
        //                     ...this.state.options,
        //                     xaxis: {
        //                         ...this.state.options.xaxis,
        //                         categories: timeStamp
        //                     }
        //                 },
        //                 series: [series],
        //                 timeStamp
        //             })
        //         }
        //     }).catch(err => {
        //         console.log(err)
        //     })
    }

    render() {


        return (
            <div className="row">
                <div className="col-8 text-center">
                    <h1 className={classes.heading}>Live Thermal Graph</h1>
                    <div style={{ minHeight: '300px' }}>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="100%"
                            height="300px"
                        />
                    </div>
                </div>
                <div className="col-4 mt-5">
                    <div>
                        <p>
                            Click on the button below to activate the detector and analyze your surroundings. The violation percentage will be shown on the graph alongside.
                        </p>
                        <div className="my-1 pb-3">
                            <TextField fullWidth color="#e82231" label="IP Address of the camera" />
                        </div>
                        <div onClick={this.activateDetector} className="btn btn-danger">Activate Detector</div>
                        <h6>{this.state.activatingDetector ? "Activating the detector. It may take a a minute or so.." : null}</h6>
                        <h6>{this.state.liveDataOn ? "You are now seeing the live violation percentage." : null}</h6>
                    </div>
                </div>
            </div>
        )
    }
}

export default Thermal