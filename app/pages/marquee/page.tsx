"use client";
import React, { useState } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Data } from "./data";
import { useRouter } from "next/navigation";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { BookedDinner,BookedLunch } from "../marqueedetail/data";
import "./style.css";
function Marquee() {
  const [sliderValue, setSliderValue] = useState("");
  const [open, setOpen] = useState({});
  const initialDays: Date[] = [];
  const [days, setDays] = useState<any>([]);
  const [isLunch, setIsLunch] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("");
  const router = useRouter();
  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };
  const handleClick = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleCheck = (event)=>{
    console.log(event, "event");
    
    const selectedValue = event?.target?.value || event
    setSelectedOption(selectedValue);
    if (selectedValue == "Lunch") {
      setDays(BookedLunch);
      setIsLunch('Lunch')
    } else if (selectedValue == "Dinner") {
      setDays(BookedDinner);
      setIsLunch('Dinner')
    }
  }
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5">
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
          {Data.map((item) => (
            <div
              key={item.id}
              className="mb-10 mx-5 "
              // onClick={() => router.push("/pages/marqueedetail")}
            >
              <div className="md:container mx-auto flex flex-col md:flex-row border-gray-200 border-[1px] rounded-lg  ">
                <div className="md:w-[40%]  ">
                  <img
                    src={item.src}
                    className="md:rounded-r-none rounded-lg "
                    alt=""
                  />
                </div>
                <div className="pt-6 px-6 md:w-[40%] ">
                  <h1 className="font-vollkorn text-2xl">{item.name}</h1>

                  <p className="font-roboto text-textColor mt-4">{item.desc}</p>
                  <p className="font-roboto text-textColor mt-6">Jaranwala</p>
                </div>
                <div className="md:w-[20%] border-l-[1px] flex flex-col justify-center mt-5 md:mt-0 ">
                  <p className="text-center text-2xl font-roboto font-bold  text-textColor">
                    {item.price}
                  </p>
                  <p className="text-center mt-3 mb-6 font-vollkorn text-textColor">
                    PER NIGHT
                  </p>
                  <div className="flex items-center justify-center font-roboto font-semibold mb-14">
                    <p className="text-[11px] text-textColor bg-[#f5f5f5] px-3 py-1 rounded ">
                      Select Booking Detials
                    </p>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => handleClick(item.id)}
                  >
                    <p className=" text-sm  text-textColor  flex justify-center items-center pt-3  font-roboto border-t-[1px]">
                      Avalibility & Details
                      <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[100%] rounded-md mt-3  flex bg-[#f5f5f5]">
                {open[item.id] && (
                  <DayPicker
                    className={`${isLunch == `Lunch` ?`customClasses` :`customClasses2`}`}
                    style={{ width: "100%" }}
                    mode="multiple"
                    min={1}
                    selected={days}
                    onSelect={setDays}
                  />
                )}

                { open[item.id] &&(
                <div className="pr-10 pt-8">
                  
              
                  <div className="flex items-center">
                    <input onClick={()=>handleCheck('Lunch')}
                      checked
                      id="default-radio-2"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label  
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Lunch
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input onClick={()=>handleCheck('Dinner')}
                      id="default-radio-3"
                      type="radio"
                      value=""
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label  
                      htmlFor="default-radio-3"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Dinner
                    </label>
                  </div>
                </div>
              //   <select onClick={handleCheck}>
              //   <option >Choose Here</option>
              //   <option >Lunch</option>
              //   <option >Dinner</option>
              // </select>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Marquee;
