"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SideBar from "../model/sideBar";
export default function Navbar() {
  const [show, setShow] = useState(false);
  const ShowSideBar = () => {
    setShow(!show);
  };
  return (
    <div className="  bg-white fixed top-0 left-0 right-0 z-50 ">
      <div className="flex justify-between lg:container mx-auto items-center py-7 px-6 lg:px-0">
        <div>
          <p className=" text-[#DEB666] font-extrabold text-xl ">BOOKING NOW.</p>
        </div>

        <div className=" flex items-center">
          <FontAwesomeIcon icon={faBarsStaggered} size="xs" className=" h-7 text-[#DEB666] lg:hidden  " onClick={ShowSideBar} />
          <div className=" hidden lg:flex items-center ">
            <ul className=" flex space-x-10 font-roboto font-bold ">
              <li>Home</li>
              <li>About</li>
              <li>Booking</li>
              <li>Services</li>
              <li>Blog</li>
              <li>Help</li>
            </ul>
            <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-6 font-roboto rounded-md">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
              Booking Now
            </button>
          </div>
        </div>
      </div>
      {show ? <SideBar /> : null}
    </div>
  );
}
