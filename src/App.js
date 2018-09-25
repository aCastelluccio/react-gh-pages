import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./components/pages/Homepage";
import Student from "./components/pages/Student";
class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    }
  }

  handleRedirect = (path) => {
    this.setState({
      redirect: true,
      redirecting: path
    })
    console.log(`The path is: ` + path);
  }

  redirectTo = () => {
    if (this.state.redirect) {
      console.log("redirect")
      this.setState({
        redirect: false,
      })
      return (<Redirect to={this.state.redirecting} />);
    }
  }

  render() {
    return (
      // <BrowserRouter>
      //   <div className="wrapper">
      //     <Switch>
      //       <Route path="/home" exact component={() => <Homepage handleRedirect={this.handleRedirect} />} />
      //       <Route path="/Student/:name" render={(props) => <Student {...props} />} />
      //     </Switch>
      //     {this.redirectTo()}
      //   </div>
      // </BrowserRouter>
      <div>
        <Homepage />
      </div>
    );
  }
}

export default App;
