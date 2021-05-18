import './App.css';
import React, { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrainingCalendar from './components/TrainingCalendar';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';


function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
        <Tabs value={value} onChange={handleChange} value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" centered>
          <Tab icon={<PermContactCalendarOutlinedIcon />} value="one" label="Customers" />
           <Tab icon={<DirectionsRunIcon />} value="two" label="Trainings" />
            <Tab icon={<TodayOutlinedIcon />} value="three" label="Calendar" />
            </Tabs>
          {value === 'one' && <Customerlist />}
        {value === 'two' && <Trainingslist />}    
      {value === 'three' && <TrainingCalendar /> }   
    </div>
  );
}

export default App;
