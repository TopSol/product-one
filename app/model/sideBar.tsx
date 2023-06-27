import React from "react";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
export default function sideBar() {
  return (
    <div className="w-[300px] h-[100vh] lg:hidden bg-white absolute top-0">
      <h1 className="text-center bg-gray-200 py-7 ">MENU</h1>
      <ul className="space-y-4 ">
        <li className="cursor-pointer ml-6 mt-5">
          <Link href="/">Home</Link>
        </li>
        <hr />

        <li className="cursor-pointer ml-6 ">
          <Link href="/pages/marquee">Marquee </Link>
        </li>
        <hr />
        <li className="pl-6 cursor-pointer">About</li>
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
        </button>
      </ul>
    </div>
  );
}
