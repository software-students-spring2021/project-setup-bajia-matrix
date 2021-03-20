import React from 'react';
import classes from './EventTitle.module.css';

/*
    This component displays the title of an event page and its associated pages.
    The title includes the name, location, and time of the event.

    Props:
        - title: name of the event
        - day: day of the week 
        - date: Month and day of the year
        - time: time range from start to end
*/
const EventTitle = (props) => (
    <div className={classes.EventTitle}>
        <h1>{props.title}</h1>
        {!props.newEventAuthentication && <h5>{props.day}, {props.date} @ {props.time}</h5>}
        <p><b>{props.location}</b></p>
        <p>{props.description}</p>
    </div>
);

export default EventTitle;
