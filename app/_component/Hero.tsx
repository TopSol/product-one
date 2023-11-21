"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SideBar from "@/app/model/sideBar";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import bg from "../assets/images/background.jpg";
import CityName from "./cityName";
import { getFormatDates } from "@/app/utils";
import "../landingPage/style.css";
import calenderIcon from "../assets/images/calender.svg";
import SelectDate from "./selectDate";
import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { DocumentData } from "firebase/firestore";
interface UserData {
  id: string;
  data: DocumentData;
}
export default function Hero({
  setMarquees,
  setShowMessage,
  selectedDateRange,
  setSelectedDateRange,
  setCityName,
  cityName,
  removeCityName,
}: any) {
  const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bookDate, setBookDate] = useState<any[]>([]);
  const [venuesPrice, setVenuesPrice] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleMarqueeData = async () => {
    setShowMessage(false);

    let q = query(collection(db, "users"), where("city", "==", cityName));
    const querySnapshot = await getDocs(q);
    let adminMarqueeUser: UserData[] = [];
    querySnapshot.forEach((doc) => {
      adminMarqueeUser.push({ id: doc.id, data: doc.data() });
    });

    let venues: UserData[] = [];
    await Promise.all(
      adminMarqueeUser.map(async (item) => {
        let q = query(collection(db, "Venues"), where("userId", "==", item.id));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          venues.push({ id: doc.id, data: doc.data() });
        });
      })
    );

    const dateObject = new Date(selectedDateRange);
    const filteredVenues = venues.filter((venue) => {
      const { dates } = venue.data;
      if (dates && dates.Lunch && dates.Diner) {
        const lunchDates = dates.Lunch.map((d) => d.toDate());
        const dinerDates = dates.Diner.map((d) => d.toDate());

        const dateIsNotInLunch = !lunchDates.some(
          (d) => d.toDateString() === dateObject.toDateString()
        );
        const dateIsNotInDiner = !dinerDates.some(
          (d) => d.toDateString() === dateObject.toDateString()
        );
        return dateIsNotInLunch || dateIsNotInDiner;
      } else {
        return true;
      }
    });
    const finalData = filteredVenues
      .map((item) => {
        const { userId } = item.data;
        return adminMarqueeUser.find((item2) => item2.id === userId);
      })
      .filter((item) => item !== undefined);
    setMarquees(finalData);
  };

  const nextPage = () => {
    const marquee = "/marquee";
  };
  return (
    <>
      <div>
        <div
          className={` ${
            scrollPosition > 130 ? "bg-white" : "bg-transparent"
          }  fixed top-0 left-0 right-0 z-50`}
        >
          <div className="flex justify-between lg:container mx-auto items-center py-7 px-6 lg:px-0">
            <div>
              <p className=" text-[#DEB666] font-extrabold text-xl ">
                BOOKING NOW.
              </p>
            </div>

            <div className=" flex items-center">
              <div className="lg:hidden ">
                {!show && (
                  <FontAwesomeIcon
                    icon={faBarsStaggered}
                    size="lg"
                    className="h-7 text-[#DEB666] md:invisible"
                    onClick={() => setShow((prev) => !prev)}
                  />
                )}{" "}
              </div>
              <div
                className={`hidden lg:flex items-center   ${
                  scrollPosition > 130 ? "text-black" : "text-white"
                }`}
              >
                <ul className=" flex space-x-10 font-roboto font-bold ">
                  <li className="cursor-pointer px-3 ">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="cursor-pointer px-3 ">
                    <Link href="/marquee">Marquee</Link>
                  </li>
                  <li className="cursor-pointer px-3 ">Booking</li>
                  <li className="cursor-pointer px-3 ">Services</li>
                  <li className="cursor-pointer px-3 ">Blog</li>
                  <li className="cursor-pointer px-3 ">Help</li>
                </ul>
                <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-6 font-roboto rounded-md">
                  <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                  Booking Now
                </button>
              </div>
            </div>
          </div>
          {show ? <SideBar setShow={setShow} /> : null}
        </div>
        <div
          className="absolute  left-0 right-0 z-20 "
          style={{
            top: "30%",
          }}
        >
          <p className="text-white text-5xl md:text-6xl lg:text-7xl  text-center font-extrabold font-vollkorn  ">
            YOUR PLACE YOU HAVE A FUN <br /> AND RELAX
          </p>
          <div className=" lg:flex  items-center justify-center mt-[8%] w-full lg:w-[70%] lg:mx-auto">
            <div className="lg:flex  items-center bg-WhiteColor md:py-9 lg:py-7 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl  w-full lg-w[50%] xl:w-[60%]">
              <div className="border-r-2 w-full py-2 flex justify-center cursor-pointer">
                <CityName
                  setCityName={setCityName}
                  cityName={cityName}
                  registration={""}
                />
              </div>
              <div className="flex items-center justify-center w-full cursor-pointer pb-4 lg:pb-0">
                <SelectDate
                  setBookDate={setBookDate}
                  setVenuesPrice={setVenuesPrice}
                  setUserData={setUserData}
                  setSelectedDateRange={setSelectedDateRange}
                  selectedDateRange={selectedDateRange}
                />
              </div>
            </div>
            <div
              className="bg-secondaryColor rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl w-full lg-w[20%] xl:w-[30%] cursor-pointer"
              onClick={() => handleMarqueeData()}
            >
              <p className=" px-14 lg:px-14 py-6 lg:py-10 text-white text-center">
                Check Availability
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <Image
            src={bg}
            alt="sdf"
            className="w-[100%] h-[100vh] z-10 relative object-cover"
          />
        </div>
      </div>
    </>
  );
}
