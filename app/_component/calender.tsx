import React, { useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useStore } from "@/store";
import { getFormatDates } from "@/app/utils";
import EventTitle from "@/app/adminMarquee/eventTitle";
const localizer = momentLocalizer(moment);
const MultipleDaySelectCalendar = ({
  selectedVenue,
  lunchType,
  setVenueDates,
  allDate,
  venueDates,
  setShowButton,
  setSelectedDate,
  selectedDate,
  setDeleteDates,
  deleteDates,
}) => {
  const { addDateKey, lunchDinner } = useStore();
  const [lunchDinnerDate, setLunchDinnerDate] = useState({});
  const [isDateSelected, setIsDateSelected] = useState(false);

  const handleSelectSlot = ({ start, end }) => {
    setShowButton(true);
    const selectedRange = getDatesInRange(start, end);

    const asd = lunchDinnerDate[selectedVenue]?.[lunchType] || [];
    const uniqueSelectedRange = selectedRange.filter(
      (date) => !asd.some((existingDate) => isSameDay(existingDate, date))
    );

    if (uniqueSelectedRange.length > 0) {
      setSelectedDate([
        ...selectedDate,
        ...uniqueSelectedRange?.map((item) => ({ date: item, selected: true })),
      ]);
      addDateKey(selectedVenue, lunchType, [...asd, ...uniqueSelectedRange]);
    }
  };

  useEffect(() => {
    setLunchDinnerDate(lunchDinner);
  }, [lunchDinner]);
  const handleEventClick = (event) => {
    setShowButton(true);
    const newDates = lunchDinnerDate[selectedVenue]?.[lunchType].filter(
      (date) => !isSameDay(date, event.start)
    );
    const newDate = lunchDinnerDate[selectedVenue]?.[lunchType].filter((date) =>
      isSameDay(date, event.start)
    );

    const dateExists = deleteDates.some(
      (dateObj) => dateObj.date === newDate[0]
    );

    if (dateExists) {
      const updatedDeleteDates = deleteDates.filter(
        (dateObj) => dateObj.date !== newDate[0]
      );
      setDeleteDates(updatedDeleteDates);
    } else {
      setDeleteDates([...deleteDates, { date: newDate[0], selected: true }]);
    }

    const deleteSelectedDate = selectedDate.filter(
      (date) => !isSameDay(date?.date, event.start)
    );
    setSelectedDate(deleteSelectedDate);
    selectedDate.map((item) => {
      if (item?.date === newDate[0]) {
        addDateKey(selectedVenue, lunchType, newDates);
      }
    });
  };

  useEffect(() => {
    setVenueDates(lunchDinnerDate);
  }, [lunchDinnerDate]);

  // build
  // const getDatesInRange = (start, end) => {
  //   const dates = [];
  //   let current = new Date(start);
  //   while (current < end) {
  //     dates.push(new Date(current));
  //     current.setDate(current.getDate() + 1);
  //   }
  //   return dates;
  // };
  const getDatesInRange = (start: Date, end: Date) => {
    const dates: Date[] = [];
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

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = event.title === "Diner" ? "#ffff" : "#ffff";
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "6px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  const originalDates = lunchDinnerDate?.[selectedVenue]?.[lunchType];
  const dadta = getFormatDates(originalDates);
  return (
    <div>
      <Calendar
        style={{ height: 600 }}
        views={[Views.MONTH]}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleEventClick}
        localizer={localizer}
        selectable={true}
        events={
          lunchType === "All"
            ? allDate?.map((data) => data)
            : getFormatDates(
                lunchDinnerDate?.[selectedVenue]?.[lunchType]
              )?.map((date) => ({
                start: date,
                end: date,
                title: (
                  <EventTitle
                    lunchType={lunchType}
                    selectedDate={selectedDate}
                    date={date}
                    selectedVenue={selectedVenue}
                    deleteDates={deleteDates}
                  />
                ),
              }))
        }
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MultipleDaySelectCalendar;
