/*
ResultPage for CanvasGradingHelper
This is the page that is used to show the results of the grading. It utilizes the ResultTable class 
for output as well.
Updated by Andrew Castelluccio 11/14
*/
import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from "./ResultTable"
class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bigObject: {},
            SECRET_KEY: '$2a$10$txGHwBPY1Dzq.ItjSm1I0.' + process.env.REACT_APP_SECRET,
            names: props.names,
            json: props.json
        };
        this.getJson = this.getJson.bind(this);
        this.output = this.output.bind(this);
        this.checkForUndefined = this.checkForUndefined.bind(this);
        this.mapOrder = this.mapOrder.bind(this);
    }

    // API request to populate bigObject with all of the information from the JSON
    // TODO: switch from JSON to database, redo function
    getJson = () => {
        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                let object = JSON.parse(req.responseText)
                this.setState({
                    isLoaded: true,
                    bigObject: object
                })
            }
        };
        req.open("GET",`https://api.jsonbin.io/b/` + this.state.json + `/latest`, true);
        req.setRequestHeader("secret-key", this.state.SECRET_KEY);
        req.send();
    }

    // used to ensure ouput of information is in order of the class names
    mapOrder(array, order, key) {
        array.sort(function (a, b) {
            var A = a[key], B = b[key];
            if (order.indexOf(A) > order.indexOf(B)) {
                return 1;
            } else {
                return -1;
            }
        });
        return array;
    };

    // function that creates big object of output in proper order to be used by the table
    output = () => {
        
        let out = [];

        // creates list of each student with poorly formatted names
        for (var key in this.state.bigObject) {
            // skip loop if the property is from prototype
            if (!this.state.bigObject.hasOwnProperty(key)) continue;
            out.push(this.state.bigObject[key]);
        }
       
        // creates list of each students name in correct order with proper format
        let indvNames = [];
        this.state.names.forEach(element => {
            indvNames.push(element['name'].replace(/\W/g, '').replace(/([A-Z])/g, ' $1').trim().replace(/ /g, "_"))
        });
        console.log(indvNames);
        // uses helper function to sort the out object by the order of the individual names
        let NewOut = this.mapOrder(out, indvNames, 'name')
        return NewOut;
    }

    // function to remove word undefined that appears on missing informatin and split text on new lines
    checkForUndefined = (ele) => {
        if (ele.bigComment != undefined) {
            return ele.bigComment.replace(/undefined/g, "").split("\n").map(function (item, idx) {
                return (
                    <span key={idx}>
                        {item}
                        <br />
                    </span>
                )
            })
        }
    }
    
    // two render cases, isNotLoaded for preload and isLoaded for post
    render() {
        if (!this.state.isLoaded) {
            this.getJson();
        }

        // temporary loading while json API is called
        let isNotLoaded = (
            <div className="home-loading">
                <CircularProgress />
                <div>
                    RESULTS
                </div>
            </div>
        )

        // outputs table from table class with name, totalpoints, and overall comment up top
        let isLoaded = (
            <div>
                <hr></hr>

                {/*make dropdown here*/}
                <select>
                    <option value="not_graded">Not Graded</option>
                    <option value="graded_needs_attention">Graded Needs Attention</option>
                    <option value="awaiting_submittal">Awaiting Submittal</option>
                    <option value="grading_submitted">Grading Submitted</option>
                </select>

                {/* loops through each student in json and calls table to display indvidual category */}
                {this.output().map(ele => (
                    <div>
                        <h1>Name:  {ele.name}</h1>
                        <h2>TotalPoint: {ele.totalPoints}</h2>
                        <p>OverallComment: <br></br> {this.checkForUndefined(ele)}</p>
                        <div>
                            <Table jsonData={this.state.bigObject} data={ele.categories}></Table>
                            <hr></hr>
                        </div>

                    </div>
                ))}
            </div>
        )
        return (
            <main className="home-main" >
                {this.state.isLoaded ? isLoaded : isNotLoaded}
            </main>
        )

    }
}
export default ResultPage;