"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { db } from "@/app/firebase";
import "react-day-picker/dist/style.css";
import { useStore } from "../../../store";
import { collection, getDocs } from "firebase/firestore";
import "./style.css";
import MarqueeDetails from "@/app/component/MarqueeDetails";
function Marquee() {
  const { Venues } = useStore();
  const [sliderValue, setSliderValue] = useState("");
  const [userData, setUserData] = useState([]);
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
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
            <ul className="mb-5">
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
          {userData.map((item, index) => {
            return <MarqueeDetails key={index} item={item} />;
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Marquee;
