import React, { Component } from 'react'
import classes from './CitySelect.module.css'
import axios from 'axios'


class CitySelect extends Component {

    state = {
        states: [],
        zones: [],
        districts: [],
        selectedState: "Maharashtra",
        selectedDistrict: "Pune"
    }

    componentDidMount() {
        axios.get('https://api.covid19india.org/zones.json')
            .then(response => {
                let states = [];
                response.data.zones.map(zone => {
                    if (!states.some(state => state === zone.state))
                        states.push(zone.state)
                })
                let districts = []
                districts = response.data.zones.filter(zone => zone.state === "Maharashtra")
                this.setState({
                    ...this.state,
                    states,
                    zones: response.data.zones,
                    districts
                })
            }).catch(err => {
                console.log(err)
            })
    }

    changeState = (selectedState) => {
        let districts = []
        districts = this.state.zones.filter(zone => zone.state === selectedState)

        this.setState({
            ...this.state,
            selectedState,
            districts,
            selectedDistrict: districts[0].district
        })
    }

    changeDistrict = (selectedDistrict) => {
        this.setState({
            ...this.state,
            selectedDistrict,
        })
    }

    render() {
        return (
            <div className="mt-5">
                <p className="mb-0 pt-4" style={{ display: 'inline-block' }}>Showing the data for</p>
                <div className="dropdown" style={{ display: 'inline-block', paddingLeft: '10px', paddingTop: '5px' }}>
                    <div className={classes.dropdownButton + ' dropdown-toggle'} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectedState}
                    </div>
                    <div className={classes.dropdownMenu + " dropdown-menu"} aria-labelledby="dropdownMenuButton">
                        {this.state.states.map(state => {
                            return (
                                <div onClick={() => this.changeState(state)} className={classes.dropdownItem}>{state}</div>
                            )
                        })}
                    </div>
                </div>
                <div className="dropdown" style={{ display: 'inline-block', padding: '20px', paddingTop: '5px' }}>
                    <div className={classes.dropdownButton + ' dropdown-toggle'} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.selectedDistrict}
                    </div>

                    <div className={classes.dropdownMenu + " dropdown-menu"} aria-labelledby="dropdownMenuButton">
                        {
                            this.state.districts.map(state => {
                                return (
                                    <div onClick={() => this.changeDistrict(state.district)} className={classes.dropdownItem}>{state.district}</div>
                                )
                            })}
                    </div>
                </div>
            </div >
        )
    }
}

export default CitySelect