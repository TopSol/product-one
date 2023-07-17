import React, { useState, useEffect } from "react";
// import Modal from "@/app/component/Modal";
import { Input } from "antd";
import { collection, getDocs, addDoc } from "firebase/firestore";
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
  const { Column } = Table;
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

    const venue = {
      name: user.name,
      image: imageUrls,
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
                      width={30}
                      height={30}
                    />
                  );
                })}
              </div>
            )}
          />
        </Table>
        {/* {blogs.map((item, index) => {
          // console.log(item, "item333");
          return (
            <div key={index} className="border p-5 rounded-md mb-2">
              <div className="flex justify-between">
                <p>{item.name}</p>
                <p>{item.minCapacity}</p>
                <p>{item.maxCapacity}</p>
                <p>{item.availability}</p> 
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
        })}  */}
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
