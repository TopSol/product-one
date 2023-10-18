"use client";
import React, { useEffect, useState } from "react";
import DishModal from "./dishModal";
import Loader from "@/app/_component/Loader";
import { Button, Tag } from "antd";
import { Select, Space, List } from "antd";
import { db } from "@/app/firebase";
import MenuTable from "./menuTable";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useStore } from "../../store";
import { Input, Modal } from "antd";
import Image from "next/image";
import dots from "@/app/assets/images/dots.svg";
const initialFormState = {
  name: "",
  price: 0,
  dishes: [],
  discount: 0,
  totalDiscount: 0,
};

function Dish({
  modalOpen,
  setModalOpen,
  dishModalOpen,
  setDishModalOpen,
  loading,
  setLoading,
  setDeleteDishes,
  deleteDishes,
  fetchData,
}) {
  const [user, setUser] = useState(initialFormState);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addVenues, setAddVenues] = useState([]);
  const [updateDish, setUpdateDish] = useState(false);
  const { userInformation, addUser, Dishes, addDishes, Menus } = useStore();
  const [totalPrice, setTotalPrice] = useState(0);
  const [dishPrice, setDishPrice] = useState([]);
  const [dishName, setDishName] = useState([]);
  const [calculatedDiscount, setCalculatedDiscount] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectDish, setSelectDish] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "discount" ? Number(value) : value;
    const discountAmount =
      user.price && newValue ? (user.price * newValue) / 100 : 0;
    const discountedPrice = user.price - discountAmount;

    if (name === "discount") {
      const data = discountedPrice;
      setCalculatedDiscount(Math.floor(data));
    }

    setUser((prevState) => ({
      ...prevState,
      [name]: newValue,
      totalDiscount: Math.floor(discountedPrice),
    }));
  };
  useEffect(() => {
    const dishes = [];
    const DishPrice = Menus.map((item, index) => {
      const data = {
        Price: item.price,
        Dish: item.name,
        status: item.status,
        type: item.type,
      };
      dishes.push({
        label: item.name,
        value: item.name,
        status: item.status,
        type: item.type,
      });
      if (index === Menus.length - 1) setDishName(dishes);
      return data;
    });
    const totalPrice = DishPrice.reduce((acc, item) => {
      if (item.status === "Available") {
        return acc + item.Price;
      } else {
        return acc;
      }
    }, 0);
    setTotalPrice(totalPrice);
    setDishPrice(DishPrice);
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Dish"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        let finalPrices = JSON.parse(JSON.stringify(tempArray));
        tempArray.map((item, index) => {
          finalPrices[index].price = 0;
          DishPrice.map((item1) => {
            if (
              item.dishes.includes(item1.Dish) &&
              item1.status == "Available"
            ) {
              finalPrices[index].price = finalPrices[index].price + item1.Price;
            }
          });
          finalPrices[index].discountAmount =
            finalPrices[index].price && finalPrices[index].discount
              ? (finalPrices[index].price * finalPrices[index].discount) / 100
              : 0;
          finalPrices[index].totalDiscount = Math.floor(
            finalPrices[index].price - finalPrices[index].discountAmount
          );
          updateMenuDishPrice(finalPrices[index].dishId, finalPrices[index]);
        });
        addDishes(finalPrices);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [addVenues, Menus]);
  const updateMenuDishPrice = async (dishId, price) => {
    try {
      await setDoc(doc(db, "Dish", dishId), price);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const AddDish = async () => {
    if (!user.name || !user.price || !user.dishes) {
      return;
    }
    setLoading(true);
    const discountAmount =
      user.price && user.discount ? (user.price * user.discount) / 100 : 0;
    const discountedPrice = user.price - discountAmount;

    const DishId = Math.random().toString(36).substring(2);
    const users = {
      name: user.name,
      userId: userInformation.userId,
      price: user.price,
      dishId: DishId,
      dishes: user.dishes,
      discount: user.discount,
      discountAmount: discountAmount,
      totalDiscount: user.totalDiscount,
    };
    try {
      await setDoc(doc(db, "Dish", DishId), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setSelectedItems([]);
    setLoading(false);
    setCalculatedDiscount(0);
    setUser(initialFormState);
    fetchData();
  };
  const deleteDish = async (dishId) => {
    try {
      await deleteDoc(doc(db, "Dish", dishId));
      const newBlogs = Dishes.filter((blog) => blog.id !== dishId);
      addDishes(newBlogs);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const EditDish = async (dishId) => {
    setUpdateDish(true);
    setModalOpen((prevState) => !prevState);
    const docRef = doc(db, "Dish", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      setSelectedItems(docSnap.data().dishes);
    } else {
      console.log("No such document!");
    }
  };
  const update = async (venueId) => {
    setLoading(true);
    try {
      await setDoc(doc(db, "Dish", venueId), user);
      const updatedIndex = Dishes.findIndex((dish) => dish.id === venueId);
      if (updatedIndex !== -1) {
        const updatedDishes = [...Dishes];
        updatedDishes[updatedIndex] = { ...user, id: venueId };
        addDishes(updatedDishes);
      } else {
        addDishes([...Dishes, { ...user, id: venueId }]);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setModalOpen(false);
    setUser(initialFormState);
    setSelectedItems([]);
    setUpdateDish(false);
    setLoading(false);
  };
  const handleSelectionChange = (selectedOptions) => {
    let price = 0;
    selectedOptions.map((item) => {
      const data = dishPrice.filter((item1) => item1.Dish === item);
      price = price + data[0]?.Price;
    });

    setUser((prevState) => ({
      ...prevState,
      dishes: selectedOptions,
      price,
    }));
  };
  const hideModal = () => {
    setOpen(false);
  };
  const openModal = (dishes) => {
    if (dishes && dishes.length > 0) {
      const prices = dishes?.map((dish) => {
        const dishData = dishPrice.find((item) => item.Dish === dish);
        return dishData ? dishData : {};
      });

      setOpen(true);
      setSelectDish(prices);
    }
  };
  const onChange = (id) => {
    if (deleteDishes.includes(id)) {
      const data = deleteDishes.filter((item) => item !== id);
      setDeleteDishes(data);
    } else {
      setDeleteDishes([...deleteDishes, id]);
    }
  };
  const renderHeader = () => (
    <div className="header-container flex justify-between text-center">
      <div className="bg-primary py-4 text-white rounded-tl-lg w-[13%] flex justify-start pl-2">
        Check box
      </div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%] ">Name</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Dish</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Price</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Discount Amount</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[15%]">Total Price</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%] rounded-tr-lg  flex justify-end pr-2">
        Action
      </div>
    </div>
  );
  return (
    <div className="md:px-10">
      {renderHeader()}
      <List
        dataSource={Dishes}
        renderItem={(item, index) => (
          <MenuTable
            dishesData={item}
            onChange={onChange}
            EditDish={EditDish}
            openModal={openModal}
          />
        )}
      />
      <Modal
        className="modal w-full text-center"
        footer={null}
        open={open}
        onCancel={hideModal}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer"
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
      >
        <>
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
          <List
            bordered
            header={
              <div className="flex justify-between font-extrabold ">
                <p>Dishes</p>
                <p>Price</p>
              </div>
            }
            dataSource={selectDish}
            renderItem={(dish, index) => (
              <List.Item key={index}>
                <p
                  className={
                    dish.status === "Available"
                      ? "flex justify-bet"
                      : "text-red-400 flex justify-around"
                  }
                >
                  {dish.Dish}
                </p>
                <p
                  className={
                    dish.status === "Available"
                      ? "flex justify-bet"
                      : "text-red-400 flex justify-around"
                  }
                >
                  {dish.Price}
                </p>
              </List.Item>
            )}
          />
        </>
      </Modal>

      <Modal
        className=" modal w-full text-center"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={600}
        bodyStyle={{ height: 690 }}
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
          <div className="pb-5 mr-3" key={"index"}>
            <Button
              key="cancel"
              onClick={() => {
                setModalOpen(false);
                setUser(" ");
              }}
              className="AddVenue border-primary text-primary "
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={() => (updateDish ? update(user?.dishId) : AddDish())}
              className="AddVenue  bg-primary text-white"
            >
              {loading ? <Loader /> : "Add"}
            </Button>
          </div>,
        ]}
      >
        <div className=" w-full h-full flex justify-start mt-12 md:mt-0 md:justify-center items-center flex-col">
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              alt="sdf"
              src={dots}
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4"> Add Menues</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col w-[80%]  justify-center ">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[61.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Enter Name Here"
                  type="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[110.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Select Dish
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Space
                  style={{
                    width: "100%",
                  }}
                  direction="vertical"
                >
                  <Select
                    className="type"
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                      padding: "10px 0px",
                    }}
                    value={user.dishes}
                    placeholder="Please select"
                    onChange={handleSelectionChange}
                    options={dishName.filter(
                      (item) => item?.status == "Available"
                    )}
                  />
                </Space>
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Price
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Enter Price Here"
                  type="price"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[220.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Add Discount Percentage
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Enter Discount Here"
                  type="number"
                  name="discount"
                  value={user.discount}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[100.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Total Price
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Enter Discount Here"
                  type="number"
                  name="discount"
                  value={user.totalDiscount}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>

            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="flex items-start justify-center rounded-md cursor-pointer  mb-2 md:mb-0  w-[130px] bg-primary text-white">
                <p
                  className="text-lg py-2 "
                  onClick={() => {
                    setModalOpen(!modalOpen);
                    setDishModalOpen(!dishModalOpen);
                  }}
                >
                  + Add Dish
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <DishModal
        setModalOpen={setModalOpen}
        dishModalOpen={dishModalOpen}
        setDishModalOpen={setDishModalOpen}
        loading={loading}
        setLoading={setLoading}
      />
    </div>
  );
}
export default Dish;