import React, { Component } from "react";
import "./rubric.css"
import axios from "axios";
import CommentBox from './components/new_pages/CommentBox'

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
            comments: {},
            groupings: {'test':1}
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
        var self = this
        axios.post(apiBaseUrl + 'updateGrades', payload)
            .then(function (response) {
                if (response.data.code == 200) {
                    // console.log(response.data)
                }
                else {
                    console.log("error")
                }
                self.getGradesAndCategories()
            })
    }

    handleCommentChange = (e, studentId, catId) => {

        let temp = this.state.comments
        temp[studentId] = {}
        temp[studentId]["_" + catId] = e.target.value
        this.state.comments = temp;
        this.setState({
            comments: temp
        });
    }

    handleCommentSubmit = (e, studentId, categoryId) => {

        if (e.keyCode == 13) {
            var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
            var payload = {
                "studentId": studentId,
                "categoryId": categoryId,
                "comment": this.state.comments[studentId]["_" + categoryId],
                "assignmentId": this.state.assignment_id
            }
            var self = this
            axios.post(apiBaseUrl + 'updateComments', payload)
                .then(function (response) {
                    if (response.data.code == 200) {
                        let temp = self.state.comments

                        self.setState({
                            comments: temp
                        })
                    }
                    else {
                        console.log("error")
                    }
                    self.getGradesAndCategories()
                })
        }

    }

    handleGroupChange = (event) => {
        this.setState({ 
            groupingDispalyed: event.target.value,
            completedAPI: false
        });
        this.state.groupingDispalyed = event.target.value
        
    }

    handleGroupChangeSpecificStudent = (studentId, event) => {
        let e = event.target.value;

        var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
        var payload = {
            "studentId": studentId,
            "assignmentId": this.state.assignment_id,
            "group": event.target.value
        }
        let temp = this.state.groupings;
        var self = this;
        axios.post(apiBaseUrl + 'updateGrouping', payload)
            .then(function (response) {
               
                temp[studentId] = e
                self.setState({
                    groupings:temp
                })
            })

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
        let student_total = 0;
        for (let i = 0; i < ratings.length; i++) {
            if (studentGrades[category.id + "_grade"] == ratings[i].points) {
                output.push(
                    <button className="rubric-button-yes-selected" onClick={(e) => this.handleSubmit(e, studentGrades.studentId, ratings[i].points, category.id)}>{ratings[i].points}<div></div> {ratings[i].description}</button>
                )
                student_total = ratings[i].points
            }
            else {
                output.push(
                    <button className="rubric-button-not-selected" onClick={(e) => this.handleSubmit(e, studentGrades.studentId, ratings[i].points, category.id)}>{ratings[i].points}<div></div> {ratings[i].description}</button>
                )
            }
        }
        return [output, student_total];
    }

    makeColumns = (studentInfo, category) => {
        let output = []
        let ratings = this.makeRatings(studentInfo, category);
        
        let com_val = ""
        let comment = studentInfo[category.id + "_comment"]
        if (this.state.comments[studentInfo.studentId]){
            com_val = this.state.comments[studentInfo.studentId] ["_"+category.id]
            // console.log(com_val)
        }
        else {
            // console.log(studentInfo)
            if (studentInfo[category.id+"_comment"])
                com_val = studentInfo[category.id+"_comment"]
        }
       

        output.push(
            <td className="description-td">
                {category.description}
            </td>
            
        )
        output.push(
            <td className="button-td">
                {ratings[0]}
            </td>
        )
        output.push(
            <td className="grade-td">
                {studentInfo[category.id + "_grade"]}/{category.points}
            </td>
        )
        output.push(
            <td className="comment-td">
                {/* <textarea className="comment-input" value={com_val} onChange={(e) => this.handleCommentChange(e, studentInfo.studentId, category.id)} onKeyDown={(e) => this.handleCommentSubmit(e, studentInfo.studentId, category.id)} type="text">{studentInfo[category.id + "_comment"]} </textarea> */}
                <CommentBox assign= {this.state.assignment_id} com ={com_val} stuId = {studentInfo.studentId} catId = {category.id} catCom ={studentInfo[category.id + "_comment"]}> </CommentBox>
            </td>
        )
        return [output, ratings[1], comment]
    }

    makeRow = (studentInfo) => {
        let output = []
        let categories = this.state.data.categories;
        let grade = 0;
        let comment = []
        // console.log(categories)
        for (let i = 0; i < categories.length; i++) {
            let column = this.makeColumns(studentInfo, categories[i])
            output.push(

                <tr>
                    {column[0]}
                </tr>
            );
            grade += column[1];
            if (column[2] != null)
                comment.push(<div>{column[2]}</div>)
        }
        return [output, grade, comment]
    }


    makeTable = () => {
        let output = []
        let studentInfo = this.state.data.student_grades
        for (let i = 0; i < studentInfo.length; i++) {
            
            if (this.state.groupings[studentInfo[i].studentId]){
                studentInfo[i].grouping = this.state.groupings[studentInfo[i].studentId] 
            }

            if (studentInfo[i].grouping == this.state.groupingDispalyed || this.state.groupingDispalyed === "All") {

                let displayGroup = studentInfo[i].grouping;
                
              
                let row = this.makeRow(studentInfo[i])

                output.push(<div class="name">{studentInfo[i].studentName}</div>)
                output.push(
                    <div>
                        <table>
                            {row[0]}
                        </table>
                        {/* <textarea className="comment-input"> </textarea> */}
                        <table>
                            <tr>
                                <td>
                                    <div class="grade">GRADE={row[1]}</div>
                                </td>
                                <td>
                                    <div class="grade">COMMENT={row[2]}</div>
                                </td>
                                <td>
                                    <div class="status">
                                    Group = {displayGroup}
                                        <select onChange={(e) => this.handleGroupChangeSpecificStudent(studentInfo[i].studentId, e)}>
                                            <option selected disabled>{displayGroup}</option>
                                            <option value="not graded">Not Graded</option>
                                            <option value="Needs Attention">Needs Attention</option>
                                            <option value="Graded By Student Grader">Graded By Student Grader</option>
                                            <option value="Graded By Professor/ Ready for Submission">Graded By Professor/ Ready for Submission</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </div>
                )

            }
        }
        return output
    }



    render() {
        if (!this.state.completedAPI)
            this.getGradesAndCategories()
        return (
            <div>
                <h1>{this.state.assignment_name}</h1>
                <select value={this.state.groupingDispalyed} onChange={this.handleGroupChange}>
                    <option value="All">All</option>
                    <option value="not graded">Not Graded</option>
                    <option value="Needs Attention">Needs Attention</option>
                    <option value="Graded By Student Grader">Graded By Student Grader</option>
                    <option value="Graded By Professor/ Ready for Submission">Graded By Professor/ Ready for Submission</option>
                </select>

                <div></div>
                {this.state.completedAPI ? this.makeTable() : (<div>loading...</div>)}


            </div>




        );
    }
}


export default GradingView;