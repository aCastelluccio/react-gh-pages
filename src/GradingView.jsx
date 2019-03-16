import React, { Component } from "react";
import "./rubric.css"
class GradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            class_id: props.classId,
            assignment_id: props.assignment_id,
            assignment_name: props.name,
            green: false

        }


    }

    handleSubmit = (e) => {
        if (e.target.classList.contains("rubric-button-not-selected"))
            e.target.classList.replace("rubric-button-not-selected", "rubric-button-yes-selected")
        else
            e.target.classList.replace("rubric-button-yes-selected", "rubric-button-not-selected")

    }

    render() {
        console.log(this.state)

        return (
            <div>
                <h1>{this.state.assignment_name}</h1>
                <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e)}>cat1</button>
                <button>cat1</button>
                <button>cat1</button>
                <button>cat1</button>
                <div></div>
                <button>cat1</button>
                <button>cat1</button>
                <button>cat1</button>
                <button>cat1</button>

            </div>
        );
    }
}


export default GradingView;