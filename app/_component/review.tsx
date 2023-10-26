import React from "react";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Review(props: { name: string; review: string }) {
  return (
    <div className=" w-auto mx-5  text-center mt-28 border-gray-200 border-2 bg-white rounded-lg first-letter:  ">
      <div className="flex justify-center">
        <img
          src="https://demo.himaratheme.com/wp-content/uploads/2022/05/user7.jpg"
          className="w-[70px] rounded-full -mt-8"
          alt=""
        />
      </div>
      <h1 className="mt-6 font-vollkorn  ">{props?.name}</h1>
      <p className="mt-1 font-vollkorn ">Web Developer</p>
      <div className="my-5">
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
        <FontAwesomeIcon icon={faStar} style={{ color: "#ffd505" }} />
      </div>
      <p className="text-center px-9 pb-9 text-textColor font-roboto">
        {props?.review}
      </p>
    </div>
  );
}

export default Review;
