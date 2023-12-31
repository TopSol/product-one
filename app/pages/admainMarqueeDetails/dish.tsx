import React, { use, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DishModal from "./dishModal";
import Loader from "../../component/Loader";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Button, Popconfirm, Table, Tag } from "antd";
import { Select, Space, List, Typography } from "antd";
import Menus from "./menus";
// import Modal from "@/app/component/Modal";
import { db } from "@/app/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useStore } from "../../../store";
import { Input, Modal } from "antd";
import Link from "next/link";
import { log } from "console";
const initialFormState = {
  name: "",
  price: 0,
  dishes: [],
  discount: 0,
};

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
function Dish({
  modalOpen,
  setModalOpen,
  dishModalOpen,
  setDishModalOpen,
  loading,
  setLoading,
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
  const [selectDish, setSelectDish] = useState({ dishes: [], prices: [] });
  const { Column } = Table;

  const handleItemClick = (item) => {
    const lowercaseItem = item.toLowerCase();
    if (
      selectedItems.some(
        (selectedItem) => selectedItem.toLowerCase() === lowercaseItem
      )
    ) {
      setSelectedItems(
        selectedItems.filter(
          (selectedItem) => selectedItem.toLowerCase() !== lowercaseItem
        )
      );
      setUser((prevState) => ({
        ...prevState,
        dishes: prevState.dishes.filter(
          (selectedItem) => selectedItem.toLowerCase() !== lowercaseItem
        ),
      }));
    } else {
      setSelectedItems([...selectedItems, item]);
      setUser((prevState) => ({
        ...prevState,
        dishes: [...prevState.dishes, item],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "discount" ? Number(value) : value;
    const discountAmount =
      user.price && newValue ? (user.price * newValue) / 100 : 0;
    const discountedPrice = user.price - discountAmount;
    if (name === "discount") {
      setCalculatedDiscount(discountAmount);
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };
  useEffect(() => {
    const dishes = [];
    const DishPrice = Menus.map((item, index) => {
      const data = { Price: item.price, Dish: item.name };
      dishes.push({ label: item.name, value: item.name });
      if (index === Menus.length - 1) setDishName(dishes);
      return data;
    });
    const totalPrice = DishPrice.reduce((acc, item) => acc + item.Price, 0);
    setTotalPrice(totalPrice);
    setDishPrice(DishPrice);
    console.log(DishPrice, "DishPrice");
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Dish"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        addDishes(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, [addVenues, Menus]);

  const AddDish = async () => {
    if (!user.name || !user.price || !user.dishes) {
      return;
    }
    setLoading(true)
    const discountAmount =
      user.price && user.discount ? (user.price * user.discount) / 100 : 0;
    const discountedPrice = user.price - discountAmount;
    console.log(
      discountedPrice,
      "discountedPrice",
      user.price,
      user.discount,
      discountAmount
    );

    const DishId = Math.random().toString(36).substring(2);
    const users = {
      name: user.name,
      userId: userInformation.userId,
      price: user.price,
      dishId: DishId,
      dishes: user.dishes,
      discount: user.discount,
      discountAmount: discountAmount,
      discountedPrice: discountedPrice,
    };
    try {
      await setDoc(doc(db, "Dish", DishId), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setSelectedItems([]);
    setLoading(false)
    setCalculatedDiscount(0);
    setUser(initialFormState);
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
      console.log("Document data:",docSnap.data().dishes);  
      setUser(docSnap.data());
      // setDishName(docSnap.data().dishes);
      setSelectedItems(docSnap.data().dishes);
      // console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const update = async (venueId) => {
    setLoading(true)
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
    // try {
    //   await setDoc(doc(db, "Dish", venueId), user);
    //   const newBlogs = Dishes.filter((blog) => blog.id !== venueId);
    //   console.log(newBlogs,"newBlogs33",user)
    //   addDishes([...newBlogs,{...user,id:venueId}])
    // } catch (error) {
    //   console.log(error, "error");
    // }
    setModalOpen(false);
    setUser(initialFormState);
    setSelectedItems([]);
    setUpdateDish(false);
    setLoading(false)
  };
  const handleSelectionChange = (selectedOptions) => {
    console.log(selectedOptions, "selectedOptions");
    let price = 0;
    console.log(dishPrice, "dishPrice",selectedOptions)
    selectedOptions.map((item) => {
      const data = dishPrice.filter((item1) => item1.Dish === item);
      price = price + data[0].Price;
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
  // const openModal = (dishes) => {
  //   setOpen(true);
  // };

  // const openModal = (dishes) => {
  //   if (dishes && dishes.length > 0) {
  //     const prices = dishes.map((dish) => {
  //       const dishData = dishPrice.find((item) => item.Dish === dish);
  //       return dishData ? dishData.Price : 0;
  //     });

  //     console.log(dishes, prices);

  //     setOpen(true);
  //     setSelectDish({ dishes, prices });
  //   }
  // };

  const openModal = (dishes) => {
    console.log(dishes, "dishes");
    
    if (dishes && dishes.length > 0) {
      const prices = dishes?.map((dish) => {
        const dishData = dishPrice.find((item) => item.Dish === dish);
        return dishData ? dishData.Price : 0;
      });

      setOpen(true);
      setSelectDish({ dishes, prices });
    }
  };

  return (
    <div className="">
      <Table dataSource={Dishes} className="myTable">
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Dishes"
          dataIndex="dishes"
          key="dishes"
          render={(dishes) => (
            <ul>
                <li className="cursor-pointer"  onClick={() => openModal(dishes)}> <Link className="text-blue-600 underline" href="">{dishes.length} Dishes</Link></li>
            </ul>
          )}
        />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Discount Amount" dataIndex="discount" key="discount" />
        <Column
          title="Total Price"
          dataIndex="discountedPrice"
          key="discountedPrice"
        />
        <Column
          title="Action"
          dataIndex="dishId"
          key="dishId"
          render={(dishId) => (
            <div>
              <Popconfirm
                title="Delete Menu?"
                description="Are you sure to delete Menu?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteDish(dishId)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  width={15}
                  className="text-red-500 cursor-pointer text-xl"
                />
              </Popconfirm>
              <FontAwesomeIcon
                icon={faPenToSquare}
                width={15}
                className="ml-3 text-green-500 text-xl"
                onClick={() => EditDish(dishId)}
              />
            </div>
          )}
        />
      </Table>
      {/* <Modal
        title="Dishes Content"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="ok"
        cancelText="cancel"
      >
        <>
          <List
            header={<div className="font-bold flex">Dishes</div>}
            bordered
            dataSource={selectDish}
            renderItem={(item, index) => (
              <List.Item key={index}>{item}</List.Item>
            )}
          />
        </>
      </Modal>  */}
      <Modal
        title="Dishes Content"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="ok"
        cancelText="cancel"
      >  
      <div className="flex justify-around font-bold">

        <p>Dish</p> <p>Price</p>
      </div>
        {selectDish.dishes.map((dish, index) => (

          <div  className="flex justify-around"> 
            <p>{dish}</p>
            <p>{selectDish.prices[index]}</p>
          </div>
          // <p key={index}>
          // Dishes -  {dish} - Price: {selectDish.prices[index]}
          // </p>
        ))}
      </Modal>

      <Modal
        className="text-center"
        centered
        open={modalOpen}
        // onOk={() => (updateDish ? update(user?.dishId) : AddDish())}
        onCancel={() => setModalOpen(false)}
        width={600}
        bodyStyle={{ height: 650 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="ok"
            type="primary"
            onClick={() => (updateDish ? update(user?.dishId) : AddDish())}
            className="bg-blue-500"
          >
            {loading ? <Loader /> : "Ok"}
          </Button>,
        ]}
      >
        <div className=" w-full h-full flex justify-start mt-12 md:mt-0 md:justify-center items-center flex-col">
          <div>
            <p className="text-2xl mb-2">Menus</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col w-[100%]  justify-center ">
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">Name</label>
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <Input
                  placeholder="Enter Name Here"
                  type="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">Select Dish</label>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <Space
                  style={{
                    width: "100%",
                  }}
                  direction="vertical"
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                      padding: "10px,0px",
                    }}
                    value={user.dishes}
                    placeholder="Please select"
                    onChange={handleSelectionChange}
                    options={dishName}
                  />
                </Space>
              </div>
            </div>
            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="flex rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative  ">
                <label className="text-xl my-1">Price</label>
                <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                  <Input
                    placeholder="Enter Price Here"
                    type="price"
                    name="price"
                    value={user.price}
                    onChange={handleChange}
                    className="rounded-none w-full py-2 lg:py-3"
                  />
                </div>
                <label className="text-xl my-1">Add Discount Percentage</label>
                <div>
                  <Input
                    placeholder="Enter Discount Here"
                    type="number"
                    name="discount"
                    value={user.discount}
                    onChange={handleChange}
                    className="rounded-none w-full py-2 lg:py-3"
                  />
                </div>
                <label className="text-xl my-1 mt-5">Total Price</label>
                <div>
                  <Input
                    placeholder="Enter Discount Here"
                    type="number"
                    name="discount"
                    value={calculatedDiscount}
                    className="rounded-none w-full py-2 lg:py-3"
                  />
                </div>
                <div className="flex justify-end mt-2">
                  <p
                    className="text-lg"
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