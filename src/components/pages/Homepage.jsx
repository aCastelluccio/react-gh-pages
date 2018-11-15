/*
Homepage for CanvasGradingHelper. All other page calls are handled from here. 

Updated by Andrew Castelluccio 11/14
*/
import React, { Component } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table.jsx'
import Results from './ResultPage.jsx'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUTHORIZATION_TOKEN: process.env.REACT_APP_API_KEY,
            COURSE_NUMBER: 1406719,
            isLoaded: false,
            names: {},
            buttonClicked: false,
            isConfirmed: false,
            PASSWORD: process.env.REACT_APP_PASSWORD,
            enteredPassword: "",
            assignmentId: '',
            json: ""
        };

        this.getNames = this.getNames.bind(this);
        this.callResult = this.callResult.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    // Uses the Course Number from State to set the state variables names and isLodaded.
    getNames = () => {
        // configuration for axios canvas call
        let config = {
            headers: {
                Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
                'Access-Control-Allow-Origin': true,
            }
        }

        // api call to canvas that returns all users registered for a given course number
        axios
            .get(
                `https://stormy-atoll-91880.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_NUMBER}/users?per_page=50`, config
            )
            .then(response => {
                // makes object with one key name that has each student in the classes name
                let data = [];
                response.data.map(function (element) {
                    data.push({ name: element.name });
                });
                
                this.setState({
                    names: data,
                    isLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
            });

    }

    // Sets buttonClicked to true, causing the resultpage to be called
    callResult = () => {
        this.setState({
            buttonClicked: true
        })
    }

    // Updates password with most recent
    handleChange(event) {
        this.setState({
            enteredPassword: event.target.value
        })
    }

    // Checks password
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.enteredPassword == this.state.PASSWORD)
            this.setState({
                isConfirmed: true
            })
    }

    // Uses radio button to determine assignmentID and json
    // TODO: automate the process of adding appropiate assignmentId to different selections
    handleRadioChange(event) {
        if (event.target.value == 2) {
            this.state.json = "5ba7f77d6d95da7b7a6a8cfe";
            this.setState({
                assignmentId: '9556573',
                json: '5ba7f77d6d95da7b7a6a8cfe'
            })
        }
        else if (event.target.value == 1) {
            this.state.json = "5bae3cd4a97c597b3c5abca6";
            this.setState({
                assignmentId: '9495582',
                json: '5bae3cd4a97c597b3c5abca6'
            })
        }
        else if (event.target.value == 3) {
            this.state.json = "5bcdd623716f9364f8c8f739";
            this.setState({
                assignmentId: '9750725',
                json: '5bcdd623716f9364f8c8f739'

            })
        }
        else if (event.target.value == 4) {

            this.state.json = "5be9a2d90692212d42fa9830";
            this.setState({
                assignmentId: '9942535',
                json: '5be9a2d90692212d42fa9830'

            })
        }

    }
    
    // three render cases, isNotLoaded for setup info, isLoaded for post setup, and resultButtonClicked for result view
    render() {

        if (!this.state.isLoaded)
            this.getNames();

        // base state of site, prompts for password and selection of class
        // TODO: make the radio buttons appear from a list of assignments rather thean hard code
        let isNotLoaded = (

            <div className="home-loading">
                <CircularProgress />
                <form onSubmit={this.handleSubmit}>
                    <label>Enter the password:
                        <input id='pass' type="text" value={this.state.enteredPassword} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="radio" value="2" onChange={this.handleRadioChange} /> Project 2<br></br>
                    <input type="radio" value="1" onChange={this.handleRadioChange} /> Project 1 Resubmission<br></br>
                    <input type="radio" value="3" onChange={this.handleRadioChange} /> Project 3<br></br>
                    <input type="radio" value="4" onChange={this.handleRadioChange} /> Project 4<br></br>
                    <input type="submit" value="Submit" /><br></br>
                </form>
            </div>
        )

        // gets called when correct password is submitted, switches to grading view
        let isLoaded = (
            <div>
                <button onClick={(e) => this.callResult(e)}>amazing button</button>
                <Table names={this.state.names} assignmentId={this.state.assignmentId} json={this.state.json}></Table>
            </div>
        );

        // gets called when amazing button is pressed, switches to grades view
        let resultButtonClicked = (
            <div>
                <Results names={this.state.names} json={this.state.json} />
            </div>
        )

        // selects correct view for display bases on state conditions
        return (
            <main className="home-main" >
                {(this.state.isLoaded && this.state.isConfirmed) ? (this.state.buttonClicked ? resultButtonClicked : isLoaded) : isNotLoaded}
            </main>
        )

    }
}
export default Home;
