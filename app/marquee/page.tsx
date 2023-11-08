"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { Input } from "antd";
import { format, getDate } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { getFormatDates } from "@/app/utils";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import MarqueeDetails from "@/app/_component/MarqueeDetails";
import calenderIcon from "../assets/images/calender.svg";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Modal from "antd/es/modal/Modal";
import Navbar from "@/app/_component/Navbar";
import Footer from "@/app/_component/footer";
import Image from "next/image";
import "react-day-picker/dist/style.css";
import "./style.css";
import { Spin } from "antd";
import {
  collection,
  getDocs,
  query,
  startAfter,
  where,
  limit,
  orderBy,
  endBefore,
  Timestamp,
  limitToLast,
} from "firebase/firestore";
function Marquee() {
  const [sliderValue, setSliderValue] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venuesPrice, setVenuesPrice] = useState([]);
  const [filterMarqueeWithPrice, setFilterMarqueeWithPrice] = useState([]);
  const [bookDate, setBookDate] = useState([]);
  const [services, setServices] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [range, setRange] = useState<DateRange | undefined>();
  const [checkedServices, setCheckedServices] = useState([]);
  const [coordinates, setCoordinates] = useState<any>({});
  const [marqueeDates, setMarqueeDates] = useState<any>({
    from: null,
    to: null,
  });
  const [userData, setUserData] = useState([]);
  const [lastVisible, setLastVisible] = useState();
  const [prevVisible, setPrevVisible] = useState();
  const [showPreviousButton, setShowPreviousButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);
  const [filterData, setFilterData] = useState({
    capacity: "",
    location: "",
    price: "",
    services: [],
  });
  const [handleSpin, setHandleSpin] = useState(true);
  let tempdata;
  let pageSize = 3;
  let q = query(
    collection(db, "users"),
    where("status", "==", "active"),
    orderBy("createdAt"),
    limit(pageSize)
  );
  const getUser = async () => {
    const querySnapshot = await getDocs(q);
    tempdata = [];
    if (querySnapshot.docs[querySnapshot.docs.length - 1]) {
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] as any);
      setPrevVisible(querySnapshot.docs[0] as any);
    }
    querySnapshot.forEach((doc) => {
      tempdata.push({ id: doc.id, data: doc.data() });
    });
    if (tempdata.length == 0) {
      // setShowNextButton(true);
      // setShowPreviousButton(false);
    } else {
      setUserData(tempdata);
      setHandleSpin(false);
      setShowNextButton(false);
      // setShowPreviousButton(true);
    }
  };
  function nextPage(lastVisible) {
    scrollToTop();
    q = query(
      collection(db, "users"),
      where("status", "==", "active"),
      orderBy("createdAt"),
      startAfter(lastVisible),
      limit(pageSize)
    );
    setShowPreviousButton(true);
  }
  function prevPage(firstVisible) {
    scrollToTop();
    q = query(
      collection(db, "users"),
      where("status", "==", "active"),
      orderBy("createdAt"),
      endBefore(firstVisible),
      limitToLast(pageSize)
    );
    // if (userData.length == 0) {
    //   setShowPreviousButton(true);
    //   setShowNextButton(false);
    // }
  }
  const getDate = async () => {
    const venueSnapshot = await getDocs(collection(db, "Venues"));
    const bookDateSnapshot = await getDocs(collection(db, "bookDate"));
    const VenueArr: any[] = [];
    venueSnapshot.forEach((doc) => {
      VenueArr.push({ id: doc.id, data: doc.data() });
    });
    const bookDateArr: any[] = [];
    bookDateSnapshot.forEach((doc) => {
      bookDateArr.push({ id: doc.id, data: doc.data() });
    });
    setVenuesPrice(VenueArr as any);
    setBookDate(bookDateArr as any);
  };
  useEffect(() => {
    getUser();
    getDate();
  }, []);
  useEffect(() => {
    const dates = getFormatDates([marqueeDates]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
      bookDate.map((item2) => {});
    });
  }, [marqueeDates]);

  const handleDateRangeSelect = (newRange) => {
    let dateString1 = newRange;
    let date1 = new Date(dateString1);
    let currentDate = new Date();
    if (currentDate <= date1) {
      if (!marqueeDates.from) {
        setMarqueeDates({ ...marqueeDates, from: newRange });
      } else if (!marqueeDates.to) {
        if (marqueeDates.from > newRange) {
          setMarqueeDates({ from: newRange, to: null });
        } else {
          setMarqueeDates({ ...marqueeDates, to: newRange });
        }
      } else {
        setMarqueeDates({ from: newRange, to: null });
      }
    }
  };

  function filterDataByDates(data, marqueeDates: any = {}) {
    const { from, to } = marqueeDates;
    if (from || to) {
      data = data?.filter((item) => {
        if (!item.data?.dates) return true;
        const eventDates = item.data.dates;

        if (eventDates) {
          const dateArrays: any = Object.values(eventDates);
          const flattenedDates = [].concat(...dateArrays);
          const eventDateObjects = getFormatDates(flattenedDates);
          const fromISOString = from?.toISOString();
          const toISOString = to?.toISOString();
          const dateMatches = eventDateObjects.some(
            (date) =>
              date.toISOString() === fromISOString ||
              date.toISOString() === toISOString
          );
          return !dateMatches;
        } else {
          console.log("item.data.dates is undefined or null");
          return false;
        }
      });
    }
    return data;
  }

  const handleFilterData = async () => {
    let data: any = venuesPrice;
    const minCapacity =
      filterData.capacity !== "" ? Number(filterData.capacity) : 0;
    const maxPrice = filterData.price !== "" ? Number(filterData.price) : 0;
    const requiredServices = filterData.services;
    if (marqueeDates.from || marqueeDates.to) {
      data = filterDataByDates(data, marqueeDates);
      console.log(data, "after");
    }
    if (filterData.capacity != "") {
      data = data.filter((item) => minCapacity >= item?.data?.maxCapacity);
    }
    if (filterData.price != "") {
      data = data.filter((item) => maxPrice <= item?.data?.price);
    }
    if (filterData.services?.length > 0) {
      data = data.filter((item) =>
        requiredServices.every((service) =>
          item?.data?.services?.includes(service)
        )
      );
    }
    let arr: any = [];
    userData.map((item: any) => {
      data.map((item1: any) => {
        if (item.data.userId.includes(item1.data.userId)) {
          if (!arr.includes(item)) {
            arr.push(item);
          }
        }
      });
    });
    const datas = arr.length ? arr : userData;
    const branch = datas.filter((item: any) => {
      if (
        item.data.locations &&
        item.data.locations.lat &&
        item.data.locations.lng
      ) {
        const itemCoordinates = {
          lat: item.data.locations.lat,
          lng: item.data.locations.lng,
        };
        if (isWithinRange(coordinates, itemCoordinates, 1)) {
          console.log("true");
          return true;
        } else {
          console.log("false");

          return false;
        }
      } else {
        return false;
      }
    });
    if (
      filterData.capacity ||
      filterData.price ||
      filterData.services.length ||
      (marqueeDates.from && marqueeDates.to)
    ) {
      if (arr.length) {
        setFilterMarqueeWithPrice(arr);
        setShowMessage(true);
      } else {
        setShowMessage(false);
        setFilterMarqueeWithPrice([]);
      }
    } else {
      setFilterMarqueeWithPrice([]);
      // marquee(venuesPrice, userData);
    }
    if (branch.length) {
      setShowMessage(true);
      setFilterMarqueeWithPrice(branch);
    } else if (!branch.length && coordinates.lat && coordinates.lng) {
      setShowMessage(false);
    }
  };
  const handleSittingCapacity = (e) => {
    const capacity = Number(e.target.value);
    setFilterData({ ...filterData, capacity: capacity } as any);
  };

  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setFilterData({ ...filterData, price: price } as any);
  };

  let footer = <p className="text-textColor font-poppins ">Select Date</p>;
  if (marqueeDates?.from) {
    if (!marqueeDates.to) {
      footer = <p>{format(marqueeDates.from, "PPP")}</p>;
    } else if (marqueeDates.to) {
      footer = (
        <p>
          {format(marqueeDates.from, "PPP")}–{format(marqueeDates.to, "PPP")}
        </p>
      );
    }
  }
  const plainOptions = ["Heating", "Cooling", "MusicSystem"];
  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setFilterData({ ...filterData, services: checkedValues } as any);
  };
  const isWithinRange = (coord1, coord2, range) => {
    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
        Math.pow(coord1.lng - coord2.lng, 2)
    );
    console.log(distance, "distance");

    return distance <= range;
  };
  const handleSelect = async (value) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          value.label
        )}&format=json`
      );
      const data = await response.json();
      if (data.length > 0) {
        const coors = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setFilterData({ ...filterData, location: coors } as any);
        setCoordinates(coors);
      } else {
        throw new Error("Place not found");
      }
    } catch (error) {
      console.error("Error retrieving place details:", error);
    }
  };
  const clearFilter = () => {
    setShowMessage(true);
    setFilterData({
      capacity: "",
      location: "",
      price: "",
      services: [],
    });
    setCoordinates({});
    setMarqueeDates({ from: null, to: null });
    setFilterMarqueeWithPrice([]);
    // marquee(venuesPrice, userData);
  };
  const scrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-bgColor mt-24 font-poppins text-textColor">
          <div className="md:container md:mx-auto py-5 mx-5">
            <h1 className="font-poppins text-4xl text-gray-600">Marquee</h1>
            <p className="mt-2 text-xs font-roboto">Home / Marquee</p>
          </div>
        </div>
        <div className="md:container mx-auto mt-20 flex flex-col lg:flex-row  lg:space-x-5 font-poppins">
          <div className="w-full mx-auto px-3 lg:w-[25%]  border lg:h-3/4  rounded-[10px]">
            <div>
              <h1 className="font-poppins text-xl my-5 flex justify-center mx-auto font-semibold text-textColor">
                Booking Details
              </h1>
              <div 
               onClick={() => setIsModalOpen((pre) => !pre)}
              className="flex items-center bg-bgColor rounded-md cursor-pointer">
                <div className="text-xs flex flex-col w-[100%]  flex-end border-none py-4 pl-2 justify-between ">
                  {footer}
                </div>
                <div className="bg-bgColor  rounded-tr-lg rounded-br-lg ">
                  <Image
                   
                    src={calenderIcon}
                    width={55}
                    height={55}
                    alt="Image"
                  />
                </div>
              </div>
              <Input
                type="text"
                placeholder="Maximum capacity"
                value={filterData?.capacity}
                className="py-3 mt-6 border-none bg-bgColor rounded-md px-3 w-full "
                onChange={handleSittingCapacity}
              />
            </div>

            <div className="border-none bg-bgColor w-full p-3 my-6 rounded-md">
              <GooglePlacesAutocomplete
                apiKey="AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4"
                // className="border-none bg-bgColor w-[295px] p-3 my-6 rounded-md"
                selectProps={{
                  onChange: handleSelect,
                }}
              />
            </div>
            <div>
              <h1 className="font-poppins text-xl text-textColor font-semibold  my-3">
                Price
              </h1>
              <Input
                type="range"
                min="0"
                max="60000"
                step="10"
                value={filterData?.price}
                onChange={handleSliderChange}
                className="w-full"
              />
              <p className=" text-textColor font-semibold">
                Slider Value: {filterData?.price}
              </p>
            </div>
            <div>
              <h1 className="font-poppins font-semibold text-xl mt-6 mb-2 text-textColor">
                Additional Services
              </h1>
              <Checkbox.Group
                className="flex flex-col text-textColor"
                options={plainOptions}
                onChange={handleCheckboxChange}
                value={filterData?.services}
              />
            </div>
            <div className=" mx-auto w-full flex space-x-3 justify-around items-center mb-5">
              <button
                className="bg-primaryColor hover:bg-hoverPrimary  text-white w-1/2  py-3 rounded-lg mt-6 font-semibold "
                onClick={() => handleFilterData()}
              >
                Filter
              </button>
              <button
                className="bg-primaryColor hover:bg-hoverPrimary border w-1/2 py-3 text-white rounded-lg mt-6  font-semibold"
                onClick={() => clearFilter()}
              >
                Clear Filter
              </button>
            </div>
          </div>
          
          <div className="w-full  lg:w-[75%] ">
            {handleSpin && (
              <div className="flex justify-center items-center h-[100vh] spinner">
                <Spin />
              </div>
            )}
            <div className="">
              {showMessage ? (
                (filterMarqueeWithPrice.length
                  ? filterMarqueeWithPrice
                  : userData
                ).map((item, index) => (
                  <MarqueeDetails
                    key={index}
                    item={item}
                    showMessage={showMessage}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center">
                  <div className="bg-[#f5f5f5] w-[90%] h-[50px] flex items-center justify-center rounded-md">
                    <p className="text-sm text-textColor">Marquee not found</p>
                  </div>
                </div>
              )}
            </div>
            {filterMarqueeWithPrice.length > 0 ||
              (userData.length > 0 && (
                <div className="flex  my-3 justify-between">
                  {showPreviousButton ? (
                    <button
                      className="shadow-none bg-primary py-2 px-6 rounded-md font-semibold text-white hover:bg-hoverPrimary"
                      // size="lg"
                      onClick={() => {
                        prevPage(prevVisible);
                        getUser();
                      }}
                    >
                      Previous
                    </button>
                  ) : (
                    <div></div>
                  )}
                  {!showNextButton ? (
                    <button
                      className="shadow-none hover:bg-hoverPrimary font-semibold bg-primary py-2 px-9 rounded-md text-white "
                      // size="lg"
                      onClick={() => {
                        nextPage(lastVisible);
                        getUser();
                      }}
                    >
                      Next
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              ))}
          </div>
        </div>
        <div></div>
        <Footer />
      </div>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen((pre) => !pre)}
        footer={null}
      >
        <DayPicker
          className={`w-[100%] customClasses2 customClasses3`}
          selected={marqueeDates}
          footer={footer}
          onDayClick={handleDateRangeSelect}
        />
      </Modal>
    </>
  );
}

export default Marquee;
