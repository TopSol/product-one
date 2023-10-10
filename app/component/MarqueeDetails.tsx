"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { db } from "@/app/firebase";
import { Radio, Select, Space } from "antd";
import { faAngleDown,faLocationDot,faStar,} from "@fortawesome/free-solid-svg-icons";
import { DateBefore, DayPicker } from "react-day-picker";
import { getFormatDates } from "@/app/utils";
import { collection, getDocs } from "firebase/firestore";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import "react-day-picker/dist/style.css";
function MarqueeDetails({ item, showMessage }) {
  const {
    addMarqueeVenueNames,
    addMarqueeVenueDates,
    addMarqueeData,
    addBookedDates,
  } = useStore();
  const [open, setOpen] = useState({});
  const [days, setDays] = useState<any>([]);
  const [isLunch, setIsLunch] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("Lunch");
  const [venuesData, setVenuesData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [name, setName] = useState([]);
  const [selectedDate, setSelectedDate] = useState([]);
  const [bookDates, setBookDates] = useState([]);
  const [meal, setMeal] = useState("Lunch");
  const [value, setValue] = useState("1");
  const [venueId, setVenueId] = useState();
  const [marqueeDates, setMarqueeDates] = useState({ from: null, to: null });
  const router = useRouter();
  useEffect(() => {
    const getdata = async () => {
      const querySnapshot = await getDocs(collection(db, "Venues"));
      const dataArr = [];
      querySnapshot.forEach((doc) => {
        dataArr.push({ id: doc.id, data: doc.data() });
      });
      setVenuesData(dataArr);
      getVenueData(item.id, dataArr);
    };
    getdata();
    getDates(item.id);
  }, [item]);
  const venuesName = (id) => {
    const asd = venuesData?.filter((item) => {
      return item?.data?.userId === id;
    });
    const marqueeVenueName = asd?.map((item) => ({
      value: item?.data?.venueId,
      label: item?.data?.name,
      minCapacity: item?.data?.minCapacity,
      maxCapacity: item?.data?.maxCapacity,
      disabled: false,
    }));
    addMarqueeVenueNames(marqueeVenueName);
  };

  const getVenueData = (id, arr) => {
    const asd = arr?.filter((item) => {
      return item?.data?.userId === id;
    });
    const marqueeVenueName = asd?.map((item) => ({
      value: item?.data?.venueId,
      label: item?.data?.name,
      disabled: false,
      minCapacity: item?.data?.minCapacity,
      maxCapacity: item?.data?.maxCapacity,
    }));
    addMarqueeVenueNames(marqueeVenueName);
    setName(marqueeVenueName);
    addMarqueeVenueNames(marqueeVenueName);
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
  }, [item]);

  const getDates = async (id) => {
    const querySnapshot = await getDocs(collection(db, "bookDate"));
    const datesArr = [];
    querySnapshot.forEach((doc) => {
      datesArr.push(doc.data());
    });
    const asdf = datesArr?.filter((item) => {
      return item?.id === id;
    });

    setSelectedDate(asdf);
    addMarqueeVenueDates(asdf);
  };
  const handleClick = (id) => {
    setOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCheck = (event, item) => {
    const selectedValue = event?.target?.value || event;
    setSelectedOption(selectedValue);
    if (selectedValue == "Lunch") {
      setDays(item);
      setIsLunch("Lunch");
    } else if (selectedValue == "Diner") {
      setDays(item);
      setIsLunch("Diner");
    }
  };
  const handleVenueName = (id, propMeal = "Lunch") => {
    setVenueId(id);
    const data = name.filter((item) => {
      return item?.value == id;
    });
    const reserveDate = selectedDate.map((item) => {
      return {
        id,
        dates: {
          Diner: getFormatDates(item?.dates[id]?.Diner),
          Lunch: getFormatDates(item?.dates[id]?.Lunch),
        },
      };
    });
    setBookDates(reserveDate);

    propMeal == "Diner"
      ? handleCheck(propMeal, reserveDate[0]?.dates?.Diner)
      : handleCheck(propMeal, reserveDate[0]?.dates?.Lunch);
  };
  const handleDateRangeSelect = (newRange) => {
    let dateString1 = newRange;
    let date1 = new Date(dateString1);
    let currentDate = new Date();
    if (currentDate <= date1) {
      if (marqueeDates.from > newRange) {
        return setMarqueeDates({ from: newRange, to: null });
      }
      if (!marqueeDates.from) {
        setMarqueeDates({ ...marqueeDates, from: newRange });
      } else if (marqueeDates.from !== null && !marqueeDates.to) {
        const date = days?.filter((element) => {
          // Ensure marqueeDates.from is not null before using it
          if (marqueeDates.from !== null) {
            return element >= marqueeDates.from && element <= newRange;
          }
          return false; // Handle the case when marqueeDates.from is null
        });
        if (date?.length > 0) {
          // message.error("you can not select this date");
          setMarqueeDates({ from: newRange, to: null });
        } else {
          setMarqueeDates({ ...marqueeDates, to: newRange });
        }
      } else if (marqueeDates.from && marqueeDates.to) {
        setMarqueeDates({ from: newRange, to: null });
      }
    }
    // let dateString1 = newRange;
    // let date1 = new Date(dateString1);
    // let currentDate = new Date();
    // if (currentDate <= date1) {
    //   if (marqueeDates.from > newRange) {
    //     return setMarqueeDates({ from: newRange, to: null });
    //   }
    //   if (!marqueeDates.from) {
    //     setMarqueeDates({ ...marqueeDates, from: newRange });
    //   } else if (marqueeDates.from && !marqueeDates.to) {
    //     const date = days?.filter(
    //       (element) => element >= marqueeDates?.from && element <= newRange
    //     );
    //     if (date.length > 0) {
    //       alert("you can not selet this date");
    //       setMarqueeDates([]);
    //     } else {
    //       setMarqueeDates({ ...marqueeDates, to: newRange });
    //     }
    //   } else if (marqueeDates.from && marqueeDates.to) {
    //     setMarqueeDates({ from: newRange, to: null });
    //   }
    // }
  };
  const bookedStyle = { border: "2px solid currentColor" };
  const handleMarqueeDetails = (id) => {
    router.push(`/pages/marqueedetail?id=${id}`);
  };


  const currentDate = new Date(); // Get the current date
  const currentMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );


  const beforeMatcher: DateBefore = { before: currentDate };
  if (Array.isArray(days)) {
    var disabledDays = [beforeMatcher, ...days];
    
} else {
    console.error('Error: days is not an array.');
}
  return (
    <>
      <div className="mb-10 border p-3 rounded-[20px] mt-5 lg:mt-0 font-poppins text-textColor">
        <div className="md:container mx-auto flex flex-col lg:flex lg:flex-row items-center lg:space-x-8">
          <div className="lg:w-[40%] cursor-pointer rounded-[10px]">
            <img
              src={item?.data?.images?.[0]}
              className=" lg:w-72 lg:h-52 bg-bgColor p-3 rounded-2xl object-cover"
              alt=""
              onClick={() => {
                venuesName(item?.id);
                getDates(item?.id);
                handleVenueName(name[0]?.value);
                addMarqueeData(item);
                handleMarqueeDetails(item?.id);
                addBookedDates(marqueeDates);
              }}
            />
          </div>

          <div className="w-[100%] bg-bgColor p-3 rounded-2xl mx-3 mt-5 lg:mt-0">
            <div className="flex flex-col md:flex md:flex-row justify-between items-center ">
              <p className="font-poppins text-2xl font-semibold text-matteBlack">
                {item?.data?.name}
              </p>
              <p className="font-roboto text-xl items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className=" text-green-500 mr-3"
                />
                {item?.data?.address}
              </p>
            </div>
            <div className="font-roboto text-textColor text-center md:text-start lg:w-96 lg:h-14 mt-2">
              <p>
                {item?.data?.description && (
                  <>
                    <span className="your-custom-class">
                      {item.data.description.slice(0, 100)}
                    </span>
                    {item.data.description.length > 100 && " ..."}
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col md:flex md:flex-row justify-between items-center md:items-end ">
              <div className="flex flex-col ">
                <p className="text-primaryColor mt-2 mb-4">
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                  <FontAwesomeIcon icon={faStar} />
                </p>
                <button
                  onClick={() => {
                    venuesName(item?.id);
                    addMarqueeData(item);
                    addBookedDates(marqueeDates);
                    handleMarqueeDetails(item?.id);
                  }}
                  className="bg-primaryColor hover:bg-hoverPrimary px-5 py-2 rounded-lg font-roboto text-white font-bold"
                >
                  Details
                </button>
              </div>

              <div
                className="flex flex-col items-center justify-between pt-2"
                onClick={() => {
                  handleClick(item?.data?.id);
                  getDates(item?.id);
                  handleVenueName(name[0]?.value);
                }}
              >
                <button className=" bg-primaryColor px-5 hover:bg-hoverPrimary  py-2 rounded-lg font-roboto mt-6 text-white font-bold">
                  Avalibility & Details
                  <FontAwesomeIcon icon={faAngleDown} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div> 
        <div className="sm:flex sm:flex-col  rounded-md mt-3  lg:flex lg:flex-row bg-[#f5f5f5]">
          {open[item?.data?.id] && (
            <DayPicker
              className={`${
                isLunch === `Lunch` ? `combinedClasses` : `combinedClasses2`
              } w-[100%]`} 
              disabled={disabledDays}
              modifiers={{ booked: days }}
              modifiersStyles={{ booked: bookedStyle }}
              selected={marqueeDates}
              onDayClick={handleDateRangeSelect}
              defaultMonth={currentMonth}
              fromMonth={currentMonth}
              toYear={currentDate.getFullYear()}
            />
          )}
          {open[item?.data?.id] && (
            <div className="w-full  p-5">
              <div className="flex flex-col md:flex md:flex-row justify-between items-center mx-auto">
                <div>
                  <Select
                    showSearch
                    style={{
                      width: 250,
                      marginBottom: 20,
                    }}
                    defaultValue={{
                      value: name[0]?.value,
                      label: name[0]?.label,
                    }}
                    placeholder="Search to Select"
                    size="large"
                    placement="bottomLeft"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "").includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                    onChange={(e) => {
                      handleVenueName(e, meal);
                      setMarqueeDates({ from: null, to: null });
                    }}
                    options={name}
                  />
                </div>
                <div className="flex items-center font-roboto space-x-2 mb-3 md:-mt-6 ">
                  <div className="bg-[orange] h-3 w-3 rounded-full mx-2 md:mx-0"></div>
                  <p>Lunch</p>
                  <div className="bg-blue-600 h-3 w-3 rounded-full mx-2 md:mx-0"></div>
                  <p>Diner</p>
                </div>
              </div>

              <div className="bg-white rounded-lg px-3 py-5 text-textColor">
                <div className="w-full mb-3">
                  <h1 className="text-xl flex items-center w-full font-poppins text-textColor font-bold">
                    Meal Selection
                  </h1>
                  <p className="my-3">Choose your preferred mealtime option.</p>
                </div>
                <div className="flex items-center mb-4">
                  <Radio.Group
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    value={value}
                  >
                    <Radio
                      onClick={() => {
                        setMeal("Lunch");
                        handleVenueName(venueId, "Lunch");
                        setMarqueeDates({ from: null, to: null });
                      }}
                      id="default-radio-2"
                      type="radio"
                      value="1"
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </Radio.Group>
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Lunch
                  </label>
                </div>
                <div className="flex items-center">
                  <Radio.Group
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                  >
                    <Radio
                      onClick={() => {
                        setMeal("Diner");
                        handleVenueName(venueId, "Diner");
                        setMarqueeDates({ from: null, to: null });
                      }}
                      id="default-radio-3"
                      type="radio"
                      value="2"
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </Radio.Group>
                  <label
                    htmlFor="default-radio-3"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Diner
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MarqueeDetails;
