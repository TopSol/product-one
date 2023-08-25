import React, { useState, useEffect } from "react";
import Loader from "../../component/Loader";
import ImageLightbox from "react-image-lightbox";
import Lightbox from "react-image-lightbox";
import { Button, Input, Popconfirm } from "antd";
import DeleteItem from "../../component/DeleteItem";
import { Image } from "antd";
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
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  price: "",
  services: [],
};
function Venues({ modalOpen, setModalOpen, setDeleteVenues,deleteVenues, loading, setLoading, }) {
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
    if(deleteVenues.includes(id)){
      const data = deleteVenues.filter((item)=> item !== id)
      setDeleteVenues(data)

    }else{
      setDeleteVenues([...deleteVenues,id])
    }
  };
  console.log(deleteVenues,"deleteVenuesdeleteVenues")
  return (
    <>
      <div className="md:px-10">
        <Table dataSource={Venues} className="myTable">
          <Column title="Check box" dataIndex="venueId" key="venueId" 
          render={(venueId) => (
            <div>
              <Checkbox onClick={()=> onChange(venueId)}/>
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
                <Image
                  width={80}
                  src={image[0]}
                  onClick={() => {
                    setIsOpen(true);
                    setPhotoIndex(0);
                  }}
                />
                {
                  <Link
                    onClick={() => {
                      setIsOpen(true);
                      setPhotoIndex(0);
                    }}
                    className="text-blue-600 underline ml-2"
                    href=""
                  >
                    
                    {image?.length} more
                  </Link>
                }
                {isOpen && (
                  <Lightbox
                    mainSrc={image[photoIndex]}
                    nextSrc={image[(photoIndex + 1) % image.length]}
                    prevSrc={
                      image[(photoIndex + image.length - 1) % image.length]
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                      setPhotoIndex(
                        (photoIndex + image.length - 1) % image.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % image.length)
                    }
                  />
                )}
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
        className="text-center w-full"
        centered
        open={modalOpen}
        width={700}
        bodyStyle={{ height: 670 }}
        onCancel={() => setModalOpen(false)}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() =>
              openEditVenue ? updateVenue(user.venueId) : HandleaddVenue()
            }
            className="bg-blue-500"
          >
            {loading ? <Loader /> : "Ok"}
          </Button>,
        ]}
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl mt-5 ">Venues</p>
          </div>
          <hr className="w-full bg-black my-3" />
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[100%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <label className="text-xl my-1">
                {" "}
                <span className="text-red-600">*</span> Name
              </label>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="rounded-none flex w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">
                {" "}
                <span className="text-red-600">*</span> Image
              </label>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  // value={user.image}
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">Minimum Capacity:</label>
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">Maximum Capacity:</label>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <Input
                  placeholder="Maximum Capacity"
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">price:</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <Input
                  placeholder="Number"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">Services:</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                {/* <Checkbox.Group options={plainOptions} defaultValue={['Apple']} onChange={(checkedValues: CheckboxValueType[])=>  setUser({ ...user, services: checkedValues }) } /> */}
                <Checkbox.Group
                  options={plainOptions}
                  value={user.services as CheckboxValueType[]}
                  onChange={handleCheckboxChange}
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              {/* {user.image &&
                Object.values(user.image).map((img, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })} */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
