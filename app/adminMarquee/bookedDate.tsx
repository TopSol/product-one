"use client";
import React, { useEffect, useState } from "react";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useStore } from "../../store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dots from "@/app/assets/images/dots.svg";
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
  const [sendData, setSendData] = useState();
  const [customerInformation, setCustomerInformation] = useState<marqueeBookingRecord[]>([]);
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [ids, setIds] = useState(false);
  const [isNestedModalOpen, setIsNestedModalOpen] = useState(false);
  const [detailsData, setDetailsData] = useState<marqueeBookingRecord>();
  const router = useRouter();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const venuesQuery = query(
  //         collection(db, "contactUs"),
  //         where("marqueeId", "==", userInformation.userId)
  //       );
  //       const [venuesSnapshot] = await Promise.all([getDocs(venuesQuery)]);

  //       let venueDataArr: marqueeBookingRecord[] = [];
  //       venuesSnapshot.forEach((doc) => {
  //         venueDataArr.push(doc.data() as marqueeBookingRecord);
  //       });
  //       setCustomerInformation(venueDataArr);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venuesQuery = query(
          collection(db, "contactUs"),
          where("userId", "==", userInformation.userId)
        );
        const [venuesSnapshot] = await Promise.all([getDocs(venuesQuery)]);
        let venueDataArr: marqueeBookingRecord[] = [];
        venuesSnapshot.forEach((doc) => {
          venueDataArr.push(doc.data() as marqueeBookingRecord);
        });
        setCustomerInformation(venueDataArr);
        setIsLoading(false);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDetails = (id) => {
    setLoader(id);
  };
  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('component');
  //   };
  // }, []);
  return (
    <>
      {isloading ? (
        <div className="flex justify-center items-center h-[80vh] spinner">
          <Spin size="default" />
        </div>
      ) : (
        <>
          <div className="md:container mx-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-[100%] my-6">
              {customerInformation
                ?.sort((a, b) => (a.isNew === true ? -1 : b.isNew === true ? 1 : 0))
                ?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className=" justify-center items-center md:my-10 md:mx-2  rounded-xl shadow-xl  "
                    >
                      <div className="flex flex-col justify-center items-center">
                        <div className=" bg-primary py-11 w-full justify-between items-center flex rounded-t-xl px-3"></div>
                        <Image
                          className=" h-[167px] w-[167px]  rounded-full -mt-[87px] mb-2 object-cover "
                          src={item?.image?.[0]}
                          width={167}
                          height={167}
                          alt=""
                        />
                        <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full px-4">
                          <div className="absolute top-[calc(50%_-_50.5px)] ml-2 z-20 left-[19.89px] bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                          <div className="absolute top-[calc(50%_-_48.5px)] z-20 ml-2 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                            <p className="absolute text-base leading-[100%] z-20 pt-1">
                              PerHead
                            </p>
                          </div>
                          <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                            <Input
                              placeholder="Perhead"
                              type="text"
                              name="name"
                              value={item?.dishes?.totalDiscount === undefined ? item?.dishes?.perHead : item?.dishes?.totalDiscount
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
                                      handleDetails(item.id);
                                      localStorage.setItem('component', 'Bookings');
                                      router.push(`/adminMarquee/previewDetails?id=${item.id}`);
                                    }}
                                    className=" xl:px-4 lg:px-2 px-3 w-[85px]  py-2 bg-primary text-white rounded-md spinnerWhite"
                                  >
                                    {loader === (item.id as any) ? (
                                      <Spin />
                                    ) : (
                                      " Details"
                                    )}
                                  </button>
                                  <button
                                    onClick={() => {
                                      setEmail(item?.email);
                                      setModalOpen(true);
                                      setSendData(item as any);
                                    }}
                                    className=" xl:px-4 lg:px-2 px-3 py-2 bg-green-500 text-white rounded-md"
                                  >
                                    Accept
                                  </button>
                                  <button
                                    className=" xl:px-4 lg:px-2 px-3 py-2 bg-red-500 text-white rounded-md"
                                    onClick={() => {
                                      setEmail(item?.email);
                                      setIsNestedModalOpen(true);
                                      setSendData(item as any);
                                    }}
                                  >
                                    Reject
                                  </button>
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
            sendData={sendData}
            setSendData={setSendData}
            setIsNestedModalOpen={setIsNestedModalOpen}
            isNestedModalOpen={isNestedModalOpen}
            customerInformation={customerInformation}
            setCustomerInformation={setCustomerInformation}
          />
        </>
      )}
    </>
  );
}
export default BookedDate;
