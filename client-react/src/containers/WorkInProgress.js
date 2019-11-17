import React, { Component } from "react";
import {  Pie, } from "react-chartjs-2";


export default class App extends Component {
    state = {
        dataPie: {
            datasets: [{
                data: [10, 20, 30]
            }],

        },
        first: "",
        second: "",
    }
    handleSubmit = () => {
        const { dataPie } = this.state;
        this.setState({
            dataPie: {
                ...dataPie,
                datasets: [{
                    ...dataPie.datasets,
                    data: [
                    this.state.first,
                     this.state.second
                       ]
                }]
            }
        })
    }
    handleChange = (evt) => {
        let a = parseInt(evt.target.value)
        this.setState({
            [evt.target.name]: a,
        })
    }
    render() {


        const { data, dataPie } = this.state;
        console.log(dataPie);
        return (
            <React.Fragment>
                <input type="number"
                    value={this.state.first}
                    name="first"
                    onChange={(evt) => this.handleChange(evt)} />
                <input type="number"
                    value={this.state.second}
                    name="second" onChange={(evt) => this.handleChange(evt)} />
                <button onClick={() => this.handleSubmit()}>add data to chart</button>
                <h1>pie chart</h1>
                <Pie data={dataPie} />
            </React.Fragment>

        )
    }
}