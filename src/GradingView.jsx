import React, { Component } from "react";
import "./rubric.css"
import axios from "axios";
const ReactDOM = require('react-dom')

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
            groupingDispalyed: 'All',
            typing: false,
            typingTimeout: 0,
            comments: {}
        }
    }

    handleSubmit = (e, studentId, points, categoryId) => {
        if (e.target.classList.contains("rubric-button-not-selected"))
            e.target.classList.replace("rubric-button-not-selected", "rubric-button-yes-selected")
        else
            e.target.classList.replace("rubric-button-yes-selected", "rubric-button-not-selected")


        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var payload = {
            "studentId": studentId,
            "categoryId": categoryId,
            "points": points,
            "assignmentId": this.state.assignment_id
        }
        console.log(payload)
        var self = this
        axios.post(apiBaseUrl + 'updateGrades', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    console.log(response.data)
                }
                else {
                    console.log("error")
                }

                self.getGradesAndCategories()

            })

    }

    handleCommentChange = (e, studentId, catId) => {
     
        let temp = this.state.comments
        temp[studentId + "_" + catId] = e.target.value
        this.setState({ 
            comments: temp
        });
        console.log(this.state.comments)
    }

    handleCommentSubmit = (e, studentId, categoryId) => {
       
        console.log(e)
        console.log(this.state.comments.studentId)

        if (e.keyCode == 13){
            var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
            var payload = {
                "studentId": studentId,
                "categoryId": categoryId,
                "comment": this.state.comments[studentId + "_" + categoryId],
                "assignmentId": this.state.assignment_id
            }
            var self = this
            console.log(payload)
            axios.post(apiBaseUrl + 'updateComments', payload)
                .then(function (response) {
                    if (response.data.code == 200) {
                        console.log(response.data)
                    }
                    else {
                        console.log("error")
                    }
                    self.getGradesAndCategories()
                })
        }

    }

    handleGroupChange = (event) => {

        this.setState({ groupingDispalyed: event.target.value });

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
            if (studentGrades[category.id + "_grade"] == ratings[i].points) {
                output.push(
                    <button className="rubric-button-yes-selected" onClick={(e) => this.handleSubmit(e, studentGrades.studentId, ratings[i].points, category.id)}>{ratings[i].points}<div></div> {ratings[i].description}</button>
                )
            }
            else {
                output.push(
                    <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e, studentGrades.studentId, ratings[i].points, category.id)}>{ratings[i].points}<div></div> {ratings[i].description}</button>
                )
            }
        }
        return output;
    }

    newLoop2 = (studentInfo, category) => {
        let output = []

        output.push(
            <div class="item2">
                <div className="grid-container_2 cont">Criteria</div>

                {category.description}

            </div>
        )
        output.push(
            <div class="item3">
                <div className="grid-container_2 cont">Ratings</div>
                {this.makeRatings(studentInfo, category)}
            </div>
        )
        output.push(
            <div class="item4">
                <div className="grid-container_2 cont">Pts</div>
                {studentInfo[category.id + "_grade"]}/{category.points}
            </div>
        )
        output.push(
            <div class="item5">
                <div className="grid-container_2 cont">Comments</div>
                <input value = {this.state.comments[studentInfo.studentId + "_" + category.id]} onChange = {(e) => this.handleCommentChange(e, studentInfo.studentId, category.id)} onKeyDown={(e) => this.handleCommentSubmit(e, studentInfo.studentId, category.id)} type="text" placeholder={studentInfo[category.id + "_comment"]}></input>
            </div>
        )
        return output
    }

    newLoop1 = (studentInfo) => {
        let output = []
        output.push(<div class="item1 name">{studentInfo.studentName}</div>)
        let categories = this.state.data.categories;
        for (let i = 0; i < categories.length; i++) {


            output.push(

                <div class="grid-container">

                    {this.newLoop2(studentInfo, categories[i])}
                </div>

            )
        }
        return output
    }
    newLoop = () => {
        let output = []
        let studentInfo = this.state.data.student_grades
        for (let i = 0; i < studentInfo.length; i++) {
            if (studentInfo[i].grouping == this.state.groupingDispalyed || this.state.groupingDispalyed === "All")
                output.push(this.newLoop1(studentInfo[i]))

        }
        return output
    }
    render() {
        // console.log(this.state)
        if (!this.state.completedAPI)
            this.getGradesAndCategories()
        console.log(this.state.groupingDispalyed)
        return (
            <div>
                <h1>{this.state.assignment_name}</h1>

                <select value={this.state.groupingDispalyed} onChange={this.handleGroupChange}>
                    <option value="All">All</option>
                    <option value="Needs_attention">Needs Attention</option>
                    <option value="Not_graded">Not Graded</option>
                    <option value="Graded">Graded</option>
                </select>

                <div></div>


                {/* <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e)}>cat1</button> */}
                {this.state.completedAPI ? this.newLoop() : (<div>loading</div>)}


            </div>




        );
    }
}


export default GradingView;