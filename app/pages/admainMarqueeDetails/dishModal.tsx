
import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { Button, Input, Table } from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Loader from "../../component/Loader"; 

import { useStore } from "../../../store";
import { Modal } from "antd";
const initialFormState = {
    name: "",
    image: "",
    price: 0,
    type: "",
    description: "",
  };
function DishModal({ dishModalOpen,setDishModalOpen,setModalOpen,loading,setLoading }) {
    const [user, setUser] = useState(initialFormState);
    const [addVenues, setAddVenues] = useState([]);
    const { TextArea } = Input;
    const storage = getStorage();
    const [openEditVenue, setOpenEditVenue] = useState(false);
    const { userInformation, addUser, addMenus, Menus,Dishes } = useStore();

      const fetchBlogs = async () => {
        try {
          const response = await getDocs(collection(db, "Menus"));
          const tempArray = response.docs
            .filter((doc) => userInformation.userId === doc.data().userId)
            .map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
  
          addMenus(tempArray);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setUser((prevState) => ({
          ...prevState,
          [name]: name == 'price' ? Number(value) : value,
        }));
      };
    const HandleAddVenues = async () => {
      if (
        !user.name ||
        !user.image ||
        !user.price ||
        !user.type ||
        !user.description
      ) {
        return;
      }
      setLoading(true);
        const images = Object.values(user.image);
        const folderName = `images`;
    
        const urls = await Promise.all(
          images.map(async (image) => {
            const fileName = `${folderName}/${image.name}`;
            const storageRef = ref(storage, fileName);
            await uploadBytes(storageRef, image);
            const utls = await getDownloadURL(storageRef);
            return utls;
          })
        );
       
        const MenuId = Math.random().toString(36).substring(2);
        const users = {
          name: user.name,
          image: urls,
          type: user.type,
          description: user.description,
          menuId: MenuId,
          userId: userInformation.userId,
          price: user.price,
        };
        try {
          await setDoc(doc(db, "Menus", MenuId), users);
          console.log("close2");
        } catch (error) {
          console.log(error, "error");
        }
        setAddVenues([...addVenues, user]); 
        setDishModalOpen(false);
        setModalOpen((prev) => !prev);
        setUser(initialFormState);
        fetchBlogs();
        setLoading(false);
      };
    const updateVenue = async (venueId) => {
    const images = Object.values(user.image);
    const folderName = `images`;

    const urls = await Promise.all(
      images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        return url;
      })
    );

    try {
      const updatedUser = JSON.parse(JSON.stringify(user));
      updatedUser.image = urls;

      await setDoc(doc(db, "Menus", venueId), updatedUser);

      const updatedIndex = Menus.findIndex((menu) => menu.id === venueId);
      if (updatedIndex !== -1) {
        const updatedMenus = [...Menus];
        updatedMenus[updatedIndex] = { ...updatedUser, id: venueId };
        addMenus(updatedMenus);
      } else {
        addMenus([...Menus, { ...updatedUser, id: venueId }]);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setUser(initialFormState);
    setOpenEditVenue(false);
     };
  return (
    <div>
        <Modal
        className="text-center"
        centered
        open={dishModalOpen}
        width={700}
        bodyStyle={{ height: 800 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <Button key="cancel" onClick={() => {setDishModalOpen(false) 
            setModalOpen((prev) => !prev)}}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={() =>
            openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()} className="bg-blue-500">
            {
                  loading ? (
                    <Loader />
                  ) : (
                    "Ok"
                  ) 
            }
            
          </Button>,
        ]}
      >
        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl">Dish</p>
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
                <span className="text-red-600">*</span> Images
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
              <label className="text-xl my-1">Price</label>
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">Type</label>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <Input
                  placeholder="Enter Type Here"
                  type="text"
                  name="type"
                  value={user.type}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
              <label className="text-xl my-1">Description</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <TextArea
                  rows={4}
                  maxLength={6}
                  placeholder="Enter Description Here"
                  name="description"
                  typeof="text"
                  value={user.description}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DishModal