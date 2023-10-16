"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import nameImg from "../../assets/images/user.svg";
import email from "../../assets/images/email-1-svgrepo-com.svg"; 
import call from "../../assets/images/call.svg";
import address from "../../assets/images/address-location-map-svgrepo-com 1.svg";
import notes from "../../assets/images/notes.svg";
import hall from "../../assets/images/hall.svg";
import foodIcon from "../../assets/images/menuIcon.svg";
import eventIcom from "../../assets/images/eventType.svg";
import saIcon from "../../assets/images/sittingArg.svg";
import capacity from "../../assets/images/chair.svg";
import calander from "../../assets/images/calender.svg";
import peoples from "../../assets/images/peoples.svg";
import facilites from "../../assets/images/facilites.svg";
import { Modal, Carousel } from "antd";
import Link from "next/link";
import { getFormatDates } from "@/app/utils";
interface MarqueeData {
  marqueeId: string;
  firstName?: string;
  services: string[];
  lastName: string;
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
  mealType: string;
  phoneNumber: string;
  address: string;
  menu: string;
  maximumCapacity: number;
  venuePrice: number;
  NumberOfPeople: string;
  marqueeHonerPhoneNumber: string;
  eventType: string;
  marqueeLocation: string;
  image: string[];
  dishes: {
    perHead: number;
    name: string;
    totalDiscount: number;
    nameAndPriceArray: {
      price: number;
      name: string;
    }[];
    nameAndPriceArrays: {
      price: number;
      name: string;
    }[];
  };
  id: string;
  email: string;
  venueName: string;
  notes: string;
  minimumCapacity: number;
}

function PreviewDetails() {
  const [previewDetails, setPreviewDetails] = useState<MarqueeData>();
  const [open, setOpen] = useState(false);
  const params = useSearchParams();
  const id = params.get("id");
  const fetchData = async () => {
    const q = query(collection(db, "contactUs"), where("id", "==", id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPreviewDetails(doc.data() as MarqueeData);
    });
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    <div className="md:container bg-bgColor  md:mx-auto my-5 flex flex-col justify-center items-center mx-auto border px-3 md:px-7 py-4 rounded-lg">
      {/* <Carousel autoplay className="rounded-xl">
          {previewDetails?.image?.map((item, index) => (
            <div className="flex justify-center object-cover" key={index}>
              <img
                src={item}
                alt="Images"
                className=" md:w-[920px] md:h-56 rounded-xl cursor-pointer object-cover "
              />
            </div>
          ))}
        </Carousel> */}
      <div className="bg-bgColor w-[70%] px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between mt-3 md:mt-6 rounded-lg">
        {/* FIRST */}
        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold text-xl font-vollkorn">
            User Information
          </p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
        </div>

        <div className="flex flex-col md:flex md:flex-row justify-between  md:mb-4 md:space-x-3 lg:space-x-0">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-3 md:my-5 px-3">
              <div>
                <Image src={nameImg} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Name</p>
                <p>
                  {previewDetails?.firstName} {previewDetails?.lastName}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={email} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Email</p>
                <p>{previewDetails?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND */}

        <div className="flex flex-col md:flex md:flex-row justify-between md:mb-4 md:space-x-3 lg:space-x-0">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={call} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Phone</p>
                <p>{previewDetails?.phoneNumber}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={address} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Address</p>
                <p>{previewDetails?.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Third */}

        <div className="flex flex-col md:flex md:flex-row justify-between  md:mb-4 md:space-x-3 lg:space-x-0">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={saIcon} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Table's Type</p>
                <p className="text-xs md:text-sm">
                  {previewDetails?.tableShape}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={foodIcon} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Meal's Time</p>
                <p>{previewDetails?.mealType}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Forth */}
        <div className="flex flex-col md:flex md:flex-row justify-between  md:mb-4 md:space-x-3 lg:space-x-0">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={peoples} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Number Of Geusts</p>
                <p className="text-xs md:text-sm">
                  {previewDetails?.NumberOfPeople}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={eventIcom} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Event Type</p>
                <p>{previewDetails?.eventType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fifth */}

        <div className="flex flex-col md:flex md:flex-row justify-between md:mb-4 md:space-x-3 lg:space-x-0 ">
          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
            <div className="flex items-center my-5 px-3">
              <div>
                <Image src={notes} alt="Image" />
              </div>
              <div className="ml-3">
                <p className="font-semibold">Notes</p>

                <p>{previewDetails?.notes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
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
                    {`${previewDetails?.services?.length} Services`}
                  </Link>
                  <Modal
                    title="Services"
                    centered
                    open={open}
                    onOk={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                    footer={null}
                  >
                    <ul>
                      {previewDetails?.services?.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Sixth */}
        <div className="">
          <div className="bg-white rounded-lg py-1 mb-3 md:mb-0">
            <div className="flex items-center my-4 px-3">
              <div>
                <Image src={calander} alt="Image" />
              </div>
              <div className="ml-3 w-full">
                <p className="font-semibold">Dates</p>
                <p className="text-xs md:text-base flex">
                  {previewDetails?.dates &&
                    typeof previewDetails?.dates === "object" &&
                    Object.values(previewDetails.dates).map((item,index) => {
                      const dates: any = getFormatDates([item]);
                      const date = new Date(dates);
                      const formattedDate = `${(date.getMonth() + 1)
                        .toString()
                        .padStart(2, "0")}-${date
                        .getDate()
                        .toString()
                        .padStart(2, "0")}-${date.getFullYear()}`;
                      return <span className=" pl-2" key={index}> {formattedDate} </span>;
                    })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Information */}

      <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold text-xl font-vollkorn">
            Menu Information
          </p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
      </div>
      <div className={` p-3 bg-white w-[65%] rounded-xl flex md:mx-0 flex-col mb-2 cursor-pointer`}>
          <div
            className={`flex items-center justify-between mb-3`}
          >
            <p className="text-center text-xl">{previewDetails?.menu}</p>
            <p className="text-xl flex flex-col justify-end my-auto">
              {" "}
              {/* Rs {selectedMenu?.perHead} / PerHead */}
            </p>
          </div>
          <div>
            <p className=" font-sc my-4">
              This menu contains the following items :
            </p>
          </div>
          <div className="w-full">
            <ul>
              { previewDetails?.dishes?.nameAndPriceArrays?.map((dish, i) => {
                  return (
                    <div className="flex items-center py-1" key={i}>
                      <div className={`bg-textColor h-3 w-3 rounded-full mr-3 `}></div>
                      <div className="flex justify-between w-full">

                      <li className="">{dish.name}</li>
                      <li className=" font-poppins ">RS {dish.price}</li>
                      </div>
                    </div>
                  );
               
              })}
            </ul>
          </div>
           

           {/* Add one */}

          <div
            className={`flex items-center justify-between mt-3 mb-6`}
          >
            <p className="text-center text-xl">Add on</p>
            <p className="text-xl flex flex-col justify-end my-auto">
              {" "}
              {/* Rs {selectedMenu?.totalDiscount} / PerHead */}
            </p>
          </div>
          <div>
            <p className=" font-sc">
              This menu contains the following items :
            </p>
          </div>
          <div className="w-full">
            <ul>
              {previewDetails?.dishes?.nameAndPriceArray?.map((dish, i) => {
                  return (
                    <div className="flex items-center py-1" key={i}>
                    <div className={`bg-textColor h-3 w-3 rounded-full mr-3 `}></div>
                    <div className="flex justify-between w-full">

                    <li className="">{dish.name}</li>
                    <li className=" font-poppins ">RS {dish.price}</li>
                    </div>
                  </div>
                  );
                }
               
                )}
            </ul>
          </div>

          {/* Total Price */}

          <div className="flex justify-end w-full my-4">
            <p className="text-xl  justify-end"> Total {parseInt(previewDetails?.dishes?.totalDiscount) * parseInt(previewDetails?.NumberOfPeople)}</p>
          </div>

        </div>

        {/* Hall information */}

        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold text-xl font-vollkorn">
            Hall Information
          </p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
      </div>
      <div className="bg-bgColor w-[70%] px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between rounded-lg  mt-3 md:mt-6">
          {/* First */}
          <div className="flex flex-col md:flex md:flex-row justify-between md:mb-4 md:space-x-3 lg:space-x-0 ">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-3 md:my-5 px-3">
                <div>
                  <Image src={hall} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Hall Name</p>
                  <p>{previewDetails?.venueName}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-3 md:my-5 px-3">
                <div>
                  <Image src={capacity} alt="Image" height={35} width={35} />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Sitting Capacity</p>
                  <p>{previewDetails?.maximumCapacity}</p>
                </div>
              </div>
            </div>
          </div>
          {/* Second */}
          <div className="flex flex-col md:flex md:flex-row justify-between  md:space-x-3 lg:space-x-0 ">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={call} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-bold md:font-semibold text-xs md:text-base">Marquee's Contact Number</p>
                  <p className="text-sm">{previewDetails?.marqueeHonerPhoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:w-[350px]">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={address} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Marquee's Location</p>
                  <p>{previewDetails?.marqueeLocation}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PreviewDetails;
