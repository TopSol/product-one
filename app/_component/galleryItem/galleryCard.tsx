"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
export default function GalleryCard({ item }: any) {
  const router = useRouter();
  const handleMarqueeDetails = (id) => {
    router.push(`/marqueedetail?id=${id}`);
  };
  return (
    <div className="mb-10 border p-3 rounded-[20px] mt-5 lg:mt-0 font-poppins text-textColor">
      <div className="md:container mx-auto flex flex-col lg:flex lg:flex-row items-center lg:space-x-8">
        <div className="lg:w-[40%] cursor-pointer rounded-[10px]">
          <Image
            src={item?.data?.images?.[0]}
            className=" lg:w-72 lg:h-52 bg-bgColor p-3 rounded-2xl object-cover"
            alt=""
            width={250}
            height={250}
            onClick={() => {
              handleMarqueeDetails(item?.id);
            }}
          />
        </div>

        <div className="w-[100%] bg-bgColor p-3 rounded-2xl mx-3 mt-5 lg:mt-0">
          <div className="flex flex-col md:flex md:flex-row justify-between items-center ">
            <p className="font-poppins text-2xl font-semibold text-matteBlack">
              {item?.data?.name}
            </p>
            <p className="font-roboto text-xl items-center">
              <FontAwesomeIcon
                icon={faLocationDot}
                className=" text-green-500 mr-3"
              />
              {item?.data?.address}
            </p>
          </div>
          <div className="font-roboto text-textColor text-center md:text-start lg:w-96 lg:h-14 mt-2">
            <p>
              {item?.data?.description && (
                <>
                  <span className="your-custom-class">
                    {item.data.description.slice(0, 100)}
                  </span>
                  {item.data.description.length > 100 && " ..."}
                </>
              )}
            </p>
          </div>

          <div className="flex flex-col md:flex md:flex-row justify-between items-center md:items-end ">
            <div className="flex flex-col ">
              <p className="text-primaryColor mt-2 mb-4">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </p>
              <button
                onClick={() => {
                  handleMarqueeDetails(item?.id);
                }}
                className="bg-primaryColor hover:bg-hoverPrimary px-5 py-2 rounded-lg font-roboto text-white font-bold"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
