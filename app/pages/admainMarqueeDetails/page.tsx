"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import "react-image-lightbox/style.css";
import Venues from "./venues";
import Menus from "./menus";
import Dish from "./dish";
import Lightbox from "react-image-lightbox";
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

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectImage, setSelectImage] = useState("");
  const [image, setImage] = useState([]);

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
                    </div>
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
                <Venues
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  handleClick={handleClick}
                />
              ) : component === "Dish" ? (
                <Menus modalOpen={modalOpen} setModalOpen={setModalOpen} handleClick={handleClick}/>
              ) : component === "Menu" ? (
                <Dish modalOpen={modalOpen} setModalOpen={setModalOpen} />
              ) : null}
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
