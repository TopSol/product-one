import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
import { Modal } from "antd";
import Link from "next/link";
function Preview({ hallInformation, sendData, setSuccessPage, openMessage }) {
  const [open, setOpen] = useState(false);
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
  const hideModal = () => {
    setOpen(false);
  };
  return (
    <div className="md:container mx-auto ">
      <div className="flex item-center  flex-col ">
        <div className="flex justify-center ">
          <img
            src={`${hallInformation[0]?.selectedHall?.image}`}
            alt=""
            className=" w-[94%] md:w-2/5 h-[205px] rounded-t-md cursor-pointer object-cover "
          />
        </div>
        <div className=" flex justify-center ">
          <div className="w-[94%] md:w-2/5 border p-4 leading-relaxed font-roboto rounded-b-lg shadow-xl">
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
              {/* <div className=" flex justify-between border-b-2 border-red-100"> */}
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
              <div  className="flex flex-col">
               
                {
                  <Link onClick={() => setOpen(true)} className="text-blue-600 underline" href="">
                    {hallInformation[0]?.Menu?.dishes.length} Dishes
                  </Link>
                }
                <Modal
                  title="Modal 1000px width"
                  centered
                  open={open}
                  // onOk={hideModal}
                  onCancel={() => setOpen(false)}
                  footer={null}
                  // width={500}
                >
                  {" "}
                  {hallInformation[0]?.Menu?.dishes?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
                </Modal>
              </div>
              {/* <p> {`${hallInformation[0]?.Menu?.dish.map}`}</p> */}
            </div>
            <div className="flex justify-between  mb-3">
              {/* <p>Total Rs</p>
              <div className="flex flex-col">
              <p>{total}</p>
              {hallInformation[0]?.selectedHall?.price}+{hallInformation[0]?.Menu?.price}
              </div>
              <p> {`${hallInformation[0]?.Menu?.dish.map}`}</p> */}
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
      {/* <div className="flex justify-around items-center pb-2 ">
        <div className=" border  "></div>
        <div className="px-2 items-center text-center py-3">
          <p> {`${hallInformation[0]?.selectedHall?.select}`}</p>
          <p> {`${hallInformation[0]?.selectedHall?.price}`}</p>
        </div>
        <div className="border p-3 w-28 bg-slate-300 rounded-md">
          <p className="text-center">{`${hallInformation[0]?.selectedHall?.capacity}`}</p>
        </div>
      </div> */}
    </div>
  );
}

export default Preview;
