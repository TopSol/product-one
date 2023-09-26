"use client";
import React from "react";
import { useState } from "react";
import { Data, ReviewData } from "./Data";
import { useRouter } from "next/navigation";
import Review from "../../component/review";
import Footer from "@/app/component/footer";
import Herro from "@/app/component/Herro";
import GalleryCard from "../../component/galleryItem/galleryCard";

export default function landingPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const currentPost = Data.slice(0, 8);
  const router = useRouter();

  const handleImage = (index: any) => {
    setSelectedImage(index);
  };

  return (
    <div>
      <Herro />
      <div className="bg-bgColor pb-24 pt-24">
        <div className="md:container mx-auto ">
          <div className="">
            <p className="text-5xl font-vollkorn text-headingColor ">
              The best places to stay
            </p>
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Plenty of services to assure your relaxation and comfortability.
            </p>
            <div className="flex flex-col lg:flex-row mt-8  ">
              <div>
                <img
                  onClick={() => setIsOpen(true)}
                  src={
                    selectedImage
                      ? `${selectedImage}`
                      : "https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-dayvison-de-oliveira-silva-5733818-1.jpg"
                  }
                  className="rounded-md "
                />
              </div>
              <div className="flex flex-col justify-between lg:ml-5">
                <div
                  onClick={() =>
                    handleImage(
                      "https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-dayvison-de-oliveira-silva-5733818-1.jpg"
                    )
                  }
                  className="flex items-center border-gray-200 border-[1px] mt-6 lg:mt-0  rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor"
                >
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/pool.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Swimming Pool</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() =>
                    handleImage(
                      "https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-pixabay-262047-1.jpg"
                    )
                  }
                  className="flex items-center border-gray-200 border-[1px] mt-6 lg:mt-0  rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor"
                >
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/restaurant.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Restaurant</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() =>
                    handleImage(
                      "https://demo.himaratheme.com/wp-content/uploads/2022/07/bright-g6f2896c31_1920-1.jpg"
                    )
                  }
                  className="flex items-center border-gray-200 border-[1px]  mt-6 lg:mt-0 rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor"
                >
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/teamwork.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Meeting Room</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
                <div
                  onClick={() =>
                    handleImage(
                      "https://demo.himaratheme.com/wp-content/uploads/2022/07/pexels-max-vakhtbovych-7174404.png"
                    )
                  }
                  className="flex items-center border-gray-200 border-[1px]  mt-6 lg:mt-0 rounded-md py-4 hover:text-WhiteColor hover:bg-secondaryColor"
                >
                  <img
                    src="https://demo.himaratheme.com/wp-content/uploads/2022/07/sauna.png"
                    alt=""
                    className="w-[50px] mx-5"
                  />
                  <div>
                    <h1 className="font-vollkorn  text-lg ">Sauna</h1>
                    <p className=" font-roboto text-textColor hover:text-white">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Curabitur sollicitudin elementum porta.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Gallery section */}
      <div className="bg-white  pb-24">
        <div className=" md:container mx-auto pt-24  ">
          <p className="text-5xl font-vollkorn text-headingColor ">
            Himara Image Gallery
          </p>
          <div className=" md:flex items-center justify-between">
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Capture the experience of your vacation at Himara Hotel.
            </p>
            <p className="font-bold text-textColor mt-2 font-roboto cursor-pointer ">
              View Full Gallery
            </p>
          </div>

          <div className=" grid grid-cols-1 mt-8  md:grid-cols-2 gap-8 lg:grid-cols-4 lg: lg:container lg:mx-auto ">
            {currentPost.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push("/pages/hoteldetail")}
              >
                <GalleryCard src={item.src} name={item.name} desc={item.desc} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Testimonials section */}
      <div className="bg-bgColor  ">
        <div className=" md:container mx-auto pt-24 pb-32 ">
          <p className="text-5xl font-vollkorn text-headingColor ">
            Himara Image Gallery
          </p>
          <div className="md:flex items-center justify-between">
            <p className="font-bold text-textColor mt-2 font-roboto   ">
              Capture the experience of your vacation at Himara Hotel.
            </p>
            <p className="font-bold text-textColor mt-2 font-roboto cursor-pointer ">
              View Full Gallery
            </p>
          </div>

          <div className="flex flex-col lg:flex-row  justify-around  ">
            {ReviewData.map((item) => (
              <div
                key={item.id}
                onClick={() => router.push("/pages/reviewPage")}
              >
                <Review name={item.name} review={item.review} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
