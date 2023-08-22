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
import { Input, Result } from "antd";

import { format, set } from 'date-fns';
import { DateRange, DayPicker } from 'react-day-picker';
import Modal from "antd/es/modal/Modal";
import { getFormatDates } from "@/app/utils";
import { Checkbox } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
const pastMonth = new Date();
function Marquee() {
  const [sliderValue, setSliderValue] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venuesPrice, setVenuesPrice] = useState([]);
  const [filterMarqueeWithPrice, setFilterMarqueeWithPrice] = useState([]); // [
  const [filteredVenuesPrice, setFilteredVenuesPrice] = useState([]);
  const [controlPrice,setControlPrice]=useState([])
  const [bookDate,setBookDate]=useState([])
  const [services, setServices] = useState([]); 
  const [showMessage,setShowMessage]=useState(true)
  const [range, setRange] = useState<DateRange | undefined>();
  useEffect(() => {
    const dates = getFormatDates([range]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
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
  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setSliderValue(price);
    calculatePrice(price);
  };
  const calculatePrice = (value) => {
    const filteredVenues = venuesPrice.filter((item) => {
      return value <= item?.data?.price ;
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
    if(arr.length){
      setFilterMarqueeWithPrice(arr);
    setFilteredVenuesPrice(arr);
    setServices(arr)
    setShowMessage(true)
    }else{
     setShowMessage(false)
    //  setServices([])
    }

  
  };
  const handleSittingCapacity =(e)=>{
  const capacity=Number(e.target.value)
  const filteredVenues = venuesPrice.filter((item) => {
    // return capacity > item?.data?.minCapacity ;
    return capacity > item?.data?.minCapacity && capacity < item?.data?.maxCapacity;

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
  setServices(arr)

  }
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
  const plainOptions = ['Heating', 'Cooling', 'MusicSystem'];
  // const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {

  //   // const result = checkedValues.every((val) => item?.data?.services?.includes(val));
  //   // if(result){
  //   //   return item
  //   // }

  //   const filteredVenues = venuesPrice.filter((item) => {
  //   //  const  result  = []
  //   //    item?.data?.services?.forEach(item1=>{ 
  //   //       console.log(item1,"item1")
  //   //       if(checkedValues.includes(item1) && item?.data?.services?.length == checkedValues.length ){
  //   //         result.push(item1)
  //   //       }
  //   //     })
  //   //     if (result?.length == checkedValues.length) {
  //   //       return item
  //   //     }
             
         
  //     //        if(checkedValues.length == item?.data?.services?.length){
  //     //         let data= item?.data?.services?.includes(checkedValues[0]) && item?.data?.services?.includes(checkedValues[1]) && item?.data?.services?.includes(checkedValues[2])
  //     //           // return item?.data?.services?.includes(checkedValues[0]) && item?.data?.services?.includes(checkedValues[1]) && item?.data?.services?.includes(checkedValues[2]) ; 
  //     //           return item?.data?.services?.includes(checkedValues[0]) && item?.data?.services?.includes(checkedValues[1]) && item?.data?.services?.includes(checkedValues[2]) ; 
  //     //        }
  //     // return  item?.data?.services?.includes(checkedValues[0]) || item?.data?.services?.includes(checkedValues[1]) || item?.data?.services?.includes(checkedValues[2]) ; 
  
  //   });
  //   console.log(filteredVenues,"filteredsrrsssVenues")
  //   // let arr = [];
  //   // const data=filteredVenuesPrice.length ? filteredVenuesPrice : userData
  //   // data.map((item) => {
  //   //   filteredVenues.map((item1) => {
  //   //     if (item.data.userId.includes(item1.data.userId)) {
  //   //       if (!arr.includes(item)) {
  //   //         arr.push(item);
  //   //       }
  //   //     }
  //   //   });
  //   // });
  //   // setFilterMarqueeWithPrice(arr);
  //   // setControlPrice(arr)
  




  //   // console.log('checked= ', checkedValues);
  //   // filterMarqueeWithPrice.map((item)=>{
  //   //   checkedValues.map((item1)=>{  
  //   //     console.log(item1,"sfsdfsdfdsfdsf",item?.data)
  //   //     // if(item?.data?.services?.includes(item1)){
  //   //     //   console.log(item,"itemSSSSS")
  //   //     // }
  //   //   })
  //   // })
  //   // setUser({ ...user, services: checkedValues });
  // }
  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    const filteredVenues = venuesPrice.filter((item) => {
      const result = [];
      checkedValues.forEach((value) => {
        if (item?.data?.services?.includes(value)) {
          result.push(true);
        }
      });
     return result.length;
    });
    let arr = [];
    const data=services.length ? services : userData
    data.map((item) => {
      filteredVenues.map((item1) => {
        if (item.data.userId.includes(item1.data.userId)) {
          if (!arr.includes(item)) {
            arr.push(item);
          }
        }
      });
    });
    if(arr.length){
     setFilterMarqueeWithPrice(arr);
    //  setShowMessage(false)
    }
    else if(!filterMarqueeWithPrice.length){
      // setFilterMarqueeWithPrice(services);
      setShowMessage(true)
    }
    else if(!checkedValues.length){
      setFilterMarqueeWithPrice(services);
      // setShowMessage(false)
    }
    else if(!arr.length){;
      setShowMessage(true) 
    }
    else{
      setShowMessage(true)
    }
  };
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
              <h1 className="font-vollkorn text-xl mb-6">Booking Details</h1>
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
              <h1 className="font-vollkorn text-xl mt-6">Branch</h1>
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
                min="0"
                max="100000"
                step="10"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full"
              />
              <p className="mt-4">Slider Value: {sliderValue}</p>
            </div>
            {/* <div>
              <h1 className="font-vollkorn text-xl my-7">Included Services</h1>
              <ul className="text-textColor font-semibold font-vollkorn overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200 h-44">
                <li>
                  <input type="checkbox" />
                  <span className="checkmark mr-2"></span>Heating
                </li>
                <li>
                  <input type="checkbox" />
                  <span className="checkmark mr-2"></span>Cooling
                </li>
                <li>
                  <input type="checkbox" />
                  <span className="checkmark mr-2"></span>Music System
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
            </div> */}
            <div>
              <h1 className="ont-vollkorn text-xl my-9">Additional Services</h1>
              <Checkbox.Group
                options={plainOptions}
               onChange={handleCheckboxChange}
               />
            </div>
          </div>
          <div className="w-full  lg:w-[75%]">
          {
  showMessage ? (
    (filterMarqueeWithPrice.length ? filterMarqueeWithPrice : userData).map((item, index) => (
      <MarqueeDetails key={index} item={item} showMessage={showMessage} />
    ))
  ) : (
    <div className="flex items-center justify-center">
      <div className="bg-[#f5f5f5] w-[90%] h-[50px] flex items-center justify-center rounded-md">
        <p className="text-sm text-textColor">Product not found</p>
      </div>
    </div>
  )
}
            {/* {(filterMarqueeWithPrice.length  ? filterMarqueeWithPrice : userData).map((item, index) => {
              return   showMessage ?  <MarqueeDetails key={index} item={item} showMessage ={showMessage}/>:  <div className="flex items-center justify-center">
          <div className="bg-[#f5f5f5] w-[90%] h-[50px] flex items-center justify-center rounded-md">
            <p className="text-sm text-textColor">
            product not found
            </p>
          </div>
        </div>
            })} */}
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
