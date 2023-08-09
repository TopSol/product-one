import React, { useState } from "react";
import data from "./data";
import ImageLightbox from "react-image-lightbox";
import {useStore} from "@/store"
import { useSearchParams } from "next/navigation";
import { Image } from "antd";
function MarqueeAvailability({ setSlider,setSelectedHall,setClickedIndex,clickedIndex, venus}) {
  console.log(venus,"venusvenus");
  // const {Venues,addHallInformation,hallIndex,hallInformation} = useStore()
  const handleClick = (item,index) => {
    // addHallInformation(item,index)
    setClickedIndex(index);
    setSelectedHall(item)
  };
  const searchParams = useSearchParams()
  const id = searchParams.get("id");
  const nextPage = () => { 
    if(clickedIndex!==null){
  setSlider(1);
    }
  };
  return (
    <div className="md:container mx-auto ">
      <div className="flex justify-center ">
        <div className="border p-5 rounded-md mb-2 w-3/4 ">
          <div className="hidden md:flex justify-around items-center bg-primaryColor py-2.5 rounded-md mb-4">
            <p className="w-56 text-center text-xl ">Images</p>
            <p className="w-29 text-center text-xl ">Venue Details</p>
            <p className="w-28 text-center text-xl ">Availability</p>
          </div>
          <div className="">
          {/* <div className="h-[510px] overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200"> */}
            {venus?.map((item, index) => {
              return( 
              <div
              key={index}
              className="flex flex-col justify-center  md:flex md:flex-row md:justify-around md:items-center pb-2 border  rounded-md mb-3 md:border-none "
             >
              <div className=" md:border md:rounded-md  ">
                <div>
                  <Image
                    src={item.image}
                    alt=""
                    width={250}
                    className=" md:w-[200px] md:h-[175px] rounded-t-md  cursor-pointer object-cover "
                  />
                </div>
                <div className="px-2 items-center text-center py-3">
                  <p> {item.select}</p>
                  <p> $ {item.price}</p>
                </div>
              </div>
              <div className=" flex flex-col justify-center mx-auto md:-mt-5 md:flex md:flex-col md:justify-center ">
                <p className="flex items-center justify-center">Siting Capacity</p>
                <p className="text-center border p-3 w-40 bg-primaryColor rounded-md">{item.minCapacity} to {item.maxCapacity}</p>
              </div>
              <div className={` border p-3 rounded-md w-28 text-center mt-3  md:mt-0 flex justify-center mx-auto md:block  ${
                  clickedIndex === index ? "bg-[#4bc87f]" : "bg-primaryColor"
                }`}
                onClick={() => handleClick(item,index)}>
               
               <p>
               Select
                </p> 
              </div>
            </div>
            )})}
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
    </div>
  );
}

export default MarqueeAvailability;
