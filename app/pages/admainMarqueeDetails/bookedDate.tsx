"use client";
import React, { useEffect, useState } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStore } from "../../../store";
import { getFormatDates } from "@/app/utils";
import { sendMail } from "@/app/api/route";
import Link from "next/link";
import Image from "next/image";
import dots from "@/app/assets/images/dots.svg";
import TextArea from "antd/es/input/TextArea";
interface marqueeBookingRecord {
  marqueeHonerPhoneNumber: string;
  marqueeLocation: string;
  lastName: string;
  firstName: string;
  eventType: string;
  services: string[];
  image: string[];
  NumberOfPeople: string;
  dates: {
    from: {
      seconds: number;
      nanoseconds: number;
    };
    to: {
      seconds: number;
      nanoseconds: number;
    };
  };
  address: string;
  venueName: string;
  notes: string;
  email: string;
  minimumCapacity: number;
  id: string;
  marqueeId: string;
  maximumCapacity: number;
  mealType: string;
  venuePrice: number;
  phoneNumber: string;
  menu: string;
  dishes: {
    nameAndPriceArray: {
      name: string;
      price: number;
    }[];
    name: string;
    perHead: number;
    totalDiscount: number;
    nameAndPriceArrays: {
      name: string;
      price: number;
    }[];
  };
}

function BookedDate() {
  const { userInformation } = useStore();
  const [customerInformation, setCustomerInformation] = useState<
    marqueeBookingRecord[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [nodeMailer, setNodeMailer] = useState(false);
  const [detailsData, setDetailsData] = useState<marqueeBookingRecord>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesQuery = query(
          collection(db, "contactUs"),
          where("marqueeId", "==", userInformation.userId)
        );
        const [venuesSnapshot] = await Promise.all([getDocs(venuesQuery)]);

        let venueDataArr: marqueeBookingRecord[] = [];
        venuesSnapshot.forEach((doc) => {
          venueDataArr.push(doc.data() as marqueeBookingRecord);
        });
        console.log(venueDataArr, "venueDataArrvenueDataArr");
        setCustomerInformation(venueDataArr);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
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
                      href={`https://wa.me/${item?.phoneNumber}`}
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
                  className=" h-[167px] w-[167px]  rounded-full -mt-[75px] mb-2 object-cover "
                  src={item?.image?.[0]}
                  alt=""
                />
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base	 leading-[100%] z-20 pt-1">
                      Name
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item?.firstName + " " + item?.lastName}
                      className="border text-sm outline-none z-10  py-5 mb-3 flex justify-center  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[140.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Phone Number
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item?.phoneNumber}
                      className="border text-sm outline-none  z-10 w-full  py-5 mb-3 flex justify-center  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 ml-2 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Email
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item?.email}
                      className="border outline-none  z-10 w-full  py-5 mb-3 flex justify-center text-sm  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4  w-full px-4 ">
                  <div className="absolute top-[calc(50%_-_50.5px)]  z-20 left-[19.89px] bg-white  ml-2 rounded-3xs  w-[80.67px] h-[22.56px] flex flex-row py-px  box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      Address
                    </p>
                  </div>
                  <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item?.address}
                      className="border outline-none   z-10 w-full  py-5 mb-3 flex justify-center text-sm  relative"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                  <div className="absolute top-[calc(50%_-_62.5px)] z-20 ml-2 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <p className="absolute text-base leading-[100%] z-20 pt-1">
                      PerHead
                    </p>
                  </div>
                  <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                    <Input
                      placeholder="Name"
                      type="text"
                      name="name"
                      value={item.dishes.totalDiscount}
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
                          <button
                            onClick={() => setNodeMailer(true)}
                            className=" xl:px-4 lg:px-2 px-3 py-2 bg-green-500 text-white rounded-md"
                          >
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
          <p>{detailsData?.venueName}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Minimum Capacity</p>
          <p>{detailsData?.minimumCapacity}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Maximum Capacity</p>
          <p>{detailsData?.maximumCapacity}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Event Type</p>
          <p>{detailsData?.eventType}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Number of people</p>
          <p>{detailsData?.NumberOfPeople}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Notes</p>
          <p>{detailsData?.notes}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Services</p>
          <p>{detailsData?.services}</p>
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
          <p>{detailsData?.menu}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Dishes</p>
          {
            <Link
              onClick={() => setIsNestedModalOpen(true)}
              className="text-blue-600 underline"
              href=""
            >
              {detailsData?.dishes?.nameAndPriceArray?.length} Dishes
            </Link>
          }
        </div>
        {/* 
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Price</p>
          <p>{"255555"}</p>
          <p>{detailsData?.Menu?.price}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Discount Amount</p>
          <p>{"55555"}</p>
          <p>{detailsData?.Menu?.discountAmount}</p>
        </div>
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Net Price</p>
          <p>{"56456"}</p>
          <p>{detailsData?.Menu?.totalDiscount}</p>
        </div> */}
        <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
          <p>Date</p>
          <div className="flex flex-col ">
            {detailsData?.dates &&
              typeof detailsData?.dates === "object" &&
              Object.values(detailsData.dates).map((item) => {
                const dates: any = getFormatDates([item]);
                const date = new Date(dates);
                const formattedDate = `${(date.getMonth() + 1)
                  .toString()
                  .padStart(2, "0")}-${date
                  .getDate()
                  .toString()
                  .padStart(2, "0")}-${date.getFullYear()}`;
                return <p className="w-[100%]">{formattedDate}</p>;
              })}
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
            {detailsData?.dishes?.nameAndPriceArray?.map((item, index) => (
              <div key={index} className="flex items-center ">
                <span className="w-4 h-4 rounded-full bg-primary"></span>
                <div className="flex justify-between  w-full">
                  <p className="text-lg pl-3 py-2"> {item.name}</p>
                  <div className="text-lg  py-2   flex-end ">
                    <div className="flex justify-evenly flex-end ">
                      <span>Rs</span>
                      <span className="flex flex-start w-[50px] ml-2">
                        {item.price}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      </Modal>
      <Modal
        className=" modal  w-full text-center"
        centered
        open={nodeMailer}
        footer={null}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setNodeMailer(false)}
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
        <div className="my-10">
        <div className="flex flex-col items-start relative md:mt-7 mt-4 w-full px-10">
          <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-base	 leading-[100%] z-20 pt-1">Name</p>
          </div>
          <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              className="border text-sm outline-none z-10  py-5 mb-3 flex justify-center  relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-7 mt-4 w-full px-10">
          <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-base	 leading-[100%] z-20 pt-1">Name</p>
          </div>
          <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
            <Input
              placeholder="Enter Subject Here"
              type="text"
              name="name"
              className="border text-sm outline-none z-10  py-5 mb-3 flex justify-center  relative"
            />
          </div>
        </div>
        <div className="flex flex-col items-start relative md:mt-7 mt-4 w-full px-10">
          <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
            <p className="absolute text-base	 leading-[100%] z-20 pt-1">Name</p>
          </div>
          <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
            <TextArea
              placeholder="Enter Description Here"
              name="name"
              className="border text-sm outline-none z-10  py-5 mb-3 flex justify-center  relative"
            />
          </div>
        </div>
        </div>

      </Modal>
    </div>
  );
}
export default BookedDate;
