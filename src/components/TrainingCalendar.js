import React, { Component, useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";


function TrainingCalendar() {

  const localizer = momentLocalizer(moment);
  const [trainings, setTrainings] = React.useState([]);

  useEffect(() => {
      fetchTrainings();
  }, []);

  const fetchTrainings = () => {
      fetch('https://customerrest.herokuapp.com/gettrainings')
      .then(response => response.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err))
  }


  const events= trainings.map((training)=>{

    return {
        id: training.id,
        start: new Date(training.date),
        end: new Date(new Date(training.date).setMinutes(new Date(training.date).getMinutes() + training.duration)),
        title: training.activity + ' / customer ' + training.customer.firstname + ' ' + training.customer.lastname
      }
  })

    return (
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={events}
          style={{ height: "90vh" }}
        />)
    }

export default TrainingCalendar;