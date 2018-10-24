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
            checkboxes: {},
            jsonData: props.jsonData

        };
        this.createData = this.createData.bind(this);
        // this.handleClick = this.handleClick.bind(this);


    }


    createData(dat) {
        let categoryName = dat[1].categoryDescription;
        let pointsEarned = dat[1].points;
        let comment = dat[1].comments;
        return { categoryName, pointsEarned, comment };
    }


    categoryDisplay = (name, points) => {
                
        let result = this.state.jsonData.categories.map((key, ind) => {
           if (this.state.jsonData.categories[ind] != undefined && this.state.jsonData.categories[ind].description == name){
               return this.state.jsonData.categories[ind].ratings
           }
        
        }
    )
    let result1 = {}
    for (var propName in result) { 
        if (result[propName] !== null && result[propName] !== undefined) {
          result1 = result[propName]
        }
      }
    // console.log("result")
    // console.log(result1)

    let arr = []
    result1.map((key, ind) => {
        arr.push(result1[ind].points) 
     })
    
    let highlight;
    let str = ""
    for (let i = 0; i < arr.length; i++){
        if (arr[i] == points){
            highlight = points.toString();;
        }
        str += arr[i] + "|" 
    }
    str = str.substr(0,str.length-1)

    return this.getHighlightedText(str,highlight);


    }

    getHighlightedText =(text, higlight) => {
        // Split on higlight term and include term into parts, ignore case
        let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return <span> { parts.map((part, i) => 
            <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor:"yellow"} : {} }>
                { part }
            </span>)
        } </span>;
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
                            {/* {console.log("rows")}
                            {console.log(rows)} */}
                            {rows.map((row, idx) => {
                              
                                return (
                                    <TableRow key={row.id}  >

                                        <TableCell component="th" scope="row">
                                            {row.categoryName}
                                        </TableCell>
                                        <TableCell numeric>
                                            {/* {row.pointsEarned} */}
                                            {this.categoryDisplay(row.categoryName, row.pointsEarned)}
                                        </TableCell>
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