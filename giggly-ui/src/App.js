import React from 'react';
import TabContent from "./Components/TabContent"
import Login from "./Components/Login"
import InventoryTable from "./Components/InventoryTable"
import Sales from "./Components/Sales"
import Production from "./Components/Production"
import Admin from "./Components/Admin"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Button} from "reactstrap";
import EndOfDay from './Components/EndOfDay';
import isAuth from './Components/isAuth'
import LogOut from './Components/LogOut'
//import PrivateRoute from './Components/PrivateRoute'


class App extends React.Component{
  constructor(){
    super()
  }

  
/*This is where it starts by calling TabContent.js in Components*/
  render(){
      return(
        <Router>
        <div className="App">
            <TabContent />
            <Switch>
              <Route path="/Login" component={Login}/>
              <Route path="/InventoryTable" component={isAuth(InventoryTable)}/>
              <Route path="/Sales" component={isAuth(Sales)}/>
              <Route path="/Production" component={isAuth(Production)}/>
              <Route path="/EndOfDay" component={isAuth(EndOfDay)}/>
              <Route path="/Admin" component={isAuth(Admin)}/>
              <Route path="/LogOut" component={isAuth(LogOut)}/>
            </Switch>
          </div>
      </Router>
    );
  }
}




export default App;
