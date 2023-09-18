"use client";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Modal } from "antd";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
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
import "./style.css";

function Preview({
  sendData,
  setSuccessPage,
  openMessage,
  marqueeImage,
  userInformation,
  checkData,
  selectedMenu,
}) {
  const { hallInformation } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      const response = await getDocs(collection(db, "Book Marquee"));
      const tempArray = response.docs.map((doc) => doc.data());
      setBlogs(tempArray);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const nextPage = () => {
    sendData();
    setSuccessPage(true);
    openMessage();
  };

  let a = parseInt(userInformation?.Heating);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* IMAGE DIV */}

      <div className="md:container md:w-[920px] flex flex-col justify-center mx-auto border px-3 md:px-7 py-4 rounded-lg">
        <div className="flex justify-center object-cover">
          <img
            src={hallInformation?.image}
            alt=""
            className=" md:w-[920px]  md:h-56 rounded-xl cursor-pointer object-cover "
          />
        </div>

        {/* HALL'S DIV */}
        <div className="bg-bgColor p-4 md:p-7 flex flex-col  md:flex md:flex-row justify-between mt-6 rounded-lg">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center justify-start my-3 md:my-5 px-3">
              <div>
                <Image src={hall} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Hall Name</p>
                <p>{hallInformation?.name}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg md:w-[350px] ">
            <div className="flex items-center justify-start my-3 md:my-5 px-3">
              <div>
                <Image src={capacity} alt="Image" height={35} width={35} />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Sitting Capacity</p>
                <p>{hallInformation?.maxCapacity}</p>
              </div>
            </div>
          </div>
        </div>

        {/* USERINFORMATION'S DIV */}

        <div className="bg-bgColor px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between my-6 rounded-lg">
          {/* FIRST */}

          <div className="flex flex-col md:flex md:flex-row justify-between mb-3 md:mb-0">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-3 md:my-5 px-3">
                <div>
                  <Image src={nameImg} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Name</p>
                  <p>
                    {userInformation?.firstName} {userInformation?.lastName}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:w-[350px]">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={email} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Email</p>
                  <p>{userInformation?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SECOND */}

          <div className="flex flex-col md:flex md:flex-row justify-between mb-3 md:my-5">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={call} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Phone</p>
                  <p>{userInformation?.PhoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:w-[350px]">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={address} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Address</p>
                  <p>{userInformation?.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* THIRD */}

          <div className="flex flex-col md:flex md:flex-row justify-between mb-3 md:mb-0">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={notes} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Notes</p>

                  <p>{userInformation?.notes}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:w-[350px]">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={facilites} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Facilities</p>
                  <div className="flex flex-col">
                    <Link
                      onClick={() => setOpen(true)}
                      className="text-blue-600 underline"
                      href="#"
                    >
                      {`${userInformation?.services?.length} Services`}
                    </Link>
                    <Modal
                      title="Services"
                      centered
                      visible={open}
                      onOk={() => setOpen(false)}
                      onCancel={() => setOpen(false)}
                      footer={null}
                    >
                      <ul>
                        {userInformation?.services?.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHOOSE MENU */}
        <div className="bg-bgColor p-3 md:p-6 rounded-lg">
          <div className="bg-white px-3 rounded-lg pt-5">
            <div className="flex justify-between mx-5 font-semibold font-sc">
              <p>{hallInformation?.name}</p>
              <p>Rs {hallInformation?.price}</p>
            </div>
            <div className="flex items-center">
              <div className="ml-3">
                <p className="font-sc my-4">
                  This menu contains the following items :
                </p>
                <div className="flex flex-col bg-bgColor rounded-lg w-52 p-2 my-3">
                  {selectedMenu?.dishes?.map((item, index) => (
                    <div
                      className="flex items-center font-sc space-y-2 "
                      key={index}
                    >
                      <div className="bg-matteBlack h-4 w-4 rounded-full mr-3 "></div>
                      <p className=""> {item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end ">
        <button className="border px-9 py-2 my-3 bg-primaryColor rounded-md text-white font-bold">
          Next
        </button>
      </div>
    </div>
  );
}

export default Preview;
