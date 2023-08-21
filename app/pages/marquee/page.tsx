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
import { Input } from "antd";

import { format } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import Modal from "antd/es/modal/Modal";
import { getFormatDates } from "@/app/utils";
const pastMonth = new Date();
function Marquee() {
  const [sliderValue, setSliderValue] = useState(300);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venuesPrice, setVenuesPrice] = useState([]);
  const [filterMarqueeWithPrice, setFilterMarqueeWithPrice] = useState([]); // [
  const [filteredVenuesPrice, setFilteredVenuesPrice] = useState([]);
  const [controlPrice,setControlPrice]=useState([])
  const [bookDate,setBookDate]=useState([])
  const [range, setRange] = useState<DateRange | undefined>();
  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setSliderValue(price);
    calculatePrice(price);
  };
  const calculatePrice = (value) => {
    const filteredVenues = venuesPrice.filter((item) => {
      return item?.data?.price < value;
    });
    let arr = [];
    const data=controlPrice.length?controlPrice:userData
    data.map((item) => {
      filteredVenues.map((item1) => {
        if (item.data.userId.includes(item1.data.userId)) {
          console.log(item, "itemi");
          if (!arr.includes(item)) {
            arr.push(item);
          }
        }
      });
    });
    setFilterMarqueeWithPrice(arr);
    setFilteredVenuesPrice(arr);
  };
  const handleSittingCapacity =(e)=>{
  const capacity=Number(e.target.value)
  const filteredVenues = venuesPrice.filter((item) => {
    return capacity > item?.data?.minCapacity ;
  });
  let arr = [];
  const data=filteredVenuesPrice.length ? filteredVenuesPrice : userData
  data.map((item) => {
    filteredVenues.map((item1) => {
      if (item.data.userId.includes(item1.data.userId)) {
        if (!arr.includes(item)) {
          arr.push(item);
        }
      }
    });
  });
  setFilterMarqueeWithPrice(arr);
  setControlPrice(arr)

  }
  console.log(userData, "userDatauserData");
  useEffect(() => {
    const getUser = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const venueSnapshot = await getDocs(collection(db, "Venues"));
      const bookDateSnapshot = await getDocs(collection(db, "bookDate"));
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, data: doc.data() });
      });
      const VenueArr = [];
      venueSnapshot.forEach((doc) => {
        VenueArr.push({ id: doc.id, data: doc.data() });
      });
      const bookDateArr = [];
      bookDateSnapshot.forEach((doc) => {
        bookDateArr.push({ id: doc.id, data: doc.data() });
      });
      setVenuesPrice(VenueArr);
      setUserData(dataArr);
      setBookDate(bookDateArr)
    };
    getUser();
  }, []);
  console.log(bookDate,"bookDatebookDate")
  useEffect(() => {
    const dates = getFormatDates([range]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
      console.log( item1?.data?.venueId,"sdfsdfsdfdsfsdf")
      bookDate.map((item2)=>{
        // item2?.data?.dates?.map((item3)=>{
        //   const date=new Date(item3)
        //   if(item1?.data?.venueId===item2?.data?.venueId){
        //     if(date>=startDate && date<=endDate){
        //       console.log(item1?.data?.venueId,"item1?.data?.venueId")
        //     }
        //   }
        // })
        console.log(item2?.data?.dates,"dfsdfsdfddddsddfsdf")
      })
      // console.log(item?.data?.venueId, "itemdatauserId");
    });
    console.log(startDate,"endDate", endDate,"endDate");
  }, [range]);

  let footer = <p>Select Date</p>;
  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, 'PPP')}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, 'PPP')}–{format(range.to, 'PPP')}
        </p>
      );
    }
  }
  return (
    <>
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
              <div
                className="flex flex-col w-[100%] rounded-md flex-end border py-3 pl-2 justify-between"
                onClick={() => setIsModalOpen((pre) => !pre)}
              >
                {footer}
              </div>
              <input
                type="text"
                placeholder="maximum capacity"
                className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
                onChange={handleSittingCapacity}
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
                max="100000"
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
            {(filterMarqueeWithPrice.length || sliderValue > 300 ? filterMarqueeWithPrice : userData).map((item, index) => {
              return <MarqueeDetails key={index} item={item} filterMarqueeWithPrice={filterMarqueeWithPrice} />;
            })}
          </div>
        </div>
        <Footer />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen((pre) => !pre)}
        footer={null}
      >
      <DayPicker
      id="test"
      mode="range"
      defaultMonth={pastMonth}
      selected={range}
      footer={footer}
      onSelect={setRange}
    />
      </Modal>
    </>
  );
}

export default Marquee;
