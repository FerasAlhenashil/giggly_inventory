import React from "react";
import ReactDOM from 'react-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import "./InventoryTable.css";
import {Button} from "reactstrap";
import EndOfDay, {getDate} from './EndOfDay';
import Output, {addMessage} from './Output'

class Skins extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: "",
      skin: "Military",
      walker: "Two-Wheel",
      print: "0",
      printLost: "0",
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
        let url ='/endOfDay/update-skins'
        let date = getDate();
        let skin = this.state.skin;
        let walker = this.state.walker;
        let print = this.state.print;
        let printLost = this.state.printLost;
        let assembly = this.state.assembly;
        let assemblyLost = this.state.assemblyLost;
        let packaging = this.state.packaging;
        let packagingLost = this.state.packagingLost;
        let response = await fetch(url,
        {method: 'POST',
          body: JSON.stringify({
          date: date,
          skin: skin,
          walker: walker,
          print: print,
          printLost: printLost,
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

  submit(){
    var title = "Summary"
    var date = getDate();
    this.state.date = date;
    var product= "Skin: " + this.state.skin + ". Walker: " + this.state.walker;
    var mPrint= "Print: Completed: " + this.state.print + ". Lost: " + this.state.printLost;
    var mAssembly= "Assembly: Completed: " + this.state.assembly + ". Lost: " + this.state.assemblyLost;
    var mPackaging= "Packaging: Completed: " + this.state.packaging + ". Lost: " + this.state.packagingLost;
    var message= title +"\n"+ date + "\n" + product+"\n"+mPrint+"\n"+mAssembly+"\n"+mPackaging;
    var show = "Skin | " + this.state.skin + " | " + this.state.walker + " | Prnt:" + this.state.print + 
      "-" + this.state.printLost +" | Assm:" + this.state.assembly + "-" + this.state.assemblyLost + 
      " | Pckg:" + this.state.packaging + "-" + this.state.packagingLost;
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

    const walker = [
      {id: 'Two-Wheel', name: 'Two-Wheel'},
      {id: 'Four-Wheel', name: 'Four-Wheel'}
    ];

    let walkerList = walker.length > 0 && walker.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    const skin = [      
      {id: 'Military', name: 'Military'},
      {id: 'Patriotic', name: 'Patriotic'},
      {id: 'Barktastic', name: 'Barktastic'},
      {id: 'Flowerific', name: 'Flowerific'},
      {id: 'WonderFall', name: 'WonderFall'}
    ];
    let skinList = skin.length > 0 && skin.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    const globalDate = getDate();

    return(
      <div className="form-inlineEnd">
      <form>
        <h2 className="invnetory">Skin</h2>
        <div className="form-inlineEnd">
          <label htmlFor="skin_pattern">Skins: </label>
          <select id="skin_pattern"
            name="skin"
            value={this.name}
            onChange={this.handleChange}>{skinList}</select>
          <label htmlFor="walker_type">Walker: </label>
          <select id="walker_type"
            name="walker"
            value={this.name}
            onChange={this.handleChange}>{walkerList}</select>
        </div>

        <div class="form-inlineEnd">
        <label style={{marginRight:"40px"}}></label>
          <label style={{marginRight:"70px"}}><b>Completed</b></label>
          <label><b>Lost</b></label>
        </div>

        <div className="form-inlineEnd">
          <label htmlFor="printing">Printing: </label>
          <input className="inputStyle" id="print" type="text"
            name="print"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
          <input className="inputStyle" id="printLost" type="text"
            name="printLost"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
        </div>

        <div className="form-inlineEnd">
          <label htmlFor="trim">Assembly: </label>
          <input className="inputStyle" id="trim" type="text"
            name="assembly"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
          <input className="inputStyle" id="trimLost" type="text"
            name="assemblyLost"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
        </div>

        <div className="form-inlineEnd">
          <label htmlFor="packaging">Packaging: </label>
          <input className="inputStyle" id="packaging" type="text"
          name="packaging"
          value={this.name}
          defaultValue="" maxLength="5" size="8"
          onChange={this.handleChange}/>
          <input className="inputStyle" id="packagingLost" type="text"
          name="packagingLost"
          defaultValue="" maxLength="10" size="8"
          onChange={this.handleChange}/>
        </div>
        <div>
          <Button onClick={this.handleSubmit}>Add</Button>
        </div>
      </form>
      </div>
    );
  }

}

export default Skins