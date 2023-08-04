"use client";
import React, { useState, useEffect } from "react";
import { Radio, Select } from "antd";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

function CalendarPreview({item,isLunch,setIsLunch,setDays,days,setOpen,open,handleVenueName,setName,name}) {
    const [value, setValue] = useState("1")
    const [meal,setMeal]=useState("Lunch")
  return (
    <div className="sm:flex sm:flex-col  rounded-md mt-3  lg:flex lg:flex-row bg-[#f5f5f5]">
      {open[item?.data?.id] && (
        <DayPicker
          className={`${
            isLunch == `Lunch` ? `customClasses` : `customClasses2`
          }`}
          style={{ width: "100%" }}
          mode="multiple"
          min={1}
          selected={days}
          onSelect={setDays}
        />
      )}

      {open[item?.data?.id] && (
        <div className="w-full  p-5">
          <Select
            showSearch
            style={{
              width: 250,
              marginBottom: 20,
            }}
            placeholder="Search to Select"
            size="large"
            placement="bottomLeft"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            onChange={handleVenueName}
            options={name}
          />
          <div className="w-full mb-3">
            <h1 className="text-xl flex items-center w-full font-vollkorn ">
              Meal Selection
            </h1>
            <p className="my-3">Choose your preferred mealtime option.</p>
          </div>

          <div className="flex items-center mb-4">
            <Radio.Group
              onChange={(e) => setValue(e.target.value)}
              value={value}
            >
              <Radio
                onClick={() => setMeal("Lunch")}
                onChange={() => setValue("1")}
                id="default-radio-2"
                type="radio"
                value="1"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </Radio.Group>
            {/* <input
                          // onClick={() => handleCheck("Lunch",bookDates[0]?.dates.Lunch)}
                          onClick={()=> setMeal("Lunch")}
                          checked
                          id="default-radio-2"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        /> */}
            <label
              htmlFor="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Lunch
            </label>
          </div>
          <div className="flex items-center">
            <Radio.Group
              onChange={(e) => setValue(e.target.value)}
              value={value}
            >
              <Radio
                onClick={() => setMeal("Diner")}
                id="default-radio-3"
                // onChange={(e)=>setValue(e.target.value)}
                type="radio"
                value="2"
                name="default-radio"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </Radio.Group>
            <label
              htmlFor="default-radio-3"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Diner
            </label>
          </div>
          <div className="flex items-center space-x-3 font-roboto mt-5">
            <div className="bg-[orange] h-3 w-3 rounded-full"></div>
            <p>Lunch</p>
            <div className="bg-blue-600 h-3 w-3 rounded-full"></div>
            <p>Diner</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarPreview;
