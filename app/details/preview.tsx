"use client";
import React from "react";
import { useEffect, useState } from "react";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Modal, Carousel, Spin, message } from "antd";
import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { marqueeReservationTemplete } from "@/templetes";
import { getMessaging, getToken } from "firebase/messaging";
import firebase from "firebase/app"
import 'firebase/messaging';
import Link from "next/link";
import Image from "next/image";
import nameImg from "../assets/images/user.svg";
import email from "../assets/images/email-1-svgrepo-com.svg";
import call from "../assets/images/call.svg";
import address from "../assets/images/address-location-map-svgrepo-com 1.svg";
import notes from "../assets/images/notes.svg";
import hall from "../assets/images/hallbg.svg";
import foodIcon from "../assets/images/menuIcon.svg";
import eventIcom from "../assets/images/eventType.svg";
import saIcon from "../assets/images/sittingArg.svg";
import capacity from "../assets/images/chair.svg";
import calander from "../assets/images/calender.svg";
import peoples from "../assets/images/peoples.svg";
import facilites from "../assets/images/facilites.svg";
import "./style.css";

function Preview({
  setSuccessPage,
  userInformation,
  marqueeId,
  selectedMenu,
  setSlider,
}) {
  const { bookedDates, marqueeData, marqueeImage } = useStore();
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
  // const [dates, setDates] = useState();
  // const [sendData, setSendData] = useState<string>();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const fetchBlogs = async () => {
    try {
      const response = await getDocs(collection(db, "Book Marquee"));
      const tempArray: any = response.docs.map((doc) => doc.data());
      setBlogs(tempArray);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);



  let a = parseInt(userInformation?.Heating);
  const formatDate = (dateString) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );

    const dateParts = formattedDate.split(" ");
    let day = dateParts[1];
    if (day?.length === 1) {
      day = `0${day}`;
    }
    return `${dateParts[0]} ${day}${dateParts[2]}`;
  };

  const fromDate = formatDate(bookedDates.from);
  const toDate = formatDate(bookedDates.to);

  const nextPage = async () => {
    setLoader((pre) => !pre);
    const fieldId = Math.random().toString(36).slice(2);
    const users = {
      image: marqueeImage?.image,
      minimumCapacity: marqueeImage?.minCapacity,
      maximumCapacity: marqueeImage?.maxCapacity,
      venueName: marqueeImage?.name,
      venuePrice: marqueeImage?.price,
      dates: bookedDates,
      marqueeHonerPhoneNumber: marqueeData?.data?.phoneNumber,
      marqueeLocation: marqueeData?.data?.address,
      mealType: marqueeData?.lunchType,
      services: userInformation?.services,
      firstName: userInformation?.firstName,
      lastName: userInformation?.lastName,
      email: userInformation?.email,
      phoneNumber: userInformation?.PhoneNumber,
      notes: userInformation?.notes,
      dishes: selectedMenu,
      menu: selectedMenu?.name,
      userId: marqueeId,
      id: fieldId,
      tableShape: userInformation?.tableShape,
      address: userInformation?.address,
      NumberOfPeople: marqueeImage?.numberOfPeople,
      eventType: userInformation?.eventType,
      createAt: Timestamp.now(),
    };
    try {
      // const response = await fetch("http://localhost:3000/api/", {
        const response = await fetch(`${process.env.BASE_URL}api/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInformation?.email,
          subject: "RESERVATION",
          html: marqueeReservationTemplete("", "", "", "", "", "booking"),
        }),
      });
      if (response.status === 200) {
        message.success("Your email has been successfully sent");

      } else {
        console.error("API call failed:", response.statusText);
        console.error("Oops, something went wrong");
      }

      await setDoc(doc(db, "contactUs", fieldId), users);
      setSuccessPage(true);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };
  const adadf=process.env.BASE_URL 
console.log(adadf,"sssssssff");



  return (
    <div>
      {/* IMAGE DIV */}
      <div className="md:container md:w-[920px] flex flex-col justify-center mx-auto border px-3 md:px-7 py-4 rounded-lg">
        <Carousel autoplay className="rounded-xl">
          {marqueeImage?.image.map((item, index) => (
            <div className="flex justify-center object-cover" key={index}>
              <img
                src={item}
                alt="Images"
                className=" md:w-[920px] md:h-56 rounded-xl cursor-pointer object-cover "
              />
            </div>
          ))}
        </Carousel>
        {/* USERINFORMATION'S DIV */}

        <div className="bg-bgColor px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between mt-3 md:mt-6 rounded-lg">
          <p className="text-center mb-3 text-2xl">User Information</p>
          {/* FIRST */}

          <div className="flex flex-col md:flex md:flex-row justify-between  md:mb-4 md:space-x-3 lg:space-x-0">
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

            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
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

          <div className="flex flex-col md:flex md:flex-row justify-between md:mb-4 md:space-x-3 lg:space-x-0">
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

            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
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

          {/* Third */}

          <div className="flex flex-col md:flex md:flex-row justify-between  md:mb-4 md:space-x-3 lg:space-x-0">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={saIcon} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Table Type</p>
                  <p className="text-xs md:text-sm">
                    {userInformation?.tableShape}
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
                  <p className="font-semibold">Meal Time</p>
                  <p>{marqueeData?.lunchType}</p>
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
                    {marqueeImage?.numberOfPeople}
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
                  <p>{userInformation?.eventType}</p>
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

                  <p>{userInformation?.notes}</p>
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
          {/* Sixth */}
          {bookedDates?.to === null ? (
            <>
              <div className="bg-white rounded-lg py-1 mb-3 md:mb-0">
                <div className="flex items-center my-4 px-3">
                  <div>
                    <Image src={calander} alt="Image" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Dates</p>
                    <p className="text-xs md:text-base">{`${fromDate}`}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white rounded-lg py-1 mb-3 md:mb-0">
                <div className="flex items-center my-4 px-3">
                  <div>
                    <Image src={calander} alt="Image" />
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold">Dates</p>
                    <p className="text-xs md:text-base">{`${fromDate} - ${toDate}`}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* CHOOSE MENU */}
        <div className="bg-bgColor flex flex-col  p-3 md:p-6 rounded-lg w-full mt-3 md:mt-6">
          <p className="text-center mb-3 text-2xl">Menu Information</p>
          <div
            className={` p-3 bg-white rounded-xl flex md:mx-0 flex-col mb-2 cursor-pointer`}
          >
            {/* First Part */}
            <div className={`flex items-center justify-between mb-3`}>
              <p className="text-center text-xl font-semibold">
                {selectedMenu?.name}
              </p>
            </div>
            <div>
              <p className=" font-sc my-4">
                This menu contains the following items:
              </p>
            </div>
            <div className="w-full">
              <ul>
                {selectedMenu?.nameAndPriceArrays?.map((dish, i) => {
                  return (
                    <div className="flex items-center py-1" key={i}>
                      <div
                        className={`bg-textColor h-3 w-3 rounded-full mr-3 `}
                      ></div>
                      <div className="flex justify-between w-full">
                        <li className="">{dish.name}</li>
                        <li className=" font-poppins ">RS {dish.price}</li>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>

            {selectedMenu?.totalDiscount === undefined ? (
              <div className="flex justify-between w-full my-4">
                <p className="text-xl">
                  PerPerson Rs=
                  {parseInt(selectedMenu?.perHead)}
                </p>
                <p className="text-xl ">
                  {" "}
                  Total Rs=
                  {parseInt(selectedMenu?.perHead) *
                    parseInt(marqueeImage?.numberOfPeople)}
                </p>
              </div>
            ) : (
              <>
                <div className={`flex items-center justify-between mt-3`}>
                  <p className="text-center text-xl font-semibold">Add On</p>
                </div>
                <p className=" font-sc  my-4">
                  This Add On menu contains the following items:
                </p>
                <div className="w-full">
                  <ul>
                    {selectedMenu?.nameAndPriceArray?.map((dish, i) => {
                      return (
                        <div className="flex items-center py-1" key={i}>
                          <div
                            className={`bg-textColor h-3 w-3 rounded-full mr-3`}
                          ></div>
                          <div className="flex justify-between w-full">
                            <li className="">{dish.name}</li>
                            <li className=" font-poppins ">RS {dish.price}</li>
                          </div>
                        </div>
                      );
                    })}
                  </ul>
                </div>
                <div className="flex justify-between w-full my-4">
                  <p className="text-xl">
                    PerPerson Rs=
                    {parseInt(selectedMenu?.totalDiscount)}
                  </p>
                  <p className="text-xl">
                    {" "}
                    Total Rs=
                    {selectedMenu?.perhead !== selectedMenu?.totalDiscount
                      ? parseInt(selectedMenu?.totalDiscount) *
                      parseInt(marqueeImage?.numberOfPeople)
                      : null}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* HALL'S DIV */}
        <div className="bg-bgColor px-4 md:px-6 py-3 md:py-5 flex flex-col justify-between rounded-lg  mt-3 md:mt-6">
          {/* HALL'S IMAGES */}
          <p className="text-center mb-3 text-2xl">Hall Information</p>

          {/* First */}
          <div className="flex flex-col md:flex md:flex-row justify-between md:mb-4 md:space-x-3 lg:space-x-0 ">
            <div className="bg-white rounded-lg md:w-[350px] mb-3 md:mb-0">
              <div className="flex items-center my-3 md:my-5 px-3">
                <div>
                  <Image src={hall} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Hall Name</p>
                  <p>{marqueeImage?.name}</p>
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
                  <p>{marqueeImage?.maxCapacity}</p>
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
                  <p className="font-bold md:font-semibold text-xs md:text-base">
                    Marquee Contact Number
                  </p>
                  <p className="text-sm">{marqueeData?.data?.phoneNumber}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg md:w-[350px]">
              <div className="flex items-center my-5 px-3">
                <div>
                  <Image src={address} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Marquee Location</p>
                  <p>{marqueeData?.data?.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between ">
          <button
            className="border px-6 py-3 md:px-9 md:py-2 mt-3 bg-primaryColor rounded-md text-white font-bold"
            onClick={() => setSlider(1)}
          >
            Previous
          </button>
          <button
            className="border w-40 md:px-9 md:py-2 mt-3 bg-primaryColor rounded-md text-white font-bold spinnerWhite"
            onClick={() => {
              nextPage()
            }
            }
          >
            {loader ? <Spin /> : " Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
