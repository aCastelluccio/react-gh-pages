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
            if (this.state.jsonData.categories[ind] != undefined && this.state.jsonData.categories[ind].description == name) {
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
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == points) {
                highlight = points.toString();;
            }
            let arrIAsString = arr[i].toString();
            let arrIOriginalLength = arrIAsString.length
            // while (arrIAsString.length < 3) {
            //     arrIAsString = arrIAsString + " ";
            // }
            // if (arrIOriginalLength === 1){
            //     arrIAsString = "  " + arrIAsString
            // }
            if (arrIOriginalLength === 1){
                arrIAsString = " " + arrIAsString
            }
            // if (arrIAsString.length % 2 == 1)
            //     arrIAsString = arrIAsString + " "
            str += arrIAsString + "   |   "
        }

        str = str.substr(0, str.length - 2)

        return this.getHighlightedText(str, highlight);


    }


    getHighlightedText = (text, higlight) => {

        let monoFont = {
            fontSize: '20px',
            fontFamily:'Courier-Bold',
            paddingLeft:'20px'
        };
        let highlight = {
            backgroundColor: "yellow"
        }

        // Split on higlight term and include term into parts, ignore case
        let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        console.log(parts[0])
        return(
            <div style={monoFont}><pre>{parts[0]}<span style={highlight}>{parts[1]}</span>{parts[2]}</pre></div>
        )
        // return <div style={monoFont}> {parts.map((part, i) =>
            
        //     <div key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { backgroundColor: "yellow"} : {}}>
        //         {console.log(part)}
        //         <pre>
        //             {part}
        //         </pre>
        //     </div>
        //     )
        // } </div>;
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
                                        <TableCell component="th" scope="row">
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
        let buildTable = (

            <div className="result-table">
                <table className="table-border">
                    <tr className="table-border">
                        <th className="table-border">Category Name</th>
                        <th className="table-border points-earned">Points Earned</th>
                        <th className="table-border">Comments</th>
                    </tr>
                    {rows.map((row, idx) => {

                        return (
                            <tr className="table-border">
                                <td className="table-border">{row.categoryName}</td>
                                {console.log(this.categoryDisplay(row.categoryName, row.pointsEarned))}
                                <td className="table-border points-earned">{this.categoryDisplay(row.categoryName, row.pointsEarned)}</td>
                                <td className="table-border">{row.comment}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        )
        return (
            <main className="Table-main" >
                {buildTable}
            </main>
        );
    }
}


export default myTable;