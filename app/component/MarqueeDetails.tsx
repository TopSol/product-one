"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "@/app/firebase";
import { Radio, Select } from "antd";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { getFormatDates } from "@/app/utils";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { useStore } from "@/store";
function MarqueeDetails({ item }) {
  const { addDateKey, lunchDinner,addMarqueeVenueNames,addMarqueeVenueDates } = useStore();
  const [open, setOpen] = useState({});
  const [days, setDays] = useState<any>([]);
  const [isLunch, setIsLunch] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("Lunch");
  const [venuesData, setVenuesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [venueName, setVenueName] = useState([]);
  const [name, setName] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [bookDates, setBookDates] = useState([]);
  const [meal, setMeal] = useState("Lunch");
  const [value, setValue] = useState("1");
  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(collection(db, "Venues"));
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, data: doc.data() });
      });
      setVenuesData(dataArr);
    };
    getdata();
  }, []);
console.log(venuesData,"sdfsdfsdfd")
  const getVenueData = (id) => {
    const asd = venuesData?.filter((item) => {
      console.log(item, "sadfasssfad");
      return item?.data?.userId === id;
    });
    console.log(asd,"sdfadfasdfadfas")
    const marqueeVenueName = asd?.map((item) => ({
      value: item?.data?.venueId,
      label: item?.data?.name,
    }));
    setName(marqueeVenueName);
    addMarqueeVenueNames(marqueeVenueName)
  };

  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, data: doc.data() });
      });
      setUserData(dataArr);
    };
    getUser();
  }, []);

  const handleClick = (id) => {
    console.log(id, "asdfasdf");
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCheck = (event, item) => {
    console.log(event, "event", item);
    const selectedValue = event?.target?.value || event;
    console.log(selectedValue, "selectedValue");
    setSelectedOption(selectedValue);
    if (selectedValue == "Lunch") {
      setDays(item);
      setIsLunch("Lunch");
    } else if (selectedValue == "Diner") {
      setDays(item);
      setIsLunch("Diner");
    }
  };

  const handleVenueName = (id) => {
    console.log(selectedDate, "ekeeada", id);
    const data = name.filter((item) => {
      return item?.value == id;
    });

    const reserveDate = selectedDate.map((item) => {
      return {
        id,
        dates: {
          Diner: getFormatDates(item.dates[id].Diner),
          Lunch: getFormatDates(item.dates[id].Lunch),
        },
      };
    });
    console.log(reserveDate, "reserveDate");
    setBookDates(reserveDate);
    {
      meal == "Diner"
        ? handleCheck(meal, reserveDate[0]?.dates?.Diner)
        : handleCheck(meal, reserveDate[0]?.dates?.Lunch);
    }
  };

  const getDatess = async (id) => {
    const querySnapshot = await getDocs(collection(db, "bookDate"));
    const datesArr = [];
    querySnapshot.forEach((doc) => {
      datesArr.push(doc.data());
    });
    const asdf = datesArr?.filter((item) => {
      return item?.id === id;
    });
    console.log(asdf, "asdfasdfasdf");
    setSelectedDate(asdf);
    addMarqueeVenueDates(asdf)
  };

  return (
    <div className="mb-10 mx-5 ">
      <div className="md:container mx-auto flex flex-col md:flex-row border-gray-200 border-[1px] rounded-lg  ">
        <div className="md:w-[40%] cursor-pointer">
          <NextLink href={`/pages/marqueedetail?id=${item?.id}`} passHref>
            <img
              src={item?.data?.images?.[0]}
              className="md:rounded-r-none rounded-lg w-72 h-48"
              alt=""
              onClick={()=>{
                getVenueData(item?.id);
                getDatess(item?.id);
              }}
            />
          </NextLink>
        </div>
        <div className="pt-6 px-6 md:w-[40%] ">
          <h1 className="font-vollkorn text-2xl">{item?.data?.name}</h1>

          <p className="font-roboto text-textColor mt-4">
            {item?.data?.description}
          </p>
          <p className="font-roboto text-textColor mt-6">
            {item?.data?.address}
          </p>
        </div>
        <div className="md:w-[20%] border-l-[1px] flex flex-col justify-center mt-5 md:mt-0 ">
          <p className="text-center text-2xl font-roboto font-bold  text-textColor">
            {item.data?.price}
          </p>
          <p className="text-center mt-3 mb-6 font-vollkorn text-textColor">
            PER NIGHT
          </p>
          <div className="flex items-center justify-center font-roboto font-semibold mb-8">
            <p className="text-[11px] text-textColor bg-[#f5f5f5] px-3 py-1 rounded ">
              Select Booking Detials
            </p>
          </div>

          <div
            className="cursor-pointer"
            onClick={() => {
              handleClick(item?.data?.id);
              getVenueData(item?.id);
              getDatess(item?.id);
            }}
          >
            <p className=" text-sm  text-textColor  flex justify-center items-center py-1 font-roboto border-t-[1px]">
              Avalibility & Details
              <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
            </p>
          </div>
        </div>
      </div>
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
            // onSelect={setDays}
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
    </div>
  );
}

export default MarqueeDetails;
