"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { BookedLunch, BookedDinner } from "./data";
import ImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import NextLink from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-day-picker/dist/style.css";
import {
  faCalendarDays,
  faPerson,
  faBed,
  faMap,
  faStar,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import "./style.css";
import { doc, getDoc, query } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useStore } from "@/store";
import { useSearchParams, useRouter } from "next/navigation";
import { Select } from "antd";
import { getFormatDates } from "@/app/utils";
import Loader from "@/app/component/Loader";
function Marqueedetail() {
  const { addBookedDates, marqueeVenueNames, marqueeVenueDates,bookedDates } = useStore();
  const router = useRouter();
  let searchParams = useSearchParams();
  const [selectImage, setSelectImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isLunch, setIsLunch] = useState<any>();
  const [range, setRange] = useState<any>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState();
  const [isShow, setIsShow] = useState(false);
  const [bookDates, setBookDates] = useState();
  const [dates, setDates] = useState([]);
  const [meal, setMeal] = useState("Lunch");
  const [days, setDays] = useState<any>([]);
  const [marqueeDates, setMarqueeDates] = useState([]);
  const [loading, setLoading] = useState(false)
  const [lunchDinner, setLunchDinner] = useState<any>([
    { value: "1", label: "Lunch" },
    { value: "2", label: "Diner" },
  ]);
  const handleClick = (index: any) => {
    setSelectImage(data?.images[index]);
    setPhotoIndex(index);
  };
  console.log(data, "days", marqueeVenueNames, marqueeVenueDates);
  console.log(data, "days", marqueeVenueNames, marqueeVenueDates);
  const closeLightbox = () => {
    setIsOpen(false);
  };

  const id =  searchParams.get("id");
  console.log(id, "iddsddsss");

  const handleButton = () => {
    addBookedDates(marqueeDates);
    setLoading(true)
    // setLoading((pre) => (!pre))
  };
console.log(bookedDates, "bookedDates")
  const getDocById = async (id) => {
    try {
      const docRef = doc(db, "users", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
        // setLoading((pre) => (!pre))

      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };
 console.log(data, "abcccccc");
 
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
  const handleVenueName = (id) => {
    console.log(marqueeVenueDates, "marqueeVenueDates");
    const reserveDate = marqueeVenueDates.map((item) => {
      return {
        id,
        dates: {
          
          Diner: getFormatDates(item?.dates[id]?.Diner),
          Lunch: getFormatDates(item?.dates[id]?.Lunch),
        },
      };
      
    });
    console.log(marqueeVenueDates, "fasdhjkafhakjsdhfkjasf");
    console.log(reserveDate, "reserveDate");
    setBookDates(reserveDate);
    {
      meal == "Diner"
        ? handleCheck(meal, reserveDate[0]?.dates?.Diner)
        : handleCheck(meal, reserveDate[0]?.dates?.Lunch);
    }
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

  const handleVenueType = (e) => {
    console.log(e, "dsfsdffdsfsdf");
    e == "1" ? setMeal("Lunch") : setMeal("Diner");
  };
  const disabledStyle = {
    backgroundColor: "#f2f2f2", // Set your desired color for disabled dates
    color: "#aaa", // Set your desired text color for disabled dates
  };
  console.log("datessssssss", marqueeVenueNames);
  console.log(marqueeDates, "asdfasdfsdafasdfas");
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5 flex justify-between items-center">
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
        <div className="lg:w-[70%] ">
          <div className="">
              <img
                onClick={() => setIsOpen(true)}
                src={selectImage ? `${selectImage}` : `${data?.images?.[0]}`}
                className="rounded  h-[508px] w-full object-cover"
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

          <div className="mx-3 sm:grid-cols-2 md:flex justify-between items-center mt-7 mb-10 text-textColor font-roboto">
            <div className="flex items-center text-[14px] sm:w-full md:w-auto md:flex-none mb-4 md:mb-0">
              <FontAwesomeIcon
                className="bg-bgColor p-3 text-textColor rounded-lg"
                icon={faPerson}
              />
              <div className="ml-2">
                <p>Max. Guests</p>
                <p className="font-bold">2 Adults/3 Children</p>
              </div>
            </div>

            <div className="flex items-center text-[14px] sm:w-full md:w-auto md:flex-none mb-4 md:mb-0">
              <FontAwesomeIcon
                className="bg-bgColor p-3 text-textColor rounded-lg"
                icon={faCalendarDays}
              />
              <div className="ml-2 text-[#878D8D]">
                <p>Booking Nights</p>
                <p className="font-bold">5 min.</p>
              </div>
            </div>

            <div className="flex items-center text-[14px] sm:w-full md:w-auto md:flex-none mb-4 md:mb-0">
              <FontAwesomeIcon
                className="bg-bgColor p-3 text-textColor rounded-lg"
                icon={faBed}
              />
              <div className="ml-2 text-[#878D8D]">
                <p>Bed Type</p>
                <p className="font-bold">King Size</p>
              </div>
            </div>

            <div className="flex items-center text-[14px] sm:w-full md:w-auto md:flex-none">
              <FontAwesomeIcon
                className="bg-bgColor p-3 text-textColor rounded-lg"
                icon={faMap}
              />
              <div className="ml-2 text-[#878D8D]">
                <p>Area</p>
                <p className="font-bold">100 m²</p>
              </div>
            </div>
          </div>

          <p className=" font-roboto text-textColor text-justify mx-3">
            Aliquam erat volutpat. Morbi semper tempus quam. Aenean quis porta
            velit. Aliquam dictum neque lobortis ipsum hendrerit facilisis.
            Curabitur vel sapien convallis, convallis metus id, facilisis metus.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
            posuere cubilia curae; Morbi aliquet a lacus ut maximus.
            Pellentesque a vestibulum risus. Proin non placerat metus, sed
            molestie nisi. Nulla ornare diam ornare odio varius, sit amet
            placerat enim Aliquam erat volutpat. Morbi semper tempus quam.
            Aenean quis porta velit. Aliquam dictum neque lobortis ipsum
            hendrerit facilisis. Curabitur vel sapien convallis, convallis metus
            id, facilisis metus. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Morbi aliquet a lacus ut
            maximus. Pellentesque a vestibulum risus. Proin non placerat metus,
            sed molestie nisi. Nulla ornare diam ornare odio varius, sit amet
            placerat enim facilisis. Phasellus vel purus quis lorem volutpat
            lacinia eu a eros, maecenas at erat purus.Etiam vel lectus eu lorem
            mattis sollicitudin quis at lectus. Donec dignissim nisi sed
            vestibulum ornare, interdum et malesuada fames ac ante ipsum primis
            in faucibus. Ut viverra arcu a metus interdum, at laoreet elit
            accumsan.
          </p>
          <p className="font-roboto mt-8 text-textColor text-justify mx-3">
            Nulla elementum enim quis nisi elementum, a placerat eros accumsan.
            Mauris aliquet tincidunt erat, at dignissim neque bibendum vel.
            Donec scelerisque odio at malesuada venenatis. Etiam vel lectus eu
            lorem mattis sollicitudin quis at lectus. Donec dignissim nisi sed
            vestibulum ornare. Maecenas volutpat, erat vitae ultricies
            consequat, augue nisi Aliquam erat volutpat. Morbi semper tempus
            quam. Aenean quis porta velit. Aliquam dictum neque lobortis ipsum
            hendrerit facilisis. Curabitur vel sapien convallis, convallis metus
            id, facilisis metus. Vestibulum ante ipsum primis in faucibus orci
            luctus et ultrices posuere cubilia curae; Morbi aliquet a lacus ut
            maximus. Pellentesque a vestibulum risus. Proin non placerat metus,
            sed molestie nisi. Nulla ornare diam ornare odio varius, sit amet
            placerat enim varius nulla, facilisis tincidunt ligula tellus vitae
            tortor. Aenean felis orci, venenatis vel lectus sit amet, maximus
            elementum magna. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Ut viverra arcu a metus interdum, at laoreet elit
            accumsan.
          </p>

          <div className="font-roboto mt-24">
            <p className="font-bold m-3">Room Reviews</p>
            <div className="m-3">
              <div className="flex items-start">
                <img
                  className=" rounded-md  w-[80px] h-[80px]"
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user7.jpg"
                  alt=""
                />
                <div className=" border-[1px] border-l-8 py-6 pl-7 pr-[55px] ml-4 text-textColor">
                  <div className="text-yellow-500 my-2 space-x-1">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>

                  <p className="text-sm italic">
                    {" "}
                    Mabel Hicks - Moscow / Russia
                  </p>
                  <p className="my-4">
                    There's no better way to spend your vacations than at a
                    stunning, luxurious and world-class hotel! I can't tell you
                    how many times I've been to a hotel and had an amazing time.
                  </p>
                </div>
              </div>
            </div>

            <div className="m-3">
              <div className="flex items-start">
                <img
                  className=" rounded-md  w-[80px] h-[80px]"
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/pexels-sindre-strom-1040881-150x150.jpg"
                  alt=""
                />
                <div className=" border-[1px] border-l-8 py-6 pl-7 pr-[55px] ml-4 text-textColor">
                  <div className="text-yellow-500 my-2 space-x-1">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>

                  <p className="text-sm italic">Ciaran Mccray - Lion / Paris</p>
                  <p className="my-4">
                    There's no better way to spend your vacations than at a
                    stunning, luxurious and world-class hotel! I can't tell you
                    how many times I've been to a hotel and had an amazing time.
                  </p>
                </div>
              </div>
            </div>

            <div className="m-3">
              <div className="flex items-start">
                <img
                  className=" rounded-md  w-[80px] h-[80px]"
                  src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user9.jpg"
                  alt=""
                />
                <div className=" border-[1px] border-l-8 py-6 pl-7 pr-[55px] ml-4 text-textColor">
                  <div className="text-yellow-500 my-2 space-x-1">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>

                  <p className="text-sm italic">
                    Gerald Schmidt - Zagreb / Croatia
                  </p>
                  <p className="my-4">
                    There's no better way to spend your vacations than at a
                    stunning, luxurious and world-class hotel! I can't tell you
                    how many times I've been to a hotel and had an amazing time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-[30%] mx-3 lg:mx-7 ">
          <div className="">
            <div className="w-[100%]  relative flex justify-between ">
              <Select
                showSearch
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
                onChange={handleVenueName}
                options={marqueeVenueNames}
              />
              <Select
                showSearch
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
                onChange={handleVenueType}
                options={lunchDinner}
                value={meal}
              />
            </div>
            <div>
              <div onClick={() => setIsShow(true)}>
              <DayPicker
                className={`${
                  isLunch === `Lunch` ? `combinedClasses` : `combinedClasses2`
                } `}
                mode="multiple"
                disabled={days}
                min={2}
                selected={marqueeDates}
                onSelect={setMarqueeDates}
              />
              </div>
            </div>
            {/* <div>
              <DayPicker 
              className=""
              />
            </div> */}
            <div className="flex items-center space-x-2 mb-3">
              <div className="bg-[orange] p-1 w-1 rounded-full"></div>
              <p>Lunch</p>
              <div className="bg-blue-600 p-1 w-1 rounded-full"></div>
              <p>Dinner</p>
            </div>
          </div>
          {isShow && (
            <div
             
              className="flex bg-bgColor rounded-lg justify-center p-3 cursor-pointer mx-auto"
            >
              <NextLink href={`/pages/details?id=${data?.userId}`} passHref>
               <div  onClick={handleButton}>
                {
                  loading? 
                  <Loader/> :
                  " Book Now"
                }
                </div>
               
              </NextLink>
            </div>
          )}
          <img
            src="https://demo.himaratheme.com/wp-content/uploads/2022/10/widget_banner-1.jpg"
            alt=""
            className="w-full mt-8"
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
