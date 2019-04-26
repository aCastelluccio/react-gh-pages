import React, { Component } from "react";
import axios from "axios";
import GradingView from './GradingView2';
import ClassSelect from './ClassSelect';

const ReactDOM = require('react-dom')

class TotalGradesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            back: false
        }
    }

  /*   handleBack = (e) => {
        this.setState({
            back: true
        })
    } */

    render() {
        return(
            <div>
                <div className="back-button">
                    {/* <button onClick={this.handleBack}>Back</button> */}
                </div>
                <text>Here's where the info will be!</text>
            {this.state.completedAPI ? (this.state.back ? <ClassSelect apiKey={this.state.api_key}></ClassSelect> : this.makeTable()) : (<div>loading...</div>)}
            </div>
        )
    }
}

export default TotalGradesView;