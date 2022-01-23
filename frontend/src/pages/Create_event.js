import LoginForm from '../components/LoginForm';
import React, { useState } from 'react';
import { parse_vcal, generate_vcal, add_null, set_year, set_month, set_date, set_hour, set_minute, set_second } from '../vcalendar_parser';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { profile } from 'console';

class Create_event extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        profile.DTSTART="0000-00-00T00:00:00Z";
        profile.DTEND="0000-00-00T00:00:00Z";
        profile.DTSTAMP=new Date().toISOString();
        this.handleSummaryChange=this.handleSummaryChange.bind(this);
        this.handleDtstartYearChange=this.handleDtstartYearChange.bind(this);
        this.handleDtstartMonthChange=this.handleDtstartMonthChange.bind(this);    
        this.handleDtstartDayChange=this.handleDtstartDayChange.bind(this);
        this.handleDtstartHourChange=this.handleDtstartHourChange.bind(this);    
        this.handleDtstartMinuteChange=this.handleDtstartMinuteChange.bind(this);    
        this.handleDtstartSecondChange=this.handleDtstartSecondChange.bind(this);
        this.handleDtendYearChange=this.handleDtendYearChange.bind(this);
        this.handleDtendMonthChange=this.handleDtendMonthChange.bind(this);    
        this.handleDtendDayChange=this.handleDtendDayChange.bind(this);
        this.handleDtendHourChange=this.handleDtendHourChange.bind(this);    
        this.handleDtendMinuteChange=this.handleDtendMinuteChange.bind(this);    
        this.handleDtendSecondChange=this.handleDtendSecondChange.bind(this);
        this.handleOrganizerChange=this.handleOrganizerChange.bind(this);    
        this.handleMailtoChange=this.handleMailtoChange.bind(this);    
        this.handleDescriptionChange=this.handleDescriptionChange.bind(this);
    }

    handleSummaryChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.SUMMARY = e.target.value;
            return {profile: profile}
        });
    }

    handleDtstartYearChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_year(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtstartMonthChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_month(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtstartDayChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_day(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtstartHourChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_hour(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtstartMinuteChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_minute(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtstartSecondChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTSTART = set_second(profile.DTSTART, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendYearChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_year(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendMonthChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_month(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendDayChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_day(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendHourChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_hour(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendMinuteChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_minute(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleDtendSecondChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DTEND = set_second(profile.DTEND, e.target.value);
            return {profile: profile}
        });
    }

    handleOrganizerChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.ORGANIZER = e.target.value;
            return {profile: profile}
        });
    }

    handleMailtoChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.MAILTO = e.target.value;
            return {profile: profile}
        });
    }

    handleDescriptionChange(e){
        this.setState( (state, props) => {
            let profile = state.profile;
            profile.DESCRIPTION = e.target.value;
            return {profile: profile}
        });
    }

    onSubmit = (e) => {
        axios.post('http://localhost:8080/create_event', localStorage.getItem("ssid")+","+generate_vcal(this.state.profile), {headers:{'Content-Type': 'text/plain'}})
            .then(function(response) {
                if (response.data==="Invalid credentials"){
                    alert("Username or password is incorrect");
                }
                else {
                    window.location.href="/view_month";
                }
            })
            .catch(function(error) {
            });
    };

    render() {
        return (
              <div id="eventForm">
              <form onSubmit={(e) => this.onSubmit(e)}>
                  <h1>Create a new event</h1>

                  <br/><br/>

                  <label for="eventname"> Event name </label>
                  <input type="text" id="eventname" name="Event name"
                  value={this.state.profile.SUMMARY}
                  onChange={this.handleSummaryChange} />
              
                  <br/><br/>
  
                  <h3>Start time</h3>

                  <label for="syear"> Year </label>
                  <input type="text" id="syear" name="Year"
                  onChange={this.handleDtstartYearChange} />

                  <label for="smonth"> Month </label>
                  <input type="text" id="smonth" name="Month"
                  onChange={this.handleDtstartMonthChange} />

                  <label for="sday"> Day </label>
                  <input type="text" id="sday" name="Day"
                  onChange={this.handleDtstartDayChange} />

                  <br/>

                  <label for="shour"> Hour </label>
                  <input type="text" id="shour" name="Hour"
                  onChange={this.handleDtstartHourChange} />
  
                  <br/><br/>
  
                  <input type="submit" value="Submit" />
              </form>
              </div>
          )
      }
}

export default Create_event;