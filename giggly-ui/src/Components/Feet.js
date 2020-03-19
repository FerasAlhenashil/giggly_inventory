import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import {Button} from "reactstrap";
import Output, {addMessage} from './Output';
import EndOfDay, {getDate} from './EndOfDay'

class Feet extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      design: "",
      color: "Red",
      trim: "0",
      trimLost: "0",
      assembly: "0",
      assemblyLost: "0",
      packaging: "0",
      packagingLost: "0"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.sendToSummary = this.sendToSummary.bind(this);
  }

  async handleSubmit(){
    this.submit();
    try{
        let url ='/endOfDay/update-feet'
        let date = getDate();
        let design = this.state.design;
        let color = this.state.color;
        let trim = this.state.trim;
        let trimLost = this.state.trimLost;
        let assembly = this.state.assembly;
        let assemblyLost = this.state.assemblyLost;
        let packaging = this.state.packaging;
        let packagingLost = this.state.packagingLost;
        let response = await fetch(url,
        {method: 'POST',
          body: JSON.stringify({date: date,
          design: design,
          color: color,
          trim: trim,
          trimLost: trimLost,
          assembly: assembly,
          assemblyLost: assemblyLost,
          packaging: packaging,
          packagingLost: packagingLost
        }),
        headers:{ 'Content-Type': 'application/json'}})
        let respnseJSON = await response.json()
        this.setState(respnseJSON)
        console.log('in handlesubmit the response is ',respnseJSON)
    } catch(error){
      console.log(error)
    }
  }

  sendToSummary(message){
    addMessage(message)
  }

  submit(event){

    var title = "Summary"
    var date = getDate();
    var mColor = "Color: " + this.state.color;
    var mTrim= "Trim: Completed: " + this.state.trim + ". Lost: " + this.state.trimLost;
    var mAssembly= "Sssembly: Completed: " + this.state.assembly + ". Lost: " + this.state.assemblyLost;
    var mPackaging= "Packaging: Completed: " + this.state.packaging + ". Lost: " + this.state.packagingLost;
    var message= title +"\n"+ date + "\n" + mColor + "\n"+mTrim+"\n"+mAssembly+"\n"+mPackaging;
    var show = "Feet | " + this.state.color+ " | Trm:" + this.state.trim + "-" + this.state.trimLost + " | Asm:" + this.state.assembly + "-" + this.state.assemblyLost + " | Pac:" + this.state.packaging + "-" + this.state.packagingLost;
    {/*This shows the alert with the summary*/}
    alert(message)
    {/*If click confirm add to database, click deny will not*/}
    {/*Will try to send data to the Output function here when confirm is selected*/}
  }

  handleChange(evt){
    const value = evt.target.value;
    this.setState({[evt.target.name]: value});
  }

  render(){

    const colors = [
      {id: 'Red', name: 'Red'},
      {id: 'Blue', name: 'Blue'},
      {id: 'Black', name: 'Black'}
    ];
    let colorsList = colors.length > 0 && colors.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    const globalDate = getDate();

    return(

      <div>
        <h2 className="inventory">Feet</h2>
        <form>
          <div className="form-inlineEnd">
            <label for="puppy_color">Colors: </label>
            <select id="puppy_color"
              name="color"
              value={this.name}
              onChange={this.handleChange}>{colorsList}</select>
          </div>

          <div class="form-inlineEnd">
          <label style={{marginRight:"40px"}}></label>
            <label style={{marginRight:"70px"}}><b>Completed</b></label>
            <label><b>Lost</b></label>
          </div>

          <div className="form-inlineEnd">
            <label for="feet_trim">Trim: </label>
            <input className="inputStyle" id="trim" type="text"
              name="trim"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="trimLost" type="text"
              name="trimLost"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
          </div>

          <div className="form-inlineEnd">
            <label for="feet_assembly">Assembly: </label>
            <input className="inputStyle" id="assembly" type="text"
              name="assembly"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="assemblyLost" type="text"
              name="assemblyLost"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
          </div>

          <div className="form-inlineEnd">
            <label for="feet_pac">Packaging: </label>
            <input className="inputStyle" id="packaging" type="text"
            name="packaging"
            value={this.name}
            defualtValue="" maxlength="5" size="8"
            onChange={this.handleChange}/>
            <input className="inputStyle" id="packagingLost" type="text"
            name="packagingLost"
            defualtValue="" maxlength="10" size="8"
            onChange={this.handleChange}/>
          </div>
          <Button onClick={this.handleSubmit}>Add</Button>
        </form>

      </div>
    );
  }

}

export default Feet