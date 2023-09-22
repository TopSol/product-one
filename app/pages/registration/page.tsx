"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { divIcon } from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";
import { useStore } from "../../../store";
import { Input, Form } from "antd";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import L from "leaflet";
import Loader from "@/app/component/Loader";
import ImageCroper from "@/app/component/ImageCropper";
import Image from "next/image";
import icon from "./consonant";
import PhoneInput from "react-phone-number-input";
import RegistrationImg from "../../assets/images/RegistrationImg.png";
import "./style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "react-phone-number-input/style.css";
const initialValue = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  capacity: "",
  address: "",
  marqueeDetails: "",
  image: [],
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
      setLocation({ lat, lng });

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
  const [modalOpen, setModalOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [map, setMap] = useState(null);
  const [location, setLocation] = useState({});
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [markerPos, setMarkerPos] = useState();
  const [cropImage, setCropImage] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState([]);
  const [multipleImage, setMultipleImage] = useState([]);
  const [prevImages, setPrevImages] = useState([]); // Define the state variable here
  const { TextArea } = Input;
  const { addUser, addRegistration } = useStore();
  const storage = getStorage();

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
    if (!multipleImage?.length) {
      message.warning("Please select atleast one image");
      return;
    }
    setLoading((pre) => !pre);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        details.email,
        details.password
      );
      const user = userCredential.user;
      const folderName = `marqueeImages`;
      console.log(multipleImage, "multipleImagemultipleImage");
      const imageUrls = await Promise.all(
        multipleImage.map(async (image) => {
          console.log(image?.file?.name, "imagrimagrsdfasdfasdfasgasda");
          const fileName = `${folderName}/${image?.file?.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, image?.file);
          const urls = await getDownloadURL(storageRef);
          return urls;
        })
      );

      const VenueId = Math.random().toString(36).substring(2);
      const userInfo = {
        userId: user.uid,
        name: details.name,
        email: details.email,
        address: details.address,
        phoneNumber: value,
        capacity: details.capacity,
        locations: location,
        images: imageUrls,
        description: details.marqueeDetails,
        id: VenueId,
      };

      await setDoc(doc(db, "users", user.uid), userInfo);
      if (userInfo) {
        addRegistration(userInfo);
        addUser(user.uid);
        router.push("/pages/auth");
        setLoading(true);
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
  const handleImageDiemension = async (e) => {
    let images = e.target.files;
    const validImages = [];
    try {
      await Promise.all(
        Object.values(images).map(async (image, index) => {
          console.log(image, "image");
          const img = new window.Image();
          img.src = URL.createObjectURL(image);
          await new Promise((resolve) => {
            img.onload = function () {
              if (img.width > 2000 && img.height > 1300) {
                validImages.push({
                  id: index,
                  file: image,
                });
              } else {
                message.warning("Image dimensions are not valid.");
              }
              resolve();
            };
          });
        })
      );

      if (validImages.length > 0) {
        setModal1Open(true);
        const updatedImages = [...prevImages, ...validImages];
        console.log(updatedImages, "updateImage");

        setMultipleImage(updatedImages);
        message.success("Image dimensions are valid.");
      } else {
        message.warning("No valid images selected.");
      }
    } catch (error) {
      console.error("Error loading image:", error);
      message.error("Error loading image.");
    }
  };

  const handleDiemension = async (id) => {
    const selectedImage = multipleImage.find((image) => image.id === id);
    if (selectedImage) {
      setSelectedImage(selectedImage);
      const objectURL = URL.createObjectURL(selectedImage.file);
      setImage({
        id: selectedImage.id,
        img: objectURL,
      });
    } else {
      console.error("Image not found with id:", id);
    }
  };

  return (
    <div>
      <div className=" mx-auto my-auto w-full flex flex-col md:flex md:flex-row">
        <div className="w-full lg:w-[40%] md:ml-24 flex flex-col  my-3">
          <p className=" mb-5 mt-7 text-5xl text-center md:text-[28px] font-semibold font-poppins text-primary items-center md:-ml-32">
            REGISTER HERE
          </p>

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
            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[99.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Full Name
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                rules={[
                  {
                    required: true,
                    message: "Please fillout the name input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Enter Full Name Here"
                  type="text"
                  name="name"
                  value={details.name}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[79.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Email
                </b>
              </div>
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
                  className="border outline-none md:w-[30vw] z-10  py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Enter Email Here"
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[99.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Password
                </b>
              </div>{" "}
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
                  className="border outline-none md:w-[30vw] z-10  py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Enter password Here"
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col md:items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[129.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Phone Number
                </b>
              </div>

              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please fillout the phone input!",
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

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[99.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Capacity
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                rules={[
                  {
                    required: true,
                    message: "Please fillout the capacity input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10 py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Enter Capacity Here"
                  type="number"
                  name="capacity"
                  value={details.capacity || ""}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 ">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[79.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Image
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="capacity"
                rules={[
                  {
                    required: true,
                    message: "Please fill out the capacity input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10 py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Please Select Image"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    handleImageDiemension(e);
                  }}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[21.89px] rounded-3xs bg-white w-[99.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Address
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please fillout the address input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4 mb-3 flex justify-center text-xs relative"
                  placeholder="Enter Address Here"
                  type="address"
                  name="address"
                  value={details.address}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0">
              <div className="absolute top-[calc(50%_-_53.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[93.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Description</b>
              </div>
              <Form.Item
                className="w-[100%]"
                name="marqueeDetails"
                rules={[
                  {
                    required: true,
                    message: "Please fillout the marqueeDetails input!",
                  },
                ]}
              >
                <Input
                  rows={5}
                  maxLength={200}
                  placeholder="Enter Description Here"
                  name="marqueeDetails"
                  value={details.marqueeDetails}
                  onChange={handleChange}
                  className="border outline-none md:w-[30vw] z-10  py-4 mb-3 flex justify-center text-xs relative"
                />
              </Form.Item>
            </div>
            <div className="flex md:justify-start justify-center  w-full items-center  ">
              <div className=" text-center">
                <button
                  className="flex justify-center border py-2 px-4 w-36 lg:px-7  text-white font-extrabold rounded-md bg-primary hover:bg-hoverPrimary"
                  onClick={(e) => openModal(e)}
                >
                  Location
                </button>
              </div>
              <div className=" text-center mx-2">
                <button
                  className="flex justify-center border border-primary py-2 w-36 lg:px-3 font-extrabold rounded-md text-primary hover:bg-primary hover:text-white"
                  onClick={handleRegistration}
                >
                  {loading ? <Loader /> : "Register Now"}
                </button>
              </div>
            </div>
          </Form>
        </div>

        <div className="w-full lg:w-[60%] relative md:block">
          {modalOpen2 ? (
            <Image
              className=" lg:absolute inset-0 object-cover w-full h-full rounded-tr-xl rounded-br-xl"
              src={RegistrationImg}
              alt="Image"
            />
          ) : null}
        </div>
      </div>

      <Modal
        open={modalOpen}
        onCancel={closeModal}
        width={2000}
        centered
        footer={null}
      >
        <MapContainer
          zoom={20}
          scrollWheelZoom={false}
          style={{ height: "85vh" }}
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
          </Marker>
        </MapContainer>
      </Modal>
      <Modal
        open={modal1Open}
        footer={null}
        width={1000}
        closable={false}
        centered
      >
        <ImageCroper
          image={image}
          setModal1Open={setModal1Open}
          setCropImage={setCropImage}
          multipleImage={multipleImage}
          setMultipleImage={setMultipleImage}
        />
        <div className="flex flex-wrap px-3">
          {Object.values(multipleImage).map((item, index) => {
            if (item && item.file instanceof Blob) {
              const objectURL = URL.createObjectURL(item.file);

              return (
                <img
                  src={objectURL}
                  alt=""
                  key={index}
                  onClick={() => handleDiemension(item.id)}
                  className="w-[15%] rounded-lg m-2"
                />
              );
            } else {
              return (
                <span key={index} className="text-red-500">
                  Invalid image data
                </span>
              );
            }
          })}
        </div>
      </Modal>
    </div>
  );
}
export default details;
