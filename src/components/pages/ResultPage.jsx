import React, { Component } from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
class ResultPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            bigObject: {},
            SECRET_KEY:'$2a$10$txGHwBPY1Dzq.' + process.env.REACT_APP_SECRET,
            names: props.names

        };
        this.getJson = this.getJson.bind(this);
        this.output = this.output.bind(this);
        this.individualCategories = this.individualCategories.bind(this);
        this.mapOrder = this.mapOrder.bind(this);

    }

    getJson = () => {

        let req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            if (req.readyState == XMLHttpRequest.DONE) {
                let object = JSON.parse(req.responseText)
                this.setState({
                    isLoaded: true,
                    bigObject: object
                })
            }


        };

        req.open("GET", "https://api.jsonbin.io/b/5ba7f77d6d95da7b7a6a8cfe/latest", true);
        req.setRequestHeader("secret-key", this.state.SECRET_KEY);
        req.send();

    }

    mapOrder(array, order, key) {
  
        array.sort( function (a, b) {
          var A = a[key], B = b[key];
          
          if (order.indexOf(A) > order.indexOf(B)) {
            return 1;
          } else {
            return -1;
          }
          
        });
        
        return array;
      };
      


    output = () => {
        let out = [];

        for (var key in this.state.bigObject) {
            // skip loop if the property is from prototype
            if (!this.state.bigObject.hasOwnProperty(key)) continue;
            out.push(this.state.bigObject[key]);

        }

        let sortingArr = this.state.names;
        
        let indvNames = [];
        this.state.names.forEach(element => {
            indvNames.push(element['name'].replace(/\W/g, '').replace(/([A-Z])/g, ' $1').trim().replace(/ /g,"_"))
        });
      
        let NewOut = this.mapOrder(out, indvNames, 'name')
        // let result = out.map(function(item) {
        //     var n = sorting.indexOf(item[1]);
        //     sorting[n] = '';
        //     return [n, item]
        // }).sort().map(function(j) { return j[1] })

      

        return out;
    }

    individualCategories = (obj) => {
        let out = [];

        for (var key in obj) {
            // skip loop if the property is from prototype
            if (!obj.hasOwnProperty(key)) continue;
            out.push(obj[key]);

        }
        return out;
    }
    render() {
        if (!this.state.isLoaded) {
            this.getJson();
        }

        let isNotLoaded = (

            <div className="home-loading">
                <CircularProgress />
                <div>
                    RESULTS
            </div>
            </div>
        )

        let isLoaded = (
            <div>
                <hr></hr>
                {this.output()
                    .map(ele => (
                        <div>

                            <h1>Name:  {ele.name}</h1>
                            <h2>TotalPoint: {ele.totalPoints}</h2>
                            <p>OverallComment:  {ele.bigComment.replace(/undefined/g, "")}</p>
                            {this.individualCategories(ele.categories)
                                .map(ele2 => (
                                    <div>
                                        <p >Category:  {ele2.categoryDescription}</p>
                                        <p >     Points:   <b>{ele2.points}</b></p>
                                        <p >     CategoryComment:   {ele2.comments}</p>
                                        <hr></hr>
                                    </div>
                                ))}
                        </div>
                    )
                    )
                }




            </div>
        )

        return (
            <main className="home-main" >
                {this.state.isLoaded ? isLoaded : isNotLoaded}
            </main>
        )

    }
}

export default ResultPage;