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
import { Input } from "antd";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
  const [modalOpen2, setModalOpen2] = useState(false);
  const [location, setLocation] = useState({  lat: 55.702868,lng: 37.530865});
  const [value, setValue] = useState();
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

  const markerRef = useRef();
  const updatePosition = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
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
        phoneNumber: value,
        capacity: details.capacity,
        lattitude: markerPos.lat,
        longitude: markerPos.lng,
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
      const provider = new OpenStreetMapProvider();
      const searchControl = GeoSearchControl({
        notFoundMessage: "Sorry, that address could not be found.",
        provider,
        showMarker: false,
        style: "bar",
        marker: {
          icon,
          draggable: true,
        },
      });

      let marker;
       map.on("geosearch/showlocation", function (result) {
        const { y: lat, x: lng } = result.location;
        if (marker) {
          marker.setLatLng([lat, lng]);
          marker;
          console.log("Updated Marker Position:", lat, lng);
        } else {
          marker = L.marker([lat, lng], {
            icon: customMarkerIcon,
            draggable: true,
          }).addTo(map);
          marker.on("dragend", function (event) {
            const { lat, lng } = event.target.getLatLng();
            console.log("Updated Marker Position:", lat, lng);
          });
        }
      });

      map.addControl(searchControl);
      return () => {
        map.removeControl(searchControl);
        if (marker) {
          marker.off("dragend");
          map.removeLayer(marker);
        }
      };
    }, []);

    return null;
  }

  // function LeafletgeoSearch() {
  //   const map = useMap();
  //   useEffect(() => {
  //     const provider = new OpenStreetMapProvider();
  //     const searchControl = GeoSearchControl({
  //       notFoundMessage: "Sorry, that address could not be found.",
  //       provider,
  //       showMarker: false,
  //       style: "bar",
  //       marker: {
  //         icon,
  //         draggable: true,
  //       },
  //     });

  //     let marker;
  //     const handleShowLocation = (result) => {
  //       const { y: lat, x: lng } = result.location;
  //       if (marker) {
  //         marker.setLatLng([lat, lng]);
  //         console.log("Updated Marker Position:", lat, lng);
  //       } else {
  //         marker = L.marker([lat, lng], {
  //           icon: customMarkerIcon,
  //           draggable: true,
  //         }).addTo(map);
  //         marker.on("dragend", function (event) {
  //           const { lat, lng } = event.target.getLatLng();
  //           setLocation({ lat, lng });
  //           console.log("Updated Marker Position:", lat, lng);
  //         });
  //       }
  //     };
  //     map.on("geosearch/showlocation", handleShowLocation);

  //     map.addControl(searchControl);
  //     return () => {
  //       map.removeControl(searchControl);
  //       if (marker) {
  //         marker.off("dragend");
  //         map.removeLayer(marker);
  //       }
  //       map.off("geosearch/showlocation", handleShowLocation);
  //     };
  //   }, [map]);

  //   return null;
  // }


//   function LeafletgeoSearch() {
//     const map = useMap();
//      useEffect(() => {
//       const provider = new OpenStreetMapProvider();
//       const searchControl = GeoSearchControl({
//         notFoundMessage: "Sorry, that address could not be found.",
//         provider,
//         showMarker: false,
//         style: "bar",
//         marker: {
//           icon,
//           draggable: true,
//         },
//       });
  
//       let marker;
  
//       const handleShowLocation = (result) => {
//         const { y: lat, x: lng } = result.location;
//         if (marker) {
//           marker.setLatLng([lat, lng]);
//           console.log("Updated Marker Position:", lat, lng);
//         } else {
//           marker = L.marker([lat, lng], {
//             icon: customMarkerIcon,
//             draggable: true,
//           }).addTo(map);
//           marker.on("dragend", function (event) {
//             const { lat, lng } = event.target.getLatLng();
//             console.log("Updated Marker Position 2:13213123", lat, lng);
//             setLocation({ lat, lng });
//           });
//         }
//       };
  
//       map.on("geosearch/showlocation", handleShowLocation);
  
//       map.addControl(searchControl);
//       return () => {
//         map.removeControl(searchControl);
//         if (marker) {
//           marker.off("dragend");
//           map.removeLayer(marker);
//         }
//         map.off("geosearch/showlocation", handleShowLocation);
//       };
//     }, [map]);
  
//     return null;
//   }
//   console.log(location, "locatissonlocatissonlocatisson", location);

//   useEffect(() => {
//     const handleResize = () => {
//       const windowWidth = window.innerWidth;
//       console.log(windowWidth, "windowWidth");
//       if (windowWidth >= 768) {
//         setModalOpen2(true);
//       } else {
//         setModalOpen2(false);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
// console.log(location, "location");

  return (
    <div>
      <div className=" mx-auto my-auto w-full flex flex-col md:flex md:flex-row">
        <div className="relative w-full lg:w-[60%] px-10 md:block">
          {modalOpen2 ? (
            <img
              src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600"
              className=" lg:absolute inset-0 object-cover w-full h-full"
            />
          ) : null}

          {/* <div className="absolute  lg:w-full lg:mx-0 mx-10 inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"></div> */}
        </div>

        <div className="w-full lg:w-[40%] px-8 md:px-14  py-3 2xl:justify-around rounded-md shadow-xl overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200  flex-col flex justify-between">
          <h1 className=" mb-5 text-3xl font-vollkorn text-textColor items-center">
            Marquee Registration
          </h1>
          <div className="flex flex-col justify-between  2xl:h-[50vh]">
            <label className="font-roboto font-bold">Full Name</label>
            <div className="flex flex-col items-start">
              <Input
                type="name"
                placeholder="Enter name here..."
                name="name"
                value={details.name}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3"
              />
            </div>
            <label className="font-roboto font-bold">Email</label>
            <div className="flex flex-col items-start">
              <Input
                type="email"
                name="email"
                placeholder="Enter email here..."
                value={details.email}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3"
              />
            </div>
            <label className="font-roboto font-bold">Password</label>
            <div className="flex flex-col items-start">
              <Input
                type="password"
                name="password"
                placeholder="Enter Password Here "
                value={details.password}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3"
              />
            </div>
            <label className="font-roboto font-bold">PhoneNumber</label>
            <div className="flex flex-col items-start">
              {/* <Input
                type="number"
                name="phoneNumber"
                placeholder="Enter phonenumber here..."
                value={details.phoneNumber}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3"
              /> */}
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="PK"
                // value={`${value} ${details.phoneNumber}`}
                value={value}
                onChange={setValue}
              />
            </div>
            <label className="font-roboto font-bold">Capacity:</label>
            <div className="flex flex-col items-start">
              <Input
                type="number"
                name="capacity"
                placeholder="Capacity of sitting..."
                value={details.capacity}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3 "
              />
            </div>
            <label className="font-roboto font-bold">Address:</label>
            <div className="flex flex-col items-start">
              <Input
                type="text"
                name="address"
                placeholder="Enter address here..."
                value={details.address}
                onChange={handleChange}
                className=" outline-none rounded  py-3 mb-3 "
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
          className="customGeoSearch pt-20 2xl:pt-0"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={position}
            draggable={true}
            showMarker={false}
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
