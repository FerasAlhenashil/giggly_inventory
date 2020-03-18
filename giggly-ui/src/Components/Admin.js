import React from "react";
import "./EndOfDay.css";
import "./App.css"
import "./Production.css";
import {Table, Button} from "reactstrap"
//import {baseUrl} from '../../config.json';

class Admin extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      users: [{
        userID: '',
        password:'',
        userEmail:'',
        userFirstName:'',
        userLastName:''
      }]
    } 
    this.handleSubmit = this.handleSubmit.bind(this)
    //this.fetch = this.fetch.bind(this)

  }

  async handleSubmit(){
    try{
    let url = '/admin/get-users'
    let response = await fetch(url, 
        {method: 'GET',
        headers:{ 'Content-Type': 'application/json'}})
        let users = await response.json();
        console.log(users);
        this.setState({users});
      } catch (error){
        console.log(error)
    }
};


  
  // async handleDelete(event){
  //   try{
  //       event.preventDefault();
  //       let username = document.getElementById('username1').value
  //       await fetch('/admin/delete-user', {
  //         method: 'POST',
  //         body: JSON.stringify({username: username})
  //       })
  //   }catch(error){
  //     console.log(error)
  //   }
  // }
//   <form onSubmit={this.handleDelete.bind(this)}>
//   <div class="enter_user">
//   <label>Username</label>
//   <input id="username1" name="username1"></input> <button type="submit">Delete</button>
//   </div>
// </form>
  render(){
    const userList = this.state.users.map((item, index) =>{
      return(
        <tr key={index}>
        <td >{item.userID}</td>
        <td >{item.userEmail}</td>
        <td >{item.userFirstName}</td>
        <td >{item.userLastName}</td>
        </tr>
        )})

    const permissions = [
      {id: 'null', name: ''},
      {id: 'dm', name: 'Department Lead'},
      {id: 'ad', name: 'Administrator'}
    ];
    {/*Need this part for the actual select option*/}
    let permissionsList = permissions.length > 0 && permissions.map((item, i) => {
      return (<option key={i} value={item.name}>{item.name}</option>)
    }, this)

    return(
      <div className="productionStyle">
      <h2 className="inventory">Add user</h2>

      <form method="POST" action="/admin/add-user">
        <div className="form-inlineAdmin">
          <label>First Name</label>
          <input className="inputStyle" type="text" name="userFirstName"></input>
        </div>
        <div className="form-inlineAdmin">
          <label>Last Name</label>
          <input className="inputStyle" type="text" name="userLastName"></input>
        </div>
        <div className="form-inlineAdmin">
          <label>E-mail Address</label>
          <input className="inputStyle" type="text" name="email"></input>
        </div>
        <div className="form-inlineAdmin">
          <label>Username</label>
          <input className="inputStyle" type="text" name="username"></input>
        </div>
        <div className="form-inlineAdmin">
          <label>Enter Password</label>
          <input className="inputStyle" type="text" name="password"></input>
        </div>
        <div className="form-inlineAdmin">
          <label>Re-Enter Password</label>
          <input className="inputStyle" type="text" name="passwordConf"></input>
        </div>
        <div className="form-inlineAdmin">
          <label for="permissions">Permissions</label>
          <select id="permissions"
            name="design"
            value={this.name}
            onChange={this.handleChange}>{permissionsList}</select>
        </div>
        <div className="form-inlineAdmin">
          <Button type="submit">Sign-up</Button>
        </div>
        <br />
        </form>
        <br></br>
        <h2 className="inventory">Delete user</h2>
        <form method="POST" action="/admin/delete-user">
        <div className="form-inlineAdmin">
          <label>Username</label>
          <input type="text" name="username"></input> 
          </div>
          <div className="form-inlineAdmin">
          <br />
          <Button type="submit">Delete user</Button>
          </div>
        </form>
        <form >
          <div class="enter_user">
          <h2 className="inventory">Users List</h2>
          <Button onClick={this.handleSubmit}>Show users</Button>
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Email</th>
              <th>User First Name</th>
              <th>User Last Name</th>
            </tr>
            </thead>
            <tbody>
            {userList}
            </tbody>
          </Table>
          </div>
    </form>
      </div>

    );
  }
}
//<!-- Should add a handleClick method to handle the button -->

export default Admin
