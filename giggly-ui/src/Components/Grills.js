import React from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./EndOfDay.css";
import {Button} from "reactstrap";
import {getDate} from './EndOfDay';
import {addMessage} from './Output'
/*Each member of the EndOfDay.js uses the EndOfDay.css for styling.*/

class Grills extends React.Component{
  constructor(props){
    super(props);

  /*Variables for the Grills.js input. have data hardcoded for time save*/
    this.state = {
      date: "",
      design: "Truck",
      color: "Red",
      belovac: "0",
      belovacLost: "0",
      guillotine: "0",
      guillotineLost: "0",
      rotozip: "0",
      rotozipLost: "0",
      sanding: "0",
      sandingLost: "0",
      velcro: "0",
      velcroLost: "0",
      stickers: "0",
      stickersLost: "0",
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
      let url = '/endOfDay/update-grills'
      let date = getDate();
      let design = this.state.design;
      let color = this.state.color;
      let belovac = this.state.belovac;
      let belovacLost = this.state.belovacLost;
      let guillotine = this.state.guillotine;
      let guillotineLost = this.state.guillotineLost;
      let rotozip = this.state.rotozip
      let rotozipLost = this.state.rotozipLost;
      let sanding = this.state.sanding
      let sandingLost = this.state.sandingLost;
      let velcro = this.state.velcro;
      let velcroLost = this.state.velcroLost;
      let stickers = this.state.stickers;
      let stickersLost = this.state.stickersLost;
      let packaging = this.state.packaging;
      let packagingLost = this.state.packagingLost;
      let response = await fetch(url,
        {method: 'POST',
        body: JSON.stringify({date: date,
        design: design,
        color: color,
        belovac: belovac,
        belovacLost: belovacLost,
        guillotine: guillotine,
        guillotineLost: guillotineLost,
        rotozip: rotozip,
        rotozipLost: rotozipLost,
        sanding: sanding,
        sandingLost: sandingLost,
        velcro: velcro,
        velcroLost: velcroLost,
        stickers: stickers,
        stickersLost: stickersLost,
        packaging: packaging,
        packagingLost: packagingLost}),
        headers:{'Content-Type': 'application/json'}});
      let responseJSON = await response.json();
      this.setState(responseJSON);

    }
    catch(error){
      console.log(error)
    }
  }

  sendToSummary(message){
    addMessage(message)
  }

  /*Function for when you add the information for the EndOfDay Grill information.
    you will get an alert with a summary then a confirmation popup to confirm.
    Will look into Modal for a possible replacement*/
  submit(event){

    var title = "Summary"
    var date = getDate();
    this.state.date = date;
    var product= "Design: " + this.state.design + ". Color: " + this.state.color;
    var mBelovac= "Belovac: Completed: " + this.state.belovac + ". Lost: " + this.state.belovacLost;
    var mGuillotine= "Guillotine: Completed: " + this.state.guillotine + ". Lost: " + this.state.guillotineLost;
    var mRotozip= "RotoZip: Completed: " + this.state.rotozip + ". Lost: " + this.state.rotozipLost;
    var mSanding= "Sanding: Completed: " + this.state.sanding + ". Lost: " + this.state.sandingLost;
    var mVelcro= "Velcro: Completed: " + this.state.velcro + ". Lost: " + this.state.velcroLost;
    var mStickers= "Stickers: Completed: " + this.state.stickers + ". Lost: " + this.state.stickersLost;
    var mPackaing= "Packaging: Completed: " + this.state.packaging + ". Lost: " + this.state.packagingLost;
    var message= title +"\n"+ date + "\n" + product+"\n"+mBelovac+"\n"+mGuillotine+"\n"+mRotozip+"\n"+mSanding+"\n"+mVelcro+"\n"+mStickers+"\n"+mPackaing;
    var show = "Grill | " + this.state.design+ " | " + this.state.color + " | Bel:" + this.state.belovac +"-"+this.state.belovacLost+" | Gui:"+this.state.guillotine+"-"+this.state.guillotineLost+" | Rto:"+this.state.rotozip+"-"+this.state.rotozipLost+" | Snd:"+this.state.sanding+"-"+this.state.sandingLost+" | Vlc:"+this.state.velcro+"-"+this.state.velcroLost+" | Stk:"+this.state.stickers+"-"+this.state.stickersLost+" | Pac:"+this.state.packaging+"-"+this.state.packagingLost;
    {/*This shows the alert with the summary*/}
    alert(message)
    {/*If click confirm add to database, click deny will not*/}
    {/*Will try to send data to the Output function here when confirm is selected*/}
    
  }

  /*This function handles the change of values from inputs on the EndOfDay tab on the webpage*/
  handleChange(evt){
    const value = evt.target.value;
    this.setState({[evt.target.name]: value});
  }


render() {

  {/*Array of truck designs used in the drop down selects on webpage*/}
  const grillDesign = [
    {id: 'tr', name: 'Truck'},
    {id: 'nb', name: 'Noteboard'}
  ];
  {/*Need this part for the actual select option*/}
  let grillDesignList = grillDesign.length > 0 && grillDesign.map((item, i) => {
    return (<option key={i} value={item.name}>{item.name}</option>)
  }, this)

  {/*Array of colors*/}
  const colors = [
    {id: 'rd', name: 'Red'},
    {id: 'bu', name: 'Blue'},
    {id: 'bk', name: 'Black'}
  ];
  let colorsList = colors.length > 0 && colors.map((item, i) => {
    return (<option key={i} value={item.name}>{item.name}</option>)
  }, this)

  const globalDate = getDate();


  return (

    <div>
      <h2 className="inventory">Grill</h2>
      {/*I use forms for each row of inputs to unify the spacing and positions*/}

      <div className="form-inlineEnd">
      <form>
        <div className="form-inlineEnd">
          <label htmlFor="grill_design">Design: </label>
          <select id="grill_design"
            name="design"
            value={this.name}
            onChange={this.handleChange}>{grillDesignList}</select>
          <label htmlFor="grill_color">Colors: </label>
          <select id="grill_color"
            name="color"
            value={this.name}
            onChange={this.handleChange}>{colorsList}</select>
        </div>

        {/*Headers for the production steps*/}
        <div class="form-inlineEnd">
        <label style={{marginRight:"40px"}}></label>
          <label style={{marginRight:"70px"}}><b>Completed</b></label>
          <label><b>Lost</b></label>
        </div>

        {/*Below is the input fields for all the production steps for the Grills
          Each step is in a form that contains a label, completed, and lost*/}
          <div className="form-inlineEnd">
            <label htmlFor="grill_vac">Belovac: </label>
            <input className="inputStyle" id="grill_vac" type="text"
              name="belovac"
              value={this.name}
              defaultValue="" maxLength="5" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="vac_lost" type="text"
              name="belovacLost"
              value={this.name}
              defaultValue="" maxLength="5" size="8"
              onChange={this.handleChange}/>
          </div>

          <div className="form-inlineEnd">
            <label htmlFor="grill_guil">Guillotine: </label>
            <input className="inputStyle" id="grill_guil" type="text"
              value={this.name}
              name="guillotine" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="guil_lost" type="text"
              value={this.name}
              name="guillotineLost" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
          </div>


          <div className="form-inlineEnd">
            <label htmlFor="grill_zip">RotoZip: </label>
            <input className="inputStyle" id="grill_zip" type="text"
              value={this.name}
              name="rotozip" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="zip_lost" type="text"
              value={this.name}
              name="rotozipLost" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
          </div>


          <div className="form-inlineEnd">
            <label htmlFor="grill_sand">Sanding: </label>
            <input className="inputStyle" id="grill_sand" type="text"
              value={this.name}
              name="sanding" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="sand_lost" type="text"
              value={this.name}
              name="sandingLost" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
          </div>


          <div className="form-inlineEnd">
            <label htmlFor="grill_velcro">Velcro: </label>
            <input className="inputStyle" id="grill_velcro" type="text"
              value={this.name}
              name="velcro" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="velcro_lost" type="text"
              value={this.name}
              name="velcroLost" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
          </div>


          <div className="form-inlineEnd">
            <label htmlFor="grill_stk">Stickers: </label>
            <input className="inputStyle" id="grill_stk" type="text"
              value={this.name}
              name="stickers" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
            <input className="inputStyle" id="stk_lost" type="text"
              value={this.name}
              name="stickersLost" defaultValue="" maxLength="10" size="8"
              onChange={this.handleChange}/>
          </div>


          <div className="form-inlineEnd">
            <label htmlFor="grill_pac">Packaging: </label>
            <input className="inputStyle" id="grill_pac" type="text"
            value={this.name}
            name="packaging" defaultValue="" maxLength="10" size="8"
            onChange={this.handleChange}/>
            <input className="inputStyle" id="pac_lost" type="text"
            value={this.name}
            name="packagingLost" defaultValue="" maxLength="10" size="8"
            onChange={this.handleChange}/>
          </div>


        {/*This button takes all information inputed form the input fields and calls the alert*/}
          <div className="form-inlineEnd">
            <Button onClick={this.handleSubmit}>Add</Button>
          </div>
      </form>
      </div>
    </div>
  );

}

}


export default Grills