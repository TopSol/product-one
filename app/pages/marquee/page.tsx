// @ts-nocheck
"use client";
import React from "react";
import { useState, useEffect } from "react";
import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Input } from "antd";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { getFormatDates } from "@/app/utils";
import { Checkbox } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import MarqueeDetails from "@/app/component/MarqueeDetails";
import calenderIcon from "../../assets/images/calender.svg";
import PlacesAutocomplete from "react-google-autocomplete";
import Modal from "antd/es/modal/Modal";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import Image from "next/image";
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
  const [checkedServices, setCheckedServices] = useState([]);
  const [coordinates, setCoordinates] = useState({});
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
  console.log(userData, "userData");

  const handleSliderChange = async (event) => {
    const price = Number(event.target.value);
    setSliderValue(price);
    handlePrice(price);
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

  const handleSittingCapacity = (e) => {
    console.log(userData, "userDatauserData3");

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
    if (!arr.length) {
      setShowMessage(false);
      setFilterMarqueeWithPrice(arr);
      setControlPrice(arr);
    } else {
      setShowMessage(true);
      setFilterMarqueeWithPrice(arr);
      setServices(arr);
    }
  };
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
    setCheckedServices(checkedValues);
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
      setFilteredVenuesPrice(arr);
    } else if (!filterMarqueeWithPrice.length) {
      setShowMessage(true);
    } else if (!checkedValues.length) {
      setFilterMarqueeWithPrice(services);
    } else if (!arr.length) {
      setShowMessage(false);
    } else {
      setShowMessage(true);
    }
  };

  const isWithinRange = (coord1, coord2, range) => {
    console.log(coord1, "distancecoord2", coord2, range);

    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
        Math.pow(coord1.lng - coord2.lng, 2)
    );
    console.log(distance, "distance", range);
    return distance <= range;
  };

  useEffect(() => {
    const data = filterMarqueeWithPrice.length
      ? filterMarqueeWithPrice
      : userData;
    const branch = data.filter((item) => {
      console.log(item.data.locations, "datadata");
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
    console.log(branch, "branchbranch");
    if (!branch.length) {
      setShowMessage(false);
    } else {
      setShowMessage(true);
      setFilterMarqueeWithPrice(branch);
    }
  }, [coordinates]);

  const handlePlaceSelect = (place) => {
    if (place.geometry) {
      const userCoordinates = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCoordinates(userCoordinates);
    }
  };
  console.log(
    filterMarqueeWithPrice.length ? filterMarqueeWithPrice : userData,
    "abcdef"
  );

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
                className="py-3 mt-6 border-none bg-bgColor rounded-md px-3 w-full "
                onChange={handleSittingCapacity}
              />
            </div>

            <div>
              <PlacesAutocomplete
                apiKey="AIzaSyBF_ycMAzFjvl1ERxmZUSpqla-RFukZWHw"
                onPlaceSelected={handlePlaceSelect}
                className="border-none bg-bgColor w-[295px] p-3 my-6 rounded-md"
              />
            </div>

            <div>
              <h1 className="font-vollkorn text-xl my-6">Price</h1>
              <Input
                type="range"
                min="0"
                max="200000"
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
              className="flex flex-col"
                options={plainOptions}
                onChange={handleCheckboxChange}
              />
            </div>
          </div>
          <div className="w-full  lg:w-[75%]">
            {true ? (
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
