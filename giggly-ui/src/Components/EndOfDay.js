import React from "react";
import Grills from "./Grills"
import Feet from "./Feet"
import Skins from "./Skins"
import Output from "./Output"
import Materials from "./Materials"
import Vinyl from "./Vinyl"
import "./EndOfDay.css"
var dateFormat = require('dateformat');


var date = "";

class EndOfDay extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      submitDate: ""
    };
    this.updateDate = this.updateDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  updateDate(value){
    date = value;
  }
  handleChange(evt){
    const value = evt.target.value;

    this.setState({value});
    this.updateDate(value);
  }

  render(){
    return(
      <div className="endOfDayStyle">


        <div className="top">
          <div className="sections">
            <div>
              <Grills />
            </div>
            <div>
              <Feet />
            </div>

            <div>
              <Skins />
            </div>
            <div>
              <Materials />
            </div>
            <div>
              <Vinyl />
            </div>
          </div>
          <div class="sections">
            <Output />
          </div>
        </div>

      </div>

    );
  }

}

export function getDate(){
  var now = new Date();
  let formated = dateFormat(now, "yyyy-mm-dd");
  return formated
}

export default EndOfDay;
