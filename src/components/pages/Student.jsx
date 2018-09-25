import React, { Component } from "react";
import Table from './TableRubric'
import CircularProgress from '@material-ui/core/CircularProgress';

class Student extends Component {

    constructor(props) {
        super(props);

        this.state = {
            AUTHORIZATION_TOKEN: '7~FcVxUwtCf8QiBAd2PQcdfwQslhl1oQy1l8DmMd9oj8q5ion7qjznfeAQSAXs0F4T',
            COURSE_ID: '1406719',
            name: props.name.replace(/\W/g, ''),
            ASSIGNMENT_ID: '9556573',
            ready: false,
            ouput: null,
            dat: [],
            commentObject: {
                name:props.name.replace(/\W/g, ''),
                categories:{},
                bigComment:"",
                totalPoints:0,
            //   comments : [],
            //   points : []
            },
            saved: "not saved",
          
        };

        this.buildRubricObject = this.buildRubricObject.bind(this);
        this.buildRubric = this.buildRubric.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    buildRubricObject = (data) => {



        this.setState({
            dat: data
        })
        this.setState({
            ready: true

        })
        // var retrievedObject = localStorage.getItem('testObject');
        // console.log('retrievedObject: ', JSON.parse(retrievedObject));


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
                `https://cors-anywhere.herokuapp.com/https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_ID}/assignments/${this.state.ASSIGNMENT_ID}/`, config
            )
            .then(response => {
                var rubric = this.buildRubricObject(response.data.rubric);

            })
            .catch(error => {
                console.log(error);
            });
    }


    handleChange(event) {

        if (event.target.id in this.state.commentObject.categories)
        {
            // console.log(event.target.id)
            // this.setState({this.state.commentObject.event.target.id.comment:event.target.value
            this.state.commentObject.categories[event.target.id].points = event.target.value;
            this.state.commentObject.categories[event.target.id].categoryDescription = this.state.dat[event.target.id].description;

            // console.log(this.state.dat)
            let count = 0;
            for (let element of this.state.dat[event.target.id].ratings) {
                // console.log(element.points + "======" + event.target.value)
                if (element.points == event.target.value) {
                    this.state.commentObject.categories[event.target.id].ratingDescription = this.state.dat[event.target.id].ratings[count].description;
                    break;

                }
                else {
                    this.state.commentObject.categories[event.target.id].ratingDescription = "";
                }
                count += 1;
            };
            // this.state.commentObject.categoryDescription = 
        }
        else {
            this.state.commentObject.categories[event.target.id] = {};
            this.state.commentObject.categories[event.target.id].points = event.target.value;

        }
        event.preventDefault();
    }

    handleChange2(event) {

        if (event.target.id in this.state.commentObject.categories) {
            // console.log(event.target.id)
            // this.setState({this.state.commentObject.event.target.id.comment:event.target.value
            this.state.commentObject.categories[event.target.id].comments = event.target.value;
            this.state.commentObject.categories[event.target.id].categoryDescription = this.state.dat[event.target.id].description;

        }
        else {
            this.state.commentObject.categories[event.target.id] = {};
            this.state.commentObject.categories[event.target.id].comments = event.target.value;
        }
        // console.log(this.state.commentObject)
        event.preventDefault();
    }
    handleSubmit(event) {
        event.preventDefault();

        let str = "";
        let totPoints = 0;
        // this.state.commentObject.categories.forEach(element => {
        //     str += "\n" + element.comments;
        //     // points += element.points;
        // });

        // Object.keys(this.state.commentObject.categories).map(function(objectKey, index) {

        //     console.log(objectKey);
        // });
        console.log(this.state.commentObject)
        for (var key in this.state.commentObject.categories) {
            // skip loop if the property is from prototype
            if (!this.state.commentObject.categories.hasOwnProperty(key)) continue;

            var obj = this.state.commentObject.categories[key];
            str += "\n" + obj.comments;
            totPoints += parseInt(obj.points);
            // for (var prop in obj) {
            //     console.log("prop:" + prop)
            //     // skip loop if the property is from prototype
            //     if(!obj.hasOwnProperty(prop)) continue;

            //     // your code

            //     str += "\n" + obj.comments;
            //     totalPoints += parseInt(obj.points);
            // }
        }

        this.state.commentObject.totalPoints = totPoints;
        this.state.commentObject.bigComment = str;

        

        const axios = require('axios');
        var config = {
            headers: {

                'secret-key': `$2a$10$txGHwBPY1Dzq.ItjSm1I0.d2ywCeY5FO3aFp3ovOERHMoXxVcaJOy`
            }

            //     headers: {
            //         Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
            //         'Access-Control-Allow-Origin': true
            //     }
        }

        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {    
                // console.log(req)

                var obj = JSON.parse(req.responseText)
                // console.log("original ")
                // console.log(obj)
                obj[this.state.name] = this.state.commentObject;
                var myJSON = JSON.stringify(obj);
                console.log(myJSON)
                let req2 = new XMLHttpRequest();

                req2.onreadystatechange = () => {
                    if (req2.readyState == XMLHttpRequest.DONE) {
                        console.log(req2.responseText);
                    }
                };
        
                req2.open("PUT", "https://api.jsonbin.io/b/5ba7f77d6d95da7b7a6a8cfe", true);
                req2.setRequestHeader("Content-type", "application/json");
                req2.setRequestHeader("secret-key", "$2a$10$txGHwBPY1Dzq.ItjSm1I0.d2ywCeY5FO3aFp3ovOERHMoXxVcaJOy");
                req2.send(myJSON);
            }
        };

        req.open("GET", "https://api.jsonbin.io/b/5ba7f77d6d95da7b7a6a8cfe/latest", true);
        req.setRequestHeader("secret-key", "$2a$10$txGHwBPY1Dzq.ItjSm1I0.d2ywCeY5FO3aFp3ovOERHMoXxVcaJOy");
        req.send();


       
        return false;
    };

    render() {
        if (!this.state.ready)
            this.buildRubric();
        let isNotLoaded = (


            <div className="home-loading">
                <CircularProgress />
            </div>
        );
        let isLoaded = (
            <div>

                {this.state.dat.map((row, idx) => {

                    return (
                        <div>
                            <Table cat={row}></Table>
                            {/* <TextField
                                id={"SomeID"}
                                label="Name"
                                defaultValue="Enter comment here"
                                onChange={this.handleChange('name')}
                                margin="normal"
                            />
                            <Button color="primary" onClick={this.submit} >
                                {this.state.saved}
                            </Button> */}
                            <form onSubmit={this.handleSubmit}>
                                <label>
                                Points:
                                
                        <input id={idx} type="text" value={this.state.comment} onChange={this.handleChange} />
                                </label>
                                <label>
                                Comments:
                                
                        <input id={idx} type="text" value={this.state.comment} onChange={this.handleChange2} />
                                </label>
                                <input type="submit" value="Submit" />
                            </form>

                        </div>
                    );
                })}
            </div>
        );
        return (
            <main className="student-main" >
                <h1>{this.state.name}</h1>
                {/* {this.state.ready ? this.loadFunc() : isNotLoaded} */}
                {this.state.ready ? isLoaded : isNotLoaded}

            </main>
        )

    }
}
export default Student