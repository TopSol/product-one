"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import Venues from "./venues";
import Menus from "./menus";
import Dish from "./dish";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBellConcierge,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

function AdminMarqueeDetails() {
  const [component, setComponent] = React.useState("Venues");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const sideBar = [
    {
      name: "Venues",
      icon: faBellConcierge,
    },
    {
      name: "Menu",
      icon: faUtensils,
    },
    {
      name: "Dish",
      icon: faUtensils,
    },
  ];
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      console.log(windowWidth, "windowWidth");
      if (windowWidth >= 768) {
        setModalOpen2(true);
      } else {
        setModalOpen2(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      {/* <Navbar /> */}
      <div className="">
        <div className="  sidebar flex h-[100vh]  ">
          <div className="  md:hidden flex p-2  absolute">
            <FontAwesomeIcon
              icon={faBars} 
              onClick={() => setModalOpen2(!modalOpen2)}
            />
          </div>
          {modalOpen2 ? (
            <div className="w-[130%] md:w-[15%] border flex flex-col">
              <p className=" text-xl pl-2 py-5">Marquee</p>
              {sideBar.map((item, index) => (
                <button
                  className={`side w-full text-left py-2 ${
                    component === item.name ? "bg-sidebarColor" : ""
                  }`}
                  onClick={() => {
                    console.log(item.name, "item.name");
                    setComponent(item.name);
                    setModalOpen1(!modalOpen1);
                    if (window.innerWidth <= 768) {
                      setModalOpen2(!modalOpen2);
                    }
                  }}
                >
                  {component === item.name ? (
                    <span className="bg-sidebarItemColor px-[2px] pt-[11px] pb-[9px]" />
                  ) : null}
                  <span
                    className={`pl-${
                      component === item.name ? "8" : ""
                    } pl-[29px] text-${
                      component !== item.name ? "sidebarColorText" : ""
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} className="pr-3" />
                    {item.name}
                  </span>
                </button>
              ))}
            </div>
          ) : null}

          <div className="w-[100%] md:w-[85%] h-[100vh] overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200 md:px-5 ">
            <div>
              {component === "Venues" ? (
                <div>
                  <p className="text-2xl py-5">Venues</p>
                  <div className="border-b  w-[100%] "></div>
                  <button
                    className="border rounded-md px-3 py-3 m-2 bg-sidebarItemColor my-4"
                    onClick={() => openModal()}
                  >
                    Add venues
                  </button>
                </div>
              ) : component === "Menu" ? (
                <div>
                  <p className="text-2xl py-5">Menu</p>
                  <div className="border-b  w-[100%] "></div>
                  <button
                    className="border rounded-md px-3 py-3 m-2 bg-sidebarItemColor my-4"
                    onClick={() => openModal()}
                  >
                    Add Menu
                  </button>
                </div>
              ) : component === "Dish" ? (
                <div>
                  <p className="text-2xl py-5">Dish</p>
                  <div className="border-b w-[100%] "></div>
                  <button
                    className="border rounded-md px-3 py-3 m-2 bg-sidebarItemColor my-4"
                    onClick={() => openModal()}
                  >
                    Add Dish
                  </button>
                </div>
              ) : null}
            </div>

            <div>
              {component === "Venues" ? (
                <Venues modalOpen={modalOpen} setModalOpen={setModalOpen} />
              ) : component === "Menu" ? (
                <Menus modalOpen={modalOpen} setModalOpen={setModalOpen} />
              ) : component === "Dish" ? (
                <Dish modalOpen={modalOpen} setModalOpen={setModalOpen} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMarqueeDetails;
