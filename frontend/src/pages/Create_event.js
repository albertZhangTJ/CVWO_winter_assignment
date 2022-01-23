import LoginForm from '../components/LoginForm';
import React, { useState } from 'react';
import { parse_vcal, generate_vcal, add_null, set_year, set_month, set_day, set_hour, set_minute, set_second } from '../vcalendar_parser';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Create_event extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        this.state.profile.DTSTART="0000-00-00T00:00:00Z";
        this.state.profile.DTEND="0000-00-00T00:00:00Z";
        this.state.profile.DTSTAMP=new Date().toISOString();
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
              
                  <br/><br/><br/>
  
                  <h3>Start time</h3>

                  <label for="syear"> Year </label>
                  <input type="text" id="syear" name="Year"
                  onChange={this.handleDtstartYearChange} />
                  &nbsp;
                  <label for="smonth"> Month </label>
                  <input type="text" id="smonth" name="Month"
                  onChange={this.handleDtstartMonthChange} />
                  &nbsp;
                  <label for="sday"> Day </label>
                  <input type="text" id="sday" name="Day"
                  onChange={this.handleDtstartDayChange} />
                  <br/><br/>

                  <label for="shour"> Hour </label>
                  <input type="text" id="shour" name="Hour"
                  onChange={this.handleDtstartHourChange} />
                  &nbsp;
                  <label for="sminute"> Minute </label>
                  <input type="text" id="sminute" name="Minute"
                  onChange={this.handleDtstartMinuteChange} />
                  &nbsp;
                  <label for="ssecond"> Second </label>
                  <input type="text" id="ssecond" name="Second"
                  onChange={this.handleDtstartSecondChange} />
  
                  <br/><br/><br/>

                  <h3>End time</h3>

                  <label for="eyear"> Year </label>
                  <input type="text" id="eyear" name="Year"
                  onChange={this.handleDtendYearChange} />
                  &nbsp;
                  <label for="emonth"> Month </label>
                  <input type="text" id="emonth" name="Month"
                  onChange={this.handleDtendMonthChange} />
                  &nbsp;
                  <label for="eday"> Day </label>
                  <input type="text" id="eday" name="Day"
                  onChange={this.handleDtendDayChange} />

                  <br/><br/>

                  <label for="ehour"> Hour </label>
                  <input type="text" id="ehour" name="Hour"
                  onChange={this.handleDtendHourChange} />
                  &nbsp;
                  <label for="eminute"> Minute </label>
                  <input type="text" id="eminute" name="Minute"
                  onChange={this.handleDtendMinuteChange} />
                  &nbsp;
                  <label for="esecond"> Second </label>
                  <input type="text" id="esecond" name="Second"
                  onChange={this.handleDtendSecondChange} />

                  <br/><br/><br/>

                  <h3>Memo</h3>
                  <label for="memo"> Memo </label>
                  <input type="text" id="memo" name="Memo"
                  onChange={this.handleDescriptionChange} />

                  <br/><br/><br/>

                  <h3>Organizer</h3>
                  <label for="org"> Organizer </label>
                  <input type="text" id="org" name="Organizer"
                  onChange={this.handleOrganizerChange} />

                  <br/><br/><br/>

                  <h3>Contact</h3>
                  <label for="mail"> E-mail </label>
                  <input type="text" id="mail" name="email"
                  onChange={this.handleMailtoChange} />
                  
                  <br/><br/><br/>
                  <input type="submit" value="Submit" />
              </form>
              </div>
          )
      }
}

export default Create_event;