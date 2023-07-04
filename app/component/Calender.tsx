"use client";
import React,{useState} from "react";
import "../pages/marqueedetail/style.css"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
const Datepicker = () => {
  const initialDays: Date[] = [];
  const [days, setDays] = React.useState<Date[] | undefined>(initialDays);
  return (
    <DayPicker
      mode="multiple"
      min={1}
      selected={days}
      onSelect={setDays}
    />
  );
};

export default Datepicker;
