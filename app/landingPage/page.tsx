"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { Data, ReviewData } from "./Data";
import { useRouter } from "next/navigation";
import Review from "@/app/_component/review";
import Footer from "@/app/_component/footer";
import Hero from "@/app/_component/Hero";
import GalleryCard from "../_component/galleryItem/galleryCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { log } from "util";

export default function LandingPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [marqueesWithinRange, setMarqueesWithinRange] = useState([]);
  const currentPost = Data.slice(0, 8);
  const router = useRouter();
  const isMounted = useRef(true); // Create a ref to track if the component is mounted

  const handleImage = (index) => {
    setSelectedImage(index);
  };


  // useEffect(() => {
  //   // When the component unmounts, set isMounted to false
  //   return () => {
  //     isMounted.current = false;
  //   };
  // }, []);
  
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(function (position) {
  //       const { latitude, longitude } = position.coords;
  //       console.log(position.coords, "position.coords");
  
  //       if (isMounted.current) {
  //         // Only update the state if the component is still mounted
  //         const currentLocation = { lat: latitude, lng: longitude };
  //         setLocation(currentLocation);
  //         fetchMarqueeLocations(currentLocation);
  //       }
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by your browser.");
  //   }
  // }, []);
  
  // const fetchMarqueeLocations = async (currentLocation) => {
  //   console.log(currentLocation, "currentLocation");
    
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   const dataArr = [];
  //   querySnapshot.forEach((doc) => {
  //     const marqueeData = doc.data();
  //     const marqueeLocation = marqueeData.locations;
  
  //     if (isWithinRange(currentLocation, marqueeLocation, 50)) {
  //       dataArr.push(marqueeLocation);
  //     }
  //   });
  //   setData(dataArr);
  // };
  
  // const isWithinRange = (coord1, coord2, range) => {
  //   console.log(coord1, coord2, range, "sdfasdhkf");
    
  //   const earthRadius = 6371; // Radius of the Earth in kilometers
  //   const lat1 = toRadians(coord1.lat);
  //   const lng1 = toRadians(coord1.lng);
  //   const lat2 = toRadians(coord2.lat);
  //   const lng2 = toRadians(coord2.lng);
  
  //   const dLat = lat2 - lat1;
  //   const dLng = lng2 - lng1;
  
  //   const a =
  //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
  //     Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  //   const distance = earthRadius * c;
  //   console.log(distance, "sdfsadhfajksdfasd");
    
  //   return distance <= range;
  // };
  
  // const toRadians = (degrees) => {
  //   return degrees * (Math.PI / 180);
  // };
  


useEffect(() => {
  // When the component unmounts, set isMounted to false
  return () => {
    isMounted.current = false;
  };
}, []);

useEffect(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude, longitude } = position.coords;
      console.log(position.coords, "position.coords");

      if (isMounted.current) {
        // Only update the state if the component is still mounted
        const currentLocation = { lat: latitude, lng: longitude };
        setLocation(currentLocation);
        fetchMarqueeLocations(currentLocation);
      }
    });
  } else {
    console.log("Geolocation is not supported by your browser.");
  }
}, []);

const fetchMarqueeLocations = async (currentLocation) => {
  console.log(currentLocation, "currentLocation");
  
  const querySnapshot = await getDocs(collection(db, "users"));
  const dataArr = [];
  querySnapshot.forEach((doc) => {
    

    if (isWithinRange(currentLocation,  doc.data()?.locations, 50)) {
      dataArr.push({id:doc.id ,data:doc.data()});
      console.log(dataArr, "DataARRA");
    }
  });
  setData(dataArr);
};
 console.log(data, "saraaData");
 
const isWithinRange = (coord1, coord2, range) => {
  console.log(coord1, coord2, range, "sdfasdhkf");
  
  const earthRadius = 6371;
  const lat1 = toRadians(coord1.lat);
  const lng1 = toRadians(coord1.lng);
  const lat2 = toRadians(coord2.lat);
  const lng2 = toRadians(coord2.lng);

  const dLat = lat2 - lat1;
  const dLng = lng2 - lng1;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;
  console.log(distance, "sdfsadhfajksdfasd");
  
  return distance <= range;
};

const toRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};
console.log(data, "check Data");

  return (
    <div>
      <Hero />
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

          <div className=" ">
            {data?.map((item) => (

              <div key={item.id}>
                <GalleryCard item={item} />
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
