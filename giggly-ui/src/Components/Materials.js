import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import "./InventoryTable.css";
import EndOfDay, {getDate} from './EndOfDay';
import {addMessage} from './Output'
import {Button} from "reactstrap";


class Materials extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: "",
      location: "Main",
      name: "Red Plastic Sheet",
      delivered: "0",
      scrap: "0"
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.sendToSummary = this.sendToSummary.bind(this);
  }

  async handleSubmit(){
    this.submit();
    try{
        let url ='/endOfDay/update-materials'
        let date = getDate();
        let location = this.state.location;
        let name = this.state.name;
        let gain = this.state.delivered;
        let loss = this.state.scrap;
        let response = await fetch(url,
        {method: 'POST',
          body: JSON.stringify({
            date: date,
            location: location,
            name: name,
            gain: gain,
            loss: loss
        }),
        headers:{ 'Content-Type': 'application/json'}})
        let respnseJSON = await response.json()
        this.setState(respnseJSON)
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
    var location = "Location: " +  this.state.location;
    var product= "Material: " + this.state.name;
    var mDelivered= "Delivered:" + this.state.delivered + ". Lost: " + this.state.scrap;
    var message= title +"\n"+ date + "\n" + location + "\n" + product+"\n"+mDelivered;
    var show = "Material | " + this.state.name + " | " + "D:" + this.state.delivered + "-" + this.state.scrap;
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

    const rawMaterials = [
      {id: '1', name: 'Red Plastic Sheet'},
      {id: '2', name: 'Blue Plastic Sheet'},
      {id: '3', name: 'Black Plastic Sheet'},
      {id: '4', name: 'Red Paw'},
      {id: '5', name: 'Blue Paw'},
      {id: '6', name: 'Black Paw'},
      {id: '7', name: 'Walker, Two-Wheels'},
      {id: '8', name: 'Walker, Four-Wheels'},
      {id: '9', name: 'Grommet'},
      {id: '10', name: 'Velcro'},
      {id: '11', name: 'Grill Box'},
      {id: '12', name: 'Core'},
      {id: '13', name: 'Screw'},
      {id: '14', name: 'Shipping Envelope'},
      {id: '15', name: 'Polybag'},
      {id: '16', name: 'Sticker, Truck'},
      {id: '17', name: 'Sticker, Noteboard'},
      {id: '18', name: 'Blister'},
      {id: '19', name: 'Blister Card'},
      {id: '20', name: 'Skin, Two-Wheel Flowerific'},
      {id: '21', name: 'Skin, Two-Wheel Military'},
      {id: '22', name: 'Skin, Two-Wheel WonderFall'},
      {id: '23', name: 'Skin, Two-Wheel Barktastic'},
      {id: '24', name: 'Skin, Two-Wheel Patriotic'},
      {id: '25', name: 'Skin, Four-Wheel Flowerific'},
      {id: '26', name: 'Skin, Four-Wheel Military'},
      {id: '27', name: 'Skin, Four-Wheel WonderFall'},
      {id: '28', name: 'Skin, Four-Wheel Barktastic'},
      {id: '29', name: 'Skin, Four-Wheel Patriotic'},
      {id: '30', name: 'UPC, Truck, Red'},
      {id: '31', name: 'UPC, Truck, Blue'},
      {id: '32', name: 'UPC, Truck, Black'},
      {id: '33', name: 'UPC, Noteboard, Red'},
      {id: '34', name: 'UPC, Noteboard, Blue'},
      {id: '35', name: 'UPC, Noteboard, Black'},
      {id: '36', name: 'UPC, Paws, Red'},
      {id: '37', name: 'UPC, Paws, Blue'},
      {id: '38', name: 'UPC, Paws, Black'},
      {id: '39', name: 'UPC, Skin, Two-Wheel Flowerific'},
      {id: '40', name: 'UPC, Skin, Two-Wheel Military'},
      {id: '41', name: 'UPC, Skin, Two-Wheel WonderFall'},
      {id: '42', name: 'UPC, Skin, Two-Wheel Barktastic'},
      {id: '43', name: 'UPC, Skin, Two-Wheel Patriotic'},
      {id: '44', name: 'UPC, Skin, Four-Wheel Flowerific'},
      {id: '45', name: 'UPC, Skin, Four-Wheel Military'},
      {id: '46', name: 'UPC, Skin, Four-Wheel WonderFall'},
      {id: '47', name: 'UPC, Skin, Four-Wheel Barktastic'},
      {id: '48', name: 'UPC, Skin, Four-Wheel Patriotic'}
    ]

    let materialsList = rawMaterials.length > 0 && rawMaterials.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    const location = [
      {id: '1', name: 'Main'},
      {id: '2', name: 'Vinyl'}
    ];

    let locationList = location.length > 0 && location.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    return(
      <div>
        <h2 className="inventory">Deliveries</h2>
        <div className="form-inlineEnd">
        <form>
        <div className="form-inlineEnd">
          <label htmlFor="name">Delivered: </label>
          <select id="name"
            name="name"
            onChange={(e) => this.setState({name: e.target.value })}>{materialsList}</select>
          <label htmlFor="location">Location: </label>
          <select  id="location"
            name="location"
            onChange={(e) => this.setState({location: e.target.value })}>{locationList}</select>
        </div>

        <div className="form-inlineEnd">
          <label htmlFor="delivered">Delivered: </label>
          <input className="inputStyle" id="delivered" type="text"
            name="delivered"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
          <label htmlFor="scrap">Scrap: </label>
          <input className="inputStyle" id="scrap" type="text"
            name="scrap"
            value={this.name}
            defaultValue="" maxLength="5" size="8"
            onChange={this.handleChange}/>
        </div>
        <div>
        <Button onClick={this.handleSubmit}>Add</Button>
        </div>
      </form>
      </div>
      </div>


    );
  }
}

export default Materials