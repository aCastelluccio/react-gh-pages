import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './login'
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: '',
            email: '',
            password: ''
        }
    }

    handleClick(event) {
        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        console.log("values", this.state.api_key, this.state.email, this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var payload = {
            "api_key": this.state.api_key,
            "email": this.state.email,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'register', payload)
            .then(function (response) {
                console.log(response);
                if (response.data.code == 200) {
                    //  console.log("registration successfull");
                    var loginscreen = [];
                    loginscreen.push(<Login parentContext={this} />);
                    var loginmessage = "Not Registered yet.Go to registration";
                    self.props.parentContext.setState({
                        loginscreen: loginscreen,
                        loginmessage: loginmessage,
                        buttonLabel: "Register",
                        isLogin: true
                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Register"
                        />
                        <br />
                        <TextField
                            hintText="Enter your Email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({ email: newValue })}
                        />
                        <br />
                        <TextField
                            type="password"
                            hintText="Enter your Password"
                            floatingLabelText="Password"
                            onChange={(event, newValue) => this.setState({ password: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your API Key"
                            floatingLabelText="API Key"
                            onChange={(event, newValue) => this.setState({ api_key: newValue })}
                        />
                        <br />
                        <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)} />
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}
const style = {
    margin: 15,
};
export default Register;