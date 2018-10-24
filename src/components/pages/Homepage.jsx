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
            json:""
        };
        this.getNames = this.getNames.bind(this);
        this.createCORSRequest = this.createCORSRequest.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {

            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            xhr = null;

        }
        return xhr;
    }
    getNames = () => {

        let config = {
            headers: {
                Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
                'Access-Control-Allow-Origin': true,
            }
        }
        axios
            .get(
                `https://stormy-atoll-91880.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_NUMBER}/users?per_page=50`, config
            )
            .then(response => {

                let names = response.data.map(function (element) {
                    return element.name
                });

                let data = [];
                names.forEach(function (element) {
                    data.push({ name: element });
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

    callResult = () => {
        this.setState({
            buttonClicked: true
        })
    }

    handleChange(event) {
        this.setState({
            enteredPassword: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.enteredPassword == this.state.PASSWORD)
            this.setState({
                isConfirmed: true
            })
    }

    handleRadioChange(event){
        
        if (event.target.value == 2){
            this.setState({
                assignmentId:'9556573',
                json:'5ba7f77d6d95da7b7a6a8cfe'
            })
        }
        else if (event.target.value == 1){
            this.setState({
                assignmentId:'9495582',
                json:'5bae3cd4a97c597b3c5abca6'
            })
        } 
        else if (event.target.value == 3){
            this.state.json= "5bcdd623716f9364f8c8f739";
            this.setState({
                assignmentId:'9750725',
                json:'5bcdd623716f9364f8c8f739'
                
            })
        }

    }

    render() {
        if (!this.state.isLoaded)
            this.getNames();

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
                    <input type="submit" value="Submit" /><br></br>
                </form>
            </div>
                )
                let isLoaded = (
            <div>
                    <button onClick={(e) => this.callResult(e)}>amazing button</button>
                    <Table names={this.state.names} assignmentId={this.state.assignmentId} json = {this.state.json}></Table>
                </div>
                );
                let buttonClicked = (
            <div>
                    <Results names={this.state.names} json={this.state.json} />
                </div>
                )
                return (
            <main className="home-main" >
                    {(this.state.isLoaded && this.state.isConfirmed) ? (this.state.buttonClicked ? buttonClicked : isLoaded) : isNotLoaded}
                </main>
                )
        
            }
        }
        export default Home;