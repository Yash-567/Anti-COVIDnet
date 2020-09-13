import React, { Component } from 'react'

class Predictions extends Component {
    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td>Confirmed</td>
                        <td>{this.props.predictions[0]}</td>
                    </tr>
                    <tr>
                        <td>Recovered</td>
                        <td>{this.props.predictions[1]}</td>
                    </tr>
                    <tr>
                        <td>Active</td>
                        <td>{this.props.predictions[2]}</td>
                    </tr>
                    <tr>
                        <td>Deceased</td>
                        <td>{this.props.predictions[3]}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

export default Predictions