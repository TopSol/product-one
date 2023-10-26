"use client";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ReviewData } from "./Data";
import { useRouter } from "next/navigation";
import Review from "@/app/_component/review";
import Footer from "@/app/_component/footer";
import Hero from "@/app/_component/Hero";
import GalleryCard from "../_component/galleryItem/galleryCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
export default function LandingPage() {
  const [marquees, setMarquees] = useState<any[]>([]);
  const [data, setData] = useState();
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [showMessage, setShowMessage] = useState(true);
  const [selectedDateRange, setSelectedDateRange] = useState<any>(null);
  const [cityName, setCityName] = useState<String>("");
  const [removeCityName, setRemoveCityName] = useState(true);
  const router = useRouter();
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  useEffect(() => {
    console.log("eeeeee");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          fetchMarqueeLocations({ lat: latitude, lng: longitude });
        },

        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  }, []);
  const fetchMarqueeLocations = async (currentLocation) => {
    const querySnapshot = await getDocs(collection(db, "users"));
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      if (isWithinRange(currentLocation, doc.data()?.locations, 50)) {
        dataArr.push({ id: doc.id, data: doc.data() });
      }
    });
    setData(dataArr);
  };
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
    return distance <= range;
  };
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };
  return (
    <div>
      <Hero
        setMarquees={setMarquees}
        setShowMessage={setShowMessage}
        setSelectedDateRange={setSelectedDateRange}
        selectedDateRange={selectedDateRange}
        cityName={cityName}
        setCityName={setCityName}
        removeCityName={removeCityName}
      />
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
            {showMessage &&
              data?.map((item) => (
                <div key={item.id}>
                  <GalleryCard item={item} />
                </div>
              ))}
            {!showMessage && marquees.length == 0 ? (
              <p className="text-center text-2xl ">
                Marquee Not found{" "}
                <span
                  onClick={() => {
                    setRemoveCityName(false);
                    setCityName("");
                    setSelectedDateRange([null, null]);
                    setShowMessage(true);
                  }}
                  className="text-red-400 cursor-pointer"
                >
                  Clear Filter
                </span>
              </p>
            ) : (
              marquees.map((marquee) => (
                <div key={marquee.id}>
                  <GalleryCard item={marquee} />
                </div>
              ))
            )}
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
