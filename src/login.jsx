


import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import ClassSelect from './ClassSelect'
import BootstrapExample from './BootstrapExample';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

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
     googleId: '',
     googleClient: process.env.REACT_APP_CLIENT_ID,
     loading: false
   }

 }

 responseGoogle = (response) => {
   var self = this;
   self.setState({
     loading: true
   })
   if (response.googleId) {
     var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
     var payload = {
       "googleId": response.profileObj.googleId
     }
     axios.post(apiBaseUrl + 'googleAuth', payload)
       .then(function (my_response) {
         if (my_response.data.code == 200) {
           self.setState({
             api_key: my_response.data.body.apiKey,
             authenticated: true
           })
         }
         else {
           self.setState({
             googleId: response.profileObj.googleId,
             makeAccount: true
           })
         }
       })
   }
 }

 handleChange = (event) => {

   this.setState({ value: event.target.value });
 }

 handleSubmit = (event) => {
   event.preventDefault();
   var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
   var payload = {
     "googleId": this.state.googleId,
     "apiKey": this.state.value
   }
   var self = this;
   axios.post(apiBaseUrl + 'googleAuthCreateUser', payload)
     .then(function (response) {
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
   console.log(this.state.googleClient)
    let no_auth = (
      <div className="login-container">
        <span className="glyphicon glyphicon-repeat"></span>
     <div className="sign-in">Sign in to Greater Grader</div>
     <div className="login-button">
       <GoogleLogin
         clientId={process.env.REACT_APP_CLIENT_ID}
         buttonText="Login"
         onSuccess={this.responseGoogle}
         onFailure={this.responseGoogle}
         cookiePolicy={'single_host_origin'}
       />
       </div>
     </div>
   )
   let auth = (

     <ClassSelect apiKey={this.state.api_key} > </ClassSelect>
   )

   let loading = (
     <CircularProgress />
   )
   let makeAccount = (
     <form onSubmit={this.handleSubmit}>
       <label>
         <input placeholder="Enter your API key from canvas here" type="text" value={this.state.value} onChange={this.handleChange} />
       </label>
       <input type="submit" value="Submit" />
     </form>
   )

   return (
     <div className="login-container">
       {this.state.authenticated ? auth : (this.state.makeAccount ? makeAccount : (this.state.loading ? loading : no_auth))}
     </div>
   );
 }
}
const style = {
 margin: 15,
};
export default App;
