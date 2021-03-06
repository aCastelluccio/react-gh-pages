/*
Homepage for CanvasGradingHelper 
All other page calls are handled from here. 
Updated by Andrew Castelluccio 11/14
*/
import React, { Component } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table.jsx'
import Results from './ResultPage.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUTHORIZATION_TOKEN: process.env.REACT_APP_API_KEY,
            COURSE_NUMBER: 1509682,
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
        // if (this.state.enteredPassword == this.state.PASSWORD || this.state.COURSE_NUMBER == 1525770)
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
        else if (event.target.value == 5) {

            this.state.json = "5c118262ec62650f24de0d47";
            this.setState({
                assignmentId: '10059324',
                json: '5c118262ec62650f24de0d47'

            })
        }
        else if (event.target.value == 6) {

            this.state.json = "5c1aa3be6265442e46f90342";
            this.setState({
                assignmentId: '10052954',
                json: '5c1aa3be6265442e46f90342'

            })
        }
        else if (event.target.value == 7) {

            this.state.json = "5c5af89415735a2542441358";
            this.setState({
                assignmentId: '10549940',
                json: '5c5af89415735a2542441358'

            })
        }
        else if (event.target.value == 8){

            this.state.json = "5c58b9e6e9e7c118390a8117";
            this.state.COURSE_NUMBER = 1525770
            this.setState({
                assignmentId: '10626022',
                json: '5c58b9e6e9e7c118390a8117',
                COURSE_NUMBER: 1525770,
                isLoaded: false
            })
        }
        else if (event.target.value == 9){

            this.state.json = "5c65b19cad5128320afbed4f";
            this.setState({
                assignmentId: '10735698',
                json: '5c65b19cad5128320afbed4f',
                isLoaded: false
            })
        }
        else if (event.target.value == 10){

            this.state.json = "5c69e2506874aa33ba1461d3";
            this.setState({
                assignmentId: '10737771',
                json: '5c69e2506874aa33ba1461d3',
                isLoaded: false
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
                        <input id='pass' type="password" value={this.state.enteredPassword} onChange={this.handleChange} />
                    </label>
                    <br></br>
                    <input type="radio" value="2" onChange={this.handleRadioChange} /> Project 2<br></br>
                    <input type="radio" value="1" onChange={this.handleRadioChange} /> Project 1 Resubmission<br></br>
                    <input type="radio" value="3" onChange={this.handleRadioChange} /> Project 3<br></br>
                    <input type="radio" value="4" onChange={this.handleRadioChange} /> Project 4<br></br>
                    <input type="radio" value="5" onChange={this.handleRadioChange} /> Project 6<br></br>
                    <input type="radio" value="6" onChange={this.handleRadioChange} /> Project 5<br></br>
                    <hr></hr>
                    <h3>Spring semster starts here</h3>
                    <input type="radio" value="7" onChange={this.handleRadioChange} /> Project 1<br></br>
                    <input type="radio" value="9" onChange={this.handleRadioChange} /> Labtop Quiz 1 B<br></br>
                    <input type="radio" value="10" onChange={this.handleRadioChange} /> Labtop Quiz 1 A<br></br>
                    <hr></hr>
                    <h3>Test Assignments below (no password needed)</h3>
                    <input type="radio" value="8" onChange={this.handleRadioChange} /> Test Page<br></br>

                    <input type="submit" value="Submit" /><br></br>
                </form>
            </div>
        )

        // gets called when correct password is submitted, switches to grading view
        let isLoaded = (
            <div>
                <button class="amazing-button" onClick={(e) => this.callResult(e)}>amazing button</button>
                <Table names={this.state.names} assignmentId={this.state.assignmentId} classId={this.state.COURSE_NUMBER} json={this.state.json}></Table>
            </div>
        );

        // gets called when amazing button is pressed, switches to grades view
        let resultButtonClicked = (
            <div>
                <Results names={this.state.names} json={this.state.json}/>
            </div>
        )

        // selects correct view for display bases on state conditions
        return (
            <MuiThemeProvider>

            <main className="home-main" >
                {(this.state.isLoaded && this.state.isConfirmed) ? (this.state.buttonClicked ? resultButtonClicked : isLoaded) : isNotLoaded}
            </main>
            </MuiThemeProvider>

        )

    }
}

export default Home;
