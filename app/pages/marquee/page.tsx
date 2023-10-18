// @ts-nocheck
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
// import { collection, getDocs } from "firebase/firestore";
import { Input } from "antd";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { getFormatDates } from "@/app/utils";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import MarqueeDetails from "@/app/component/MarqueeDetails";
import calenderIcon from "../../assets/images/calender.svg";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import Modal from "antd/es/modal/Modal";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import Image from "next/image";
import "react-day-picker/dist/style.css";
import "./style.css";
import { collection, query, where, getDocs, or, and } from "firebase/firestore";
import { Filter } from "firebase";

import setSeconds from "date-fns/esm/setSeconds";
const pastMonth = new Date();

function Marquee() {
  const [sliderValue, setSliderValue] = useState(0);
  const [userData, setUserData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [venuesPrice, setVenuesPrice] = useState([]);
  const [filterMarqueeWithPrice, setFilterMarqueeWithPrice] = useState([]);
  const [filteredVenuesPrice, setFilteredVenuesPrice] = useState([]);
  const [controlPrice, setControlPrice] = useState([]);
  const [bookDate, setBookDate] = useState([]);
  const [services, setServices] = useState([]);
  const [showMessage, setShowMessage] = useState(true);
  const [range, setRange] = useState<DateRange | undefined>();
  const [checkedServices, setCheckedServices] = useState([]);
  const [coordinates, setCoordinates] = useState({});

  const [filterData, setFilterData] = useState({
    capacity: "",
    location: "",
    price: "",
    services: [],
  });

  useEffect(() => {
    const dates = getFormatDates([range]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
      bookDate.map((item2) => {});
    });
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
      setBookDate(bookDateArr);
    };
    getUser();
  }, []);

  const handleFilterData = async () => {
    let data = venuesPrice;
    const minCapacity =
      filterData.capacity !== "" ? Number(filterData.capacity) : 0;
    const maxPrice = filterData.price !== "" ? Number(filterData.price) : 0;
    const requiredServices = filterData.services;
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
    let arr = [];
    userData.map((item) => {
      console.log(item, "pppp", data);
      data.map((item1) => {
        if (item.data.userId.includes(item1.data.userId)) {
          if (!arr.includes(item)) {
            arr.push(item);
          }
        }
      });
    });

    const datas = arr.length ? arr : userData;
    const branch = datas.filter((item) => {
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
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
    if (filterData.capacity || filterData.price || filterData.services.length) {
      if (arr.length) {
        setFilterMarqueeWithPrice(arr);
        setShowMessage(true);
      } else {
        setShowMessage(false);
        setFilterMarqueeWithPrice([]);
      }
    } else {
      console.log("bbb");
      setFilterMarqueeWithPrice([]);
    }
    if (branch.length) {
      setShowMessage(true);
      setFilterMarqueeWithPrice(branch);
    }
  };
  console.log(filterMarqueeWithPrice, "filterMarqueeWithPrice");
  const handleSittingCapacity = (e) => {
    const capacity = Number(e.target.value);
    setFilterData({ ...filterData, capacity: capacity });
  };
  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setFilterData({ ...filterData, price: price });
  };
  const handlePrice = (value) => {
    const filteredVenues = venuesPrice.filter((item) => {
      if (checkedServices.length) {
        const result = [];
        checkedServices.forEach((value) => {
          if (item?.data?.services?.includes(value)) {
            result.push(value);
          }
        });
        return result.length && value <= item?.data?.price;
      } else {
        return value <= item?.data?.price;
      }
    });
    let arr = [];
    const data = controlPrice.length ? controlPrice : userData;
    data.map((item) => {
      filteredVenues.map((item1) => {
        if (item.data.userId.includes(item1.data.userId)) {
          if (!arr.includes(item)) {
            arr.push(item);
          }
        }
      });
    });

    if (arr.length) {
      setFilterMarqueeWithPrice(arr);
      setFilteredVenuesPrice(arr);
      setServices(arr);
      setShowMessage(true);
    } else {
      setShowMessage(false);
      setFilterMarqueeWithPrice(arr);
      setFilteredVenuesPrice(arr);
    }
  };

  let footer = <p className="text-textColor font-poppins ">Select Date</p>;

  if (range?.from) {
    if (!range.to) {
      footer = <p>{format(range.from, "PPP")}</p>;
    } else if (range.to) {
      footer = (
        <p>
          {format(range.from, "PPP")}–{format(range.to, "PPP")}
        </p>
      );
    }
  }
  const plainOptions = ["Heating", "Cooling", "MusicSystem"];
  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setFilterData({ ...filterData, services: checkedValues });
  };

  const isWithinRange = (coord1, coord2, range) => {
    console.log(coord1, "distancecoord2", coord2, range);

    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
        Math.pow(coord1.lng - coord2.lng, 2)
    );
    return distance <= range;
  };

  const handleSelect = async (value) => {
    console.log(value, "asdasdasdas");
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
        setFilterData({ ...filterData, location: coors });
        setCoordinates(coors);
      } else {
        throw new Error("Place not found");
      }
    } catch (error) {
      console.error("Error retrieving place details:", error);
    }
  }; 
  const clearFilter = () => {
    setFilterData({
      capacity: "",
      location: "",
      price: "",
      services: [],
    });
    setFilterMarqueeWithPrice([]);
  };
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-bgColor mt-24 font-poppins text-textColor">
          <div className="md:container md:mx-auto py-5 mx-5">
            <h1 className="font-poppins text-4xl text-gray-600">Hotel</h1>
            <p className="mt-2 text-xs font-roboto">Home / Hotel</p>
          </div>
        </div>
        <div className="md:container mx-auto mt-20 flex flex-col lg:flex-row  lg:space-x-5 font-poppins">
          <div className="w-full mx-auto px-3 lg:w-[25%]  border lg:h-3/4 pb-5 rounded-[10px]">
            <div>
              <h1 className="font-poppins text-xl my-5 flex justify-center mx-auto font-semibold text-textColor">
                Booking Details
              </h1>
              <div className="flex items-center ">
                <div className="text-xs flex flex-col w-[100%] rounded-tl-lg rounded-bl-lg flex-end border-none bg-bgColor py-4 pl-2 justify-between ">
                  {footer}
                </div>
                <div className="bg-bgColor p-4 rounded-tr-lg rounded-br-lg cursor-pointer">
                  <Image
                    onClick={() => setIsModalOpen((pre) => !pre)}
                    src={calenderIcon}
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

            <div className="my-6 bg-bgColor">
              <GooglePlacesAutocomplete
                apiKey="AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4"
                className="border-none bg-bgColor w-[295px] p-3 my-6 rounded-md"
                selectProps={{
                  onChange: handleSelect,
                }}
              />
            </div>

            <div>
              <h1 className="font-poppins text-xl text-textColor font-semibold  my-6">
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
              <p className="mt-4 text-textColor font-semibold">
                Slider Value: {filterData?.price}
              </p>
            </div>

            <div>
              <h1 className="font-poppins font-semibold text-xl my-9 text-textColor">
                Additional Services
              </h1>
              <Checkbox.Group
                className="flex flex-col text-textColor"
                options={plainOptions}
                onChange={handleCheckboxChange}
                value={filterData?.services}
              />
            </div>
            <div className=" mx-auto w-full flex  justify-around items-center">
              <button
                className="bg-bgColor hover:bg-hoverBgColor  px-10 py-2 rounded-lg mt-6 font-semibold "
                onClick={() => handleFilterData()}
              >
                Filter
              </button>
              <button
                className="border-hoverBgColor hover:border-bgColor hover:bg-bgColor border px-5 py-2 rounded-lg mt-6  font-semibold"
                onClick={() => clearFilter()}
              >
                Clear Filter
              </button>
            </div>
          </div>

          <div className="w-full  lg:w-[75%]">
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
