import React from "react";
import { Data } from "../landingPage/Data";
import Navbar from "../_component/Navbar";
import Footer from "../_component/footer";
import GalleryCard from "../_component/galleryItem/galleryCard";

function BestHotel() {
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5">
          <h1 className="font-vollkorn text-4xl text-gray-600">Reviews</h1>
          <p className="mt-2 text-xs font-roboto">Home / Reviews</p>
        </div>
      </div>
      <div className=" grid grid-cols-1 mt-8  md:grid-cols-2 gap-8 lg:grid-cols-4 lg: lg:container lg:mx-auto ">
        {Data.map((item) => (
          <div key={item.id}>
            <GalleryCard src={item.src} name={item.name} desc={item.desc} />
          </div>
        ))}
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}

export default BestHotel;
