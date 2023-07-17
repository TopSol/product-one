import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { Input } from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useStore } from "../../../store";
import { Modal } from "antd";
const initialFormState = {
  name: "",
  image: "",
  price: "",
  type: "",
  // marqueeId: "",
  availability: "",
  description: "",
  // category: "",
};
function Menus({ modalOpen, setModalOpen }) {
  const { userInformation, addUser } = useStore();
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const storage = getStorage();
  const ImageRef = ref(storage, "images/");
  const [blogs, setBlogs] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log("imageUrls", imageUrls);
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
        const response = await getDocs(collection(db, "Menus"));
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
  const closeModal = () => {
    setModalOpen(false);
  };

  const HandleAddVenues = async () => {
    const images = Object.values(user.image);
    const folderName = `images`;
    let imagesUrls = [];
    const urls = await Promise.all(images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const utls = await getDownloadURL(storageRef);
        console.log("imageUrls123", utls)
        return utls
      }));
      
    console.log("imageUr22ls", urls);
    setImageUrls(imageUrls);
    if (
      !user.name ||
      !user.image ||
      !user.price ||
      !user.type ||
      !user.marqueeId ||
      !user.availability ||
      !user.description
    ) {
      return;
    }
    const users = {
      name: user.name,
      image: urls,
      type: user.type,
      // marqueeId: user.marqueeId,
      availability: user.availability,
      description: user.description,
      // category: user.category,
      userId: userInformation.userId,
      price: user.price,
    };

    try {
      console.log(imageUrls, "images1112");
      await addDoc(collection(db, "Menus"), users);
      console.log("close2");
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);

    setModalOpen(false);
    console.log("close4");
    setUser(initialFormState);
  };
  const { TextArea } = Input;
  return (
    <div className="md:container mx-auto">
      {blogs.map((item, index) => {
        console.log(item, "item22");
        return (
          <div key={index} className="border p-5 rounded-md mb-2">
            <div className="flex justify-between flex-wrap">
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.type}</p>
              <p>{item.marqueeId}</p>
              <p>{item.availability}</p>
              <p>{item.description}</p>

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
      <Modal
        className="text-center"
        centered
        open={modalOpen}
        onOk={() => HandleAddVenues()}
        onCancel={() => setModalOpen(false)}
        width={900}
        bodyStyle={{ height: 600 }}
        okButtonProps={{ className: "custom-ok-button" }}
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div>
            <p className="text-2xl mb-2">Menus</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col md:border-2 w-[100%] md:w-[70%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <div className=" mb-3 md:md:mb-6 flex flex-col md:flex-row  md:justify-between">
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
              <div className="mb-3 md:mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl">Images:</label>
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
            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="md:mb-6 flex flex-col  md:flex-row md:justify-between">
                <label className="text-xl">Price:</label>
                <Input
                  placeholder="Price"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
              <div className="mb-3 md:mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <label className="text-xl">Type:</label>
                <Input
                  placeholder="Type"
                  type="text"
                  name="type"
                  value={user.type}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              {/* <div className="mb-3 md:mb-6 flex flex-col  md:flex-row md:justify-between">
                <label className="text-xl">marqueeId:</label>
                <Input
                  placeholder="marqueeId"
                  type="number"
                  name="marqueeId"
                  value={user.marqueeId}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div> */}
              <div className="mb-3 md:mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <label className="text-xl">availability:</label>
                <Input
                  placeholder="availability"
                  type="text"
                  name="availability"
                  value={user.availability}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <label className="text-xl">description:</label>
                <TextArea
                  rows={4}
                  maxLength={6}
                  placeholder="Number"
                  name="description"
                  value={user.description}
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
    </div>
  );
}

export default Menus;
