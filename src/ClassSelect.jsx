import React, { Component } from 'react';
import axios from "axios";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import UploadScreen from './components/pages/Homepage';
import { callbackify } from 'util';

class classSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            loadedClasses: false,
            out: (<div></div>)
        }

    }

    handleSubmit = (id, event) => {
        console.log(id)
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