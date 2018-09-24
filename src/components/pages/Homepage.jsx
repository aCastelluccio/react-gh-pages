import React, { Component } from "react";
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from './Table.jsx'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AUTHORIZATION_TOKEN: '7~FcVxUwtCf8QiBAd2PQcdfwQslhl1oQy1l8DmMd9oj8q5ion7qjznfeAQSAXs0F4T',
            COURSE_NUMBER: 1406719,
            isLoaded: false,
            names: {}
        };
        this.getNames = this.getNames.bind(this);

       
        
    }

    getNames = () => {
        let config = {
            headers: {
                Authorization: `Bearer ` + this.state.AUTHORIZATION_TOKEN,
                'Access-Control-Allow-Origin': true
            }
        }
        axios
            .get(
                `https://canvas.instructure.com/api/v1/courses/${this.state.COURSE_NUMBER}/users?per_page=50`, config

            )
            .then(response => {

                let names = response.data.map(function (element) {
                    return element.name
                });
                // console.log(names)

                let data = [];
                names.forEach(function (element) {
                    data.push({ name: element });
                });
                // console.log(data)
                this.setState({
                    names: data,
                    isLoaded: true
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    render() {
        if (!this.state.isLoaded)
            this.getNames();
        let isNotLoaded = (
            
            <div className="home-loading">
                <CircularProgress  />
            </div>
        )
        let isLoaded = (
            <div>
            <Table names = {this.state.names}></Table>
            </div>
        );
        return (
            <main className="home-main" >
                {this.state.isLoaded ? isLoaded : isNotLoaded}
            </main>
        )
        
    }
}
export default Home;
