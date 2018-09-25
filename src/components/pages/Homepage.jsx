import React, { Component } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table.jsx'
import Results from './ResultPage.jsx'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUTHORIZATION_TOKEN: REACT_APP_API_KEY,
            COURSE_NUMBER: 1406719,
            isLoaded: false,
            names: {},
            buttonClicked: false
        };
        this.getNames = this.getNames.bind(this);
        this.createCORSRequest = this.createCORSRequest.bind(this);


    }

    createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        console.log(xhr)
        if ("withCredentials" in xhr) {

            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, url, true);
            console.log("th")

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            // Otherwise, CORS is not supported by the browser.
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
                `https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_NUMBER}/users?per_page=50`, config

            )
            .then(response => {

                let names = response.data.map(function (element) {
                    return element.name
                });
                // console.log(names)

                let data = [];
                names.forEach(function (element) {
                    data.push({ name: element });
                });
                // console.log(data)
                this.setState({
                    names: data,
                    isLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
            });

        //   let url = `https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_NUMBER}/users?per_page=50`;
        //   var xhr = this.createCORSRequest('GET', url);
        //   xhr.setRequestHeader('Authorization', `Bearer ` + this.state.AUTHORIZATION_TOKEN);
        //   xhr.setRequestHeader('Access-Control-Allow-Origin', true);
        //   xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        //   xhr.send()

        //   xhr.onload = function() {
        //     var responseText = xhr.responseText;
        //     let names = responseText.data.map(function (element) {
        //                     return element.name
        //                 });
        //                 // console.log(names)

        //                 let data = [];
        //                 names.forEach(function (element) {
        //                     data.push({ name: element });
        //                 });
        //                 // console.log(data)
        //                 this.setState({
        //                     names: data,
        //                     isLoaded: true
        //                 });
        //    };

        //    xhr.onerror = function() {
        //      console.log('There was an error!');
        //    };
        //   if (!xhr) {
        //     throw new Error('CORS not supported');
        //   }
    }

    callResult = () => {
        this.setState({
            buttonClicked:true
        })
    }
    render() {
        console.log(process.env.REACT_APP_API_KEY)
        if (!this.state.isLoaded)
            this.getNames();
        let isNotLoaded = (

            <div className="home-loading">
                <CircularProgress />
            </div>
        )
        let isLoaded = (
            <div>
                <button onClick={(e) => this.callResult(e)}>amazing button</button>
                <Table names={this.state.names}></Table>
            </div>
        );
        let buttonClicked = (
            <div>
                <Results />
            </div>
        )
        return (
            <main className="home-main" >
                {this.state.isLoaded ? (this.state.buttonClicked ? buttonClicked : isLoaded) : isNotLoaded}
            </main>
        )

    }
}
export default Home;
