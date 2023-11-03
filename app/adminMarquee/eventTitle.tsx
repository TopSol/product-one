import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useStore } from "@/store";
const EventTitle = ({
  lunchType,
  selectedDate,
  date,
  selectedVenue,
  deleteDates,
}) => {
  const { addDateKey, lunchDinner } = useStore();
  const da = selectedDate.filter((item) => item.date === date);
  return (
    <>
      <div
        className={`flex justify-start items-start px-3 rounded-md`}
        style={{
          backgroundColor: lunchType === "Diner" ? "#F99832" : "#328EF9",
        }}
      >
        {selectedDate &&
          selectedDate.filter((item) => item.date === date)[0]?.selected && (
            <FontAwesomeIcon icon={faCheck} className="pr-2 mt-1" />
          )}
        {deleteDates &&
          deleteDates.filter((item) => item.date === date)[0]?.selected && (
            <FontAwesomeIcon icon={faCheck} className="pr-2 mt-1" />
          )}
        {lunchType}
      </div>
    </>
  );
};

export default EventTitle;
