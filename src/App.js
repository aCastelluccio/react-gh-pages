import React, { Component } from 'react';
import './App.css';
import Homepage from "./components/pages/Homepage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    }
  }

  render() {
    return (

      <div>
        <Homepage />
      </div>

    );
  }
}

export default App;
