"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import SideBar from "@/app/model/sideBar";
import Link from "next/link";
export default function Navbar() {
  const [show, setShow] = useState(false);
  return (
    <div className="  bg-white fixed top-0 left-0 right-0 z-50 ">
      <div className="flex justify-between lg:container mx-auto items-center py-7 px-6 lg:px-0">
        <div>
          <p className=" text-[#DEB666] font-extrabold text-xl ">
            BOOKING NOW.
          </p>
        </div>

        <div className=" flex items-center">
          <div className="lg:hidden ">
          {
            !show && <FontAwesomeIcon
            icon={faBarsStaggered}
            size="lg"
            className="h-7 text-[#DEB666] md:invisible"
            onClick={() => setShow((prev) => !prev)}
          />
           }          </div>
          <div className=" hidden lg:flex items-center ">
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
  );
}