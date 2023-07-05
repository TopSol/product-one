import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase";
function Preview({ hallInformation }) {
  console.log(JSON.stringify(hallInformation), "ddr");
  const [blogs, setBlogs] = useState([]);
  // const fetchBlogs = async () => {
  //   try {
  //     const response = await getDocs(collection(db, "ContactUs"));
  //     const tempArray = response.docs.map((doc) => doc.data());
  //     setBlogs(tempArray);
  //   } catch (error) {
  //     console.error("Error fetching blogs:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchBlogs();
  // }, []);
  const nextPage = () => {
    // sendData();
  };
  let a=parseInt(hallInformation[0]?.UserInformation?.Heating)
  let b=parseInt(hallInformation[0]?.Menu?.Heating)
  // let c=Number(hallInformation[0]?.selectedHall?.Heating)
  // let d=Number(hallInformation[0]?.UserInformation?.Cooling)
  let data=a+b
  console.log(data,"datadssdddsss",a,b)
  const total = `${hallInformation[0]?.selectedHall?.price} + ${hallInformation[0]?.Menu?.price}`;
  console.log(blogs, "blogsddd");
  return (
    <div className="md:container mx-auto">
      <div className="flex item-center  flex-col">
        <div className="flex justify-center">
          <img
            src={`${hallInformation[0]?.selectedHall?.image}`}
            alt=""
            className=" w-[94%] md:w-2/5 h-[205px]  cursor-pointer object-cover "
          />
        </div>
        <div className=" flex justify-center">
          <div className="w-[94%] md:w-2/5 border p-3 mt-2">
            <div className="flex justify-between mb-3 ">
              <p>Name</p>
              <p>{`${hallInformation[0]?.UserInformation?.firstName} ${hallInformation[0]?.UserInformation?.lastName}`}</p>
            </div>
            <div className="flex justify-between mb-3 ">
              <p>Email</p>
              <p>{`${hallInformation[0]?.UserInformation?.email}`}</p>
            </div>
            <div className="flex justify-between mb-3 ">
              <p>Address</p>
              <p>{`${hallInformation[0]?.UserInformation?.address} `}</p>
            </div>{" "}
            <div className="flex justify-between mb-3 ">
              <p>Notes</p>
              <p>{`${hallInformation[0]?.UserInformation?.notes} `}</p>
            </div>{" "}
            <div className="flex justify-between mb-3 ">
              <p>PhoneNumber</p>
              <p>{`${hallInformation[0]?.UserInformation?.PhoneNumber} `}</p>
            </div>
            <div className="flex justify-between mb-3 ">
              {/* <div className="flex justify-between border-b-2 border-red-100"> */}
              <p>Hall Name</p>
              <p> {`${hallInformation[0]?.selectedHall?.select}`}</p>
            </div>
            <div className="flex justify-between  mb-3">
              <p>Capacity</p>
              <p> {`${hallInformation[0]?.selectedHall?.capacity}`}</p>
            </div>
            <div className="flex justify-between  mb-3">
              <p>Price</p>
              <p> {`${hallInformation[0]?.selectedHall?.price}`}</p>
            </div>
            <div className="flex justify-between  mb-3">
              <p>Facilities</p>
              <div className="flex flex-col text-center">
                {hallInformation[0]?.UserInformation?.Heating && <p>Heating</p>}
                {hallInformation[0]?.UserInformation?.Cooling && <p>Cooling</p>}
                {hallInformation[0]?.UserInformation?.MusicSystem && (
                  <p>Music System</p>
                )}
              </div>
            </div>
            <div className="flex justify-between  mb-3">
              <p>Dish</p>
              <div className="flex flex-col">
                {hallInformation[0]?.Menu?.dish?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
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
          className="border px-7 py-2 bg-bgColor rounded-md"
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
