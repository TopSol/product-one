"use client";
import React, { useEffect, useState } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStore } from "../../../store";
import { getFormatDates } from "@/app/utils";
import Link from "next/link";
import Image from "next/image";
import dots from "@/app/assets/images/dots.svg";

function BookedDate() {
  const { userInformation } = useStore();
  const [customerInformation, setCustomerInformation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesQuery = query(
          collection(db, "contactUs"),
          where("marqueeId", "==", userInformation.userId)
        );
        const [venuesSnapshot] = await Promise.all([getDocs(venuesQuery)]);

        let venueDataArr = [];
        venuesSnapshot.forEach((doc) => {
          venueDataArr.push(doc.data());
        });
        setCustomerInformation(venueDataArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(detailsData, "detailsDatadetailsData");
  return (
    <div className="md:container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%] my-6">
        {customerInformation?.map((item, index) => {
          return (
            <div
              key={index}
              className=" justify-center items-center md:my-10 md:mx-2 border border-gray-300 rounded-md shadow-md  "
            >
              <div className="flex flex-col justify-center items-center">
                <div className=" bg-primary w-full justify-between items-center flex rounded-t-lg px-3">
                  <Image
                    alt="sdf"
                    src={dots}
                    width={60}
                    height={60}
                    className=" py-9"
                  />
                  <div className="">
                    <a
                      href={`https://wa.me/${item.UserInformation?.PhoneNumber}`}
                      target="_blank"
                    >
                      <WhatsAppOutlined
                        className="text-green-500 text-3xl"
                        width={100}
                        height={100}
                      />
                    </a>
                  </div>
                </div>
                <img
                  className=" h-[167px] w-[167px]  rounded-full -mt-[75px] mb-2"
                  src={item?.selectedHall.image[0]}
                  alt=""
                />
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_45.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base	 leading-[100%] z-20 pt-1">
                      Name
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={
                        item?.UserInformation.firstName +
                        " " +
                        item?.UserInformation.lastName
                      }
                      className="border text-sm outline-none z-10  py-5 mb-3 flex justify-center  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_45.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[140.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Phone Number
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item.UserInformation.PhoneNumber}
                      className="border text-sm outline-none  z-10 w-full  py-5 mb-3 flex justify-center  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_45.5px)] z-20 ml-2 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Email
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item?.UserInformation.email}
                      className="border outline-none  z-10 w-full  py-5 mb-3 flex justify-center text-sm  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4  w-full px-4 ">
                  <div className="absolute top-[calc(50%_-_45.5px)]  z-20 left-[19.89px] bg-white  ml-2 rounded-3xs  w-[80.67px] h-[22.56px] flex flex-row py-px  box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Address
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item.UserInformation.address}
                      className="border outline-none   z-10 w-full  py-5 mb-3 flex justify-center text-sm  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_56.5px)] z-20 ml-2 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Price
                    </p>
                  </div>
                  <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={
                        item?.Menu?.totalDiscount + item?.selectedHall?.price
                      }
                      className="border outline-none  z-10 w-full  py-5 mb-3 flex justify-center text-sm  relative"
                    />
                  </div>
                </div>
                <div className="w-full ">
                  <div className="flex flex-col ">
                    <div className="flex justify-between border-b py-2 shadow">
                      <div className="w-[100%] flex flex-col ju ">
                        <div className="flex justify-between  py-2 px-7 ">
                          <button
                            onClick={() => {
                              setIsModalOpen(true);
                              setDetailsData(item);
                            }}
                            className=" xl:px-4 lg:px-2 px-3  py-2 bg-primary text-white rounded-md"
                          >
                            Details
                          </button>
                          <button className=" xl:px-4 lg:px-2 px-3 py-2 bg-green-500 text-white rounded-md">
                            Accept
                          </button>
                          <button className=" xl:px-4 lg:px-2 px-3 py-2 bg-red-500 text-white rounded-md">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Modal
        className=" modal  w-full text-center"
        centered
        open={isModalOpen}
        footer={null}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setIsModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        }
      >
        <div className="mr-auto bg-primary w-full flex rounded-t-lg">
          <Image alt="sdf" src={dots} width={40} height={40} className="ml-3" />
          <p className="text-xl pl-3 text-white py-4">Details</p>
        </div>
        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold text-xl font-vollkorn">
            Hall Information
          </p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Name</p>
          <p>{detailsData?.selectedHall?.name}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Minimum Capacity</p>
          <p>{detailsData?.selectedHall?.minCapacity}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Maximum Capacity</p>
          <p>{detailsData?.selectedHall?.maxCapacity}</p>
        </div>
        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold text-xl font-vollkorn">
            Menu Information
          </p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Name</p>
          <p>{detailsData?.Menu?.name}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Dishes</p>
          {
            <Link
              onClick={() => setIsNestedModalOpen(true)}
              className="text-blue-600 underline"
              href=""
            >
              {detailsData?.Menu?.dishes.length} Dishes
            </Link>
          }
        </div>

        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Price</p>
          <p>{detailsData?.Menu?.price}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Discount Amount</p>
          <p>{detailsData?.Menu?.discountAmount}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Net Price</p>
          <p>{detailsData?.Menu?.totalDiscount}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Dishes</p>
          <div className="flex flex-col ">
          {detailsData?.dates &&
              typeof detailsData?.dates === "object" &&
              Object.values(detailsData.dates).map((item) => {
                const dates = getFormatDates([item]);
                const date = new Date(dates);
                const formattedDate = `${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${date.getFullYear()}`;
                return <p className="w-[100%]">{formattedDate}</p>;
              })}
            {/* {detailsData?.dates?.map((item) => {
              const dates = getFormatDates([item]);
              const date = new Date(dates);
              const formattedDate = `${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}-${date.getFullYear()}`;
              return <p className="w-[100%]">{formattedDate}</p>;
            })} */}
          </div>
        </div>
      </Modal>
      <Modal
        className=" modal  w-full text-center"
        open={isNestedModalOpen}
        footer={null}
        centered
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setIsNestedModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        }
      >
        <>
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              alt="sdf"
              src={dots}
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4">Dishes Name</p>
          </div>
          <div className="p-5">
            {detailsData?.Menu?.dishes?.map((item, index) => (
              <div key={index} className="flex items-center ">
                <span className="w-4 h-4 rounded-full bg-primary"></span>
                <p className="text-lg pl-3 py-2"> {item}</p>
              </div>
            ))}
          </div>
        </>
      </Modal>
    </div>
  );
}
export default BookedDate;
