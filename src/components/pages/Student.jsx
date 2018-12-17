/*
Student for CanvasGradingHelper 
Handles the actual grading of an individual student
Updated by Andrew Castelluccio 11/26
*/
import React, { Component } from "react";
import Table from './TableRubric'
import CircularProgress from '@material-ui/core/CircularProgress';

class Student extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUTHORIZATION_TOKEN: process.env.REACT_APP_API_KEY,
            COURSE_ID: '1406719',
            name: props.name.replace(/\W/g, ''),
            ASSIGNMENT_ID: props.assignmentId,
            ready: false,
            ouput: null,
            dat: [],
            commentObject: {
                name:props.name.replace(/\W/g, ''),
                categories:{},
                bigComment:"",
                totalPoints:0,
            },
            saved: "not saved",
            json:props.json,
            JSON_AUTHORIZATION : '$2a$10$txGHwBPY1Dzq.ItjSm1I0.' + process.env.REACT_APP_SECRET
        };

        this.buildRubricObject = this.buildRubricObject.bind(this);
        this.buildRubric = this.buildRubric.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // stores the data from the rubric as an object and causes state change
    buildRubricObject = (data) => {
        this.setState({
            dat: data
        })
        this.setState({
            ready: true

        })

    }

    // API call to get the rubric and store its data
    buildRubric = () => {
        const axios = require('axios');
        var config = {
            headers: {
                Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
                'Access-Control-Allow-Origin': true
            }
        }
        axios
            .get(
                `https://stormy-atoll-91880.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_ID}/assignments/${this.state.ASSIGNMENT_ID}/`, config
            )
            .then(response => {
                var rubric = this.buildRubricObject(response.data.rubric);

            })
            .catch(error => {
                console.log(error);
            });
    }

    // called when points box is typed into, stores all the information about what was just typed to commentObject
    handleChange(event) {
        if(!(event.target.id in this.state.commentObject.categories)){
            this.state.commentObject.categories[event.target.id] = {};
        }
            this.state.commentObject.categories[event.target.id].points = event.target.value;
            this.state.commentObject.categories[event.target.id].categoryDescription = this.state.dat[event.target.id].description;

            let count = 0;
            for (let element of this.state.dat[event.target.id].ratings) {
                if (element.points == event.target.value) {
                    this.state.commentObject.categories[event.target.id].ratingDescription = this.state.dat[event.target.id].ratings[count].description;
                    this.state.commentObject.categories[event.target.id].categoryDescription = this.state.dat[event.target.id].description;

                    break;

                }
                else {
                    this.state.commentObject.categories[event.target.id].ratingDescription = "";
                }
                count += 1;
            };
     
        event.preventDefault();
    }

    // called when comment box is typed into, stores all the information about what was just typed to commentObject
    handleChange2(event) {

        if (event.target.id in this.state.commentObject.categories) {
            
            this.state.commentObject.categories[event.target.id].comments = event.target.value;
            this.state.commentObject.categories[event.target.id].categoryDescription = this.state.dat[event.target.id].description;

        }
        else {
            this.state.commentObject.categories[event.target.id] = {};
            this.state.commentObject.categories[event.target.id].comments = event.target.value;
        }
        event.preventDefault();
    }

    // When submit button is clicked makes API call to store info in JSON
    handleSubmit(event) {
        event.preventDefault();

        let str = "";
        let totPoints = 0;
 
        for (var key in this.state.commentObject.categories) {
            // skip loop if the property is from prototype
            if (!this.state.commentObject.categories.hasOwnProperty(key)) continue;
            var obj = this.state.commentObject.categories[key];
            if (obj.comments != "" && obj.comments != null && obj.comments != undefined)
                str += "\n" + obj.comments;
            totPoints += parseInt(obj.points);

        }
        this.state.commentObject.totalPoints = totPoints;
        this.state.commentObject.bigComment = str;
        let req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                var obj = JSON.parse(req.responseText)
                obj[this.state.name] = this.state.commentObject;
                obj["categories"] = this.state.dat
                var myJSON = JSON.stringify(obj);
                let req2 = new XMLHttpRequest();
                req2.onreadystatechange = () => {
                    if (req2.readyState == XMLHttpRequest.DONE) {
                        console.log(req2.responseText);
                    }
                };
                req2.open("PUT", `https://api.jsonbin.io/b/${this.state.json}`, true);
                req2.setRequestHeader("Content-type", "application/json");
                req2.setRequestHeader("secret-key", this.state.JSON_AUTHORIZATION);
                req2.send(myJSON);
            }
        };
        req.open("GET", `https://api.jsonbin.io/b/${this.state.json}/latest`, true);
        req.setRequestHeader("secret-key", this.state.JSON_AUTHORIZATION);
        req.send();
        return false;
    };

    // two render cases, isNotLoaded and isLoaded 
    render() {
        if (!this.state.ready)
            this.buildRubric();
        // temp loading view
        let isNotLoaded = (
            <div className="home-loading">
                <CircularProgress />
            </div>
        );
        // actual view with all rubric info
        let isLoaded = (
            <div>
                {this.state.dat.map((row, idx) => {
                    return (
                        <div>
                            <Table cat={row}></Table>
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                    Points:
                                    <input id={idx} type="text" value={this.state.comment} onChange={this.handleChange} />
                                </label>
                                <label>
                                    Comments: 
                                    <input id={idx} type="text" value={this.state.comment} onChange={this.handleChange2} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>

                        </div>
                    );
                })}
            </div>
        );
        return (
            <main className="student-main" >
                <h1>{this.state.name}</h1>
                {this.state.ready ? isLoaded : isNotLoaded}

            </main>
        )

    }
}
export default Student