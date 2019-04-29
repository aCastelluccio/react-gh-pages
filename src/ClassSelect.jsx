import React, { Component } from 'react';
import axios from "axios";

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import GradingView from './GradingView2'
import "./ClassSelection.css"
import { blue } from '@material-ui/core/colors';

class classSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            loadedClasses: false,
            out: (<div></div>),
            classId: "",
            googleId: props.googleId,
            favorites: []
        }

    }

    handleSubmit = (id, name, event) => {
        this.getListOfAssignments(id, name);
    }

    handleAssignmentSubmit = (id, name, event) => {

        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var payload = {
            "apiKey": this.state.api_key,
            "classId": this.state.classId,
            "assignmentId": id
        }
        var self = this;

        axios.post(apiBaseUrl + 'addAssignment', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    self.setState({
                        out:
                            (
                                <div>
                                    <GradingView assignment_id={id} googleId={self.state.googleId} name={name} apiKey={self.state.api_key} classId={self.state.classId} />
                                </div>
                            )
                    })
                }
                else {
                    console.log("error")
                }
            })

    }

    sortAssigments = (assignment) => {


        let britt = assignment.data.sort(function (a, b) {
            return new Date(a.due_at) - new Date(b.due_at)
        })

    }

    getListOfAssignments = (id, name) => {
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

                    console.log(self.sortAssigments(response.data))
                    let output = [];
                    output.push(

                        <div>
                            <h2>{name}</h2>

                            <div>
                                <table className="assignment-table">
                                    <tr className="assignment-tr">
                                        <th className="header">Assignment</th>
                                    </tr>
                                </table>
                            </div>
                        </div>


                    )

                    for (let i = 0; i < response.data.data.length; i++) {
                        //edit here
                        if (response.data.data[i].rubric && response.data.data[i].has_submitted_submissions && response.data.data[i].needs_grading_count>0) {
                            console.log(response.data.data[i])
                            output.push(
                                //edit here
                                //response.data[i].
                                <div>
                                    <table className="assignment-table">
                                        <tr className="assignment-tr">
                                            <td className="assignment-td">
                                                <button className="assignment-btns" onClick={(e) => self.handleAssignmentSubmit(response.data.data[i].id, response.data.data[i].name, e)}>{response.data.data[i].name}</button>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        }
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

    addFavorite = (id, event) => {
        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var self = this;
        console.log(this.state.googleId)
        var payload = {
            "googleId": this.state.googleId,
            "class": id
        }
        axios.post(apiBaseUrl + 'addFavorite', payload)
            .then(function (response) {
                self.setState({
                    loadedClasses: false
                })
                console.log("sucsess")
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    getFavorite = (event) => {
        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var self = this;
        console.log(this.state.googleId)
        var payload = {
            "googleId": this.state.googleId,
        }
        axios.post(apiBaseUrl + 'getFavorites', payload)
            .then(function (response) {
                if(response.data.data[0]['favorites'])
                self.setState({
                    favorites: response.data.data[0]['favorites'].split(",")
                })

            })
            .catch(function (error) {
                console.log(error)
            })
    }
    getRandomColor = () => {
        var num = Math.floor(Math.random() * 4);
        var col = 'gray'
        if (num == 1)
            col = 'blue'
        if (num == 2)
            col = 'red'
        if (num ==3)
            col = 'green'
        var ob = {'background-color':col}
        console.log(ob)
        return ob

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

                    // Creates the elements to be outputted
                    let output = []
                    output.push(<div><h1>Favorites</h1></div>)
                    for (let i = 0; i < response.data.data.length; i++) {
                        //edit here
                        if (self.state.favorites.includes(response.data.data[i].id.toString())) {
                            console.log("was true")
                            output.push(
                                //edit here
                                <div className="column">
                                    <div className="container">
                                        <div className="card" style = {self.getRandomColor()}>

                                            <img src={response.data.data[i].image_download_url ? response.data.data[i].image_download_url : "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12193133/German-Shepherd-Puppy-Fetch.jpg"}></img>
                                            <button className="class-btns" onClick={(e) => self.handleSubmit(response.data.data[i].id, response.data.data[i].name, e)}>{response.data.data[i].name}</button>
                                            <button className="fav" onClick={(e) => self.addFavorite(response.data.data[i].id, e)}>Remove From Favorites</button>
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                    output.push(<div className="move"><hr></hr></div>)
                    for (let i = 0; i < response.data.data.length; i++) {
                        //edit here
                        if (!self.state.favorites.includes(response.data.data[i].id.toString())) {
                            output.push(
                                //edit here
                                <div className="column">
                                    <div className="container">
                                    <div className="card" style = {self.getRandomColor()}>

                                            <img src={response.data.data[i].image_download_url ? response.data.data[i].image_download_url : "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12193133/German-Shepherd-Puppy-Fetch.jpg"}></img>
                                            <button className="class-btns" onClick={(e) => self.handleSubmit(response.data.data[i].id, response.data.data[i].name, e)}>{response.data.data[i].name}</button>
                                            <button className="fav" onClick={(e) => self.addFavorite(response.data.data[i].id, e)}>Add to Favorites</button>
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
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
            this.getFavorite();
            this.getListOfClasses();
        }

        let loading = (
            <MuiThemeProvider>
                <div className="loading">
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