"use client";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { useRouter } from "next/navigation";
import Modal from "@/app/component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { divIcon } from "leaflet";
import Loader from "@/app/component/Loader";
import { renderToStaticMarkup } from "react-dom/server";
import { useStore } from "../../../store";
import "./style.css";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";
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
  marqueeDetails: "",
  image: "",
};
const position = [51.505, -0.09];
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

function LeafletGeoSearch({ customMarkerIcon, setLocation }) {
  const map = useMap();
  const markerRef = useRef(null);

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

    map.addControl(searchControl);

    const handleLocationChange = (result) => {
      const { y: lat, x: lng } = result.location;
      console.log("Updated Marker Position12:", { lat, lng });
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], {
          icon: customMarkerIcon,
          draggable: true,
        }).addTo(map);

        markerRef.current.on("dragend", function (event) {
          const { lat, lng } = event.target.getLatLng();
          console.log("Updated Marker Position:", { lat, lng });
          setLocation({ lat, lng });
        });
      }
    };

    map.on("geosearch/showlocation", handleLocationChange);

    return () => {
      map.removeControl(searchControl);
      if (markerRef.current) {
        markerRef.current.off("dragend");
        map.removeLayer(markerRef.current);
      }
    };
  }, [map]);

  return <div></div>;
}

function details() {
  const [details, setDetails] = useState(initialValue);
  const { userInformation, addUser, addRegistration, registration } =
    useStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [map, setMap] = useState(null);
  const storage = getStorage();
  const [modalOpen2, setModalOpen2] = useState(false);
  const [location, setLocation] = useState({});
  const [value, setValue] = useState();
  const [markerPos, setMarkerPos] = useState({
    lat: 55.702868,
    lng: 37.530865,
  });
  const [loading, setLoading] =useState(false)
  console.log(registration, "registration");
  const { TextArea } = Input;

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
console.log(details.image,"dsfsdfsdff")

  console.log(userInformation, "userInformation");
  const router = useRouter();
  const handleRegistration = async () => {
    setLoading((pre)=>(!pre))

    console.log(details, "details");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      const images = Object.values(details.image);
      console.log(images, "fffffffff");
      
      const folderName = `Marquee`;
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const fileName = `${folderName}/${image.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, image);
          const urls = await getDownloadURL(storageRef);
          console.log("imageUrls123", urls);
          return urls;
        })
      );
      console.log(imageUrls, "imageUrls");
      const VenueId = Math.random().toString(36).substring(2);
      const userInfo = {
        userId: user.uid,
        name: details.name,
        email: details.email,
        address: details.address,
        phoneNumber: value,
        capacity: details.capacity,
        locations : location,
        images: imageUrls,
        description: details.marqueeDetails,
        id: VenueId,
      };
      console.log(userInfo, "userInfo");
      // await addDoc(collection(db, "users"), userInfo);
      await setDoc(doc(db, "users", user.uid), userInfo);
      if (userInfo) {
        addRegistration(userInfo);
        addUser(user.uid);
        router.push("/pages/auth");
        // setLoading((pre)=>(!pre))
        setLoading(true)
      }
      console.log("user", user);
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

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
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

        <div className="w-full lg:w-[35%] px-8 md:px-14  rounded-md shadow-xl overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200  flex-col flex ">
          <h1 className=" mb-2 text-[28px] pt-2 md:text-3xl font-vollkorn text-primaryColor items-center">
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
                    className=" outline-none rounded md:w-[25vw] py-3 "
                    placeholder="Enter password Here"
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
                    type="number"
                    name="capacity"
                    value={details.capacity}
                    onChange={handleChange}
                  />
                </Form.Item>
              </div>

              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">Image</label>
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
                    type="file"
                    name="image"
                    value={details.image}
                    multiple
                    onChange={(e) => {
                      setDetails({ ...details, image: e.target.files });
                    }}
                    // onChange={handleChange}
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
              <div className="w-[100%]">
                <label className="font-roboto font-bold my-2">
                  Description
                </label>
                <Form.Item
                  name="marqueeDetails"
                  rules={[
                    {
                      required: true,
                      message: "Please fillout the marqueeDetails input!",
                    },
                  ]}
                >
                  <TextArea
                    rows={1}
                    maxLength={200}
                    placeholder="Enter Description Here"
                    name="marqueeDetails"
                    // type="text"
                    value={details.marqueeDetails}
                    onChange={handleChange}
                    className="rounded-none w-full py-2 lg:py-3"
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
                   {
                    loading ? 
                    <Loader/> : 
                    "Register Now"
                   } 
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
              <LeafletGeoSearch
                customMarkerIcon={customMarkerIcon}
                setLocation={setLocation}
              />
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
