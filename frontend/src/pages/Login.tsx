import LoginForm from '../components/LoginForm';
import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Login: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    const guest_login = () => {
        axios.post('http://localhost:8080/login', { body: 'guest' }, {headers:{'Content-Type': 'text/plain'}})
            .then(function(response) {
                console.log(response.data);
                window.location.href = "/View_month"
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
