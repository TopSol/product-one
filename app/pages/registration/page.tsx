"use client";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
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
import { useStore } from "../../../store";
import "./style.css";
import icon from "./consonant";
import L from "leaflet";
const initialValue = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  capacity: "",
  address: "",
};
const position = [51.505, -0.09];

function details() {
  const [details, setDetails] = useState(initialValue);
  const { userInformation, addUser } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [markerPos, setMarkerPos] = useState({
    lat: 55.702868,
    lng: 37.530865,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

 

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize();
      }, 100);
    }
  }, [map]);

  // useEffect(() => {
  //   console.log(`lat diff: ${markerPos.lat}, lng diff: ${markerPos.lng}`);
  // }, [markerPos]);

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

  const router = useRouter();
  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      console.log(user, "userdd44222", user.uid);

      const userInfo = {
        id: user.uid,
        name: details.name,
        email: details.email,
        address: details.address,
        phoneNumber: details.phoneNumber,
        capacity: details.capacity,
        lat: markerPos.lat,
        lng: markerPos.lng,
      };

      await addDoc(collection(db, "users"), userInfo);
      if (userInfo) {
        console.log("user created");
        e.preventDefault();
        addUser(user.uid);

        router.push("/pages/auth");
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const iconMarkup = renderToStaticMarkup(
    <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-blue-600" />
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
    className: "custom-marker-icon",
    iconSize: [40, 40],
  });

  function LeafletgeoSearch() {
    const map = useMap();
    useEffect(() => {
      const abc = "faisalabad pakistan";
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        notFoundMessage: "Sorry, that address could not be found.",
        provider,
        style: "bar",
        marker: {
          icon,
          draggable: true,
        },
      });

    const searchInput = searchControl.getContainer()?.querySelector('.leaflet-control-geosearch-form input');
    if (searchInput) {
      searchInput.value = abc;
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
    }
      console.log(searchInput, "provider");
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, []);
    return null;
  }
  

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

        <div className="w-full lg:w-[35%] px-10  py-3 2xl:justify-around rounded-md shadow-xl h-[100vh]  flex-col flex justify-between">
          <h1 className="hidden lg:block mb-5 text-3xl font-vollkorn text-textColor items-center">
            Marquee Registration
          </h1>
          <div className="flex flex-col justify-between h-[80vh] 2xl:h-[50vh]">
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
          </div>
          <div className="flex justify-start w-full ">
            <div className=" text-center">
              <button
                className="flex justify-center border py-2 px-4 lg:px-7 rounded-md bg-primaryColor"
                onClick={(e) => openModal(e)}
              >
                Location
              </button>
            </div>
            <div className=" text-center mx-2">
              <button
                className="flex justify-center border py-2 px-2 lg:px-3 rounded-md  bg-primaryColor"
                onClick={(e) => handleRegistration(e)}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <MapContainer
          center={position}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "750px", width: "100%" }}
          whenCreated={setMap}
          className="customGeoSearch pt-14 2xl:pt-0"
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
            <div>
              <LeafletgeoSearch />
            </div>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </Modal>
    </div>
  );
}

export default details;