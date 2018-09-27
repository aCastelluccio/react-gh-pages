import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Student from './Student'

import "./Table.css"

class myTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            // names: props.names,
            // currentName: "",
            // isClicked: false
            data: props.data,
            checkboxes: {}

        };
        this.createData = this.createData.bind(this);
        // this.handleClick = this.handleClick.bind(this);


    }


    createData(dat) {
        console.log("Dat")
        console.log(dat[1])
        let categoryName = dat[1].categoryDescription;
        let pointsEarned = dat[1].points;
        let comment = dat[1].comments;
        return {categoryName, pointsEarned, comment };
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
        console.log("data")
        console.log(this.state.data)
        let result = [];
        if (this.state.data != undefined) {
            result = Object.keys(this.state.data).map((key) => {
                return [Number(key), this.state.data[key]];
            });
        }

        result.forEach(element => {
            rows.push(this.createData(element))
        });

        // console.log(this.createData(this.state.data, "No"));

        // console.log(rows)
        let notClicked = (<div></div>)
        if (this.state.data != undefined) {
            notClicked = (
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                {/* <TableCell> </TableCell> */}
                                <TableCell> Category Name</TableCell>
                                <TableCell> Points Earned</TableCell>
                                {/* <TableCell> Description</TableCell> */}
                                <TableCell> Comments</TableCell>
                                {/* <TableCell> Notes</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {console.log("rows")}
                            {console.log(rows)}
                            {rows.map((row, idx) => {
                                return (
                                    <TableRow key={row.id}  >
                                       
                                        <TableCell component="th" scope="row">
                                            {row.categoryName}
                                        </TableCell>
                                        <TableCell numeric>{row.pointsEarned}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.comment}
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
        else {
            notClicked = (
                <Paper >
                    <Table >
                        <TableHead>
                            <TableRow>
                                {/* <TableCell> </TableCell> */}
                                <TableCell> Category Name</TableCell>
                                <TableCell> Points Earned</TableCell>
                                {/* <TableCell> Description</TableCell> */}
                                <TableCell> Comments</TableCell>
                                {/* <TableCell> Notes</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, idx) => {
                                return (
                                    <TableRow key={idx}  >
                                    
                                        <TableCell component="th" scope="row">
                                            {row.categoryName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">{row.pointsEarned}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.comment}
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            );
        }
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