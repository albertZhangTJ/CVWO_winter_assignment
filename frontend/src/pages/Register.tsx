import RegisterForm from '../components/RegisterForm';
import React, { useState } from 'react';
import Typewriter from 'typewriter-effect';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    const hideButton = () => {
        setIsShowButton(false);
    };

    const showButton = () => {
        setIsShowButton(true);
    };

    return (
        <>
            <h3>Please register your account</h3>
            <h5>Username and passwords should NOT contain characters other than English letters and numbers.</h5>
            <RegisterForm />            
        </>
    );
};

export default Register;