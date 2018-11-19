/*
ResultTable for CanvasGradingHelper 
Makes the tables of categories for each student.
Updated by Andrew Castelluccio 11/18
*/
import React, { Component } from "react";
import "./Table.css"

class myTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            checkboxes: {},
            jsonData: props.jsonData
        };
        this.createData = this.createData.bind(this);
        this.categoryDisplay = this.categoryDisplay.bind(this);
        this.getHighlightedText = this.getHighlightedText.bind(this);
    }

    // formats the data of each category into a ???
    // TODO: find out what this returns.
    createData = (dat) => {
        let categoryName = dat[1].categoryDescription;
        let pointsEarned = dat[1].points;
        let comment = dat[1].comments;
        return { categoryName, pointsEarned, comment };
    }

    // breaks category point possibilties into numbers with appropiate number highlighted
    categoryDisplay = (name, points) => {
        // categoryDetails is an object with each of the possible rating's description and point value
        let categoryDetails;
        this.state.jsonData.categories.map((key, ind) => {
            if (this.state.jsonData.categories[ind] != undefined && this.state.jsonData.categories[ind].description == name) {
                categoryDetails = this.state.jsonData.categories[ind].ratings
            }
        });
        // categoryPoints is a list of the possible number of points one could recieve in a category
        let categoryPoints = [];
        categoryDetails.map((key, ind) => {
            categoryPoints.push(categoryDetails[ind].points)
        })

        let highlight;
        let str = ""
        // marks apropiate number to highlight and sets up output with apropiate spacing
        for (let i = 0; i < categoryPoints.length; i++) {
            if (categoryPoints[i] == points) {
                highlight = points.toString();;
            }
            let arrIAsString = categoryPoints[i].toString();
            if (arrIAsString.length === 1) {
                arrIAsString = " " + arrIAsString
            }
            str += arrIAsString + "   |   "
        }
        // substring to chop off trailing |
        str = str.substr(0, str.length - 4)
        return this.getHighlightedText(str, highlight);
    }

    // highlights the specific number of points the student recieved for a category and returns div of numbers
    getHighlightedText = (text, higlight) => {
        let monoFont = {
            fontSize: '20px',
            fontFamily: 'Courier-Bold',
            paddingLeft: '20px'
        };
        let highlight = {
            backgroundColor: "yellow"
        }
        // Split on higlight term and include term into parts, ignore case
        let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
        return (
            <div style={monoFont}><pre>{parts[0]}<span style={highlight}>{parts[1]}</span>{parts[2]}</pre></div>
        )

    }
    // one render cases, buildTable 
    render() {
        // rows is a list of each category object with its description, comment, and points earned
        const rows = [];
        if (this.state.data != undefined) {
            Object.keys(this.state.data).map((key) => {
                rows.push(this.createData([1, this.state.data[key]]))
            });
        }
        // builds the table with appropiate categories, each table is for one student
        // each iteration of the inner map is one category
        let buildTable = (
            <div className="result-table">
                <table className="table-border">
                    <tbody>
                        <tr className="table-border">
                            <th className="table-border">Category Name</th>
                            <th className="table-border points-earned">Points Earned</th>
                            <th className="table-border">Comments</th>
                        </tr>
                        {rows.map((row, idx) => {
                            return (
                                <tr className="table-border">
                                    <td className="table-border">{row.categoryName}</td>
                                    <td className="table-border points-earned">{this.categoryDisplay(row.categoryName, row.pointsEarned)}</td>
                                    <td className="table-border">{row.comment}</td>
                                </tr>
                            );
                        })}
                    </tbody>
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