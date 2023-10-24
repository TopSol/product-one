"use client";
import React, { use } from "react";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { db } from "@/app/firebase";
import { storage } from "@/app/firebase";
import { Button, Image, message } from "antd";
import { useRouter } from "next/navigation";
import { Modal } from "antd";
import { useStore } from "../../../store";
import { Input, Form } from "antd";
import { setDoc, doc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  Timestamp,
} from "firebase/storage";
import Loader from "@/app/_component/Loader";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import ImageCroper from "@/app/_component/ImageCropper";
// import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import RegistrationImg from "../../assets/images/RegistrationImg.png";
import "./style.css";
import "leaflet/dist/leaflet.css";
import "leaflet-geosearch/dist/geosearch.css";
import "react-phone-number-input/style.css";
import { type } from "os";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
const initialValue = {
  fullName: "",
  email: "",
  phoneNumber: "",
  password: "",
  capacity: "",
  address: "",
  marqueeDetails: "",
  image: [],
  marqueeName: "",
  landLineNumber: "",
};
function Details() {
  const [details, setDetails] = useState(initialValue);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal1Open, setModal1Open] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [location, setLocation] = useState({});
  const [value, setValue] = useState();
  const [landLineNumber, setLandLineNumber] = useState();
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
  const [isImageShow, setIsImageShow] = useState(false);

  const [imageId, setImageId] = useState([]);

  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4",
    libraries: ["places"],
  });
  // const storage = getStorage();
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
  useEffect(() => {
    // Get user's live location using Geolocation API
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Update the state with live latitude and longitude
          setCenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  const closeModal = () => {
    setModalOpen(false);
  };
  const onMarkerDragEnd = (e) => {
    setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
  const handleRegistration = async () => {
    console.log("aa");
    if (!fileList?.length) {
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
      // const imageUrls = await Promise.all(
      //   multipleImage.map(async (image) => {
      //     console.log(image?.file?.name, "imagrimagrsdfasdfasdfasgasda");
      //     const fileName = `${folderName}/${image?.file?.name}`;
      //     const storageRef = ref(storage, fileName);
      //     await uploadBytes(storageRef, image?.file);
      //     const urls = await getDownloadURL(storageRef);
      //     return urls;
      //   })
      // );
      const imageUrls = await Promise.all(
        fileList.map(async (image) => {
          console.log(image?.name, "imagrimagrsdfasdfasdfasgasda");
          const fileName = `${folderName}/${image?.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, image?.originFileObj);
          const urls = await getDownloadURL(storageRef);
          console.log(urls, "urlsurls");
          return urls;
        })
      );
      const VenueId = Math.random().toString(36).substring(2);
      const userInfo = {
        userId: user.uid,
        name: details.fullName,
        marqueeName: details.marqueeName,
        email: details.email,
        address: searchQuery,
        phoneNumber: value,
        landLineNumber: landLineNumber,
        capacity: details.capacity,
        locations: center,
        images: imageUrls,
        description: details.marqueeDetails,
        id: VenueId,
        createdAt: Timestamp.now(),
      };
      console.log(userInfo, "dsafasdfa");
      await setDoc(doc(db, "users", user.uid), userInfo);
      if (userInfo) {
        addRegistration(userInfo);
        // addUser(user.uid);
        addUser(userInfo);
        router.push("/adminMarquee");
        setLoading(true);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(multipleImage, "multipleImagemultipleImage");

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
              if (img.width > 500 && img.height > 500) {
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
    height: "200px",
  };

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    console.log(newFileList, "newFileList");
    const lastFile = newFileList[newFileList?.length - 1];
    newFileList.pop();
    setFileList([...newFileList, { ...lastFile, status: "done" }]);
    // setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const width = 2000;
  const height = 1300;
  const aspectRatio = width / height;
  console.log(fileList, "fileListfileList");
  return (
    <>
      <div className=" md:container mx-auto md:px-5">
        <p className=" mb-5 mt-7 text-[28px] md:text-3xl xl:text-4xl text-center font-semibold font-poppins text-primary items-center  justify-center  ">
          REGISTER HERE
        </p>
        <div className="w-full my-3">
          <Form
            className="w-full"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="flex flex-col md:flex-row  md:justify-between ">
              <div>
                <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[100.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Admin Name
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
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[100.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Admin Email
                    </b>
                  </div>
                  <Form.Item
                    className="w-[100%]"
                    name="email"
                    rules={[
                      {
                        // type: "email",
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
                <div className="w-[100%] flex flex-col md:items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[170.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Admin Phone Number
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
                <div className="w-[100%] flex flex-col md:items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[170.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Land Line Number
                    </b>
                  </div>

                  <Form.Item
                    name="phoneNumbe"
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
                      value={landLineNumber}
                      onChange={setLandLineNumber}
                      className="border outline-none md:w-[30vw] z-10  py-4 flex justify-center text-xs relative"
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[110.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Marquee Name
                    </b>
                  </div>{" "}
                  <Form.Item
                    className="w-[100%]"
                    name="marqueeName"
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
                      type="marqueeName"
                      name="marqueeName"
                      value={details.marqueeName}
                      onChange={handleChange}
                    />
                  </Form.Item>
                </div>
                <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[150.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                      Total person Capacity
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

                <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0 mb-4">
                  <div className="absolute top-[calc(50%_-_48.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[90.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                    <b className="absolute leading-[100%] z-20 pt-1">
                      Description
                    </b>
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
              </div>
            </div>
            {/* Image and address */}
            <div className="w-full flex flex-col ">
              {/* Image */}
              <p className="mb-2 font-Manrope font-bold  pl-5 lg:pl-0">Image</p>
              <div className="mb-3 flex flex-start w-full pl-5 lg:pl-0">
                <ImgCrop
                  rotationSlider
                  aspect={aspectRatio}
                  modalWidth={800}
                  modalTitle={"Edit your Image"}
                >
                  <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    // onPreview={onPreview
                    showUploadList={{
                      showPreviewIcon: false,
                      showRemoveIcon: false,
                    }}
                  >
                    {fileList.length < 5 && "+ Upload"}
                  </Upload>
                </ImgCrop>
              </div>

              {/* <div className="w-[100%] flex flex-col items-start relative px-5 md:px-0  ">
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
                    className="border outline-none w-full z-10 py-4 flex justify-center text-xs relative"
                    placeholder="Please Select Image"
                    type="file"
                    name="image"
                    multiple
                    onChange={(e) => {
                      handleImageDiemension(e);
                    }}
                  />
                </Form.Item>
              </div> */}
              <div className="w-full pl-5 lg:pl-0">
                {isImageShow && (
                  <div className="flex justify-start flex-wrap w-full px-3 mb-8">
                    {Object.values(multipleImage).map((item, index) => {
                      if (item && item.file instanceof Blob) {
                        const objectURL = URL.createObjectURL(item.file);
                        return (
                          <div key={index} className="mx-2">
                            <Image
                              src={objectURL}
                              alt="Marquee Image"
                              onClick={() => handleDiemension(item.id)}
                              width={200}
                              height={200}
                              className=" rounded-lg"
                            />
                          </div>
                        );
                      } else {
                        return <span key={index}>Invalid image data</span>;
                      }
                    })}
                  </div>
                )}
              </div>

              {/* Address */}
              <div className="w-[100%] flex flex-col items-start justify-center  relative px-5 md:px-0 ">
                <div className="absolute top-[calc(67%_-_50.5px)] z-20 left-[35.89px] md:left-[21.89px] rounded-3xs bg-white w-[69.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                    Address
                  </b>
                </div>{" "}
                <Input
                  type="text"
                  placeholder="Search location Here"
                  name="searchQuery"
                  value={searchQuery}
                  onChange={handleInputChange}
                  className="w-full py-4"
                />
              </div>
              <div>
                {predictions.length > 0 && (
                  <ul
                    className="w-[100%]  md:w-[80%] md:mx-auto flex flex-col justify-center"
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
                        onClick={() => {
                          handlePredictionClick(prediction);
                        }}
                        style={{ padding: "8px", cursor: "pointer" }}
                      >
                        {prediction.description}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </Form>
        </div>
        <div className="w-full flex justify-center ">
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={16}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              <Marker
                position={center}
                draggable={true}
                onDragEnd={onMarkerDragEnd}
              />
            </GoogleMap>
          )}
        </div>
        <div className="flex justify-end  w-[90%] my-3">
          <button
            className="flex justify-center border border-primary py-2 w-36 lg:px-3 font-extrabold rounded-md text-primary hover:bg-primary hover:text-white"
            onClick={handleRegistration}
          >
            {loading ? <Loader /> : "Next"}
          </button>
        </div>
      </div>

      <Modal
        className="modal "
        open={modal1Open}
        width={1000}
        onOk={() => {
          setIsImageShow(true);
          setModal1Open(false);
        }}
        bodyStyle={{ height: "700px" }}
        closable={true}
        centered
        onCancel={() => setModal1Open(false)}
        footer={[
          <div className="p-5" key={"Asd"}>
            <Button
              key="cancel"
              onClick={() => setModal1Open(false)}
              className=" border-primary text-primary "
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={() => {
                setIsImageShow(true);
                setModal1Open(false);
                setImageId([]);
              }}
              className="AddVenue  bg-primary text-white"
            >
              Next
            </Button>
          </div>,
        ]}
      >
        <div className="bg-primary py-6 rounded-t-lg"></div>
        {/* <div className="flex justify-center"> */}

        <ImageCroper
          image={image}
          setModal1Open={setModal1Open}
          setCropImage={setCropImage}
          multipleImage={multipleImage}
          setMultipleImage={setMultipleImage}
          handleDiemension={handleDiemension}
          setImageId={setImageId}
          imageId={imageId}
        />
        {/* <div className="flex flex-wrap px-3">
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
        </div> */}
      </Modal>
    </>
  );
}
export default Details;
