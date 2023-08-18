import { WhatsAppOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, List, Typography, Modal } from "antd";

import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useStore } from "../../../store";
import { getFormatDates } from "@/app/utils";
import Link from "next/link";
function BookedDate() {
  const { userInformation } = useStore();
  const [customerInformation, setCustomerInformation] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [isDatesModalOpen, setIsDatesModalOpen] = useState(false);

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

  return (
    <div className="md:container mx-auto">
      {/* <div className="flex flex-col md:flex-row flex-wrap"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%]">
        {customerInformation?.map((item, index) => {
          console.log(customerInformation, "customerInformation");

          return (
            <div
              key={index}
              className=" justify-center items-center md:m-2 border border-gray-300 rounded-md shadow-md my-2"
            >
              <div className="w-full">
                <div className="flex flex-col">
                  <img
                    className=" h-60 w-full object-cover rounded-t-md"
                    src={item?.selectedHall.image[0]}
                    alt=""
                  />
                  <div className="w-full ">
                    <div className="flex flex-col ">
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Name</p>
                        <p className="w-[40%]">
                          {item?.UserInformation.firstName +
                            " " +
                            item?.UserInformation.lastName}
                        </p>
                      </div>
                      <div className="flex justify-between border-b  py-2 shadow">
                        <p className=" text-lg pl-1">Phone Number</p>
                        <p className="w-[40%] ">
                          {item.UserInformation.PhoneNumber}
                        </p>
                      </div>
                      <div className="flex justify-between border-b  py-2 shadow">
                        <p className="text-lg pl-1">Email</p>
                        <p className="w-[40%] break-words">
                          {item?.UserInformation.email}
                        </p>
                      </div>
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Address</p>
                        <p className="w-[40%]">
                          {item.UserInformation.address}
                        </p>
                      </div>

                      
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Dates</p>
                        <div className="flex flex-col w-[40%] flex-end">
                        {item?.dates.map((item) => {
                          const dates=getFormatDates([item])
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
                    
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Price</p>
                        <p className="w-[40%]">
                          {" "}
                          Rs{" "}
                          {item?.Menu?.totalDiscount +
                            item?.selectedHall?.price}
                        </p>
                      </div>
                          <Modal
                            centered
                            open={isModalOpen}
                            footer={null}
                            onCancel={() => setIsModalOpen(false)}
                          >
                            <p className="flex justify-center my-3 font-bold font-vollkorn text-xl">
                              Hall Information
                            </p>

                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Name</p>
                              <p>{item?.selectedHall.name}</p>
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Minimum Capacity</p>
                              <p>{item?.selectedHall.minCapacity}</p>
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Maximum Capacity</p>
                              <p>{item?.selectedHall.maxCapacity}</p>
                            </div>

                            <p className="flex justify-center my-3 font-bold font-vollkorn text-xl">
                              Menu Information
                            </p>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Name</p>
                              <p>{item?.Menu.name}</p>
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Dishes</p>
                              {
                                <Link
                                  onClick={() => setIsNestedModalOpen(true)}
                                  className="text-blue-600 underline"
                                  href=""
                                >
                                  {item?.Menu?.dishes.length} Dishes
                                </Link>
                              }
                              {/* <p>{item?.Menu.dishes}</p> */}
                            
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Price</p>
                              <p>{item?.Menu.price}</p>
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Discount Amount</p>
                              <p>{item?.Menu.discountAmount}</p>
                            </div>
                            <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Net Price</p>
                              <p>{item?.Menu.totalDiscount}</p>
                            </div>
                            {/* <div className="flex justify-between items-center px-6 border-t-[1px] py-2">
                              <p>Dates</p>
                              <div className="flex justify-between flex-col">
                                {item?.dates.map((e) => {
                                  const dates = getFormatDates([e]);
                                  const date = new Date(dates);
                                  const formattedDate = `${(date.getMonth() + 1)
                                    .toString()
                                    .padStart(2, "0")}-${date
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}-${date.getFullYear()}`;
                                  return (
                                    <p className="w-[100%]">{formattedDate}</p>
                                  );
                                })}
                              </div>
                            </div> */}
                          </Modal>
                          <Modal
                                title="Dishes"
                                open={isNestedModalOpen}
                                footer={null}
                                centered
                                onCancel={() => setIsNestedModalOpen(false)}
                              >
                                {" "}
                                {item?.Menu?.dishes?.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </Modal>
                      <div className="flex justify-between flex-wrap  py-2 shadow mx-3">
                       
                          <a className="mr-3"
                            href={`https://wa.me/${item.UserInformation?.PhoneNumber}`}
                            target="_blank"
                          >
                            <WhatsAppOutlined className="text-green-500 text-3xl" />
                          </a>
                        
                        
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-2 py-2 bg-blue-500 rounded-md mr-2"
                          >
                            Details
                          </button>
                          <button className="px-2 py-2 bg-green-500 rounded-md mr-2">
                            Accept
                          </button>
                          <button className="px-2 py-2 bg-red-500 rounded-md mr-2">
                            Reject
                          </button>
                        
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
  );
}
export default BookedDate;
