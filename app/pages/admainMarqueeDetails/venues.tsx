import React, { useState, useEffect } from "react";
// import Modal from "@/app/component/Modal";
import ImageLightbox from "react-image-lightbox";
import { Input } from "antd";
import {
  collection,
  getDocs,
  setDoc,
  doc,
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
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  price: "",
};
function Venues({ modalOpen, setModalOpen,handleClick }) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { Column } = Table;
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const { userInformation, addUser } = useStore();
  const storage = getStorage();
  console.log(user, "user33");
  const ImageRef = ref(storage, "images/");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    listAll(ImageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setAddVenuesImage((prevState) => [...prevState, url]);
          });
        });
      })
      .catch((error) => {});

    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Venues"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

        setBlogs(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);
  const HandleAddVenues = async () => {
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
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
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
    };
    try {
      await setDoc(doc(db, "Venues", VenueId), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  const deleteVenue = async (VenueId) => {
    try {
      await deleteDoc(doc(db, "Venues", VenueId));
      const newBlogs = blogs.filter((blog) => blog.id !== VenueId);
      setBlogs(newBlogs);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  console.log(blogs, "blogs");
  return (
    <>
      <div className="">
        <Table dataSource={blogs} className="myTable">
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
              <div className="flex">
                {image?.map((dish, index) => {
                  return (
                    <img
                      key={index}
                      src={dish}
                      alt="img"
                      width={50}
                      height={50}
                      className="mr-2"
                      onClick={() => handleClick(image,index)}
                    />
                  );
                })}
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
                  icon={faTrashCan}
                  className="text-red-500 cursor-pointer text-xl"
                  onClick={() => deleteVenue(venueId)}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className="ml-3 text-green-500 text-xl"
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
        onOk={() => HandleAddVenues()}
        onCancel={() => setModalOpen(false)}
        width={700}
        bodyStyle={{ height: 630 }}
        okButtonProps={{ className: "custom-ok-button" }}
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl mt-5  ">Venues</p>
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

            <div className="flex flex-wrap">
              {user.image &&
                Object.values(user.image).map((img, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
