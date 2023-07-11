"use client";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import Navbar from "@/app/component/Navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation"; 
import Modal from "@/app/component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
const initialValue = {
  name: "",
  email: "",
  location: "",
  phoneNumber: "",
  password: "",
  capacity: "",
  address: "",
};
const position = [51.505, -0.09];

function details() {
  const [details, setDetails] = useState(initialValue);
  const [markerPos, setMarkerPos] = useState({
    lat: 55.702868,
    lng: 37.530865,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
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
  }, [markerPos]);
  const handlelick = () => {
    setIsOpen(!isOpen);
  };
  const markerRef = useRef();
  const updatePosition = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        console.log("marker", marker);
        if (marker != null) {
          const newPos = { ...marker.getLatLng() };
          setMarkerPos(newPos);
        }
      },
    }),
    []
  );
  console.log(markerPos, "umar");
  const handleRegistration = async (e) => {
    openModal();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      console.log(user, "userdd44222", user);

      const userInfo = {
        id: user.uid,
        name: details.name,
        email: details.email,
        // location: details.location,
        phoneNumber: details.phoneNumber,
        // password: details.password,
        capacity: details.capacity,
        lat: markerPos.lat,
        lng: markerPos.lng,
      };

      await addDoc(collection(db, "users"), userInfo);
      if (userInfo) {
        console.log("user created");
        e.preventDefault();
        router.push("/pages/auth");
      }
    } catch (error) {
      console.log(error, "error");
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage);
    }
  };
  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon icon={faLocationDot} className="text-3xl text-red-600"/>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: 'custom-marker-icon',
    iconSize: [40, 40],
  });

  
  return (
    <div>
      <div className=" mx-auto my-auto w-full h-[100vh] flex flex-col lg:flex lg:flex-row">
        <h1 className=" lg:hidden ml-10 mb-3 text-2xl font-vollkorn text-textColor items-center">
          Marquee Registration
        </h1>
        <div className="relative w-full lg:w-[65%] px-10">
          <img
            src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600"
            className=" lg:absolute inset-0 object-cover w-full h-full "
          />
          <div className="absolute  w-full inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"></div>
        </div>

        <div className="w-full lg:w-[35%] px-10  py-3 rounded-md shadow-xl ">
          <form className="">
            <h1 className="hidden lg:block mb-5 text-3xl font-vollkorn text-textColor items-center">
              Marquee Registration
            </h1>
            <div className="flex flex-col items-start">
              <label className="font-roboto">Full Name</label>
              <input
                type="name"
                placeholder="Enter name here..."
                name="name"
                value={details.name}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-roboto">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter email here..."
                value={details.email}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-roboto">Password</label>
              <input
                type="password"
                name="password"
                placeholder="************"
                value={details.password}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-roboto">PhoneNumber</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Enter phonenumber here..."
                value={details.phoneNumber}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3"
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-roboto">Capacity:</label>
              <input
                type="number"
                name="capacity"
                placeholder="Capacity of sitting..."
                value={details.capacity}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3 "
              />
            </div>
            <div className="flex flex-col items-start">
              <label className="font-roboto">Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter address here..."
                value={details.address}
                onChange={handleChange}
                className="border-b w-[65%] outline-none  py-2 mb-3 "
              />
            </div>
            <div className="flex justify-start w-full ">
              <div className=" text-center">
                <button className="flex justify-center border py-2 px-4 lg:px-7 rounded-md bg-primaryColor">
                  Location
                </button>
              </div>
              <div className=" text-center mx-2">
                <button
                  className="flex justify-center border py-2 px-2 lg:px-5 rounded-md bg-primaryColor"
                  onClick={(e) => handleRegistration(e)}
                >
                  Register Now
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        {/* <div> */}
        <MapContainer
          center={position}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "750px", width: "100%" }}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            draggable={true}
            eventHandlers={updatePosition}
            ref={markerRef}
            icon={customMarkerIcon}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        {/* </div> */}
      </Modal>
      {/* {isOpen ? ( */}

      {/* ) : null} */}
    </div>
  );
}

export default details;
