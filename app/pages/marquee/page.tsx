"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Input, message } from "antd";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { getFormatDates } from "@/app/utils";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import MarqueeDetails from "@/app/component/MarqueeDetails";
import axios from "axios";
import Modal from "antd/es/modal/Modal";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import "react-day-picker/dist/style.css";
import "./style.css";

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
  const [searchQuery, setSearchQuery] = useState("");
  const { Search } = Input;

  useEffect(() => {
    const dates = getFormatDates([range]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
      bookDate.map((item2) => { });
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

  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setSliderValue(price);
    calculatePrice(price);
  };

  const calculatePrice = (value) => {
    const filteredVenues = venuesPrice.filter((item) => {
      return value <= item?.data?.price;
    });
    let arr = [];
    const data = controlPrice.length ? controlPrice : userData;
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
    if (arr.length) {
      setFilterMarqueeWithPrice(arr);
      setFilteredVenuesPrice(arr);
      setServices(arr);
      setShowMessage(true);
    } else {
      setShowMessage(false);
      //  setServices([])
    }
  };

  const handleSittingCapacity = (e) => {
    const capacity = Number(e.target.value);
    const filteredVenues = venuesPrice.filter((item) => {
      return (
        capacity > item?.data?.minCapacity && capacity < item?.data?.maxCapacity
      );
    });

    let arr = [];
    const data = filteredVenuesPrice.length ? filteredVenuesPrice : userData;
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
    setControlPrice(arr);
    setServices(arr);
  }
  let footer = <p>Select Date</p>;

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
    const data = services.length ? services : userData;
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
    } else if (!filterMarqueeWithPrice.length) {
      setShowMessage(true);
    } else if (!checkedValues.length) {
      setFilterMarqueeWithPrice(services);
    } else if (!arr.length) {
      setShowMessage(true);
    } else {
      setShowMessage(true);
    }
  };

  const isWithinRange = (coord1, coord2, range) => {
    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
      Math.pow(coord1.lng - coord2.lng, 2)
    );
    console.log(distance, "distance", range);
    return distance <= range;
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: searchQuery,
            format: "json",
          },
        }
      );
      const { lat, lon } = response.data[0];
      const data = filteredVenuesPrice.length ? filteredVenuesPrice : userData;
      const userCoordinates = {
        lat: Number(lat),
        lng: Number(lon),
      };

      const branch = data.filter((item) => {
        console.log(item.data.locations, "datadata", data);
        if (
          item.data.locations &&
          item.data.locations.lat &&
          item.data.locations.lng
        ) {
          const itemCoordinates = {
            lat: item.data.locations.lat,
            lng: item.data.locations.lng,
          };

          if (isWithinRange(userCoordinates, itemCoordinates, 0.5)) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      });
      setFilterMarqueeWithPrice(branch);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
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
              <Input
                type="text"
                placeholder="maximum capacity"
                className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
                onChange={handleSittingCapacity}
              />
            </div>

            <div>
              <Search
                className="py-3  mt-6  outline-none rounded-md w-72"
                placeholder="input search text"
                size="large"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
              />
            </div>
            <div>
              <h1 className="font-vollkorn text-xl my-6">Price</h1>
              <Input
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

            <div>
              <h1 className="ont-vollkorn text-xl my-9">Additional Services</h1>
              <Checkbox.Group
                options={plainOptions}
                onChange={handleCheckboxChange}
              />
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
                  <p className="text-sm text-textColor">Product not found</p>
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
