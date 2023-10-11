"use client";
import React, { useEffect, useState } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Input, Modal } from "antd";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStore } from "../../../store";
import { useRouter } from 'next/navigation';
import { getFormatDates } from "@/app/utils";
import { sendMail } from "@/app/api/route";
import Link from "next/link";
import Image from "next/image";
import dots from "@/app/assets/images/dots.svg";
import TextArea from "antd/es/input/TextArea";
import MailSender from "./mailSender/page";
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
  const [email, setEmail] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState<marqueeBookingRecord>();
  const router = useRouter()
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

  console.log("email :" , email);
  
  
  return (
    <>
  
    <div className="md:container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%] my-6">
        {customerInformation?.map((item, index) => {
          return (
            <div
              key={index}
              className=" justify-center items-center md:my-10 md:mx-2  rounded-md shadow-md  "
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
                              router.push(`/pages/admainMarqueeDetails/previewDetails?id=${item.id}`)
                              // setIsModalOpen(true);
                              // setDetailsData(item);
                            }}
                            className=" xl:px-4 lg:px-2 px-3  py-2 bg-primary text-white rounded-md"
                          >
                          {/* <Link href={""}> */}
                          Details
                          {/* </Link>   */}
                          </button>
                          <button
                            onClick={() => {
                              setEmail(item?.email)
                              setModalOpen(true)
                            }}
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
      </div>
      <MailSender 
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      email={email}
      />
      </>
      )
}
export default BookedDate;
