import LoginForm from '../components/LoginForm';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    const guest_login = () => {
        axios.post('http://localhost:8080/login', 'guest', {headers:{'Content-Type': 'text/plain'}})
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
                console.log(error);
            });
    };

    return (
        <>
            <h1>Welcome to our event planner app!</h1>
            <h3>Please login to continue</h3>
            <LoginForm />
            <br/><br/><br/><br/><br/><br/>
            <h3>Don't have an account yet?</h3>
            <Button component={Link} to="/register">
                {'Sign up for free'}
            </Button>
            <h3>or</h3>
            <Button onClick={guest_login}>
                {'Sign in as guest'}
            </Button>
        </>
    );
};

export default Login;
