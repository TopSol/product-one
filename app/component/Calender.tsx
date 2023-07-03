"use client";
import React,{useState} from "react";
import "../pages/marqueedetail/style.css"

import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const Datepicker = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateClick = (date, { selected }) => {
    if (selected) {
      // Deselect the clicked date
      const selectedIndex = selectedDates.findIndex(
        (selectedDate) => selectedDate.getTime() === date.getTime()
      );
      const deselectedDates = [
        ...selectedDates.slice(0, selectedIndex),
        ...selectedDates.slice(selectedIndex + 1)
      ];
      setSelectedDates(deselectedDates);
    } else {
      // Select the clicked date
      setSelectedDates([...selectedDates, date]);
    }
  };

  return (
    <div>
      
      <DayPicker
        selected={selectedDates}
        onDayClick={handleDateClick}
        mode="multiple"
      />
    </div>
  );
};

export default Datepicker;
