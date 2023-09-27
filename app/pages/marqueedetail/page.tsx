"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { Breadcrumb, Input, Select, Space, Typography } from "antd";
import { getFormatDates } from "@/app/utils";
import { isBefore, startOfToday } from "date-fns";
import Location from "./Location"
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import ImageLightbox from "react-image-lightbox";
import Loader from "@/app/component/Loader";
import "react-day-picker/dist/style.css";
import "react-day-picker/dist/style.css";
import "react-image-lightbox/style.css";
import "./style.css";
import chair from "../../assets/images/chair.svg";
import click from "../../assets/images/click.svg";
import Image from "next/image";
import Link from "next/link";
import { DocumentData } from 'firebase/firestore'; 
interface VenueData {
  image: string[];
  name: string;
  price: number;
  maxCapacity: number;
  services: string[];
  userId: string;
  venueId: string;
  minCapacity: number;
  dates: {
    Diner: { seconds: number; nanoseconds: number }[];
    Lunch: { seconds: number; nanoseconds: number }[];
  };
}
function Marqueedetail() {
  const {
    addBookedDates,
    marqueeVenueNames,
    marqueeVenueDates,
    addMarqueeVenueNames,
    addMarqueeData,
    marqueeData,
    getMarqueeImage,
    marqueeImage,
  } = useStore();
  let searchParams = useSearchParams();
  const [selectImage, setSelectImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLunch, setIsLunch] = useState<any>();
  const [selectedOption, setSelectedOption] = useState("");
  // const [data, setData] = useState();
  const [data, setData] = useState<DocumentData | VenueData | null>(null);
  const [isShow, setIsShow] = useState(false);
  // const [bookDates, setBookDates] = useState();
  const [bookDates, setBookDates] = useState<DocumentData | undefined>(undefined);
  const [dates, setDates] = useState<string[]>([]);
  const [days, setDays] = useState<any>([]);
const [marqueeDates, setMarqueeDates] = useState<{ from: Date | null; to: Date | null }>({
  from: null,
  to: null,
});
  const [otherDates, setOtherDates] = useState([]);
  const [venueId, setVenueId] = useState();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState("Lunch");
  const [isRangeComplete, setIsRangeComplete] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [mealType, setMealType] = useState<any>([
    { value: "1", label: "Lunch" },
    { value: "2", label: "Diner" },
  ]);
  const router = useRouter();
  const handleClick = (index: any) => {
    if (data?.image) {
      setSelectImage(data.image[index]);
      setPhotoIndex(index);
    }
  };
  const closeLightbox = () => {
    setIsOpen(false);
  };
  const id = searchParams.get("id");
  const marqueeName = searchParams.get("name");
  const location = searchParams.get("location");
  const handleButton = () => {
    addBookedDates(marqueeDates); 
    getMarqueeImage({...marqueeImage,numberOfPeople:numberOfPeople})
    router.push(
      `/pages/details?id=${data?.userId}`
    );
  };
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
    const center = {
      lat: marqueeData?.data?.locations?.lat, 
      lng: marqueeData?.data?.locations?.lng,   
    };
    addMarqueeData({ ...marqueeData, lunchType: meal });
  }, [id]);
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
  const handleVenueName = async (id, lunchProps = "Lunch") => {
    setVenueId(id);
    try {
      const docRef = doc(db, "Venues", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const abc = docSnap.data();
        setData(abc);
        getMarqueeImage(abc);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
    const reserveDate = marqueeVenueDates.map((item) => {
      return {
        id,
        dates: {
          Diner: getFormatDates(item.dates[id]?.Diner),
          Lunch: getFormatDates(item.dates[id]?.Lunch),
        },
      };
    });
    setBookDates(reserveDate);
    {
      lunchProps == "Diner"
        ? handleCheck(lunchProps, reserveDate[0]?.dates?.Diner)
        : handleCheck(lunchProps, reserveDate[0]?.dates?.Lunch);
    }
  };
  const handleVenueType = (e) => {
    if (e == "1") {
      setMeal("Lunch");
      addMarqueeData({ ...marqueeData, lunchType: "Lunch" });
    } else {
      setMeal("Diner");
      addMarqueeData({ ...marqueeData, lunchType: "Diner" });
    }
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
      setDates(formattedDates);
    }
  }, [datess.length]);
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
        const date = days.filter(
          (element) => {
            // Ensure marqueeDates.from is not null before using it
            if (marqueeDates.from !== null) {
              return element >= marqueeDates.from && element <= newRange;
            }
            return false; // Handle the case when marqueeDates.from is null
          }
        );
        if (date.length > 0) {
          alert("you can not selet this date");
          setMarqueeDates({ from: null, to: null });
        }else{
         setMarqueeDates({ ...marqueeDates, to: newRange});
        }
      } else if (marqueeDates.from && marqueeDates.to) {
        setMarqueeDates({ from: newRange, to: null });
      }
    }
  };
  const handleNumberOfPeople = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setNumberOfPeople(sanitizedValue);
  };
  const preventNonNumericInput = (e) => {
    const input = e.key;
    if (!/[0-9]/.test(input)) {
      e.preventDefault();
    }
  };
  const handleVenue = () => {
    const updatedData = marqueeVenueNames.map((capacity) => {
      const isDisabled = numberOfPeople.length
        ? numberOfPeople < capacity.maxCapacity
        : true;
      if (isDisabled) {
        return { ...capacity, disabled: false };
      } else {
        return { ...capacity, disabled: true };
      }
    });
    addMarqueeVenueNames(updatedData);
    getMarqueeImage({ ...marqueeImage, numberOfPeople: numberOfPeople });
  };
  const center = {
    lat: marqueeData?.data?.locations?.lat,
    lng: marqueeData?.data?.locations?.lng,   
  };
  const isDateDisabled = (date) => {
    return isBefore(date, startOfToday());
  };
  const bookedStyle = { border: "2px solid currentColor" };
  const shouldShowDiv = marqueeVenueNames.some((item) => !item.disabled);
  return (
    <>
      <div>
        <Navbar />
        <div className="bg-bgColor mt-24">
          <div className="md:container md:mx-auto py-5 flex justify-between items-center mx-3">
            <div>
              <h1 className="font-vollkorn text-4xl text-gray-600">
                {/* {marqueeName} */}
                {marqueeData?.data?.name}
              </h1>
              <Breadcrumb
                items={[
                  {
                    title: "Home",
                  },
                  {
                    title: <Link href="/pages/marquee">Marquee</Link>,
                  },
                  {
                    title: "Marquee Details",
                  },
                ]}
              />
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
            {shouldShowDiv && (
              <>
                <div className="mb-5 mt-2 lg:mb-0 lg:mt-0 border  ">
                  <div className="bg-lightPrimary pl-3 py-3">
                    <p className="text-2xl text-white font-poppins">Details</p>
                  </div>
                  <div className=" p-2 flex flex-col md:flex-row justify-between md:px-10 md:py-4">
                    <div className=" md:h-[300px] h-[200px] flex flex-col justify-center w-full md:w-[40%]">
                      <div className="flex items-center  px-3 rounded-md bg-bgColor md:py-3 my-3">
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
                      <div className="flex items-center px-3 rounded-md bg-bgColor md:py-3 my-3">
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
                            {data?.services?.map((item, index) => (
                              <div className={`flex`} key={index}>
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
                <div className="mt-5">
                <Location
                 center={center}
                />
                </div>
              </>
            )}
          </div>
          <div className="lg:w-[30%] mx-3 lg:mx-5">
            <div className="">
              <div className=" flex flex-col justify-between ">
                <Space direction="vertical" style={{ marginBottom: "20px" }}>
                  <Typography.Text className="text-primaryColor text-lg font-poppins">
                    Number Of Guest
                  </Typography.Text>
                  <Input
                    placeholder="Add number of people"
                    type="number"
                    size="large"
                    value={numberOfPeople}
                    onChange={handleNumberOfPeople}
                    onBlur={handleVenue}
                    onKeyPress={preventNonNumericInput}
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
                          marginBottom: 20,
                          borderRadius: 10,
                        }}
                        placeholder="Search to Select"
                        size="large"
                        placement="bottomLeft"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          String((option?.label ?? "")) .includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          String((optionA?.label ?? ""))  
                            .toLowerCase()
                            .localeCompare(String((optionB?.label ?? "")).toLowerCase())
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
                        {/* Select Lunch Type */}
                        Event Time
                      </Typography.Text>
                      <Select
                        showSearch
                        style={{
                          marginBottom: 20,
                          borderRadius: 10,
                        }}
                        className="mr-[6px] lg:mr-0 w-[295px] md:w-[210px]"
                        placeholder="Search to Select"
                        size="large"
                        placement="bottomLeft"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                        String((option?.label ?? ""))  .includes(input)
                        }
                        filterSort={(optionA, optionB) =>
                          String((optionA?.label ?? ""))   
                            .toLowerCase()
                            .localeCompare( String((optionB?.label ?? "")) .toLowerCase())
                        }
                        onChange={(e) => handleVenueType(e)}
                        options={mealType}
                        value={meal}
                      />
                    </Space>
                  </div>
                </div>
              </div>
              <div>
                {shouldShowDiv ? (
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
                        disabled={days}
                        modifiers={{ booked: days }}
                        modifiersStyles={{ booked: bookedStyle }}
                        selected={marqueeDates}
                        onDayClick={handleDateRangeSelect}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-red-700">
                    {" "}
                    Marquee not Found{" "}
                  </p>
                )}
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
                className={`flex ${
                  numberOfPeople.length ? "bg-lightPrimary" : "bg-bgColor"
                } rounded-lg justify-center p-3 cursor-pointer mt-3 hover:bg-hoverBgColor`}
              >
                <div>{loading ? <Loader /> : " Book Now"}</div>
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
