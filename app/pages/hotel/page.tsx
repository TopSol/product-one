import React from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { Data } from "./data";
function Hotel() {
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5">
          <h1 className="font-vollkorn text-4xl text-gray-600">Hotel</h1>
          <p className="mt-2 text-xs">Home / Hotel</p>
        </div>
      </div>
      {/* hotel list */}

      <div className=" mt-32 ">
        {Data.map((item) => (
          <div key={item.id} className="my-10">
            <div className="md:container mx-auto flex border-gray-200 border-[1px] rounded-lg  ">
              <div className="w-[40%]  ">
                <img src={item.src} className="rounded-l-lg" alt="" />
              </div>
              <div className="pt-6 px-6 w-[40%] ">
                <h1 className="font-vollkorn text-2xl">{item.name}</h1>
                <p className="font-roboto text-textColor mt-4">{item.desc}</p>
              </div>
              <div className="w-[20%] border-l-[1px] flex flex-col justify-center ">
                <p className="text-center mb-8 ">{item.price}</p>
                <button className="bg-primaryColor mx-10 text-center flex  py-2 px-2 rounded-2xl">More detail</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Hotel;
