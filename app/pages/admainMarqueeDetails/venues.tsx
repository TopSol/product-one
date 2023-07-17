import React, { useState, useEffect } from "react";
// import Modal from "@/app/component/Modal";
import { Input } from "antd";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import "./style.css";
import { useStore } from "../../../store";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { Button, Modal } from "antd";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  // availability: "",
  price: "",
};
function Venues({ modalOpen, setModalOpen }) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const [blogs, setBlogs] = useState([]);
  // const [imageUrls, setImageUrls] = useState([]);
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
  const closeModal = () => {
    setModalOpen(false);
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
  console.log(addVenuesImage, "addVenudddesImage");
  const handleUpload = async (img) => {
    const storageRef = ref(storage, "images/" + img.name);
    await uploadBytes(storageRef, img);
    const downloadURL = await getDownloadURL(storageRef);
  };

  const HandleAddVenues = async () => {
    const images = Object.values(user.image);
    const folderName = `images`;
    // let imagesUrls = [];
    const imageUrls = await Promise.all(images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const urls = await getDownloadURL(storageRef);
        console.log("imageUrls123", urls)
        return urls
      }));
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      // !user.availability ||
      !user.price
    ) {
      return;
    }

    const venue = {
      name: user.name,
      image: imageUrls,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      // availability: user.availability,
      price: user.price,
    };
    try {
      await addDoc(collection(db, "Venues"), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    // const folderName = `images`;
    // images.forEach(async (img) => {
    //   const imageRef = ref(storage, `${folderName}/${img.name + Date.now()}`);
    //   await uploadBytes(imageRef, img).then((snapshot) => {
    //     getDownloadURL(snapshot.ref).then((url) => {
    //       setImageUrls((prev) => [...prev, url]);
    //     });
    //   });
    // });

    setModalOpen(false);
    setUser(initialFormState);
  };
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
                {item?.image &&
                item?.image.map((img, index) => (
                  <div key={index} className="w-[20%] h-[20%] bg-slate-500">
                     <img src={img} alt="img" className="w-full h-full" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
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
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
