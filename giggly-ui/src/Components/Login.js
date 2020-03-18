import React from "react";
import logo from './giggly_logo.PNG';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import {Button} from 'reactstrap'

import "./App.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    {/*Variables to hide the password*/}
    this.state = {
      hidden: true,
      username:'',
      password: '',
      redirectToReferrer: false
    };
    {/*Declares the functions below and helps access the variables above*/}
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  toggleShow() {
    this.setState({ hidden: !this.state.hidden });
  }

  componentDidMount() {
    if (this.props.password) {
      this.setState({ password: this.props.password });
    }
  }

  handleSubmit(){
    console.log('in Login handlesubmit')
    let url = '/login/post-login'
    let username = this.state.username
    let password = this.state.password
    fetch(url, 
        {method: 'POST',
        body:JSON.stringify({username: username, password:password}),
        headers:{ 'Content-Type': 'application/json'}})
        .then(res => {
          if (res.status === 200) {
            this.setState(()=>({
              redirectToReferrer: true
            }))
            this.props.history.push('/App');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again');
        });
      }


  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }

    return (
      <div className="style-main">
      <header>
        <img src={logo} className="App-logo" alt="giggly_logo" />
        <form>
          <br />
          <input style={{fontSize: "20px", backgroundColor: "edf2fc"}}
            id="enter_username"
            type="text"
            name="username"
            defualtValue=""
            class="credentials"
            maxlength="20"
            placeholder="Username"
            onChange={(e) => this.setState({ username: e.target.value })}
            />
          <br />
          <br />
          <input style={{fontSize: "20px", backgroundColor: "edf2fc"}}
            id="enter_password"
            type={this.state.hidden ? "password" : "text"}
            name="password"
            value={this.state.password}
            class="credentials"
            maxlength="20"
            placeholder="Password"
            onChange={this.handlePasswordChange}
          />
          <br />
          <Button onClick= {this.handleSubmit}> Login </Button>
          <br />
          <input type="checkbox" onClick={this.toggleShow} />
          <label style={{fontSize: "small"}}>Show Password</label>
        </form>
        {/*This is the link for the main store website*/}
        <a
          className="App-link"
          href="https://www.lifeimprovedmedical.com/"
          target="_blank"
          rel="noopener noreferrer">
          Go to Life Improved Medical.com
        </a>
      </header>
      </div>
    );
  }
}

export default withRouter(Login);
