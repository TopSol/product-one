"use client";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import Navbar from "@/app/component/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { faL } from "@fortawesome/free-solid-svg-icons";
const initialValue = {
  name: "",
  email: "",
  location: "",
  phoneNumber: "",
  password: "",
  capacity: "",
};
const position = [51.505, -0.09]

function details() {
  const [details, setDetails] = useState(initialValue);
  const [markerPos, setMarkerPos] = useState({
    lat: 55.702868,
    lng: 37.530865,
  })
  const [isOpen, setIsOpen] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(details, "details");
  };
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  useEffect(() => {
    console.log(`lat diff: ${markerPos.lat}, lng diff: ${markerPos.lng}`);
  }, [markerPos])
  const handlelick = () => {
    setIsOpen(!isOpen)
  }
  const markerRef = useRef();
  const updatePosition = React.useMemo(() => ({
    dragend() {
      const marker = markerRef.current
      console.log("marker", marker)
      if (marker != null) {
        const newPos = { ...marker.getLatLng() };
        setMarkerPos(newPos);
      }
    }
  }), [])
console.log(markerPos, "umar");


  return (
    <div>
      <Navbar />
      <div className="mt-28 container  lg:w-[75%] mx-auto px-5 lg:px-0">
        <h1 className=" my-5 text-3xl font-vollkorn text-textColor flex justify-center items-center mx-auto">
          Marquee Registration
        </h1>
        <div className="container  border rounded-md py-10">
          <form className=" flex flex-col text-start  md:flex md:flex-row justify-evenly items-center md:text-center ">
            <div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl w-[30%] flex justify-start">Name:</label>
                <input
                  type="name"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl w-[30%] flex justify-start">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label onClick={() => handlelick()} className="text-xl w-[30%] flex justify-start cursor-pointer">Location:</label>
                <input
                  type="loaction"
                  name="location"
                  placeholder="Pick your location"
                  value={details.location}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl w-[30%] flex justify-start">Number:</label>
                <input
                  type="phoneNumber"
                  name="phoneNumber"
                  value={details.phoneNumber}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl w-[30%] flex justify-start">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl w-[30%] flex justify-start">Capacity:</label>
                <input
                  type="phoneNumber"
                  name="capacity"
                  value={details.capacity}
                  onChange={handleChange}
                  className="border w-[70%] rounded-md outline-none"
                />
              </div>
            </div>
          </form>
        </div>
      </div>

      {
        isOpen ? <div>
          <MapContainer center={position} zoom={20} scrollWheelZoom={false} style={{ height: "400px", width: "100%" }} whenCreated={setMap}>
            <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position}
              draggable={true}
              eventHandlers={updatePosition}
              ref={markerRef}
            >

              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </div> : null
      }


    </div>
  );
}

export default details;
