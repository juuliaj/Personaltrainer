import React, { useState } from 'react';
import './App.css';
import Customerlist from './components/Customerlist';
import Trainingslist from './components/Trainingslist';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TrainingCalendar from './components/TrainingCalendar'

function App() {

  const [value, setValue] = useState('one');

  const handleChange = (event, value) => {
    setValue(value);
  };

  return (
    <div className="App">
        <Tabs value={value} onChange={handleChange}>
          <Tab value="one" label="Customers" />
           <Tab value="two" label="Trainings" />
            <Tab value="three" label="Calendar" />
            </Tabs>
          {value === 'one' && <Customerlist />}
        {value === 'two' && <Trainingslist />}    
      {value === 'three' && <TrainingCalendar /> }   
    </div>
  );
}

export default App;
