import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';


const View_month: React.FC = () => {
    const [isShowButton, setIsShowButton] = useState(false);

    const guest_login = () => {
        axios.post('localhost:8080/login', { body: 'guest' }, {headers:{'Content-Type': 'text/plain'}})
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };

    return (
        <>
            <h1>Successfully logged in</h1>
            <Button component={Link} to="/register">
                {'Sign up for free'}
            </Button>
        </>
    );
};

export default View_month;
