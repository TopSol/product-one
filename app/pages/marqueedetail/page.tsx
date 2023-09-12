"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DayPicker } from "react-day-picker";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { Select } from "antd";
import { getFormatDates } from "@/app/utils";
import { faCalendarDays, faPerson, faBed, faMap, faStar, } from "@fortawesome/free-solid-svg-icons";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import ImageLightbox from "react-image-lightbox";
import NextLink from "next/link";
import Loader from "@/app/component/Loader";
import "react-day-picker/dist/style.css";
import "react-day-picker/dist/style.css";
import "react-image-lightbox/style.css";
import "./style.css";

function Marqueedetail() {
  const { addBookedDates, marqueeVenueNames, marqueeVenueDates, bookedDates, getMarqueeImage } = useStore();
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
  const [venueId, setVenueId] = useState();
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState("Lunch");
  const [lunchDinner, setLunchDinner] = useState<any>([
    { value: "1", label: "Lunch" },
    { value: "2", label: "Diner" },
  ]);

  const handleClick = (index: any) => {
    setSelectImage(data?.images[index]);
    setPhotoIndex(index);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const id = searchParams.get("id");

  const handleButton = () => {
    addBookedDates(marqueeDates);
    setLoading(true);
  };
  
  const getDocById = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const abc = docSnap.data()
        setData(abc);
        getMarqueeImage(abc?.images?.[0])
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    getDocById(id);

  }, [id]);

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
      handleVenueName(marqueeVenueNames[0]?.value);
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

  const handleVenueName = (id, lunchProps = "Lunch") => {
    setVenueId(id);
    console.log(marqueeVenueDates, "marqueeVenueDates");
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
    e == "1" ? handleVenueName(venueId, "Lunch") : handleVenueName(venueId, "Diner");
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

  return (
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

      <div className="md:container mx-auto flex flex-col lg:flex-row mt-16 ">
        <div className="lg:w-[70%] mx-3 lg:mx-0">
          <div className="">
            <img
              onClick={() => setIsOpen(true)}
              src={selectImage ? `${selectImage}` : `${data?.images?.[0]}`}
              className="rounded-lg  h-[508px] w-full object-cover"
            />
          </div>
          <div className="  flex space-x-3 my-3 ">
            {data?.images?.map((data, index) => (
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
          {isOpen && (
            <ImageLightbox
              mainSrc={data?.images[photoIndex]}
              nextSrc={data?.images[(photoIndex + 1) % data?.images.length]}
              prevSrc={
                data?.images[
                (photoIndex + data?.images.length - 1) % data?.images.length
                ]
              }
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() =>
                setPhotoIndex(
                  (photoIndex + data?.images.length - 1) % data?.images.length
                )
              }
              onMoveNextRequest={() =>
                setPhotoIndex((photoIndex + 1) % data?.images.length)
              }
            />
          )}
          <div className="mb-5 mt-2 lg:mb-0 lg:mt-0">
            <p>{data?.description}</p>
          </div>
        </div>
        <div className="lg:w-[30%] mx-3 lg:mx-5">
          <div className="">
            <div className=" flex justify-between ">
              <Select
                showSearch
                defaultValue={{
                  value: marqueeVenueNames?.[0]?.value,
                  label: marqueeVenueNames?.[0]?.label,
                }}
                style={{
                  width: 210,
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
              />
              <Select
                showSearch
                style={{
                  width: 210,
                  marginBottom: 20,
                  borderRadius: 10,
                }}
                className="mr-[6px] lg:mr-0"
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
              />
            </div>

            <div>
              <div onClick={() => setIsShow(true)}>
                <DayPicker
                  className={`${isLunch === `Lunch` ? `combinedClasses` : `combinedClasses2`
                    } w-[100%]`}
                  mode="range"
                  disabled={days}
                  min={2}
                  max={5}
                  selected={marqueeDates}
                  onSelect={setMarqueeDates}
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
              <NextLink href={`/pages/details?id=${data?.userId}`} passHref>
                <div onClick={handleButton}>
                  {loading ? <Loader /> : " Book Now"}
                </div>
              </NextLink>
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
  );
}

export default Marqueedetail;
