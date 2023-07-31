"use client";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar";
import "react-image-lightbox/style.css";
import Venues from "./venues";
import Menus from "./menus";
import Availability from "./availability";
import Dish from "./dish";
import Lightbox from "react-image-lightbox";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBellConcierge,
  faUtensils,
  faBowlFood,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import BookedDate from "./bookedDate";
function AdminMarqueeDetails() {
  const [component, setComponent] = React.useState("Venues");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectImage, setSelectImage] = useState("");
  const [image, setImage] = useState([]);
  const [dishModalOpen, setDishModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const sideBar = [
    {
      name: "Venues",
      icon: faBellConcierge,
      color: "gray",
    },
    {
      name: "Dishes",
      icon: faUtensils,
      color: "gray",
    },
    {
      name: "Menus",
      icon: faBowlFood,
      color: "gray",
    },
    {
      name: "Availability",
      icon: faBars,
      color: "gray",
    },
    {
      name: "Booking",
      icon: faCalendar,
      color: "gray",
    }
  ];
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 768) {
        setModalOpen2(true);
      } else {
        setModalOpen2(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const openModal = () => {
    setModalOpen(true);
  };
  const handleClick = (img, index) => {
    setImage(img);
    setSelectImage(img[index]);
    setPhotoIndex(index);
    setIsOpen(true);
  };
 
  return (
    <div className=" h-[100vh]">
      <AdminNavbar />
      <div className="mt-14">
        <div className="sidebar flex">
          <div className="hidden  p-2  absolute">
            <FontAwesomeIcon
              icon={faBars}
              onClick={() => setModalOpen2(!modalOpen2)}
            />
          </div>
          {modalOpen2 ? (
            <div className="w-[130%] md:w-[22%] border flex flex-col shadow-lg">
              <p className="  flex justify-center items-center mx-auto text-xl font-extrabold pl-2 py-5">Marquee</p>
              {sideBar.map((item, index) => (
                <div key={index}>
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
                      <span className="absolute bg-[#F7C815] px-[2px] py-[20px] -mt-2 "></span>
                      ) : null}
                    <span
                      className={`pl-${
                        component === item.name ? "8" : ""
                      } top-0 bottom-0 left-0 right-0  pl-[30px] text-${
                        component !== item.name ? "sidebarColorText" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className=" pr-3 text-[inherit] transition-colors duration-200" 
                        style={{ color: item.color }}
                      />
                      {item.name} 
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="w-[100%]  h-[100vh] ">
            <div className="md:px-5 ">
              {component === "Venues" ? (
                <div className="flex justify-between mx-1  items-center">
                  <p className="text-2xl py-5">Venues</p>
                  <button
                    className="border rounded-md px-2 py-3 font-extrabold text-white bg-[#F7C815] my-4"
                    onClick={() => openModal()}
                  >
                    Add venues
                  </button>
                </div>
              ) : component === "Menus" ? (
                <div className="flex justify-between mx-1  items-center">
                  <p className="text-2xl py-5">Menus</p>
                  <button
                    className="border rounded-md px-3 py-3 font-extrabold text-white bg-[#F7C815] my-4"
                    onClick={() => openModal()}
                  >
                    Add Menu
                  </button>
                </div>
              ) : component === "Dishes" ? (
                <div className="flex justify-between mx-1  items-center">
                  <p className="text-2xl py-5">Dishes</p>
                  <button
                    className="border rounded-md px-3 py-3 font-extrabold text-white bg-[#F7C815] my-4"
                    onClick={() => openModal()}
                  >
                    Add Dish
                  </button>
                </div>
              ) : null}
            </div>

            <div>
              {component === "Venues" ? (
                <Venues
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  handleClick={handleClick}
                  loading={loading}
                  setLoading={setLoading}
                />
              ) : component === "Dishes" ? (
                <Menus
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  handleClick={handleClick}
                  loading={loading}
                  setLoading={setLoading}
                  
                />
              ) : component === "Menus" ? (
                <Dish modalOpen={modalOpen} setModalOpen={setModalOpen} loading={loading}
                setLoading={setLoading} dishModalOpen={dishModalOpen} setDishModalOpen={setDishModalOpen}/>
              ) :  component === "Availability" ? <Availability/>: component === "Booking" ? <BookedDate/> :  null}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Lightbox
          mainSrc={selectImage}
          nextSrc={image[(photoIndex + 1) % image.length]}
          prevSrc={image[(photoIndex + image.length - 1) % image.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + image.length - 1) % image.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % image.length)
          }
        />
      )}
    </div>
  );
}

export default AdminMarqueeDetails;
