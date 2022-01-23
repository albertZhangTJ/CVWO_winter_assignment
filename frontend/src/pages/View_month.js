//referred to some code from https://react-table.tanstack.com/docs/examples/full-width-table

import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTable from "react-table";
import styled from 'styled-components'
import {parse_vcal, add_null} from "../vcalendar_parser.js"
//import 'react-calendar/dist/Calendar.css';

const Styles = styled.table`
  /* This is required to make the table full-width */
  display: block;
  max-width: 100%;

  /* This will make the table scrollable when it gets too small */
  .tableWrap {
    display: block;
    max-width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    border-bottom: 1px solid black;
  }

  table {
    /* Make sure the inner table is always as wide as needed */
    width: 100%;
    border-spacing: 0;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      /* The secret sauce */
      /* Each cell should grow equally */
      width: 1%;
      /* But "collapsed" cells should be as small as possible */
      &.collapse {
        width: 0.0000000001%;
      }

      :last-child {
        border-right: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

class View_month extends React.Component {

    data = "";
    parsed_data=[{}];

    constructor(props) {
      super(props);
      this.state = {
          profile: {}
      }
      this.handleYearChange = this.handleYearChange.bind(this);
      this.handleMonthChange = this.handleMonthChange.bind(this);
    }

    componentDidMount() {
        const date=new Date();
        axios.post('http://localhost:8080/view_month',localStorage.getItem("ssid")+","+date.toISOString() , {headers:{'Content-Type': 'text/plain'}})
        .then((response)=> this.data=response.data);
        this.parsed_data=parse_vcal(this.data);
    }

    handleYearChange(e){
      this.setState( (state, props) => {
          let profile = state.profile;
          profile.year = e.target.value;
          return {profile: profile}
      });
    }

    handleMonthChange(e){
      this.setState( (state, props) => {
          let profile = state.profile;
          profile.month = add_null(e.target.value);
          return {profile: profile}
      });
    }

    onSubmit = (e) => {
      axios.post('http://localhost:8080/view_month', localStorage.getItem("ssid")+","+this.state.profile.year+this.state.profile.month, {headers:{'Content-Type': 'text/plain'}})
          .then(function(response) {
              this.data=response.data;
              this.parsed_data=parse_vcal(response.data)
          })
          .catch(function(error) {
          });
    };

    render() {
        return   (<>
        <h3>Search for month</h3>
        <form onSubmit={(e) => this.onSubmit(e)}>
                <label for="year"> year </label>
                <input type="text" id="year" name="year" placeholder="Enter year" 
                value={this.state.profile.year}
                onChange={this.handleYearChange} />
                <label for="month"> month </label>
                <input type="text" id="month" name="month" placeholder="Enter month"
                value={this.state.profile.month}
                onChange={this.handleMonthChange} />

                <input type="submit" value="Submit" />
        </form>
        <br/>
        <Styles>
             <table>
                <tbody>
                    <tr>
                    <th>Event name</th>
                    <th>Start time</th>
                    <th>End time</th>
                    <th>Description</th>
                    <th>Contact</th>
                    <th>Participants</th>
                    <th>Created on</th>
                    </tr>
                    {this.parsed_data.map((item, i) => (
                        <tr key={i}>
                        <td>{item.SUMMARY}</td>
                        <td>{item.DTSTART}</td>
                        <td>{item.DTEND}</td>
                        <td>{item.DESCRIPTION}</td>
                        <td>{item.MAILTO}</td>
                        <td>{item.ORGANIZER}</td>
                        <td>{item.DTSTAMP}</td>
                        </tr>
                    ))}
                </tbody>
            </table> 
        </Styles>
        <br/><br/>
        <Button onClick={()=>window.location.href="/view_day"}>
          Create an event
        </Button>
        <br/><br/>
        <Button onClick={()=>window.location.href="/view_day"}>
          View by day
        </Button>
        </>);
    }
}

export default View_month;
