"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import Image from "next/image";
import nameImg from "../../assets/images/user.svg";
import email from "../../assets/images/email-1-svgrepo-com.svg";
import call from "../../assets/images/call.svg";
import address from "../../assets/images/address-location-map-svgrepo-com 1.svg";
import notes from "../../assets/images/notes.svg";
import hall from "../../assets/images/hall.svg";
import capacity from "../../assets/images/chair.svg";
import price from "../../assets/images/dollor.svg";
import facilites from "../../assets/images/facilites.svg"
import dish from "../../assets/images/menuIcon.svg";
import { Modal } from "antd";
import Link from "next/link";
function Preview({ hallInformation, sendData, setSuccessPage, openMessage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blogs, setBlogs] = useState([]);
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
  let a = parseInt(hallInformation[0]?.UserInformation?.Heating);
  let b = parseInt(hallInformation[0]?.Menu?.Heating);

  const total = `${hallInformation[0]?.selectedHall?.price} + ${hallInformation[0]?.Menu?.price}`;
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // return (
  //   <div className="md:container mx-auto ">
  //     <div className="flex item-center  flex-col ">
  //       <div className="flex justify-center ">
  //         <img
  //           src={`${hallInformation[0]?.selectedHall?.image}`}
  //           alt=""
  //           className=" w-[94%] md:w-2/5 h-[205px] rounded-t-md cursor-pointer object-cover "
  //         />
  //       </div>
  //       <div className=" flex justify-center ">
  //         <div className="w-[94%] md:w-2/5 border p-4 leading-relaxed font-roboto rounded-b-lg shadow-xl">
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">Name</p>
  //             <p>{`${hallInformation[0]?.UserInformation?.firstName} ${hallInformation[0]?.UserInformation?.lastName}`}</p>
  //           </div>
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">Email</p>
  //             <p>{`${hallInformation[0]?.UserInformation?.email}`}</p>
  //           </div>
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">Address</p>
  //             <p>{`${hallInformation[0]?.UserInformation?.address} `}</p>
  //           </div>{" "}
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">Notes</p>
  //             <p>{`${hallInformation[0]?.UserInformation?.notes} `}</p>
  //           </div>{" "}
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">PhoneNumber</p>
  //             <p>{`${hallInformation[0]?.UserInformation?.PhoneNumber} `}</p>
  //           </div>
  //           <div className=" flex justify-between mb-3 ">
  //             <p className="font-bold">Hall Name</p>
  //             <p> {`${hallInformation[0]?.selectedHall?.name}`}</p>
  //           </div>
  //           <div className=" flex justify-between  mb-3">
  //             <p className="font-bold">Capacity</p>
  //             <p> {`${hallInformation[0]?.selectedHall?.maxCapacity}`}</p>
  //           </div>
  //           <div className=" flex justify-between  mb-3">
  //             <p className="font-bold">Price</p>
  //             <p> {`${hallInformation[0]?.selectedHall?.price}`}</p>
  //           </div>
  //           <div className=" flex justify-between  mb-3">
  //             <p className="font-bold">Facilities</p>
  //             <div className=" flex flex-col text-center">
  //               {hallInformation[0]?.UserInformation?.Heating && <p>Heating</p>}
  //               {hallInformation[0]?.UserInformation?.Cooling && <p>Cooling</p>}
  //               {hallInformation[0]?.UserInformation?.MusicSystem && (
  //                 <p className="font-bold">Music System</p>
  //               )}
  //             </div>
  //           </div>
  //           <div className=" flex justify-between  mb-3">
  //             <p className="font-bold">Dish</p>
  //             <div className="flex flex-col">
  //               {
  //                 <Link
  //                   onClick={showModal}
  //                   className="text-blue-600 underline"
  //                   href=""
  //                 >
  //                   {hallInformation[0]?.Menu?.dishes.length} Dishes
  //                 </Link>
  //               }

  //               <Modal
  //                 title="Dishes"
  //                 open={isModalOpen}
  //                 footer={null}
  //                 onCancel={handleCancel}
  //               >
  //                 {" "}
  //                 {hallInformation[0]?.Menu?.dishes?.map((item, index) => (
  //                   <li key={index}>{item}</li>
  //                 ))}
  //               </Modal>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="flex justify-end ">
  //         <button
  //           className="border px-7 py-2 my-3 bg-bgColor rounded-md"
  //           onClick={() => nextPage()}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="md:container mx-auto ">
      <div className="flex item-center  flex-col justify-between ">
        <div className="flex justify-center ">
          <img
            src={`${hallInformation[0]?.selectedHall?.image}`}
            alt=""
            className=" w-[94%] md:w-3/4 h-[205px] rounded-t-md cursor-pointer object-cover "
          />
        </div>
        <div className=" flex justify-center ">
          {/* <div className="w-[94%] md:w-2/5 border p-4 leading-relaxed font-roboto rounded-b-lg shadow-xl">
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">Name</p>
              <p>{`${hallInformation[0]?.UserInformation?.firstName} ${hallInformation[0]?.UserInformation?.lastName}`}</p>
            </div>
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">Email</p>
              <p>{`${hallInformation[0]?.UserInformation?.email}`}</p>
            </div>
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">Address</p>
              <p>{`${hallInformation[0]?.UserInformation?.address} `}</p>
            </div>{" "}
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">Notes</p>
              <p>{`${hallInformation[0]?.UserInformation?.notes} `}</p>
            </div>{" "}
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">PhoneNumber</p>
              <p>{`${hallInformation[0]?.UserInformation?.PhoneNumber} `}</p>
            </div>
            <div className=" flex justify-between mb-3 ">
              <p className="font-bold">Hall Name</p>
              <p> {`${hallInformation[0]?.selectedHall?.name}`}</p>
            </div>
            <div className=" flex justify-between  mb-3">
              <p className="font-bold">Capacity</p>
              <p> {`${hallInformation[0]?.selectedHall?.maxCapacity}`}</p>
            </div>
            <div className=" flex justify-between  mb-3">
              <p className="font-bold">Price</p>
              <p> {`${hallInformation[0]?.selectedHall?.price}`}</p>
            </div>
            <div className=" flex justify-between  mb-3">
              <p className="font-bold">Facilities</p>
              <div className=" flex flex-col text-center">
                {hallInformation[0]?.UserInformation?.Heating && <p>Heating</p>}
                {hallInformation[0]?.UserInformation?.Cooling && <p>Cooling</p>}
                {hallInformation[0]?.UserInformation?.MusicSystem && (
                  <p className="font-bold">Music System</p>
                )}
              </div>
            </div>
            <div className=" flex justify-between  mb-3">
              <p className="font-bold">Dish</p>
              <div className="flex flex-col">
                {
                  <Link
                    onClick={showModal}
                    className="text-blue-600 underline"
                    href=""
                  >
                    {hallInformation[0]?.Menu?.dishes.length} Dishes
                  </Link>
                }

                <Modal
                  title="Dishes"
                  open={isModalOpen}
                  footer={null}
                  onCancel={handleCancel}
                >
                  {" "}
                  {hallInformation[0]?.Menu?.dishes?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </Modal>
              </div>
            </div>
          </div> */}

          <div className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <Image src={nameImg} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Name</p>
                  <p>{`${hallInformation[0]?.UserInformation?.firstName} ${hallInformation[0]?.UserInformation?.lastName}`}</p>
                </div>
              </div>

              <div className="flex items-center">
                <div>
                  <Image src={email} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Email</p>
                  <p>{`${hallInformation[0]?.UserInformation?.email}`}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <Image src={call} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Phone</p>
                  <p>{`${hallInformation[0]?.UserInformation?.PhoneNumber}`}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <Image src={address} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Address</p>
                  <p>{`${hallInformation[0]?.UserInformation?.address}`}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <Image src={notes} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Notes</p>
                  <p>{`${hallInformation[0]?.UserInformation?.notes}`}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <Image src={hall} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Hall Name</p>
                  <p>{`${hallInformation[0]?.selectedHall?.name}`}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <Image src={capacity} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Capacity</p>
                  <p> {`${hallInformation[0]?.selectedHall?.maxCapacity}`}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div>
                  <Image src={price} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Price</p>
                  <p> {`${hallInformation[0]?.selectedHall?.price}`}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div>
                  <Image src={facilites} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Facilites</p>
                  {hallInformation[0]?.UserInformation?.Heating && <p>Heating</p>}
                </div>
              </div>

              <div className="flex items-center">
                <div>
                  <Image src={dish} alt="Image" />
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Dishes</p>
                  <p> {`${hallInformation[0]?.selectedHall?.dishes}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end ">
          <button
            className="border px-7 py-2 my-3 bg-bgColor rounded-md"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
