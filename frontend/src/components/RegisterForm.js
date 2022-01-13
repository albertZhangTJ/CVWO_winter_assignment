import React, { ChangeEvent, useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

class RegisterForm extends React.Component {
   constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(event){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.username = event.target.value;
            return {profile: profile}
        });
    }

    handlePasswordChange(event){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.password = event.target.value;
            return {profile: profile}
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(this.state.profile));
    }

    render() {
      return (
            <div id="registerForm">
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

export default RegisterForm;