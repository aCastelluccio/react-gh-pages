import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Student from './Student'
import Checkbox from '@material-ui/core/Checkbox';

import "./Table.css"

class myTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            // names: props.names,
            // currentName: "",
            // isClicked: false
            data: props.cat,
            checkboxes:{}

        };
        this.createData = this.createData.bind(this);
        // this.handleClick = this.handleClick.bind(this);


    }


    createData(dat) {
        let id = this.state.id;
        let points = dat.points;
        let description = dat.description;
        this.state.id = id + 1;
        return { id, description , points};
    }

    // handleClick(event,idx){
    //     let set = false;
    //     if (!this.state.checkboxes.idx){
    //         set =  true;
    //     }
    //     this.setState(prevState => ({
    //         checkboxes: {
    //             ...prevState.checkboxes,
    //             [idx]: set
    //         }
    //     }))
    //     console.log(this.state.checkboxes)
    // }
    render() {
        const rows = [];
        this.state.data.ratings.forEach(element => {
            rows.push(this.createData(element))
        });
 
        // console.log(this.createData(this.state.data, "No"));

        // console.log(rows)

        let notClicked = (
            <Paper >
                 <h1>{this.state.data.description}</h1>
                <Table >
                    <TableHead>
                        <TableRow>
                            {/* <TableCell> </TableCell> */}
                            <TableCell> Description</TableCell>
                            <TableCell> Points</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row,idx) => {
                            return (
                                <TableRow key={row.id}  >
                                <TableCell >
                                    {/* <Checkbox /> */}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.description}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.points}
                                    </TableCell>
                                    <TableCell numeric>{row.isGraded}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
        let clicked = (
            <Student name={this.state.currentName}> </Student>
        )
        return (
            <main className="Table-main" >
                {this.state.isClicked ? clicked : notClicked}
            </main>
        );
    }
}


export default myTable;