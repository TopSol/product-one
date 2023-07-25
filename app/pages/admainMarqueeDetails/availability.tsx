// import React from 'react'
// import { Calendar, momentLocalizer } from 'react-big-calendar'
// import moment from 'moment'
// const localizer = momentLocalizer(moment)

// function Availability() {
//   return (
//     <div>
//     <Calendar
//       localizer={localizer}
//       // events={myEventsList}
//       startAccessor="start"
//       endAccessor="end"
//       style={{ height: 500 }}
//     />
//   </div>
//   )
// }

// export default Availability


import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment)

const MultipleDaySelectCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const selectedRange = getDatesInRange(start, end);
    console.log(selectedRange,"selectedRange")
    setSelectedDates((prevSelected) => [...prevSelected, ...selectedRange]);
  };

  const handleEventClick = (event) => {
    // Implement logic to deselect a previously selected day
    // For example, you can filter out the clicked day from selectedDates
    setSelectedDates((prevSelected) =>
      prevSelected.filter((date) => !isSameDay(date, event.start))
    );
  };
  // const formats = {
  //   dateFormat: 'dd',
  //   timeGutterFormat: 'HH:mm',
  //   dayFormat: 'E dd/MM',
  //   dayRangeHeaderFormat: ({ start, end }) => `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
  // };
console.log(selectedDates,"selectedDates")
  const getDatesInRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const isSameDay = (date1, date2) =>
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear();

  return (
    <div>
      <Calendar
        selectable
        // startAccessor="start"
        //       endAccessor="end"
        style={{ height: 700 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        localizer={localizer}
        events={selectedDates.map((date) => ({
          start: date,
          end: date,
          title: 'Selected',
        }))}
      />
    </div>
  );
};

export default MultipleDaySelectCalendar;