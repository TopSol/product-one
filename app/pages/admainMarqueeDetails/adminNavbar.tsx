"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import SideBar from "@/app/model/sideBar";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

// ... (previous imports)

export default function AdminNavbar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const ShowSideBar = () => {
    setShow(!show);
  };
  const handleLogout = () => {
    router.push("/pages/auth");
  };
  const items = [
    {
      label: <p>Marquee Name</p>,
      key: "0",
      icon: <FontAwesomeIcon icon={faHotel} />,
    },
    {
      label: <p>mumarhussain126@gmail.com</p>,
      key: "1",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
    {
      label: <p>Setting</p>,
      key: "2",
      icon: <FontAwesomeIcon icon={faGear} />,
    },

    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "3",
      icon: <FontAwesomeIcon icon={faRightFromBracket} />,
    },
  ];
  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between flex-row-reverse mx-auto items-center py-2 shadow-lg px-4 md:px-7">
        <div className="w-full flex justify-center items-center flex-row-reverse">
          <p className="md:hidden">
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </p>
          <p className="text-black font-extrabold text-xl">BOOKING NOW.</p>
        </div>
        <div className="flex items-center">
          <p className="lg:hidden">
            <FontAwesomeIcon
              icon={faBarsStaggered}
              size="xs"
              className="h-7 text-[#DEB666]"
              onClick={ShowSideBar}
            />
          </p>

          <div className="hidden lg:flex items-center">
            <button className=" ml-10  text-white bg-[#DEB666] hover:bg-[#DEB999] py-3 px-6 font-roboto rounded-md">
              <FontAwesomeIcon icon={faCalendarDays} className="mr-2" />
              Booking Now
            </button>

            <Dropdown
              menu={{
                items,
              }}
              placement="bottomRight"
              arrow
              trigger={["click"]}
              overlayStyle={{ width: "250px" }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <img
                  className="w-10 h-10 rounded-full ml-10 cursor-pointer"
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  alt=""
                  // No need for event, we can pass an empty function
                />
              </a>
            </Dropdown>
          </div>
        </div>
      </div>
      {show ? <SideBar /> : null}
    </div>
  );
}
