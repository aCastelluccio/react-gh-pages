import React, { Component } from "react";
class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {
            AUTHORIZATION_TOKEN: '7~qsZFfYlHHHmv83HEJz2hZVxLwulNRVIBAFQwmk2WmzPnM61FqtMPhrXzmOLEZy55',
            COURSE_ID: '1406719',
            name: props.name,
            ASSIGNMENT_ID: '9556573'
        };

        this.buildRubricObject = this.buildRubricObject.bind(this);
        this.buildRubric = this.buildRubric.bind(this);
    }

    buildRubricObject = (data) => {
        console.log(data)
        var arr = []
        
        return arr;
    }

    buildRubric = () => {
        const axios = require('axios');
        var config = {
            headers: {
                Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
                'Access-Control-Allow-Origin': true
            }
        }
        axios
            .get(
                `https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_ID}/assignments/${this.state.ASSIGNMENT_ID}/`, config
            )
            .then(response => {
                var rubric = this.buildRubricObject(response.data.rubric);
                
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        this.buildRubric();
        return (
            <div>EEEEEEE</div>
        )

    }
}
export default Student