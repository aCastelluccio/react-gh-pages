import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import Loginscreen from './loginScreen'
import GoogleLogin from 'react-google-login';
import ClassSelect from './ClassSelect'
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: [],
      authenticated: false,
      api_key: '',
      makeAccount: false, 
      value: "",
      googleId: ''
    }

  }

   responseGoogle = (response) => {
    var self = this;
    if (response.googleId) {
      var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
      var payload = {
          "googleId": response.profileObj.googleId
      }
      axios.post(apiBaseUrl + 'googleAuth', payload)
          .then(function (my_response) {
            console.log(response)

              if (my_response.data.code == 200) {
                self.setState({
                    api_key: my_response.data.body.apiKey,
                    authenticated: true
                  })
              }
              else {
                self.setState({
                    googleId: response.profileObj.googleId, 
                    makeAccount:true
                  })
              }
          })
    }
  }

  handleChange = (event) => {
    
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
    var payload = {
        "googleId": this.state.googleId,
        "apiKey" : this.state.value
    }
    var self = this;
    axios.post(apiBaseUrl + 'googleAuthCreateUser', payload)
        .then(function (response) {
          console.log(response)
          let val = self.state.value
            if (response.data.code == 200) {
              self.setState({
                  api_key: val,
                  authenticated: true
                })
            }
            else {
                alert("error")
            }
        })
  }

  render() {
    let no_auth = (
      <div className="App">
        <GoogleLogin
          clientId="785713899867-to0gsfutckluhoa0lr1i1gep83b8bugo.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    )
    console.log(this.state.api_key)
    let auth = (
   
      <ClassSelect apiKey = {this.state.api_key} > </ClassSelect>
    )

    let makeAccount = (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  
    return (
      <div className="App">
        {this.state.authenticated ? auth : (this.state.makeAccount ? makeAccount : no_auth) }
      </div>
    );
  }
}
const style = {
  margin: 15,
};
export default App;