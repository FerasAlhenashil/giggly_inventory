import React from "react";
import ReactDOM from 'react-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import {Button} from "reactstrap";
import EndOfDay, {getDate} from './EndOfDay';
import Output, {addMessage} from './Output'

class Skins extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: "",
      print: "",
      type: "",
      print: "0",
      printLost: "0",
      assembly: "0",
      assemblyLost: "0",
      packaging: "0",
      packagingLost: "0"
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.sendToSummary = this.sendToSummary.bind(this);
  }

  sendToSummary(message){
    alert(message)
    addMessage(message)
  }

  submit(){
    var title = "Summary"
    var date = getDate();
    this.state.date = date;
    var product= "Skin: " + this.state.print + ". Walker: " + this.state.type;
    var mPrinting= "Printing: Completed: " + this.state.printing + ". Lost: " + this.state.printingLost;
    var mCutting= "Cutting: Completed: " + this.state.cutting + ". Lost: " + this.state.cuttingLost;
    var mPackaing= "Packaging: Completed: " + this.state.packaging + ". Lost: " + this.state.packagingLost;
    var message= title +"\n"+ date + "\n" + product+"\n"+mPrinting+"\n"+mCutting+"\n"+mPackaing;
    var show = "Skin | " + this.state.print + " | " + this.state.type + " | Prt:" + this.state.printing + "-" + this.state.printingLost +" | Cut:" + this.state.cutting + "-" + this.state.cuttingLost + " | Pac:" + this.state.packaging + "-" + this.state.packagingLost;
    {/*This shows the alert with the summary*/}
    alert(message)
    {/*If click confirm add to database, click deny will not*/}
    {/*Will try to send data to the Output function here when confirm is selected*/}
    confirmAlert({
      title: 'Confirm Add',
      message: 'Do you want to add to inventory',
      buttons: [{label: 'Confim', onClick: () => this.sendToSummary(show)
      },{label: 'Deny'}]
    })
  }

  handleChange(evt){
    const value = evt.target.value;
    this.setState({[evt.target.name]: value});
  }

  render(){

    const walker = [
      {id: 'null', name: 'Select'},
      {id: 'Two-Wheel', name: 'Two-Wheel'},
      {id: 'Four-Wheel', name: 'Four-Wheel'}
    ];

    let walkerList = walker.length > 0 && walker.map((item, i) => {
      return (<option key={i} value={item.id}>{item.name}</option>)
    }, this)

    const skin = [
      {id: 'null', name: 'Select'},
      {id: 'Military', name: 'Military'},
      {id: 'Patriotic', name: 'Patriotic'},
      {id: 'Barktastic', name: 'Barktastic'},
      {id: 'Flowerific', name: 'Flowerific'},
      {id: 'WonderFall', name: 'WonderFall'}
    ];
    let skinList = skin.length > 0 && skin.map((item, i) => {
      return (<option key={i} value={item.id}>{item.name}</option>)
    }, this)

    const globalDate = getDate();

    return(

      <div>
        <h2 class="end">Skin</h2>
        <div class="form-inline">
          <input className="inputStyle" name= "date" value={getDate()}></input>
        </div>
        <div class="form-inline">
          <label for="skin_pattern">Skins: </label>
          <select id="skin_pattern"
            name="skin"
            value={this.name}
            onChange={this.handleChange}>{skinList}</select>
          <label for="walker_type">Walker: </label>
          <select id="walker_type"
            name="walker"
            value={this.name}
            onChange={this.handleChange}>{walkerList}</select>
        </div>

        <div className="form-inlineEnd">
        <label style={{marginRight:"40px"}}></label>
          <label style={{marginRight:"70px"}}><b>Completed</b></label>
          <label><b>Lost</b></label>
        </div>

        <div class="form-inline">
          <label for="printing">Printing: </label>
          <input id="print" type="text"
            name="print"
            value={this.name}
            defualtValue="" maxlength="5" size="8"
            onChange={this.handleChange}/>
          <input id="printLost" type="text"
            name="printLost"
            value={this.name}
            defualtValue="" maxlength="5" size="8"
            onChange={this.handleChange}/>
        </div>

        <div class="form-inline">
          <label for="assembly">Assembly: </label>
          <input id="assembly" type="text"
            name="assembly"
            value={this.name}
            defualtValue="" maxlength="5" size="8"
            onChange={this.handleChange}/>
          <input id="assemblyLost" type="text"
            name="assemblyLost"
            value={this.name}
            defualtValue="" maxlength="5" size="8"
            onChange={this.handleChange}/>
        </div>

        <div class="form-inline">
          <label for="packaging">Packaging: </label>
          <input id="packaging" type="text"
          name="packaging"
          value={this.name}
          defualtValue="" maxlength="5" size="8"
          onChange={this.handleChange}/>
          <input id="packagingLost" type="text"
          name="packagingLost"
          defualtValue="" maxlength="10" size="8"
          onChange={this.handleChange}/>
        </div>
        <div>
          <Button onClick={this.submit}>Add</Button>
        </div>


      </div>
    );
  }

}

export default Skins
