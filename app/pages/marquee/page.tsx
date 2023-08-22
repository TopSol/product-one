"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { db } from "@/app/firebase";
import "react-day-picker/dist/style.css";
import { message } from "antd";
import { collection, getDocs } from "firebase/firestore";
import "./style.css";
import MarqueeDetails from "@/app/component/MarqueeDetails";
import { Input, Space } from "antd";
const { Search } = Input;
import axios from "axios";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
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
  const [controlPrice, setControlPrice] = useState([]);
  const [bookDate, setBookDate] = useState([]);
  const [range, setRange] = useState<DateRange | undefined>();
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
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
    setFilterMarqueeWithPrice(arr);
    setFilteredVenuesPrice(arr);
  };
  const handleSittingCapacity = (e) => {
    const capacity = Number(e.target.value);
    const filteredVenues = venuesPrice.filter((item) => {
      return capacity > item?.data?.minCapacity;
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
  };

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
  // console.log(bookDate, "bookDatebookDate");
  useEffect(() => {
    const dates = getFormatDates([range]);
    const startDate = new Date(dates[0]?.from);
    const endDate = new Date(dates[0]?.to);
    venuesPrice.map((item1) => {
      // console.log(item1?.data?.venueId, "sdfsdfsdfdsfsdf");
      bookDate.map((item2) => {
        // console.log(item2?.data?.dates, "dfsdfsdfddddsddfsdf");
      });
    });
    // console.log(startDate, "endDate", endDate, "endDate");
  }, [range]);

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
  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://nominatim.openstreetmap.org/search`,
  //       {
  //         params: {
  //           q: searchQuery,
  //           format: "json",
  //         },
  //       }
  //     );

  //     const data = filteredVenuesPrice.length ? filteredVenuesPrice : userData;
  //     console.log(data, "datadata");

  //     data.map((item) =>{
  //       console.log(item.data.locations, "itemitemitem");
  //       if (item.data.locations == coordinates) {
  //         // return
  //         // message.success("Found")
  //       }
  //     })

  //     if (response.data.length > 0) {
  //       const { lat, lng } = response.data[0];
  //       filterMarqueeWithPrice.includes()
  //       setCoordinates({ lat: parseFloat(lat), lng: parseFloat(lng) });
  //       message.success("Found Successfully.");
  //     } else {
  //       setCoordinates({ lat: null, lng: null });
  //       message.warning("Sorry, that address could not be found.");

  //     }
  //   } catch (error) {
  //     console.error("Error fetching coordinates:", error);
  //   }
  // };

  const isWithinRange = (coord1, coord2, range) => {
    const distance = Math.sqrt(
      Math.pow(coord1.lat - coord2.lat, 2) +
        Math.pow(coord1.lng - coord2.lng, 2)
    );
    console.log(distance, "distance", range)
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
        lng: Number(lon)
      };      
      
      const asd = data.filter((item) => {
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
            // alert(1)
            return true
            } else {
              // alert(2)
              return false
            }
          } else {
            // alert(3)
            return false
          }
        
      });
      setFilterMarqueeWithPrice(asd)
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };
console.log("setFilterMarqueeWithPrice", filterMarqueeWithPrice)
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
              <Input
                type="text"
                placeholder="maximum capacity"
                className="py-3 border-r-gray-200 mt-6 border-[1px] outline-none rounded-md px-3 w-full "
                onChange={handleSittingCapacity}
              />
            </div>

            <div>
              <Search
                className="py-3  mt-6  outline-none rounded-md px-3 "
                placeholder="input search text"
                allowClear
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
              />
            </div>
            <div>
              <h1 className="font-vollkorn text-xl my-6">Price</h1>
              <Input
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
            {(filterMarqueeWithPrice.length || sliderValue > 300
              ? filterMarqueeWithPrice
              : userData
            ).map((item, index) => {
              return (
                <MarqueeDetails
                  key={index}
                  item={item}
                  filterMarqueeWithPrice={filterMarqueeWithPrice}
                />
              );
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
