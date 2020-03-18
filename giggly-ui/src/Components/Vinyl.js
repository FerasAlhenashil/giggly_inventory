import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import {Button} from "reactstrap";
import EndOfDay, {getDate} from './EndOfDay';
import Output, {addMessage} from './Output'

class Vinyl extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: "",
      vinyl: "",
      delivered: "0",
      used: "0"
    };

    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.sendToSummary = this.sendToSummary.bind(this);
  }

  sendToSummary(message){
    addMessage(message)
  }

  submit(){
    var title = "Summary";
    var date = getDate();
    this.state.date = date;
    var product= "Vinyl: " + this.state.vinyl;
    var mDelivered= "Delivered:" + this.state.delivered + ". used: " + this.state.used;
    var message= title +"\n"+ date + "\n" + product+"\n"+mDelivered;
    var show = "Vinyl | " + this.state.material + " | " + "Del:" + this.state.delivered + "-" + this.state.used;
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

    const vinyls = [
      {id: '', name: ''},
      {id: 'gen', name: 'General'},
      {id: '105', name: '1105'},
      {id: '106', name: '1106'},
      {id: 'lam', name: 'Laminate'},
    ];

    let vinylsList = vinyls.length > 0 && vinyls.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    return(

      <div>
        <h2 className="inventory">Vinyl</h2>
        <div className="form-inlineEnd">
        <input className="inputStyle" name= "date" value={getDate()}></input>
        </div>

          <form method="POST" action="/endOfDay/update-vinyl">        
            <div class="form-inlineEnd">
            <label for="materials">Vinyl Type: </label>
            <select id="materials"
              name="type"
              value={this.name}
              onChange={this.handleChange}>{vinylsList}</select>
            </div>
  
          <div class="form-inline">
            <label for="delivered">Delivered: </label>
            <input id="delivered" type="text"
              name="delivered"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
            <label for="used">Used: </label>
            <input id="used" type="text"
              name="used"
              value={this.name}
              defualtValue="" maxlength="5" size="8"
              onChange={this.handleChange}/>
          </div>              
          <Button onClick={this.submit}>Add</Button>
        </form>

      </div>
    );
  }

}

export default Vinyl