import React, { Component } from 'react';
import axios from "axios";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import GradingView from './GradingView'

class classSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            loadedClasses: false,
            out: (<div></div>),
            classId: ""
        }

    }

    handleSubmit = (id, event) => {
        this.getListOfAssignments(id);
    }

    handleAssignmentSubmit = (id, name, event) => {
        console.log(id)
        console.log(name)

        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var payload = {
            "api": this.state.api_key,
            "classId": this.state.classId,
            "assignmentId":id
        }
        
        axios.post(apiBaseUrl + 'addAssignment', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    
                }
                else {
                    console.log("error")
                }
            })

        self.setState({
            out:
                (
                <div>
                    <GradingView assignment_id={id} name={name} apiKey={self.state.api_key} classId = {self.state.classId}/>
                </div>
                )
        })
    }

    getListOfAssignments = (id) => {
        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var self = this;
        var payload = {
            "api": this.state.api_key,
            "classId": id
        }
        axios.post(apiBaseUrl + 'listOfAssignments', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    console.log("assignments retrieval sucsessful");
                    console.log(response.data)
                    let output = self.state.out
                    output.push(<div></div>)
                    for (let i = 0; i < response.data.data.length; i++) {
                        output.push(<button onClick={(e) => self.handleAssignmentSubmit(response.data.data[i].id, response.data.data[i].name, e)}>{response.data.data[i].name}</button>)
                    }
                    self.setState({
                        out: output,
                        classId: id
                    })
                }
                else {
                    console.log("error")
                }
            })
    }

    getListOfClasses = () => {

        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var self = this;
        var payload = {
            "api": this.state.api_key
        }
        axios.post(apiBaseUrl + 'listOfClasses', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    console.log("retrieval sucsessful");
                    console.log(response.data)

                    // Creates the elements to be outputted

                    let output = []
                    for (let i = 0; i < response.data.data.length; i++) {
                        output.push(<button onClick={(e) => self.handleSubmit(response.data.data[i].id, e)}>{response.data.data[i].name}</button>)
                    }


                    self.setState({
                        loadedClasses: true,
                        out: output
                    })
                }
                else {
                    console.log("retrieval failed");
                }
            })
            .catch(function (error) {
                console.log(apiBaseUrl + 'listOfClasses')
                console.log(error);
            });
    }



    render() {
        if (!this.state.loadedClasses) {
            this.getListOfClasses()
        }


        let loading = (
            <MuiThemeProvider>
                <div>
                    Loading...
                </div>
            </MuiThemeProvider>
        )

        return (
            <div>
                {(this.state.loadedClasses) ? this.state.out : loading}

            </div>
        );
    }
}

export default classSelect;