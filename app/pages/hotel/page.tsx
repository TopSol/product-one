import React from "react";
import Navbar from "@/app/component/Navbar";
import Footer from "@/app/component/footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Data } from "./data";
function Hotel() {
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5">
          <h1 className="font-vollkorn text-4xl text-gray-600">Hotel</h1>
          <p className="mt-2 text-xs font-roboto">Home / Hotel</p>
        </div>
      </div>
      {/* hotel list */}

      <div className=" mt-32 ">
        {Data.map((item) => (
          <div key={item.id} className="my-10 mx-5 ">
            <div className="md:container mx-auto flex flex-col md:flex-row border-gray-200 border-[1px] rounded-lg  ">
              <div className="md:w-[40%]  ">
                <img src={item.src} className="md:rounded-r-none rounded-lg " alt="" />
              </div>
              <div className="pt-6 px-6 md:w-[40%] ">
                <h1 className="font-vollkorn text-2xl">{item.name}</h1>

                <p className="font-roboto text-textColor mt-4">{item.desc}</p>
                <p className="font-roboto text-textColor mt-4">{item.desc}</p>
                <p className="font-roboto text-textColor mt-6">Jaranwala</p>
              </div>
              <div className="md:w-[20%] border-l-[1px] flex flex-col justify-center mt-5 md:mt-0 ">
                <p className="text-center text-2xl font-roboto font-bold  ">{item.price}</p>
                <p className="text-center mt-3 mb-6 font-vollkorn">Full day</p>
                <div className="flex justify-center ">
                  <button className="text-primaryColor border-[1px] hover:text-white  hover:bg-primaryColor border-gray-200  text-center items-center justify-around flex mb-6 md:mb-0  py-2 px-4 rounded-full">
                    <p className="font-roboto">More detail</p>
                    <div className="bg-primaryColor hover:bg-white ml-6 hover:text-primaryColor h-7 w-7 text-center flex items-center justify-center rounded-full  text-white">
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </button>
                </div>
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
