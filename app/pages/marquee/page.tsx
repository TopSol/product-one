
"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "@/app/firebase";
import { Radio, Select } from "antd";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useStore } from "../../../store";
import { BookedDiner, BookedLunch } from "../marqueedetail/data";
import { collection, getDocs } from "firebase/firestore";
import NextLink from "next/link";
import "./style.css";
import Item from "antd/es/list/Item";
import CalendarPreview from "./calendarPreview";
function Marquee() {
  const { userInformation, addUser, addMenus, Menus, Dishes, Venues } =
    useStore();
  const [sliderValue, setSliderValue] = useState("");
  const [open, setOpen] = useState({});
  const initialDays: Date[] = [];
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
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleClick = (id) => {
    console.log(id, "asdfasdf");
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  console.log(name, "name", selectedOption);
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
  console.log(days, "setDays");

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
  }, [Venues]);

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
  //  console.log(userData,"userData");

  const getVenueData = (id) => {
    console.log(id, "ssfgsss" )
    const asd = venuesData?.filter((item) => {
      console.log(item, "sadfasssfad");
      return item?.data?.userId === id;
    });
    console.log(asd, "VenuesVenussshges");
    setVenueName(asd);
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
    setSelectedDate(asdf);
    console.log(asdf,"asdfasfadsf")
  };
console.log(userInformation.userId,"asdfasdfasdf")
  console.log(selectedDate, "dayssss");

  const getFromatDates = (arr = []) => {
    const format = arr.map((v, i) => {
      console.log("asdasdas", v);
      return v.toDate();
    });
    return format;
  };

  const handleVenueName = (e) => {
    console.log(selectedDate, "ekeeada", e, name);

    const data = name.filter((item) => {
      return item?.value === e;
    });
    console.log(data, "dsafadsfaf");
    const reserveDate = selectedDate.map((item) => {
      return {
        e,
        dates: {
          Diner: getFromatDates(item.dates[e].Diner),
          Lunch: getFromatDates(item.dates[e].Lunch),
        },
      };
    });
    setBookDates(reserveDate);
    {
      meal == "Diner"
        ? handleCheck(meal, reserveDate[0]?.dates?.Diner)
        : handleCheck(meal, reserveDate[0]?.dates?.Lunch);
    }
  };
 
  useEffect(() => {
    const marqueeVenueName = venueName?.map((item) => ({
      value: item?.data?.venueId,
      label: item?.data?.name,
    }));
    setName(marqueeVenueName);
    console.log(name, "asdfg");
  }, [venueName]);
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container md:mx-auto py-5 mx-5">
          <h1 className="font-vollkorn text-4xl text-gray-600">Hotel</h1>
          <p className="mt-2 text-xs font-roboto">Home / Hotel</p>
        </div>
      </div>

      <div className="md:container mx-auto mt-32 flex flex-col lg:flex-row  ">
        <div className="w-full mx-auto px-3 lg:w-[25%]  ">
          <div>
            <h1 className="font-vollkorn text-xl ">Booking Details</h1>
            <input
              type="text"
              placeholder="Check In  Check Out"
              className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
            />
            <input
              type="text"
              placeholder="Guest 1"
              className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
            />
          </div>
          <div>
            <h1 className="font-vollkorn text-xl my-6">Branch</h1>
            <input
              type="text"
              value={"Faisalabad"}
              className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
            />
          </div>
          <div>
            <h1 className="font-vollkorn text-xl my-6">Price</h1>
            <input
              type="range"
              min="150"
              max="500"
              step="10"
              value={sliderValue}
              onChange={handleSliderChange}
              className="w-full"
            />
            <p>Slider Value: {sliderValue}</p>
          </div>
          <div>
            <h1 className="font-vollkorn text-xl my-7">Included Services</h1>
            <ul className="text-textColor font-semibold font-vollkorn overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200 h-44">
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Towels
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Microwave
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Parking
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Private Balcony
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Air Conditioner
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Widescreen TV
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Coffee Maker
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Hair Dryer
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Breakfast
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Mini Bar
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>WiFi
              </li>
            </ul>
          </div>
          <div>
            <h1 className="ont-vollkorn text-xl my-9">Additional Services</h1>
            <ul>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Excursions
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Airport Pickup
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Massage
              </li>
              <li>
                <input type="checkbox" />
                <span className="checkmark mr-2"></span>Jacuzzi
              </li>
            </ul>
          </div>
        </div>
        <div className="w-full  lg:w-[75%]">
          {userData.map((item) => {
            console.log(item, "asfasdffasfafas");
            
            return (
              <div className="mb-10 mx-5 ">
                <div className="md:container mx-auto flex flex-col md:flex-row border-gray-200 border-[1px] rounded-lg  ">
                  <div className="md:w-[40%] cursor-pointer">
                    <NextLink
                      href={`/pages/marqueedetail?id=${item?.id}`}
                      passHref
                    >
                      <img
                        src={item?.data?.images?.[0]}
                        className="md:rounded-r-none rounded-lg w-72 h-48"
                        alt=""
                      />
                    </NextLink>
                  </div>
                  <div className="pt-6 px-6 md:w-[40%] ">
                    <h1 className="font-vollkorn text-2xl">
                      {item?.data?.name}
                    </h1>

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
                <CalendarPreview
                item={item}
                isLunch={isLunch}
                setIsLunch={setIsLunch}
                setDays={setDays}
                days={days}
                setOpen={setOpen}
                open={open}
                handleVenueName={handleVenueName}
                name={name}
                setName={setName}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Marquee;
