"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DayPicker } from "react-day-picker";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { Input, Select, Space, Typography, message } from "antd";
import { getFormatDates } from "@/app/utils";
import {
  faCalendarDays,
  faPerson,
  faBed,
  faMap,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import ImageLightbox from "react-image-lightbox";
import NextLink from "next/link";
import Loader from "@/app/component/Loader";
import "react-day-picker/dist/style.css";
import "react-day-picker/dist/style.css";
import "react-image-lightbox/style.css";
import "./style.css";
import chair from "../../assets/images/chair.svg";
import click from "../../assets/images/click.svg";
import Image from "next/image";
function Marqueedetail() {
  const {
    addBookedDates,
    marqueeVenueNames,
    marqueeVenueDates,
    bookedDates,
    addMarqueeVenueNames,
  } = useStore();
  let searchParams = useSearchParams();
  const [selectImage, setSelectImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLunch, setIsLunch] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState();
  const [isShow, setIsShow] = useState(false);
  const [bookDates, setBookDates] = useState();
  const [dates, setDates] = useState([]);
  const [days, setDays] = useState<any>([]);
  const [marqueeDates, setMarqueeDates] = useState([]);
  const [otherDates, setOtherDates] = useState([]);
  const [venueId, setVenueId] = useState();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState("Lunch");
  const [isRangeComplete, setIsRangeComplete] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [lunchDinner, setLunchDinner] = useState<any>([
    { value: "1", label: "Lunch" },
    { value: "2", label: "Diner" },
  ]);
  const router = useRouter();
  const handleClick = (index: any) => {
    setSelectImage(data?.image[index]);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const id = searchParams.get("id");

  const handleButton = () => {
    addBookedDates(marqueeDates);
    router.push(`/pages/details?id=${data?.userId}&name=${Object.values(data)}`);
    // setLoading(true);
  };
  console.log(data, "data");

  // const getDocById = async (id) => {
  //   try {
  //     const docRef = doc(db, "Venues", id);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       const abc = docSnap.data()
  //       setData(abc);
  //       getMarqueeImage(abc?.images?.[0])
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } catch (error) {
  //     console.error("Error :", error);
  //   }
  // };

  // useEffect(() => {
  //   getDocById(id);

  // }, [id]);

  const getCollection = async (id) => {
    try {
      const docRef = doc(db, "BookDate", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBookDates(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    if (id) {
      getCollection(id);
      handleVenueName(marqueeVenueNames[marqueeVenueNames.length - 1]?.value);
    }
  }, [id]);

  const handleCheck = (event, item) => {
    console.log(event, "event", item);
    const selectedValue = event?.target?.value || event;
    console.log(selectedValue, "selectedValue");
    setSelectedOption(selectedValue);
    if (selectedValue == "Lunch") {
      setDays(item);
      setIsLunch("Lunch");
    } else if (selectedValue == "Diner") {
      setDays(item);
      setIsLunch("Diner");
    }
  };

  const handleVenueName = async (id, lunchProps = "Lunch") => {
    console.log(id, "sdfdsfsdfsdff");
    setVenueId(id);
    console.log(marqueeVenueDates, "marqueeVenueDates");
    try {
      const docRef = doc(db, "Venues", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const abc = docSnap.data();
        setData(abc);
        getMarqueeImage(abc?.images?.[0]);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
    console.log(data, "hhhjjj");

    const reserveDate = marqueeVenueDates.map((item) => {
      return {
        id,
        dates: {
          Diner: getFormatDates(item.dates[id]?.Diner),
          Lunch: getFormatDates(item.dates[id]?.Lunch),
        },
      };
    });
    console.log(reserveDate, "reserveDate");
    setBookDates(reserveDate);
    {
      lunchProps == "Diner"
        ? handleCheck(lunchProps, reserveDate[0]?.dates?.Diner)
        : handleCheck(lunchProps, reserveDate[0]?.dates?.Lunch);
    }
  };

  const handleVenueType = (e) => {
    e == "1"
      ? handleVenueName(venueId, "Lunch")
      : handleVenueName(venueId, "Diner");
  };

  const datess = bookDates?.dates || [];
  useEffect(() => {
    if (!Array.isArray(datess)) {
      console.error("datess is not a valid array");
    } else {
      const formattedDates = datess.map((v, i) => v.toDate());
      console.log(formattedDates, "format");

      setDates(formattedDates);
    }
  }, [datess.length]);

  const disabledStyle = {
    backgroundColor: "#f2f2f2", // Set your desired color for disabled dates
    color: "#aaa", // Set your desired text color for disabled dates
  };
  const handleDateRangeSelect = (newRange) => {
    setMarqueeDates(newRange);
    if (marqueeDates?.to) {
      setMarqueeDates([]);
      setMarqueeDates({ from: newRange?.to });
    }
  };
  const handleNumberOfPeople = (e) => {
    setNumberOfPeople(e.target.value);
  };
  // const handleVenue=()=>{

  // const data =  marqueeVenueNames.filter((capacity)=>{

  //     if(numberOfPeople < capacity.minCapacity && numberOfPeople > capacity.maxCapacity){
  //       return [capacity,{disabled:true}]
  //     }
  //   })
  // }
  const handleVenue = () => {
    const updatedData = marqueeVenueNames.map((capacity) => {
      const isDisabled =numberOfPeople.length ? numberOfPeople  > capacity.minCapacity && numberOfPeople < capacity.maxCapacity: true
      if (isDisabled) {
        return { ...capacity, disabled: false };
      } else {
        return { ...capacity, disabled: true };
      }
    });
    console.log(updatedData, "updatedDataupdatedData", numberOfPeople);
    addMarqueeVenueNames(updatedData);
  };
  const handleMouseEnter=(date)=>{
console.log(date,"datsseff")
  }
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-bgColor mt-24">
          <div className="md:container md:mx-auto py-5 flex justify-between items-center mx-3">
            <div>
              <h1 className="font-vollkorn text-4xl text-gray-600">
                Hotel Detail
              </h1>
              <p className="mt-2 text-xs font-roboto">Home / Hotel</p>
            </div>
            <div>
              <h1 className="font-vollkorn text-4xl text-gray-600">350$</h1>
            </div>
          </div>
        </div>

        <div className="md:container mx-auto flex flex-col justify-between lg:flex-row mt-16 ">
          <div className="lg:w-[60%] mx-3 lg:mx-0">
            <div className="">
              <img
                onClick={() => setIsOpen(true)}
                src={selectImage ? `${selectImage}` : `${data?.image?.[0]}`}
                className="rounded-lg  h-[508px] w-full object-cover"
              />
            </div>
            <div className="  flex space-x-3 my-3 ">
              {data?.image?.map((data, index) => (
                <div key={index}>
                  <div onClick={() => handleClick(index)}>
                    <img
                      src={data}
                      alt=""
                      className="w-[170px] h-[100px] rounded-lg cursor-pointer object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-5 mt-2 lg:mb-0 lg:mt-0 border  ">
              <div className="bg-lightPrimary pl-3 py-3">
                <p className="text-2xl text-white font-poppins">Details</p>
              </div>
              <div className=" p-2 flex flex-col md:flex-row justify-between md:px-10 md:py-4">
                <div className=" md:h-[300px] h-[200px] flex flex-col justify-around w-full md:w-[40%]">
                  <div className="flex items-center  px-3 rounded-md bg-bgColor md:py-3 py-1">
                    <div className="bg-white w-8 h-8 rounded-full flex justify-center ">
                      <Image
                        src={chair}
                        alt="Chair"
                        height={20}
                        width={20}
                        className=""
                      />
                    </div>
                    <div className="pl-3">
                      <p className="md:text-md  mb-2">Sitting Capacity</p>
                      <p className="underline md:text-sm font-thin">
                        {data?.minCapacity} to {data?.maxCapacity}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center px-3 rounded-md bg-bgColor md:py-3 py-1">
                    <div className="bg-white w-8 h-8 rounded-full flex justify-center ">
                      <Image
                        src={chair}
                        alt="Chair"
                        height={20}
                        width={20}
                        className=""
                      />
                    </div>
                    <div className="pl-3">
                      <p className="md:text-md  mb-2">Name</p>
                      <p className="underline md:text-sm font-thin">
                        {data?.name}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex items-center px-3 rounded-md bg-bgColor py-3">
                    <div className="bg-white w-8 h-8 rounded-full flex justify-center ">
                      <Image
                        src={chair}
                        alt="Chair"
                        height={20}
                        width={20}
                        className=""
                      />
                    </div>
                    <div className="pl-3">
                      <p className="md:text-md  mb-2">Price</p>
                      <p className="underline md:text-sm font-thin">
                        {data?.price}
                      </p>
                    </div>
                  </div> */}
                </div>
                <div className="w-full md:w-[50%]">
                  <div className="border my-4 md:h-[268px] h-[210px]   rounded-md ">
                    <p className=" text-textColor font-bold md:text-xl p-5">
                      Services
                    </p>
                    <div className="ml-5">
                      <Space
                        direction="vertical"
                        size="middle"
                        style={{
                          display: "flex",
                        }}
                      >
                        {data?.services?.map((item,index) => (
                          <div className={`flex`}>
                            <Image
                              src={click}
                              alt="Chair"
                              height={20}
                              width={20}
                              className="ml-5"
                            />
                            <p className="pl-2 text-primaryColor">{item}</p>
                          </div>
                        ))}
                      </Space>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-[30%] mx-3 lg:mx-5">
            <div className="">
              <div className=" flex flex-col justify-between ">
                <Space direction="vertical" style={{ marginBottom: "20px" }}>
                  <Typography.Text className="text-primaryColor text-lg font-poppins">
                    Add number of People
                  </Typography.Text>
                  <Input
                    placeholder="Add number of people"
                    type="number"
                    size="large"
                    value={numberOfPeople}
                    onChange={handleNumberOfPeople}
                    onBlur={handleVenue}
                  />
                </Space>
                <div className="flex justify-between flex-col md:flex-row  ">
                  <div>
                  <Space direction="vertical">
                    <Typography.Text className="text-primaryColor text-lg  font-poppins">
                      Select Hall
                    </Typography.Text>
                    <Select
                      showSearch
                      defaultValue={{
                        value:
                          marqueeVenueNames?.[marqueeVenueNames.length - 1]
                            ?.value,
                        label:
                          marqueeVenueNames?.[marqueeVenueNames.length - 1]
                            ?.label,
                      }}
                      style={{
                        // width: 210,
                        marginBottom: 20,
                        borderRadius: 10,
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
                      onChange={(e) => handleVenueName(e)}
                      options={marqueeVenueNames}
                      className="w-[295px] md:w-[210px]"
                    />
                  </Space>
                  </div>
                  <div>

                  
                  <Space direction="vertical">
                    <Typography.Text className="text-primaryColor text-lg font-poppins">
                      Select Lunch Type
                    </Typography.Text>
                    <Select
                      showSearch
                      style={{
                        // width: 210,
                        marginBottom: 20,
                        borderRadius: 10,
                      }}
                      className="mr-[6px] lg:mr-0 w-[295px] md:w-[210px]"
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
                      onChange={(e) => handleVenueType(e)}
                      options={lunchDinner}
                      value={meal}
                      // className="w-[295px] md:w-[210px]"
                    />
                  </Space>
                  </div>
                </div>
              </div>
              <div className="">
                <div onClick={() => setIsShow(true)}>
                  <Typography.Text className="text-primaryColor text-lg  font-poppins">
                    Select Date
                  </Typography.Text>
                  <DayPicker
                    className={`${
                      isLunch === `Lunch`
                        ? `combinedClasses`
                        : `combinedClasses2`
                    } w-[100%]`}
                    mode="range"
                    disabled={days}
                    selected={marqueeDates}
                    onSelect={handleDateRangeSelect}
                    onMouseEnter={handleMouseEnter}
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2  lg:mt-0 lg:mb-0">
                <div className="bg-[orange] p-1 w-1 rounded-full"></div>
                <p>Lunch</p>
                <div className="bg-blue-600 p-1 w-1 rounded-full"></div>
                <p>Dinner</p>
              </div>
            </div>
            {isShow && (
              <div
                onClick={handleButton}
                className="flex bg-bgColor rounded-lg justify-center p-3 cursor-pointer mt-3 hover:bg-hoverBgColor"
              >
                {/* <NextLink href={`/pages/details?id=${data?.userId}`} passHref> */}
                <div>{loading ? <Loader /> : " Book Now"}</div>
                {/* </NextLink> */}
              </div>
            )}
            <img
              src="https://demo.himaratheme.com/wp-content/uploads/2022/10/widget_banner-1.jpg"
              alt=""
              className="w-full mt-5"
            />
          </div>
        </div>
        <div className="mt-24">
          <Footer />
        </div>
      </div>
      {isOpen && (
        <ImageLightbox
          mainSrc={data?.image[photoIndex]}
          nextSrc={data?.image[(photoIndex + 1) % data?.image.length]}
          prevSrc={
            data?.image[
              (photoIndex + data?.image.length - 1) % data?.image.length
            ]
          }
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + data?.image.length - 1) % data?.image.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % data?.image.length)
          }
        />
      )}
    </>
  );
}

export default Marqueedetail;
