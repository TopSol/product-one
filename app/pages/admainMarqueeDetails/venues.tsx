import React, { useState, useEffect } from "react";
import Loader from "../../component/Loader";
import ImageLightbox from "react-image-lightbox";
import Lightbox from "react-image-lightbox";
import { Button, Popconfirm } from "antd";
// import { Image } from "antd";
import Image from "next/image";
import Link from "next/link";
import { Checkbox } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import "./style.css";
import { Table } from "antd";
import { useStore } from "../../../store";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { set } from "date-fns";
import dots from "@/app/assets/images/dots.svg";
import { Input, Form } from "antd";
const initialFormState = {
  name: "",
  image: "",
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
}) {
  const [user, setUser] = useState(initialFormState);
  const [addVenue, setaddVenue] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { Column } = Table;
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [addVenueImage, setaddVenueImage] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  // const [deleteVenues, setDeleteVenues] = useState([]);
  const { userInformation, addUser, Venues, addVenues, dates } = useStore();
  const storage = getStorage();
  const [previewImage, setPreviewImage] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const ImageRef = ref(storage, "images/");
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
    // setUser((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };
  console.log(userInformation, "userInformation");

  console.log(userInformation.userId, "userInformaddtion", userInformation);
  useEffect(() => {
    // listAll(ImageRef)
    //   .then((res) => {
    //     res.items.forEach((itemRef) => {
    //       getDownloadURL(itemRef).then((url) => {
    //         setaddVenueImage((prevState) => [...prevState, url]);
    //       });
    //     });
    //   })
    //   .catch((error) => {});

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
        console.log("tempArray", tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenue]);

  const HandleaddVenue = async () => {
    console.log("use333r", user);
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
    setLoading(true);
    const images = Object.values(user.image);
    const folderName = `images`;
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
    const VenueId = Math.random().toString(36).substring(2);
    const venue = {
      name: user.name,
      image: imageUrls,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      venueId: VenueId,
      // availability: user.availability,
      price: user.price,
      services: user.services,
    };
    try {
      await setDoc(doc(db, "Venues", VenueId), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setaddVenue([...addVenue, user]);
    setModalOpen(false);
    setUser(initialFormState);
    setLoading(false);
  };
  const deleteVenue = async (VenueId) => {
    console.log(VenueId, "VenueId");
    // try {
    //   await deleteDoc(doc(db, "Venues", VenueId));
    //   const newBlogs = Venues.filter((blog) => blog.id !== VenueId);
    //   console.log(newBlogs, "newBlogs");
    //   addVenues(newBlogs);
    // } catch (error) {
    //   console.error("Error removing document: ", error);
    // }
  };
  console.log(Venues, "Venues");
  const EditVenue = async (dishId) => {
    setOpenEditVenue(true);
    setModalOpen((prevState) => !prevState);
    const docRef = doc(db, "Venues", dishId);
    const docSnap = await getDoc(docRef);
    console.log("sdfasdfafsda", docSnap.data());
    if (docSnap.exists()) {
      setUser(docSnap.data());
      // setSelectedItems(docSnap.data().dishes);
      console.log("Documentsss", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const updateVenue = async (venueId) => {
    setLoading((pre) => !pre);

    if (typeof user?.image[0] === "string") {
      try {
        await setDoc(doc(db, "Venues", venueId), user);
        const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
        if (updatedIndex !== -1) {
          const updatedVenues = [...Venues];
          updatedVenues[updatedIndex] = { ...user, id: venueId };
          console.log(updatedVenues, "updatedVenues");
          addVenues(updatedVenues);
        } else {
          addVenues([...Venues, { ...user, id: venueId }]);
        }
      } catch (error) {
        console.log(error, "error");
      }
    } else {
      const images = Object.values(user.image);
      const folderName = `images`;
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
      try {
        const updatedUser = JSON.parse(JSON.stringify(user));
        updatedUser.image = imageUrls;
        console.log("updatedUserdd", updatedUser, "venueId", venueId);

        await setDoc(doc(db, "Venues", venueId), updatedUser);

        const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
        if (updatedIndex !== -1) {
          const updatedVenues = [...Venues];
          updatedVenues[updatedIndex] = { ...updatedUser, id: venueId };
          console.log(updatedVenues, "updatedVenues");
          addVenues(updatedVenues);
        } else {
          addVenues([...Venues, { ...updatedUser, id: venueId }]);
        }
      } catch (error) {
        console.log(error, "error");
      }
    }
    setModalOpen(false);
    setUser(initialFormState);
    setOpenEditVenue(false);
    setLoading((pre) => !pre);
  };
  const plainOptions = ["Heating", "Cooling", "MusicSystem"];
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
                  width={80}
                  height={80}
                  src={image.length > 0 ? image[0] : "fallback-image-url.jpg"}
                  alt="Description of the image"
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
                <Popconfirm
                  title="Delete Venues?"
                  description="Are you sure to delete Venues?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteVenue(venueId)}
                >
                  {/* <FontAwesomeIcon
                    icon={faTrashCan}
                    width={15}
                    className="text-red-500 cursor-pointer text-xl"
                  /> */}
                </Popconfirm>
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
        bodyStyle={{ height: 630, padding: 0 }}
        onCancel={() => setModalOpen(false)}
        okButtonProps={{ className: "custom-ok-button" }}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer md:-mt-[30px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
              // style={{marginTop:-30}}
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
          <div className=" pb-5 mr-3">
          <Button key="cancel" onClick={() => setModalOpen(false)}
           className=" border-primary text-primary "
          >
            Cancel
          </Button>
          <Button
            key="ok"
            type="primary"
            onClick={() =>
              openEditVenue ? updateVenue(user.venueId) : HandleaddVenue()
            }
            className="AddVenue bg-primary text-white"
            >
            {loading ? <Loader /> : "Add"}
          </Button>
            </div>
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
            <p className="text-xl pl-3 text-white py-4"> Add Venues</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[90%]  justify-center ">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Name</b>
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
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Email</b>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[143.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">
                  Minimum Capacity
                </b>
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
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[143.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">
                  Maximum Capacity
                </b>
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
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">price</b>
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
              <label className="text-xl">services</label>

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
