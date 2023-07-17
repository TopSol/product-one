import React, { useState, useEffect } from "react";
// import Modal from "@/app/component/Modal";
import { Input } from "antd";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import './style.css'
import { useStore } from "../../../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button, Modal } from "antd";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  price: "",
};
function Venues({ modalOpen, setModalOpen }) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const { userInformation, addUser } = useStore();
  const storage = getStorage();
  // const [modal2Open, setModal2Open] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const closeModal = () => {
    setModalOpen(false);
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

        setBlogs(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);

  const handleUpload = async (img) => {
    const storageRef = ref(storage, "images/" + img.name);
    await uploadBytes(storageRef, img);

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);

    // Use the downloadURL for further processing or storing in Firebase Firestore
    // console.log(downloadURL,"downloadURL");
  };

  const HandleAddVenues = async () => {
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }

    const venue = {
      name: user.name,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      price: user.price,
    };
    try {
      await addDoc(collection(db, "Venues"), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  console.log(blogs, "blogsddd1ww3311", userInformation.userId);

  return (
    <>
      <div className="md:container mx-auto">
        {blogs.map((item, index) => {
          // console.log(item, "item333");
          return (
            <div key={index} className="border p-5 rounded-md mb-2">
              <div className="flex justify-between">
                <p>{item.name}</p>
                <p>{item.minCapacity}</p>
                <p>{item.maxCapacity}</p>
                {/* <p>{item.availability}</p> */}
                <p>{item.price}</p>
              </div>
            </div>
          );
        })}
        {/* {
          addVenues.map((item, index) => {
            // console.log(item, "item333");
            return (
              <div key={index} className="border p-5 rounded-md mb-2">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.minCapacity}</p>
                  <p>{item.maxCapacity}</p>
                  <p>{item.availability}</p>
                  <p>{item.price}</p>
                </div>
                <div className="flex flex-wrap">
                  {item.image &&
                    Object.values(item.image).map((img, index) => {
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                
                      // Call the handleUpload function to upload the image
                      // handleUpload(img);
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                      // setAddVenuesImage((prevImages) => [...prevImages, imageUrl]);
                      
                      // console.log(URL.createObjectURL(img), "img1a22211");
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
            );
          }
        )} */}
      </div>
      <Modal
       
        className="text-center"
        centered
        open={modalOpen}
        onOk={() => HandleAddVenues()}
        onCancel={() => setModalOpen(false)}
        width={900}
        bodyStyle={{ height: 500 }}
        okButtonProps={{ className: "custom-ok-button" }}
      
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div>
            <p className="text-2xl mb-2">Venus</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col md:border-2 w-[100%] md:w-[70%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between" >
                <label className="text-xl">Name:</label>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl">Images</label>
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <label className="text-xl">Minimum Capacity:</label>
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <label className="text-xl">Maximum Capacity:</label>
                <Input
                  placeholder="Maximum Capacity"
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <label className="text-xl">price:</label>
                <Input
                  placeholder="Number"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="md:w-[50%]"
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
            <div className="flex justify-center">
              {/* <Button
                type="primary"
                size={"large"}
                className="bg-blue-500"
                onClick={() => HandleAddVenues()}
              >
                Add Venues
              </Button> */}
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => HandleAddVenues()}
              >
                Add Venues
              </button> */}
            </div>
            
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
