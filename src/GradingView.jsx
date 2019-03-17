import React, { Component } from "react";
import "./rubric.css"
import axios from "axios";

class GradingView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            class_id: props.classId,
            assignment_id: props.assignment_id,
            assignment_name: props.name,
            data: [],
            completedAPI: false,
            completedBuilding: false,
            groupingDispalyed: 'all'
        }
    }

    handleSubmit = (e) => {
        if (e.target.classList.contains("rubric-button-not-selected"))
            e.target.classList.replace("rubric-button-not-selected", "rubric-button-yes-selected")
        else
            e.target.classList.replace("rubric-button-yes-selected", "rubric-button-not-selected")
    }

    getGradesAndCategories = () => {
        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var payload = {
            "apiKey": this.state.api_key,
            "classId": this.state.class_id,
            "assignmentId": this.state.assignment_id
        }
        var self = this;

        axios.post(apiBaseUrl + 'assignmentDetails', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    console.log(response.data)
                    self.setState({
                        data: response.data,
                        completedAPI: true
                    })
                }
                else {
                    console.log("error")
                }
            })
    }

    makeRatings = (studentGrades, category) => {
        let output = []
        let ratings = category.ratings
        for (let i = 0; i < ratings.length; i++) {
            output.push(
                <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e)}>{ratings[i].points}</button>
            )
        }
        return output;
    }

    makeRubric = (studentGrades) => {
        console.log(this.state.data.categories)
        let output = []
        let categories = this.state.data.categories;
        for (let i = 0; i < categories.length; i++) {
            output.push(
                <span>
                    <div>{categories[i].description}</div>
                    <div>{this.makeRatings(studentGrades, categories[i])}</div>
                </span>
            )
        }
        return output
    }
    studentLoop = () => {

        let output = [];
        let studentInfo = this.state.data.student_grades
        for (let i = 0; i < studentInfo.length; i++) {
            if (studentInfo[i].grouping == this.state.groupingDispalyed || this.state.groupingDispalyed == 'all') {
                output.push(
                    <span>
                        <div>{studentInfo[i].studentName}</div>
                        <div>{this.makeRubric(this.state.data.student_grades[i])}</div>
                    </span>
                )
            }
        }

        return output;

    }
    render() {
        // console.log(this.state)
        if (!this.state.completedAPI)
            this.getGradesAndCategories()
        return (
            <div>
                <h1>{this.state.assignment_name}</h1>
                
                {/* <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e)}>cat1</button> */}
                {this.state.completedAPI ? this.studentLoop() : (<div>loading</div>)}
              

            </div>
        );
    }
}


export default GradingView;