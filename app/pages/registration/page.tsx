"use client";
import React from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { useStore } from "../../../store";
import { Input, Form } from "antd";
import { setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Loader from "@/app/component/Loader";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ImageCroper from "@/app/component/ImageCropper";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import RegistrationImg from "../../assets/images/RegistrationImg.png";
import "./style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "react-phone-number-input/style.css";
import { type } from "os";

const initialValue = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  capacity: "",
  address: "",
  marqueeDetails: "",
  image: [],
};

function details() {
  const [details, setDetails] = useState(initialValue);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [location, setLocation] = useState({});
  const [value, setValue] = useState();
  const [loading, setLoading] = useState(false);
  const [cropImage, setCropImage] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState([]);
  const [multipleImage, setMultipleImage] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const { addUser, addRegistration } = useStore();
  const [center, setCenter] = useState({ lat: 31.4187, lng: 73.0791 });
  const [searchQuery, setSearchQuery] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4",
    libraries: ["places"],
  });

  const storage = getStorage();
  const router = useRouter();

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
        name: details.fullName,
        email: details.email,
        address: details.address,
        phoneNumber: value,
        capacity: details.capacity,
        locations: center,
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
    setImage({
      id: 0,
      img: URL.createObjectURL(images?.[0]),
    });
    const validImages: any = [];
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

  const onLoad = (map) => {
    setAutocomplete(new window.google.maps.places.AutocompleteService());
  };

  const onUnmount = () => {
    setAutocomplete(null);
  };

  const handleSearch = () => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results[0]) {
        const latitude = results[0].geometry.location.lat().toFixed(7);
        const longitude = results[0].geometry.location.lng().toFixed(7);

        setCenter({
          lat: parseFloat(latitude),
          lng: parseFloat(longitude),
        });

        setPredictions([]);
      } else {
        console.error(
          "Geocode was not successful for the following reason:",
          status
        );
      }
    });
  };

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (autocomplete && query) {
      autocomplete.getPlacePredictions(
        {
          input: query,
        },
        (predictions, status) => {
          if (status === "OK") {
            setPredictions(predictions);
          }
        }
      );
    } else {
      setPredictions([]);
    }
  };

  const handlePredictionClick = (prediction) => {
    setSearchQuery(prediction.description);
    handleSearch();
  };

  const containerStyle = {
    width: "100%",
    height: "550px",
  };
  console.log("center Location:", center);

  return (
    <div>
      <div className=" mx-auto my-auto w-full flex flex-col md:flex md:flex-row">
        <div className="w-full lg:w-[40%] md:ml-24 flex flex-col  my-3">
          <p className=" mb-5 mt-7 text-[28px] md:text-3xl xl:text-4xl text-center font-semibold font-poppins text-primary items-center md:-ml-28">
            REGISTER HERE
          </p>

          <Form
            className="w-full"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[85.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Full Name
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout The Name's Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4 flex justify-center text-xs relative"
                  placeholder="Enter Name Here"
                  type="fullName"
                  name="fullName"
                  value={details.fullName}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0  mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[56.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                    message: "Please Fillout The Email's Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4 flex justify-center text-xs relative"
                  placeholder="Enter Email Here"
                  type="email"
                  name="email"
                  value={details.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[85.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                    message: "Please Fillout The Password's Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4 flex justify-center text-xs relative PhoneInput"
                  placeholder="Enter password Here"
                  type="password"
                  name="password"
                  value={details.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col md:items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[111.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Phone Number
                </b>
              </div>

              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout The Phone's Input!",
                  },
                ]}
              >
                <PhoneInput
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="PK"
                  value={value}
                  onChange={setValue}
                  className="border outline-none md:w-[30vw] z-10  py-4 flex justify-center text-xs relative"
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[75.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Capacity
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="capacity"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout The Capacity's Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10 py-4 flex justify-center text-xs relative"
                  placeholder="Enter Capacity Here"
                  type="number"
                  name="capacity"
                  value={details.capacity || ""}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4 ">
              <div className="absolute top-[calc(50%_-_51.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Image
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Please Select Atleast Single Image!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10 py-4 flex justify-center text-xs relative"
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

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[69.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                    message: "Please Fillout The Address's Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:w-[30vw] z-10  py-4  flex justify-center text-xs relative"
                  placeholder="Enter Address Here"
                  type="address"
                  name="address"
                  value={details.address}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>

            <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
              <div className="absolute top-[calc(50%_-_48.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[90.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Description</b>
              </div>
              <Form.Item
                className="w-[100%]"
                name="marqueeDetails"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout The Description's Input!",
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
                  className="border outline-none md:w-[30vw] z-10  py-4  flex justify-center text-xs relative"
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
        centered
        width={2000}
        footer={null}
      >
        <div className="w-full">
          <div className="flex justify-center items-center md:mx-auto mb-2 mx-3">
            <Input
              type="text"
              placeholder="Search location Here"
              value={searchQuery}
              onChange={handleInputChange}
              className="md:w-96"
            />
            <button
              className="border px-3 md:px-5 py-1 bg-primary text-white font-bold rounded-md md:rounded-lg"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {predictions.length > 0 && (
            <ul
              className="w-[90%] px-12 md:w-[60%] lg:w-[35%] md:mx-auto flex flex-col justify-center"
              style={{
                position: "absolute",
                zIndex: 1000,
                backgroundColor: "white",
                listStyleType: "none",
                padding: 0,
                margin: 0,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              {predictions.map((prediction) => (
                <li
                  key={prediction.place_id}
                  onClick={() => handlePredictionClick(prediction)}
                  style={{ padding: "8px", cursor: "pointer" }}
                >
                  {prediction.description}
                </li>
              ))}
            </ul>
          )}

          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker position={center} />
            </GoogleMap>
          )}
        </div>
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
