import React from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
export default function sideBar({ setShow }) {
  return (
    <div className="w-[300px] h-[100vh] lg:hidden bg-white absolute top-0">
      <div className="bg-gray-200 py-7 flex justify-between px-3 ">
        <h1 className="text-center">MENU</h1>
        <FontAwesomeIcon icon={faBarsStaggered} size="xl" className=" h-7 text-[#DEB666] lg:hidden  " onClick={() => setShow(pre => !pre)} />
      </div>
      <ul className="space-y-4 ">
        <li className="cursor-pointer ml-6 mt-5">
          <Link href="/">Home</Link>
        </li>
        <hr />

        <li className="cursor-pointer ml-6 ">
          <Link href="/marquee">Marquee </Link>
        </li>
        <hr />
        {/* <li className="pl-6 cursor-pointer">About</li>
        <hr />
        <li className="pl-6 cursor-pointer">Services</li>
        <hr />
        <li className="pl-6 cursor-pointer">Blog</li>
        <hr />
        <li className="pl-6 cursor-pointer">Help</li>
        <hr />
        <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-6 font-roboto rounded-md">
          <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
          Booking Now
        </button> */}
      </ul>
    </div>
  );
}
