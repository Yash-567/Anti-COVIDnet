import React, { Component } from 'react'
import axios from 'axios'
import Chart from 'react-apexcharts'
import { datePrettifier } from "../../Utility/Utility";
import Predictions from './Predictions';
import CitySelect from './CitySelect/CitySelect';
class CasesGraph extends Component {

    state = {
        puneData: [],
        stats: [],
        predictions: []
    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/districts_daily.json')
            .then(response => {
                this.setState({
                    ...this.state,
                    puneData: response.data.districtsDaily.Maharashtra.Pune
                })
            }).catch(err => {
                console.log(err)
            })

        axios.post(process.env.REACT_APP_SERVER + '/getStats')
            .then(response => {
                console.log(response.data.zones)
                console.log(response.data.length)
                let array = response.data
                let predictions = array.pop()
                this.setState({
                    ...this.state,
                    stats: array,
                    predictions
                })
            })
    }

    calculateCases(category) {
        return this.state.stats.map(day => {
            return (day[category])
        })
    }

    generateArray(index) {
        return this.state.stats.map(day => {
            return (day[index])
        })
    }

    render() {
        let xaxisLabels = this.calculateCases(4)
        let xaxisPrettified = xaxisLabels.map(date => {
            let prettyDate = datePrettifier(date)
            return (prettyDate)
        })
        let active = this.calculateCases(0)
        let recovered = this.calculateCases(3)
        let deaths = this.calculateCases(2)
        let confirmed = this.calculateCases(1)

        let options = {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: xaxisPrettified,
                labels: {
                    hideOverlappingLabels: true
                },
                range: 30
            }
        }

        let series = [
            {
                name: "Active",
                data: active
            }, {
                name: "Recovered",
                data: recovered
            }, {
                name: "Confirmed",
                data: confirmed
            }, {
                name: "Deceased",
                data: deaths
            }
        ]

        const data = {
            labels: xaxisPrettified,
            datasets: [
                {
                    label: 'Active',
                    data: active
                },
                {
                    label: 'Recovered',
                    data: recovered
                },
                {
                    label: 'Deceased',
                    data: deaths
                },
                {
                    label: 'Confirmed',
                    data: confirmed
                }
            ]
        };

        return (
            <div className="container-fluid">
                <CitySelect />
                <div className="row">
                    <div className="col-lg-8">
                        <Chart
                            options={options}
                            series={series}
                            type="line"
                            width="100%"
                            height="300px"
                        />
                    </div>
                    <div className="col-4">
                        {this.state.predictions.length ?
                            <Predictions predictions={this.state.predictions} /> : null}
                    </div>
                </div>
            </div>
        )
    }
}

export default CasesGraph