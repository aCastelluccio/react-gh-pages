import React, { Component } from "react";
import axios from "axios";
import GradingView from './GradingView2';
import ClassSelect from './ClassSelect';
import "./rubric.css"
import CommentBox from './components/new_pages/CommentBox'


const ReactDOM = require('react-dom')

class TotalGradesView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            api_key: props.apiKey,
            class_id: props.classId,
            assignment_id: props.assignment_id,
            grades: props.grades,
            back: false,
            completedAPI: false,
            data: [],
            googleId: props.googleId
        }
    }

    handleBack = (e) => {
        this.setState({
            back: true
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


    makeStudents = () => {
        let output = []
        let grade = 0;
        let students = this.state.grades.student_grades;
        let categories = this.state.grades.categories;
        let comment = []
        console.log(students)
        console.log(categories)

        for (let i=0; i<students.length; i++){
            let student = students[i]
            let name = student.studentName
            let grade = 0
            let comment = ""
            for (let j=0; j<categories.length; j++){
                let cat = categories[j]
                let add = (cat.id + "_grade")
                
                if(student[cat.id + "_grade"])
                grade += parseInt(student[cat.id + "_grade"])
                if((student[cat.id + "_comment"]) != null){
                comment = comment + "\n\n" + (student[cat.id + "_comment"])
                }
            }
            
            output.push(
                <td>
                    {name}
                </td>
            )
            output.push(
                <td>
                    {grade}
                </td>
            )
            output.push(
                <td>
                    {comment}
                </td>
            )
        }
        return [output, grade, comment]
    } 
    
    
    
    makeTable2 = () => {
        let output = []
        output.push(
            <div>
                <div className="back-button">
                    <button onClick={this.handleBack}>Back</button>
                    {this.makeStudents()}
                </div>
            </div>
       )
       return output
    }
    
    render() {
        return(
            <div>
               {(this.state.back ? <GradingView classId={this.state.class_id} assignment_id={this.state.assignment_id} assignment_name={this.state.name} id={this.state.id} googleId={this.state.googleId} apiKey={this.state.api_key}></GradingView> : this.makeTable2())}
            </div>
        );
    }
}

export default TotalGradesView;
