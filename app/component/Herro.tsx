"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../model/sideBar";
import Navbar from "./Navbar";
import Link from "next/link";
export default function Herro() {
  const [show, setShow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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
  const ShowSideBar = () => {
    setShow(!show);
  };
  return (
    <div>
      <div className="bg-[url('./assets/images/background.jpg')] h-[100vh] bg-cover ">
        <div className="flex justify-between lg:container mx-auto items-center py-7 px-6 lg:px-0  bg-transparent">
          <div>
            <p className=" text-primaryColor font-extrabold text-xl ">BOOKING NOW.</p>
          </div>

          <div className=" flex items-center">
            <FontAwesomeIcon icon={faBarsStaggered} size="xs" className=" h-7 text-[#DEB666] lg:hidden " onClick={ShowSideBar} />
            <div className=" hidden lg:flex items-center">
              <ul className=" flex space-x-10 text-WhiteColor font-roboto ">
                <li className="cursor-pointer">
                  <Link href="/">Home</Link>
                </li>
                <li className="cursor-pointer">
                  <Link href="/pages/marquee">Marquee</Link>
                </li>
                <li className="cursor-pointer">Booking</li>
                <li className="cursor-pointer">Services</li>
                <li className="cursor-pointer">Blog</li>
                <li className="cursor-pointer">Help</li>
              </ul>
              <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-6 font-roboto rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
                Booking Now
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-[35%] left-0 right-0">
          <p className="text-WhiteColor text-5xl md:text-6xl lg:text-7xl  text-center font-extrabold font-vollkorn  ">
            YOUR PLACE YOU HAVE A FUN <br /> AND RELAX
          </p>
          <div className=" lg:flex  items-center justify-center mt-[8%] mx-6 ">
            <div className="md:flex bg-WhiteColor py-5 lg:py-7 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl  ">
              <div className="border-r-2">
                <input
                  type="text"
                  placeholder="City"
                  className="ml-12 lg:ml-16 placeholder:text-black w-40 outline-none py-3  "
                />
              </div>
              <input type="text" placeholder="Services" className=" ml-12 w-52 placeholder:text-black outline-none py-3  " />
            </div>

            <div className="bg-secondaryColor rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl  ">
              <p className=" px-14 md:px-20 py-6 md:py-10 text-white ">Check Availability</p>
            </div>
          </div>
        </div>

        {show ? <SideBar /> : null}
      </div>
      {scrollPosition > 130 && <Navbar />}
    </div>
  );
}
