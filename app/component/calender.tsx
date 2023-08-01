
// import React from "react";
// import { Calendar, Views, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { useStore } from "@/store";
// import { add } from "date-fns";

// const localizer = momentLocalizer(moment);

// const MultipleDaySelectCalendar = ({ selectedVenue, lunchType }) => {
//   const { dates, addDate, addDateKey, lunchDinner } = useStore();
//   console.log(lunchDinner, "lunchTylunchDinnerpedd");
//   const handleSelectSlot = ({ start, end }) => {
//     const selectedRange = getDatesInRange(start, end);
//     const asd = lunchDinner[selectedVenue]?.[lunchType] || [];
//     // const asd = dates[selectedVenue] || [];

//     // Check if the selected date(s) already exist in the state, and only add new dates
//     const uniqueSelectedRange = selectedRange.filter(
//       (date) => !asd.some((existingDate) => isSameDay(existingDate, date))
//     );

//     if (uniqueSelectedRange.length > 0) {
//       // addDate([...asd, ...uniqueSelectedRange], selectedVenue);
//       addDateKey(selectedVenue, lunchType, [...asd, ...uniqueSelectedRange]);
//     }

//   };

//   const handleEventClick = (event) => {
//     const newDates = lunchDinner[selectedVenue]?.[lunchType].filter(
//       // const newDates = dates[selectedVenue].filter(
//       (date) => !isSameDay(date, event.start)
//     );
//     // addDate(newDates, selectedVenue);
//     addDateKey(selectedVenue, lunchType, newDates);
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

//   return (
//     <div>
//       <Calendar
//         selectable
//         style={{ height: 600 }}
//         views={[Views.MONTH, Views.WEEK, Views.DAY]}
//         onSelectSlot={handleSelectSlot}
//         onSelectEvent={handleEventClick}
//         localizer={localizer}
//         events={lunchDinner?.[selectedVenue]?.[lunchType]?.map?.((date) => ({
//           start: date,
//           end: date,
//           title: "Selected",
//         }))}
//       />
//     </div>
//   );
// };

// export default MultipleDaySelectCalendar;
// // events={dates[selectedVenue]?.map?.((date) => ({
//         //   start: date,
//         //   end: date,
//         //   title: "Selected",
//         // }))}




import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useStore } from "@/store";
import { add } from "date-fns";

const localizer = momentLocalizer(moment);
const MultipleDaySelectCalendar = ({ selectedVenue, lunchType,setVenueDates,venueDates }) => {
  const { dates, addDate, lunchDinner } = useStore();
  const [lunchDinnerDate, setLunchDinnerDate] = useState({});
  console.log(lunchDinner, "lunchTylunchDinnerpedd")
  console.log(dates?.dates,"lunchddDinnerDate",dates)
  const addDateKey = (selectedVenue, lunchType, newDates) => {
    setLunchDinnerDate((prev) => ({
      ...prev,
      [selectedVenue]: {
        ...prev[selectedVenue],
        [lunchType]: newDates,
      },
    }));
  };
  const handleSelectSlot = ({ start, end }) => {
    const selectedRange = getDatesInRange(start, end);
    const asd = lunchDinnerDate[selectedVenue]?.[lunchType] || [];
    const uniqueSelectedRange = selectedRange.filter(
      (date) => !asd.some((existingDate) => isSameDay(existingDate, date))
    );

    if (uniqueSelectedRange.length > 0) {

      addDateKey(selectedVenue, lunchType, [...asd, ...uniqueSelectedRange]);
    }

  };
 const handleEventClick = (event) => {
    const newDates = lunchDinnerDate[selectedVenue]?.[lunchType].filter(
      (date) => !isSameDay(date, event.start)
    );
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
  useEffect(() => {
    setVenueDates(lunchDinnerDate);
  }
  , [lunchDinnerDate]);
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
        events={lunchDinnerDate?.[selectedVenue]?.[lunchType]?.map?.((date) => ({
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