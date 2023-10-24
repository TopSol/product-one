import React, { useState, useEffect } from "react";
import Loader from "@/app/_component/Loader";
import Lightbox from "react-image-lightbox";
import Image from "next/image";
import Link from "next/link";
import dots from "../assets/images/dots.svg";
import { Checkbox, Button, Upload, message, Input } from "antd";
import { db } from "@/app/firebase";
import { Table } from "antd";
import { useStore } from "../../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import type { UploadFile, UploadProps } from "antd/es/upload/interface";
import "./style.css";
import ImgCrop from "antd-img-crop";
const initialFormState = {
  name: "",
  image: null,
  minCapacity: "",
  maxCapacity: "",
  price: "",
  services: [],
};
function Venues({
  modalOpen,
  setModalOpen,
  setDeleteVenues,
  deleteVenues,
  loading,
  setLoading,
  fetchData,
}) {
  const [user, setUser] = useState(initialFormState);
  const [addVenue, setAddVenue] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imageObject, setImageObject] = useState([]);
  const [openImageCropper, setOpenImageCropper] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { Column } = Table;
  const { userInformation, addUser, Venues, addVenues, dates } = useStore();
  const storage = getStorage();
  const storage2 = getStorage();
  const ImageRef = ref(storage, "images/");

  const plainOptions = ["Heating", "Cooling", "MusicSystem"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]:
        name === "price"
          ? Number(value)
          : name === "maxCapacity"
          ? Number(value)
          : name === "minCapacity"
          ? Number(value)
          : value,
    }));
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Venues"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

        addVenues(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenue]);

  const HandleaddVenue = async () => {
    if (
      !user.name ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
    setLoading(true);
    const folderName = `images`;
    const imageUrls = await Promise.all(
      imageObject.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage2, fileName);
        await uploadBytes(storageRef, image);
        const urls = await getDownloadURL(storageRef);
        return urls;
      })
    );

    const VenueId = Math.random().toString(36).substring(2);
    const venue = {
      name: user.name,
      image: imageUrls,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      venueId: VenueId,
      price: user.price,
      cropImage: fileList,
      services: user.services,
    };
    console.log(venue, "venuevenuevenue");
    try {
      await setDoc(doc(db, "Venues", VenueId), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenue([...addVenue, user]);
    setModalOpen(false);
    setLoading(false);
    setUser(initialFormState);
    setFileList([]);
    setImageObject([]);
    fetchData();
  };

  const EditVenue = async (dishId) => {
    setOpenEditVenue(true);
    setModalOpen((prevState) => !prevState);
    const docRef = doc(db, "Venues", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data(), "docSnap.data()");
      setUser(docSnap.data());
      setFileList(docSnap.data().cropImage);
    } else {
      console.log("No such document!");
    }
  };

  const updateVenue = async (venueId) => {
    setLoading((pre) => !pre);
    const folderName = `images`;

    const imageUrls = await Promise.all(
      imageObject.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage2, fileName);
        await uploadBytes(storageRef, image);
        const urls = await getDownloadURL(storageRef);
        return urls;
      })
    );

    try {
      const updatedUser = JSON.parse(JSON.stringify(user));
      updatedUser.image = [...updatedUser.image, ...imageUrls];
      updatedUser.cropImage = [...fileList];

      const washingtonRef = doc(db, "Venues", venueId);
      await updateDoc(washingtonRef, updatedUser);

      const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
      if (updatedIndex !== -1) {
        const updatedVenues = [...Venues];
        updatedVenues[updatedIndex] = { ...updatedUser, id: venueId };
        addVenues(updatedVenues);
      } else {
        addVenues([...Venues, { ...updatedUser, id: venueId }]);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setModalOpen(false);
    setOpenEditVenue(false);
    setUser(initialFormState);
    setFileList([]);
    setImageObject([]);
    setLoading((pre) => !pre);
  };

  const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
    setUser({ ...user, services: checkedValues });
  };
  const onChange = (id) => {
    if (deleteVenues.includes(id)) {
      const data = deleteVenues.filter((item) => item !== id);
      setDeleteVenues(data);
    } else {
      setDeleteVenues([...deleteVenues, id]);
    }
  };
  const renderHeader = () => (
    <div className="header-container flex justify-between text-center">
      <div className="bg-primary py-4 text-white rounded-tl-lg w-[15%]">
        Check box
      </div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%] ">Name</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">
        Minimum Capacity
      </div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">
        Maximum Capacity
      </div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Price</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Images</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white w-[15%] rounded-tr-lg  flex justify-end pr-2">
        Action
      </div>
    </div>
  );

  const handleOnChange: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => {
    console.log(newFileList, "newFileList");
    const lastFile = newFileList[newFileList?.length - 1];
    newFileList.pop();
    setFileList([...newFileList, { ...lastFile, status: "done" }]);
  };

  const width = 1500;
  const height = 1000;
  const aspectRatio = width / height;

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result;

      img.onload = () => {
        if (aspectRatio) {
          setFileList((prev) => [...prev, { url: reader.result }]);
          setImageObject((prevImageObject) => [...prevImageObject, file]);
        } else {
          message.warning(
            "Please upload an image with a width of at least 1500px and a height of at least 1000px."
          );
        }
      };
    };

    return false;
  };

  return (
    <>
      <div className="md:px-10">
        <Table dataSource={Venues} className="myTable">
          <Column
            title="Check box"
            dataIndex="venueId"
            key="venueId"
            render={(venueId) => (
              <div>
                <Checkbox onClick={() => onChange(venueId)} />
              </div>
            )}
          />
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Minimum Capacity"
            dataIndex="minCapacity"
            key="minCapacity"
          />
          <Column
            title="Maximum Capacity"
            dataIndex="maxCapacity"
            key="maxCapacity"
          />
          <Column title="Price" dataIndex="price" key="price" />
          <Column
            title="Images"
            dataIndex="image"
            key="image"
            render={(image) => (
              <div className="flex items-center">
                <img
                  alt="sdf"
                  src={image.length > 0 ? image[0] : "fallback-image-url.jpg"}
                  className="ml-3 w-[80px]"
                />
                {
                  <Link
                    onClick={() => {
                      setIsOpen(true);
                      setPreviewImage(image);
                      setPhotoIndex(0);
                    }}
                    className="text-blue-600 underline ml-2"
                    href=""
                  >
                    {image.length > 1 && `${image.length - 1} more`}
                  </Link>
                }
              </div>
            )}
          />
          <Column
            title="Action"
            dataIndex="venueId"
            key="venueId"
            render={(venueId) => (
              <div>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  width={15}
                  className="ml-3 text-green-500 text-xl"
                  onClick={() => EditVenue(venueId)}
                />
              </div>
            )}
          />
        </Table>
      </div>
      <Modal
        className=" modal text-center w-full md:height[620px]"
        centered
        open={modalOpen}
        width={600}
        bodyStyle={{ height: 683, padding: 0 }}
        onCancel={() => setModalOpen(false)}
        okButtonProps={{ className: "custom-ok-button" }}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer md:-mt-[10px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        }
        footer={[
          <div className=" pb-5 mr-3" key={"index"}>
            <Button
              key="cancel"
              onClick={() => setModalOpen(false)}
              className=" AddVenue  border-primary text-primary hover:bg-none "
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={() =>
                openEditVenue ? updateVenue(user.venueId) : HandleaddVenue()
              }
              className="AddVenue bg-primary text-white hover:bg-none"
            >
              {loading ? <Loader /> : "Add"}
            </Button>
          </div>,
        ]}
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              alt="sdf"
              src={dots}
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4"> Add Marquee Section</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[80%]  justify-center ">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1 ">
                  Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>

            <p className="mb-2 font-Manrope font-bold  pl-5 lg:pl-0">Image</p>
            <div className="mb-3 flex flex-start w-full pl-5 lg:pl-0">
              {/* <ImgCrop
                rotationSlider
                aspect={aspectRatio}
                modalWidth={800}
                modalTitle={"Edit your Image"}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  // onChange={handleOnChange}
                  // onPreview={onPreview
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: false,
                  }}
                >
                  {fileList?.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop> */}
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
                  beforeUpload={beforeUpload}
                  // onChange={handleOnChange}
                  // onPreview={onPreview
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: false,
                  }}
                >
                  {fileList?.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>
            {/* <Form form={form} onFinish={handleSubmit}>
              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute top-[calc(50%_-_62.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">
                    Images
                  </p>
                </div>
                <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                  <Form.Item name="image">
                    <Input
                      placeholder="Basic usage"
                      type="file"
                      name="image"
                      multiple
                      onChange={(e) => {
                        setUser({ ...user, image: e.target.files });
                      }}
                      className="border outline-none md:w-[440px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                    />
                  </Form.Item>
                </div>
              </div>
            </Form> */}
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[165.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Minimum Capacity
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[165.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Maximum Capacity
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Maximum Capacity"
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  price
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Number"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] w-full z-10  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative">
              <label className=" text-lg ">services</label>

              <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Checkbox.Group
                  options={plainOptions}
                  value={user.services as CheckboxValueType[]}
                  onChange={handleCheckboxChange}
                  className=" outline-none md:w-[700px] w-full  z-10   py-5  flex  text-xs "
                />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-wrap">
              {user.image &&
                Object.values(user.image).map((img, index) => {         
                  return (
                    <img
                      // src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })}
            </div> */}
        </div>
      </Modal>
      {isOpen && (
        <Lightbox
          mainSrc={previewImage[photoIndex]}
          nextSrc={previewImage[(photoIndex + 1) % previewImage.length]}
          prevSrc={
            previewImage[
              (photoIndex + previewImage.length - 1) % previewImage.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + previewImage.length - 1) % previewImage.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % previewImage.length)
          }
        />
      )}
    </>
  );
}

export default Venues;

// import React, { useState, useEffect, useRef } from "react";
// import Loader from "../../component/Loader";
// import Lightbox from "react-image-lightbox";
// import Image from "next/image";
// import { Checkbox, Button, Form } from "antd";
// import Link from "next/link";
// // import dots from "../../assets/images/dots.svg"; 11
// import type { CheckboxValueType } from "antd/es/checkbox/Group";
// import {
//   collection,
//   getDocs,
//   setDoc,
//   doc,
//   getDoc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "@/app/firebase";
// import "./style.css";
// import VenuesModal from "@/app/component/adminModals/venuesModal";
// import { Table } from "antd";
// import { useStore } from "../../../store";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { Modal } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { Input } from "antd";
// const initialFormState = {
//   name: "",
//   image: null,
//   minCapacity: "",
//   maxCapacity: "",
//   price: "",
//   services: [],
// };
// function Venues({
//   modalOpen,
//   setModalOpen,
//   setDeleteVenues,
//   deleteVenues,
//   loading,
//   setLoading,
//   fetchData
// }) {
//   const [user, setUser] = useState(initialFormState);
//   const [addVenue, setAddVenue] = useState([]);
//   const [previewImage, setPreviewImage] = useState([]);
//   const [openEditVenue, setOpenEditVenue] = useState(false);
//   const [photoIndex, setPhotoIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const { Column } = Table;
//   const { userInformation, addUser, Venues, addVenues, dates } = useStore();
//   const storage = getStorage();
//   const storage2 = getStorage();
//   const ImageRef = ref(storage, "images/");
//   const imgRef = useRef(null)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevState) => ({
//       ...prevState,
//       [name]:
//         name === "price"
//           ? Number(value)
//           : name === "maxCapacity"
//             ? Number(value)
//             : name === "minCapacity"
//               ? Number(value)
//               : value,
//     }));
//   };
//   const [form] = Form.useForm();

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const response = await getDocs(collection(db, "Venues"));
//         const tempArray = response.docs
//           .filter((doc) => userInformation.userId === doc.data().userId)
//           .map((doc) => ({
//             ...doc.data(),
//             id: doc.id,
//           }));

//         addVenues(tempArray);
//       } catch (error) {
//         console.error("Error fetching blogs:", error);
//       }
//     };

//     fetchBlogs();
//   }, [addVenue]);

//   const HandleaddVenue = async () => {
//     if (
//       !user.name ||
//       !user.image ||
//       !user.minCapacity ||
//       !user.maxCapacity ||
//       !user.price
//     ) {
//       return;
//     }
//     setLoading(true);
//     const images = Object.values(user.image);
//     const folderName = `images`;
//     const imageUrls = await Promise.all(
//       images.map(async (image) => {
//         const fileName = `${folderName}/${image.name}`;
//         const storageRef = ref(storage2, fileName);
//         await uploadBytes(storageRef, image);
//         const urls = await getDownloadURL(storageRef);
//         return urls;
//       })
//     );

//     const VenueId = Math.random().toString(36).substring(2);
//     const venue = {
//       name: user.name,
//       image: imageUrls,
//       minCapacity: user.minCapacity,
//       maxCapacity: user.maxCapacity,
//       userId: userInformation.userId,
//       venueId: VenueId,
//       price: user.price,
//       services: user.services,
//     };
//     try {
//       await setDoc(doc(db, "Venues", VenueId), venue);
//     } catch (error) {
//       console.log(error, "error");
//     }
//     setAddVenue([...addVenue, user]);
//     setUser(initialFormState);
//     // setModalOpen(false);
//     setLoading(false);
//     // fetchData()
//     // setUser({ ...user, image: null })
//     handleSubmit()
//   };

//   const EditVenue = async (dishId) => {
//     setOpenEditVenue(true);
//     setModalOpen((prevState) => !prevState);
//     const docRef = doc(db, "Venues", dishId);
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//       setUser(docSnap.data());
//     } else {
//       console.log("No such document!");
//     }
//   };
//   console.log(user, "useruser")
//   const updateVenue = async (venueId) => {
//     setLoading((pre) => !pre);

//     if (typeof user?.image[0] === "string") {
//       try {
//         await setDoc(doc(db, "Venues", venueId), user);
//         const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
//         if (updatedIndex !== -1) {
//           const updatedVenues = [...Venues];
//           updatedVenues[updatedIndex] = { ...user, id: venueId };
//           addVenues(updatedVenues);
//         } else {
//           addVenues([...Venues, { ...user, id: venueId }]);
//         }
//       } catch (error) {
//         console.log(error, "error");
//       }
//     } else {
//       const images = Object.values(user.image);
//       console.log(images, "sdfdsfdsfdsf");
//       const folderName = `images`;
//       const imageUrls = await Promise.all(
//         images.map(async (image) => {
//           const fileName = `${folderName}/${image.name}`;
//           const storageRef = ref(storage2, fileName);
//           // const storageRef = ref(storage, fileName);
//           await uploadBytes(storageRef, image);
//           const urls = await getDownloadURL(storageRef);
//           return urls;
//         })
//       );
//       try {
//         const updatedUser = JSON.parse(JSON.stringify(user));
//         updatedUser.image = imageUrls;

//         await setDoc(doc(db, "Venues", venueId), updatedUser);

//         const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
//         if (updatedIndex !== -1) {
//           const updatedVenues = [...Venues];
//           updatedVenues[updatedIndex] = { ...updatedUser, id: venueId };
//           addVenues(updatedVenues);
//         } else {
//           addVenues([...Venues, { ...updatedUser, id: venueId }]);
//         }
//       } catch (error) {
//         console.log(error, "error");
//       }
//     }
//     setModalOpen(false);
//     setUser(initialFormState);
//     setOpenEditVenue(false);
//     setLoading((pre) => !pre);
//   };
//   const plainOptions = ["Heating", "Cooling", "MusicSystem"];
//   const handleCheckboxChange = (checkedValues: CheckboxValueType[]) => {
//     setUser({ ...user, services: checkedValues });
//   };
//   const onChange = (id)=> {
//     if (deleteVenues.includes(id)) {
//       const data = deleteVenues.filter((item) => item !== id);
//       setDeleteVenues(data);
//     } else {
//       setDeleteVenues([...deleteVenues, id]);
//     }
//   };
//   const renderHeader = () => (
//     <div className="header-container flex justify-between text-center">
//       <div className="bg-primary py-4 text-white rounded-tl-lg w-[15%]">
//         Check box
//       </div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white  w-[15%] ">Name</div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white  w-[15%]">
//         Minimum Capacity
//       </div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white  w-[15%]">
//         Maximum Capacity
//       </div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white  w-[15%]">Price</div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white  w-[15%]">Images</div>
//       <div className=" flex justify-center bg-primary">
//         <span className="h-6 border-l-2 border-white my-auto"></span>
//       </div>
//       <div className="bg-primary py-4 text-white w-[15%] rounded-tr-lg  flex justify-end pr-2">
//         Action
//       </div>
//     </div>
//   );
//   const handleSubmit = () => {
//     form.resetFields();
//   }
//   return (
//     <>
//       <div className="md:px-10">
//         <Table dataSource={Venues} className="myTable">
//           <Column
//             title="Check box"
//             dataIndex="venueId"
//             key="venueId"
//             render={(venueId) => (
//               <div>
//                 <Checkbox onClick={() => onChange(venueId)} />
//               </div>
//             )}
//           />
//           <Column title="Name" dataIndex="name" key="name" />
//           <Column
//             title="Minimum Capacity"
//             dataIndex="minCapacity"
//             key="minCapacity"
//           />
//           <Column
//             title="Maximum Capacity"
//             dataIndex="maxCapacity"
//             key="maxCapacity"
//           />
//           <Column title="Price" dataIndex="price" key="price" />
//           <Column
//             title="Images"
//             dataIndex="image"
//             key="image"
//             render={(image) => (
//               <div className="flex items-center">
//                 <img
//                   alt="sdf"
//                   src={image.length > 0 ? image[0] : "fallback-image-url.jpg"}
//                   className="ml-3 w-[80px]"
//                 />
//                 {
//                   <Link
//                     onClick={() => {
//                       setIsOpen(true);
//                       setPreviewImage(image);
//                       setPhotoIndex(0);
//                     }}
//                     className="text-blue-600 underline ml-2"
//                     href=""
//                   >
//                     {image.length > 1 && `${image.length - 1} more`}
//                   </Link>
//                 }
//               </div>
//             )}
//           />
//           <Column
//             title="Action"
//             dataIndex="venueId"
//             key="venueId"
//             render={(venueId) => (
//               <div>
//                 <FontAwesomeIcon
//                   icon={faPenToSquare}
//                   width={15}
//                   className="ml-3 text-green-500 text-xl"
//                   onClick={() => EditVenue(venueId)}
//                 />
//               </div>
//             )}
//           />
//         </Table>
//       </div>
//       <VenuesModal
//         modalOpen={modalOpen}
//         setModalOpen={setModalOpen}
//         updateVenue={updateVenue}
//         HandleaddVenue={HandleaddVenue}
//         loading={loading}
//         setUser={setUser}
//         plainOptions={plainOptions}
//         handleCheckboxChange={handleCheckboxChange}
//         openEditVenue={openEditVenue}
//         user={user}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//       />
//       {isOpen && (
//         <Lightbox
//           mainSrc={previewImage[photoIndex]}
//           nextSrc={previewImage[(photoIndex + 1) % previewImage.length]}
//           prevSrc={
//             previewImage[
//             (photoIndex + previewImage.length - 1) % previewImage.length
//             ]
//           }
//           onCloseRequest={() => setIsOpen(false)}
//           onMovePrevRequest={() =>
//             setPhotoIndex(
//               (photoIndex + previewImage.length - 1) % previewImage.length
//             )
//           }
//           onMoveNextRequest={() =>
//             setPhotoIndex((photoIndex + 1) % previewImage.length)
//           }
//         />
//       )}
//     </>
//   );
// }

// export default Venues;
