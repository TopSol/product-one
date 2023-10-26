import React from "react";
import { ReviewData } from "./Data";
import Navbar from "../_component/Navbar";
import Review from "../_component/review";
import Footer from "../_component/footer";

function Reviews() {
  return (
    <div>
      <Navbar />
      <div className="bg-bgColor mt-24">
        <div className="md:container mx-auto py-5">
          <h1 className="font-vollkorn text-4xl text-gray-600">Reviews</h1>
          <p className="mt-2 text-xs font-roboto">Home / Reviews</p>
        </div>
      </div>
      <div></div>
      <div className=" grid grid-cols-1 mt-8  md:grid-cols-2 gap-8 lg:grid-cols-3  lg:container lg:mx-auto ">
        {ReviewData.map((item) => (
          <div key={item.id}>
            <Review name={item.name} review={item.review} />
          </div>
        ))}
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </div>
  );
}

export default Reviews;
