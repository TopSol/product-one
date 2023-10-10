"use client";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { faBellConcierge, faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useStore } from "@/store";
import { getAuth } from "firebase/auth";
import Image from "next/image";
import logo from "@/app/assets/images/image1.svg";
export default function AdminNavbar({ setModalOpen2, setRemoveMenuIcon }) {
  const router = useRouter();
  const { userInformation, addUser, deleteDates, lunchDinner } = useStore();
  const auth = getAuth();
  const { registration,deletAdminMarqueeData } = useStore();
  const emptyObJect = {};
  const handleLogout = () => {
    deleteDates();
    addUser("");
    deletAdminMarqueeData()
    router.push("/pages/auth");
  };
  const items = [
    {
      label: <p>{userInformation.name}</p>,
      key: "0",
      icon: <FontAwesomeIcon icon={faHotel} className="text-primaryColor" />,
    },
    {
      label: <p>{userInformation.email}</p>,
      key: "1",
      icon: <FontAwesomeIcon icon={faEnvelope} className="text-blue-500" />,
    },
    {
      label: <p>Setting</p>,
      key: "2",
      icon: <FontAwesomeIcon icon={faGear} className="text-gray-500" />,
    },

    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "3",
      icon: (
        <FontAwesomeIcon icon={faRightFromBracket} className="text-red-500" />
      ),
    },
  ];
  const sideBar = [
    {
      name: "Venues",
      icon: faBellConcierge,
    },
    {
      name: "Dish",
      icon: faUtensils,
    },
    {
      name: "Menu",
      icon: faUtensils,
    },
  ];

  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto flex justify-between items-center py-2 px-4 md:px-7 shadow">
        <div className="block md:hidden">
          <p>
            <FontAwesomeIcon
              icon={faBarsStaggered}
              size="sm"
              className="h-7 text-primary cursor-pointer"
              onClick={() => {
                setRemoveMenuIcon((pre) => !pre);
                setModalOpen2((prev) => !prev);
              }}
            />
          </p>
        </div>
        <div className="block md:flex md:items-center ">
          <div className="hidden md:block">
            <Image
              src={logo}
              width={40}
              alt="Picture of the author"
            />
          </div>
          <div className="mr-0 md:ml-8">
            <p className=" text-primary font-poppins ">BOOKING MARQUEE</p>
          </div>
        </div>
        <div className="flex items-center">
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
                className="w-10 h-10 rounded-full cursor-pointer"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}
