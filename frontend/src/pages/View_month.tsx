import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
import Cookies from 'universal-cookie';


class View_month extends React.Component {

    data = "";

    componentDidMount() {
        axios({
            method: 'post',
            url: 'localhost:8080/view_month',
            headers:{"Content-Type":"text/plain"},
            data: localStorage.getItem('ssid')
        }).then((response)=> this.data=response.data);
    }

    render() :JSX.Element {
        return   (<>
            <h1>Successfully logged in</h1>
            <Button component={Link} to="/register">
                {'Sign up for free'}
            </Button>
        </>);
    }
}

export default View_month;
