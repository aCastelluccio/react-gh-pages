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
            names: props.names,
            currentName: "",
            isClicked: false
        };
        this.createData = this.createData.bind(this);
        this.callStudent = this.callStudent.bind(this);

    }


    createData(name, isGraded) {
        let id = this.state.id;
        this.state.id = id + 1;
        return { id, name, isGraded };
    }

    callStudent = (name) => {
        name = name.replace(/ /g, "_");
        // window.location= window.location.protocol + `/Student/${name}`;
        this.setState({
            currentName:name,
            isClicked:true
        })
    }

    render() {
        const rows = [];
        this.state.names.forEach(element => {
            rows.push(this.createData(element.name, "No"));
        });
        console.log(rows)

        let notClicked = (
            <Paper >
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>Names</TableCell>
                            <TableCell>isCompleted</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                        <button id="name" onClick={(e) => this.callStudent(row.name, e)}>{row.name}</button>
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
            <Student name = {this.state.currentName}> </Student>
        )
        return (
            <main className="Table-main" >
                {this.state.isClicked ? clicked : notClicked}
            </main>
        );
    }
}


export default myTable;