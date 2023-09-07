import React, { useState } from "react";
import { db } from "@/app/firebase";
import { Button, Input, Select, Table } from "antd";
import dots from "@/app/assets/images/dots.svg";
import Image from "next/image";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
} from "firebase/firestore";
import Loader from "../../component/Loader";

import { useStore } from "../../../store";
import { Modal } from "antd";
const plainOptions = [
  { label: "Available", value: "Available" },
  { label: "Not Available", value: "NotAvailable" },
];
const initialFormState = {
  name: "",
  image: "",
  price: 0,
  type: "",
  description: "",
  status: plainOptions[0].value,
};
function DishModal({
  dishModalOpen,
  setDishModalOpen,
  setModalOpen,
  loading,
  setLoading,
}) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const storage = getStorage();
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const { userInformation, addUser, addMenus, Menus, Dishes } = useStore();
  const [status, setStatus] = useState();
  const [menu, setMenu] = useState([
    {
      label: "Venue Dish",
      value: "1",
    },
    {
      label: "Drink",
      value: "2",
    },
    {
      label: "Dessert",
      value: "3",
    },
    {
      label: "food",
      value: "4",
    },
  ]);
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
    setStatus(value);
    setUser((prevState) => ({
      ...prevState,
      [name]: name == "price" ? Number(value) : value,
    }));
  };
  const HandleAddVenues = async () => {
    if (
      !user.name ||
      !user.image ||
      !user.price ||
      !user.type ||
      !user.description ||
      !user.status
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
      status: user.status,
    };
    try {
      await setDoc(doc(db, "Menus", MenuId), users);
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
  const handleMenuSelect = (e) => {
    switch (e) {
      case "1":
        setUser({ ...user, type: "Venue Dish" });
        break;
      case "2":
        setUser({ ...user, type: "Drink" });
        break;
      case "3":
        setUser({ ...user, type: "Dessert" });
        break;
      case "4":
        setUser({ ...user, type: "food" });
        break;
      default:
        break;
    }
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
        className="text-center modal  w-full"
        centered
        open={dishModalOpen}
        width={600}
        bodyStyle={{ height: 640 }}
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
          <div className="pb-5 mr-3">
            <Button
              key="cancel"
              className=" border-primary text-primary "
              onClick={() => {
                setDishModalOpen(false);
                setModalOpen((prev) => !prev);
              }}
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={() =>
                openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()
              }
              className="AddVenue  bg-primary text-white"
            >
              {loading ? <Loader /> : "Add"}
            </Button>
          </div>,
        ]}
      >
        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              src={dots}
              alt="Image"
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4"> Add Dish</p>
          </div>

          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[80%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">Name</p>
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
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_62.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">Images</p>
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
            <div className="md:flex md:justify-between flex flex-col ">
              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute top-[calc(50%_-_60.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">Price</p>
                </div>
                <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                  <Input
                    placeholder="Minimum Capacity"
                    type="number"
                    name="price"
                    value={user.price}
                    onChange={handleChange}
                    className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                  />
                </div>
              </div>

              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute top-[calc(50%_-_49.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">Type</p>
                </div>
                <div className="  mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                  <Select
                    showSearch
                    style={{
                      width: "100%",
                    }}
                    className="type"
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.label.toLowerCase().includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.label
                        .toLowerCase()
                        .localeCompare(optionB.label.toLowerCase())
                    }
                    options={menu}
                    onChange={handleMenuSelect}
                    value={user.type}
                  />
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute z-20 left-[19.89px] -mt-3 rounded-3xs bg-white w-[104.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">
                    Description
                  </p>
                </div>
                <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
                  <Input
                    rows={4}
                    maxLength={200}
                    placeholder="Enter Description Here"
                    name="description"
                    typeof="text"
                    value={user.description}
                    onChange={handleChange}
                    className="border h-[90px] outline-none md:w-[700px] z-10 w-full  py-3 mb-3 flex justify-center text-xs relative"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default DishModal;
