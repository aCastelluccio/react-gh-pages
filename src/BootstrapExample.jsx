import React, { Component } from "react";
import Button from 'react-bootstrap/Button';

const ReactDOM = require('react-dom')

class GradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div>
                {
                    // YOU MUST DO     NPM INSTALL      BEFORE USING               <--------------------------------------
                    // this site has all the explanations/examples/components      https://react-bootstrap.github.io/getting-started/introduction/
                }

                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />

                <Button variant="primary">Primary</Button>

            </div>




        );
    }
}


export default GradingView;