import React, { ChangeEvent, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from "react-router-dom";

class LoginForm extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.username = e.target.value;
            return {profile: profile}
        });
    }

    handlePasswordChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.password = e.target.value;
            return {profile: profile}
        });
    }

    onSubmit = (e) => {
        axios.post('http://localhost:8080/login', this.state.profile.username+","+this.state.profile.password, {headers:{'Content-Type': 'text/plain'}})
            .then(function(response) {
                if (response.data==="Invalid credentials"){
                    alert("Username or password is incorrect");
                }
                else if (response.data==="User does not exist"){
                    alert("User is not registered")
                }
                else {
                    localStorage.setItem('ssid', response.data);
                    window.location.href="/view_month";
                }
            })
            .catch(function(error) {
            });
    };


    render() {
      return (
            <div id="loginForm">
            <form onSubmit={(e) => this.onSubmit(e)}>
                <label for="username"> Username </label>
                <input type="text" id="username" name="Username" placeholder="Enter username" 
                value={this.state.profile.username}
                onChange={this.handleUsernameChange} />
            
                <br/><br/>

                <label for="password"> Password </label>
                <input type="text" id="password" name="Password" placeholder="Enter password"
                value={this.state.profile.password}
                onChange={this.handlePasswordChange} />

                <br/><br/>

                <input type="submit" value="Submit" />
            </form>
            </div>
        )
    }
}

export default LoginForm;
