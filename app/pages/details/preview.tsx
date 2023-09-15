"use client";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Modal } from "antd";
import Link from "next/link";
import Image from "next/image";
import nameImg from "../../assets/images/user.svg";
import email from "../../assets/images/email-1-svgrepo-com.svg";
import call from "../../assets/images/call.svg";
import address from "../../assets/images/address-location-map-svgrepo-com 1.svg";
import notes from "../../assets/images/notes.svg";
import hall from "../../assets/images/hall.svg";
import capacity from "../../assets/images/chair.svg";
import price from "../../assets/images/dollor.svg";
import facilites from "../../assets/images/facilites.svg";
import dish from "../../assets/images/menuIcon.svg";
import menus from "./data";
import dots from "@/app/assets/images/dots.svg";
import { useStore } from "@/store";
import "./style.css";
import { useSearchParams } from "next/navigation";

function Preview({
  hallInformation,
  sendData,
  setSuccessPage,
  openMessage,
  marqueeImage,
  userInformation,
  checkData,
  selectedMenu,
  
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [showFacilities, setShowFacilities] = useState(false);
  const [blogs, setBlogs] = useState([]);
  console.log("hallInformation", hallInformation);
  const fetchBlogs = async () => {
    try {
      const response = await getDocs(collection(db, "Book Marquee"));
      const tempArray = response.docs.map((doc) => doc.data());
      setBlogs(tempArray);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  // console.log("userInformationnnnnnn", userInformation);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const nextPage = () => {
    sendData();
    setSuccessPage(true);
    openMessage();
  };

  let a = parseInt(userInformation?.Heating);
  // let b = parseInt(Menu?.Heating);

  // const total = `${hallInformation[0]?.selectedHall?.price} + ${hallInformation[0]?.Menu?.price}`;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  console.log(userInformation, "userInformation");
  console.log(selectedMenu, "userInformation1");
  
 console.log("abc");
const params = useSearchParams();
 const name = params.get("name");
  console.log("NameName", name?.split(','));
 
  return (
    <div className="md:container md:mx-auto mx-3">
      <div className="border w-auto md:w-[700px]  p-3 md:p-8  flex flex-col justify-center mx-auto rounded-xl">
        <div className="flex justify-center object-cover">
          <img
            src="https://api.asm.skype.com/v1/objects/0-sa-d8-bb1064670a8eef24524829aa6ed1677f/views/imgpsh_fullsize_anim"
            alt=""
            className=" md:w-[650px]  md:h-64 rounded-xl cursor-pointer object-cover "
          />
        </div>
        <div className=" flex justify-center ">
          <div className="w-[100%] md:flex  md:justify-between mx-auto items-center justify-center">
            <div className="font-Manrope">
              <div className="flex items-center my-5 ">
                <div>
                  <Image src={nameImg} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Name</p>
                  <p>
                    {userInformation?.firstName}{" "}
                    {userInformation?.lastName}
                  </p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={call} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Phone</p>

                  <p>{userInformation?.PhoneNumber}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={notes} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Notes</p>

                  <p>{userInformation?.notes}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={capacity} alt="Image" height={35} width={35} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Capacity</p>
                  <p>{name?.[0]}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={facilites} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Facilities</p>
                  <div>
                    {/* {hallInformation[0]?.selectedHall?.services[0] && ( */}
                      <p>Heating</p>
                    {/* )} */}
                  </div>
                </div>
              </div>
            </div>

            <div className="font-Manrope">
              <div className="flex items-center my-5">
                <div>
                  <Image src={email} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Email</p>
                  <p>{userInformation?.email}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={address} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Address</p>
                  <p>{userInformation?.address}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={hall} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Hall Name</p>

                  <p>{"Hall 1"}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={price} alt="Image" height={35} width={35} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Price</p>
                  <p>{selectedMenu?.price}</p>
                </div>
              </div>
              <div className="flex items-center my-5">
                <div>
                  <Image src={dish} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Dishes</p>
                  <div className="flex flex-col">
                    {
                      <Link
                        onClick={showModal}
                        className="text-blue-600 underline"
                        href=""
                      >
                        {`${selectedMenu?.dishes?.length} Dishes`}
                      </Link>
                    }

                    <Modal
                      title="Dishes"
                      open={isModalOpen}
                      footer={null}
                      onCancel={handleCancel}
                    >
                      {" "}
                      {selectedMenu?.dishes?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end ">
        <button
          className="border px-9 py-2 my-3 bg-primaryColor rounded-md text-white font-bold"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Preview;
