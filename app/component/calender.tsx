// import React, { useState } from "react";
// import { Calendar, Views, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useStore } from "@/store";
// const localizer = momentLocalizer(moment);
// const MultipleDaySelectCalendar = ({ selectVenue }) => {
//   const { dates, addDate } = useStore();
// console.log(selectVenue,"selectVenue")
//   const handleSelectSlot = ({ start, end }) => {
//     const selectedRange = getDatesInRange(start, end);
//     const asd = dates[selectVenue] || [];
//     console.log(selectedRange, "selectedRange");
//     addDate([...asd, ...selectedRange], selectVenue);
//   };
//   console.log(dates, "Dataaa");
//   const handleEventClick = (event) => {
//     addDate(
//       dates[selectVenue].filter((date) => !isSameDay(date, event.start)),
//       selectVenue
//     );
//   };

//   console.log(dates, "dsfdsf");

//   const getDatesInRange = (start, end) => {
//     const dates = [];
//     let current = new Date(start);
//     while (current < end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }
//     return dates;
//   };

//   const isSameDay = (date1, date2) => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return (
//       d1.getDate() === d2.getDate() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getFullYear() === d2.getFullYear()
//     );
//   };

//   // Check if the property exists in the 'dates' object before rendering the Calendar
//   //   if (!dates.hasOwnProperty(selectVenue)) {
//   //     return <div>No data available for this venue</div>;
//   //   }

//   return (
//     <div>
//       <Calendar
//         selectable
//         style={{ height: 600 }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={handleEventClick}
//         localizer={localizer}
//         events={dates[selectVenue]?.map?.((date) => ({
//           start: date,
//           end: date,
//           title: "Selected",
//         }))}
//       />
//     </div>
//   );
// };

// export default MultipleDaySelectCalendar;

// import React, { useState } from "react";
// import { Calendar, Views, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useStore } from "@/store";
// const localizer = momentLocalizer(moment);
// const MultipleDaySelectCalendar = ({ selectedVenue }) => {
//   const { dates, addDate } = useStore();
//   const handleSelectSlot = ({ start, end }) => {
//     const selectedRange = getDatesInRange(start, end);
//     const asd = dates[selectedVenue] || [];
//     console.log(selectedRange, "selectedRange");
//     addDate([...asd, ...selectedRange], selectedVenue);
//   };
//   console.log(dates, "Dataaa");
//   const handleEventClick = (event) => {
//     addDate(
//       dates[selectedVenue].filter((date) => !isSameDay(date, event.start)),
//       selectedVenue
//     );
//   };
//   const getDatesInRange = (start, end) => {
//     const dates = [];
//     let current = new Date(start);
//     while (current < end) {
//       dates.push(new Date(current));
//       current.setDate(current.getDate() + 1);
//     }
//     return dates;
//   };

//   const isSameDay = (date1, date2) => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return (
//       d1.getDate() === d2.getDate() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getFullYear() === d2.getFullYear()
//     );
//   };
//    return (
//     <div>
//       <Calendar
//         selectable
//         style={{ height: 600 }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={handleEventClick}
//         localizer={localizer}
//         events={dates[selectedVenue]?.map?.((date) => ({
//           start: date,
//           end: date,
//           title: "Selected",
//         }))}
//       />
//     </div>
//   );
// };

// export default MultipleDaySelectCalendar;

// Check if the property exists in the 'dates' object before rendering the Calendar
//   if (!dates.hasOwnProperty(selectedVenue)) {
//     return <div>No data available for this venue</div>;
//   }

import React from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useStore } from "@/store";
import { add } from "date-fns";

const localizer = momentLocalizer(moment);

const MultipleDaySelectCalendar = ({ selectedVenue, lunchType }) => {
  const { dates, addDate, addDateKey, lunchDinner } = useStore();
  console.log(lunchDinner, "lunchTylunchDinnerpedd");
  const handleSelectSlot = ({ start, end }) => {
    const selectedRange = getDatesInRange(start, end);
    const asd = lunchDinner[selectedVenue]?.[lunchType] || [];
    // const asd = dates[selectedVenue] || [];

    // Check if the selected date(s) already exist in the state, and only add new dates
    const uniqueSelectedRange = selectedRange.filter(
      (date) => !asd.some((existingDate) => isSameDay(existingDate, date))
    );

    if (uniqueSelectedRange.length > 0) {
      // addDate([...asd, ...uniqueSelectedRange], selectedVenue);
      addDateKey(selectedVenue, lunchType, [...asd, ...uniqueSelectedRange]);
    }

  };

  const handleEventClick = (event) => {
    const newDates = lunchDinner[selectedVenue]?.[lunchType].filter(
      // const newDates = dates[selectedVenue].filter(
      (date) => !isSameDay(date, event.start)
    );
    // addDate(newDates, selectedVenue);
    addDateKey(selectedVenue, lunchType, newDates);
  };
  const getDatesInRange = (start, end) => {
    const dates = [];
    let current = new Date(start);
    while (current < end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const isSameDay = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  };

  return (
    <div>
      <Calendar
        selectable
        style={{ height: 600 }}
        views={[Views.MONTH, Views.WEEK, Views.DAY]}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        localizer={localizer}
        events={lunchDinner?.[selectedVenue]?.[lunchType]?.map?.((date) => ({
          start: date,
          end: date,
          title: "Selected",
        }))}
      />
    </div>
  );
};

export default MultipleDaySelectCalendar;
// events={dates[selectedVenue]?.map?.((date) => ({
        //   start: date,
        //   end: date,
        //   title: "Selected",
        // }))}