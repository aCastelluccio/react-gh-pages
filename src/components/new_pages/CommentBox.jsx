
import React, { Component } from "react";
import axios from "axios";



class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            com:props.com,
            stuId: props.stuId,
            catId: props.catId,
            catCom: props.catCom,
            comments: {},
            assign: props.assign,
            background: 'green'

        }
    }

    handleCommentChange = (e, studentId, catId) => {

        let temp = this.state.comments
        temp[studentId] = {}
        temp[studentId]["_" + catId] = e.target.value
        this.state.comments = temp;
        this.setState({
            comments: temp,
            background: 'red'
        });
    }

    handleCommentSubmit = (e, studentId, categoryId) => {

        if (e.keyCode == 13) {
            var apiBaseUrl = "https://stormy-atoll-91880.herokuapp.com/https://grading-api.herokuapp.com/api/";
            var payload = {
                "studentId": studentId,
                "categoryId": categoryId,
                "comment": this.state.comments[studentId]["_" + categoryId],
                "assignmentId": this.state.assign
            }
            var self = this
            axios.post(apiBaseUrl + 'updateComments', payload)
                .then(function (response) {
                    if (response.data.code == 200) {
                        let temp = self.state.comments
                        self.setState({
                            background: 'green',
                            comments: temp
                        })
                    }
                    else {
                        console.log("error")
                    }
                })
        }

    }
    render() {
        let redStyle = {
            'background-color': '#ffffff'
        }
        let greenStyle = { 
            'background-color': '#919191'
        }
        let style = {}
        if (this.state.background == 'red') 
            style = redStyle
        else 
            style = greenStyle
        return (
        <textarea style={style} className="comment-input" value={this.state.com_val}
            onChange={(e) => this.handleCommentChange(e, this.state.stuId, this.state.catId)}
            onKeyDown={(e) => this.handleCommentSubmit(e, this.state.stuId, this.state.catId)} type="text">{this.state.catCom}
        </textarea>
        )

    }
}
export default CommentBox;