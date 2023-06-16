"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../model/sideBar";
import Navbar from "./Navbar";
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
      <div className="bg-[url('./assacts/images/background.jpg')] h-[100vh] bg-cover ">
        <div className="flex justify-between lg:container mx-auto items-center py-7 px-6 lg:px-0  bg-transparent">
          <div>
            <p className=" text-[#DEB666] font-extrabold text-xl ">BOOKING NOW.</p>
          </div>

          <div className=" flex items-center">
            <FontAwesomeIcon icon={faBarsStaggered} size="xs" className=" h-7 text-[#DEB666] lg:hidden " onClick={ShowSideBar} />
            <div className=" hidden lg:flex items-center">
              <ul className=" flex space-x-10 text-white  ">
                <li>Home</li>
                <li>About</li>
                <li>Booking</li>
                <li>Services</li>
                <li>Blog</li>
                <li>Help</li>
              </ul>
              <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-10 rounded-md">Sign In</button>
            </div>
          </div>
        </div>
        <div className="absolute top-[35%] left-0 right-0">
          <p className="text-white text-5xl md:text-6xl lg:text-7xl  text-center font-extrabold  ">
            YOUR PLACE YOU HAVE A FUN <br /> AND RELAX
          </p>
          <div className=" lg:flex  items-center justify-center mt-[8%] mx-6 ">
            <div className="md:flex bg-white py-5 lg:py-7 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl  ">
              <div className="border-r-2">
                {/* <p className="">Cities</p> */}
                <input
                  type="text"
                  placeholder="City"
                  className="ml-12 lg:ml-16 placeholder:text-black w-40 outline-none py-3  "
                />
              </div>
              <input type="text" placeholder="Services" className=" ml-12 w-52 placeholder:text-black outline-none py-3  " />
            </div>

            <div className="bg-slate-800 rounded-b-xl lg:rounded-bl-none lg:rounded-r-xl  ">
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
