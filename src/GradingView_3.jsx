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

    getButtons = () => {
        let buttons = []
        for (let i = 0; i < 5; i++) {
            buttons.push(
                // <div className="grid-container">
                <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e)}>cat1</button>
                // </div>
            )
        }
        return buttons
    }
    render() {
        console.log(this.state)
        
        return (

            <div class="grid-container">
                <div class="item1">Header: student Name</div>


                <div class="item2">
                    <div className="grid-container_2 cont">Criteria</div>
                    Assignment 1 
                    test criteria 1
                </div>


                <div class="item3">
                    <div className="grid-container_2 cont">Ratings</div>
                    5 pts. Full Marks
                </div>



                <div class="item4">
                    <div className="grid-container_2 cont">Pts</div>
                    *total points for category here*
                </div>




                <div class="item5">
                    <div className="grid-container_2 cont">Comments</div>
                    *Insert comment box here*
                    <input type="text" placeholder="comments"></input>
                </div>


            </div>


        );
    }
}


export default GradingView;