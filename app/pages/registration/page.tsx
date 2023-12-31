// "use client";
// import { useState, useEffect, useRef } from "react";
// import * as React from "react";
// import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import "leaflet-geosearch/dist/geosearch.css";
// import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/app/firebase";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/app/firebase";
// import { useRouter } from "next/navigation";
// import Modal from "@/app/component/Modal";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
// import { divIcon } from "leaflet";
// import { renderToStaticMarkup } from "react-dom/server";
// import { useStore } from "../../../store";
// import "./style.css";
// import icon from "./consonant";
// import L from "leaflet";
// import { Input, Form } from "antd";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// const initialValue = {
//   name: "",
//   email: "",
//   phoneNumber: "",
//   password: "",
//   capacity: "",
//   address: "",
// };
// const position = [51.505, -0.09];
// function details() {
//   const [details, setDetails] = useState(initialValue);
//   const { userInformation, addUser } = useStore();
//   const [modalOpen, setModalOpen] = useState(false);
//   const [map, setMap] = useState(null);
//   const [modalOpen2, setModalOpen2] = useState(false);
//   const [location, setLocation] = useState({ lat: 55.702868, lng: 37.530865 });
//   const [value, setValue] = useState();
//   const [markerPos, setMarkerPos] = useState({
//     lat: 55.702868,
//     lng: 37.530865,
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetails((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const openModal = (e) => {
//     e.preventDefault();
//     setModalOpen(true);
//   };
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   useEffect(() => {
//     if (map) {
//       setInterval(function () {
//         map.invalidateSize();
//       }, 100);
//     }
//   }, [map]);

//   const markerRef = useRef();
//   const updatePosition = React.useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker != null) {
//           const newPos = { ...marker.getLatLng() };
//           setMarkerPos(newPos);
//         }
//       },
//     }),
//     []
//   );

//   const router = useRouter();
//   const handleRegistration = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         details.email,
//         details.password
//       );
//       const user = userCredential.user;
//       console.log(user, "userdd44222", user.uid);

//       const userInfo = {
//         id: user.uid,
//         name: details.name,
//         email: details.email,
//         address: details.address,
//         phoneNumber: value,
//         capacity: details.capacity,
//         lattitude: markerPos.lat,
//         longitude: markerPos.lng,
//       };

//       await addDoc(collection(db, "users"), userInfo);
//       if (userInfo) {
//         console.log("user created");
//         e.preventDefault();
//         addUser(user.uid);

//         router.push("/pages/auth");
//       }
//     } catch (error) {
//       console.log(error, "error");
//     }
//   };
//   const iconMarkup = renderToStaticMarkup(
//     <FontAwesomeIcon icon={faLocationDot} className="text-4xl text-blue-600" />
//   );
//   const customMarkerIcon = divIcon({
//     html: iconMarkup,
//     className: "custom-marker-icon",
//     iconSize: [40, 40],
//   });

//   function LeafletgeoSearch() {
//     const map = useMap();
//     useEffect(() => {
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
//       map.on("geosearch/showlocation", function (result) {
//         const { y: lat, x: lng } = result.location;
//         if (marker) {
//           // console.log(marker, "marker");

//           marker.setLatLng([lat, lng]);
//           marker;
//           // console.log("Updated Marker Position:", lat, lng);
//         } else {
//           marker = L.marker([lat, lng], {
//             icon: customMarkerIcon,
//             draggable: true,
//           }).addTo(map);
//           marker.on("dragend", function (event) {
//             const { lat, lng } = event.target.getLatLng();
//             // console.log("Updated Marker Position:", lat, lng);
//           });
//         }
//       });

//       map.addControl(searchControl);
//       return () => {
//         map.removeControl(searchControl);
//         if (marker) {
//           marker.off("dragend");
//           map.removeLayer(marker);
//         }
//       };
//     }, []);

//     return null;
//   }

//   useEffect(() => {
//     const handleResize = () => {
//       const windowWidth = window.innerWidth;
//       // console.log(windowWidth, "windowWidth");
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
//   // console.log(location, "location");

//   return (
//     <div>
//       <div className=" mx-auto my-auto w-full flex flex-col md:flex md:flex-row h-[100vh]">
//         <div className="relative w-full lg:w-[60%] px-10 md:block">
//           {modalOpen2 ? (
//             <img
//               src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600"
//               className=" lg:absolute inset-0 object-cover w-full h-full"
//             />
//           ) : null}
//         </div>

//         <div className="w-full lg:w-[40%] px-8 md:px-14  py-3 2xl:justify-around rounded-md shadow-xl overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200  flex-col flex justify-between">
//           <h1 className=" mb-5 text-[28px] md:text-3xl font-vollkorn text-primaryColor items-center">
//             Marquee Registration
//           </h1>
//           <div className="flex flex-col justify-between  h-[100vh] 2xl:h-[70vh] my-3">
//             <div className="flex flex-col items-start mb-2">
//               <label className="font-roboto font-bold">Full Name</label>
//               <Input
//                 type="name"
//                 placeholder="Enter name here..."
//                 name="name"
//                 value={details.name}
//                 required
//                 onChange={handleChange}
//                 className=" outline-none rounded  py-3 mb-3"
//               />
//             </div>

//               <div className="flex flex-col items-start mb-2">
//                 <label className="font-roboto font-bold">Email</label>
//                 <Input
//                   type="email"
//                   name="email"
//                   placeholder="Enter email here..."
//                   value={details.email}
//                   onChange={handleChange}
//                   className=" outline-none rounded  py-3 mb-3"
//                 />
//               </div>
//               <div className="flex flex-col items-start mb-2">
//                 <label className="font-roboto font-bold">Password</label>
//                 <Input
//                   type="password"
//                   name="password"
//                   placeholder="Enter Password Here "
//                   value={details.password}
//                   onChange={handleChange}
//                   className=" outline-none rounded  py-3 mb-3"
//                 />
//               </div>
//               <div className="flex flex-col items-start mb-2">
//                 <label className="font-roboto font-bold">PhoneNumber</label>
//                 <PhoneInput
//                   international
//                   countryCallingCodeEditable={false}
//                   defaultCountry="PK"
//                   // value={`${value} ${details.phoneNumber}`}
//                   value={value}
//                   onChange={setValue}
//                 />
//               </div>
//               <div className="flex flex-col items-start mb-2">
//                 <label className="font-roboto font-bold">Capacity:</label>
//                 <Input
//                   type="number"
//                   name="capacity"
//                   placeholder="Capacity of sitting..."
//                   value={details.capacity}
//                   onChange={handleChange}
//                   className=" outline-none rounded  py-3 mb-3 "
//                 />
//               </div>
//               <div className="flex flex-col items-start mb-2">
//                 <label className="font-roboto font-bold">Address:</label>
//                 <Input
//                   type="text"
//                   name="address"
//                   placeholder="Enter address here..."
//                   value={details.address}
//                   onChange={handleChange}
//                   className=" outline-none rounded  py-3 mb-3 "
//                 />
//               </div>
//           </div>
//           <div className="flex justify-start w-full  ">
//             <div className=" text-center">
//               <button
//                 className="flex justify-center border py-2 px-4 lg:px-7 rounded-md bg-primaryColor"
//                 onClick={(e) => openModal(e)}
//               >
//                 Location
//               </button>
//             </div>
//             <div className=" text-center mx-2">
//               <button
//                 className="flex justify-center border py-2 px-2 lg:px-3 rounded-md  bg-primaryColor"
//                 onClick={(e) => handleRegistration(e)}
//               >
//                 Register Now
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Modal isOpen={modalOpen} onClose={closeModal}>
//         <MapContainer
//           center={position}
//           zoom={20}
//           scrollWheelZoom={false}
//           style={{ height: "500px", width: "100%" }}
//           whenCreated={setMap}
//           // className="customGeoSearch pt-20 2xl:pt-0"
//         >
//           <TileLayer
//             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />
//           <Marker
//             position={position}
//             draggable={true}
//             showMarker={false}
//             eventHandlers={updatePosition}
//             ref={markerRef}
//             icon={customMarkerIcon}
//           >
//             <div>
//               <LeafletgeoSearch />
//             </div>
//             <Popup>
//               A pretty CSS3 popup. <br /> Easily customizable.
//             </Popup>
//           </Marker>
//         </MapContainer>
//       </Modal>
//     </div>
//   );
// }

// export default details;

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
import { Input, Form, Button } from "antd";
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
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
function details() {
  const [details, setDetails] = useState(initialValue);
  const { userInformation, addUser } = useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [map, setMap] = useState(null);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [location, setLocation] = useState({ lat: 55.702868, lng: 37.530865 });
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
  const handleRegistration = async () => {
    // e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      console.log(details, "userdd44222", user.uid);

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
        console.log(userInfo, "user created");
        console.log(user.uid, "user.uid");
        // e.preventDefault();
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
          // console.log(marker, "marker");

          marker.setLatLng([lat, lng]);
          marker;
          // console.log("Updated Marker Position:", lat, lng);
        } else {
          marker = L.marker([lat, lng], {
            icon: customMarkerIcon,
            draggable: true,
          }).addTo(map);
          marker.on("dragend", function (event) {
            const { lat, lng } = event.target.getLatLng();
            // console.log("Updated Marker Position:", lat, lng);
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

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      // console.log(windowWidth, "windowWidth");
      if (windowWidth >= 768) {
        setModalOpen2(true);
      } else {
        setModalOpen2(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // console.log(location, "location");

  return (
    <div>
      <div className=" mx-auto my-auto w-full flex flex-col md:flex md:flex-row h-[100vh]">
        <div className="relative w-full lg:w-[65%] px-10 md:block">
          {modalOpen2 ? (
            <img
              src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600"
              className=" lg:absolute inset-0 object-cover w-full h-full"
            />
          ) : null}
        </div>

        <div className="w-full lg:w-[35%] px-8 md:px-14  py-3 2xl:justify-around rounded-md shadow-xl overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200  flex-col flex justify-evenly">
          <h1 className=" mt-36 mb-2 text-[28px] md:text-3xl font-vollkorn text-primaryColor items-center">
            Marquee Registration
          </h1>
          <div className="flex flex-col justify-between w-full 2xl:h-[70vh] my-3">
            <Form
              className="w-full"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              style={{
                maxWidth: "100%",
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
             <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Full Name</label>
                <Form.Item
                  className="w-[100%]"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the name input!",
                    },
                  ]}
                >
                  <Input
                    className=" outline-none rounded md:w-[25vw] py-3 "
                    placeholder="Enter Full Name Here"
                    type="name"
                    name="name"
                    value={details.name}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>

              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Email</label>
                <Form.Item
                  className="w-[100%]"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Please fillout the email input!",
                    },
                  ]}
                >
                  <Input
                    className=" outline-none rounded md:w-[25vw] py-3 "
                    placeholder="Enter Email Here"
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Password</label>
                <Form.Item
                  className="w-[100%]"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the password input!",
                    },
                  ]}
                >
                  <Input
                    className=" outline-none rounded md:w-[25vw] py-3"
                    placeholder="Enter Password Here"
                    type="password"
                    name="password"
                    value={details.password}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">
                  Phone Number
                </label>
                <Form.Item
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the phone   input!",
                    },
                  ]}
                >
                  <PhoneInput
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="PK"
                    value={value}
                    onChange={setValue}
                    className=" outline-none rounded py-3"
                  />
                </Form.Item>
              </div>
              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Capacity</label>
                <Form.Item
                  name="capacity"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the capacity input!",
                    },
                  ]}
                >
                  <Input
                    className=" outline-none rounded md:w-[25vw] py-3 "
                    placeholder="Enter Capacity Here"
                    type="capacity"
                    name="capacity"
                    value={details.capacity}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>
              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Address</label>
                <Form.Item
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the address input!",
                    },
                  ]}
                >
                  <Input
                    className=" outline-none rounded md:w-[25vw] py-3 "
                    placeholder="Enter Address Here"
                    type="address"
                    name="address"
                    value={details.address}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>

              <div className="flex justify-start w-full items-center  ">
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
              onClick={handleRegistration}
            >
              Register Now
            </button> 
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <MapContainer
          center={position}
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
          whenCreated={setMap}
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

{
  //  <button
  //             className="flex justify-center border py-2 px-2 lg:px-3 rounded-md  bg-primaryColor"
  //             onClick={(e) => handleRegistration(e)}
  //           >
  //             Register Now
  //           </button> 
}
