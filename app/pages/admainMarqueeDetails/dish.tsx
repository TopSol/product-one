import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { Table, Tag } from "antd";
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
const initialFormState = {
  name: "",
  price: "",
  dishes: [],
};
function Dish({ modalOpen, setModalOpen }) {
  const [user, setUser] = useState(initialFormState);
  const [openDishMenus, setOpenDishMenus] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addVenues, setAddVenues] = useState([]);
  const [updateDish, setUpdateDish] = useState(false);
  const { userInformation, addUser,Dishes,addDishes } = useStore();
  const [blogs, setBlogs] = useState([]);
  const { Column } = Table;
  const [selectedOptions, setSelectedOptions] = useState([
    "Mutton",
    "Chicken",
    "Biryani",
  ]);
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
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Dish"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          addDishes(tempArray)
        // setBlogs(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);
  const AddDish = async () => {
    if (!user.name || !user.price || !user.dishes) {
      return;
    }
    const DishId = Math.random().toString(36).substring(2);
    const users = {
      name: user.name,
      userId: userInformation.userId,
      price: user.price,
      dishId: DishId,
      dishes: user.dishes,
    };
    try {
      await setDoc(doc(db, "Dish", DishId), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
    setSelectedItems([]);
  };
  const deleteDish = async (dishId) => {
    try {
      await deleteDoc(doc(db, "Dish", dishId));
      const newBlogs = Dishes.filter((blog) => blog.id !== dishId);
      addDishes(newBlogs)
      // Dishes(newBlogs);
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
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const update = async (venueId) => {
    try {
      await setDoc(doc(db, "Dish", venueId), user);
      const newBlogs = Dishes.filter((blog) => blog.id !== venueId);
      console.log(newBlogs,"newBlogs33",user)
      addDishes([...newBlogs,{...user,id:venueId}])
    } catch (error) {
      console.log(error, "error");
    }
    setModalOpen(false);
    setUser(initialFormState);
    setSelectedItems([]);
    setUpdateDish(false);
  };
  console.log(user, "user")
  return (
    <div className="">
      <Table dataSource={Dishes} className="myTable">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Dish"
          dataIndex="dishes"
          key="dishes"
          render={(dishes) => (
            <ul>
              {dishes?.map((dish, index) => (
                <li key={index}>{dish}</li>
              ))}
            </ul>
          )}
        />
        <Column
          title="Action"
          dataIndex="dishId"
          key="dishId"
          render={(dishId) => (
            <div>
              <FontAwesomeIcon
                icon={faTrashCan}
                width={40}
                height={40}
                className="text-red-500 cursor-pointer text-xl"
                onClick={() => deleteDish(dishId)}
              />
              <FontAwesomeIcon
                icon={faPenToSquare}
                width={40}
                height={40}
                className="ml-3 text-green-500 text-xl"
                onClick={() => EditDish(dishId)}
              />
            </div>
          )}
        />
      </Table>
      <Modal
        className="text-center"
        centered
        open={modalOpen}
        // onOk={() => AddDish()}
        onOk={() => (updateDish ?  update(user?.dishId)  : AddDish())} 
        onCancel={() => setModalOpen(false)}
        width={600}
        bodyStyle={{ height: 400 }}
        okButtonProps={{ className: "custom-ok-button" }}
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
            </div>

            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="  flex   rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative  ">
                <div
                  className="border py-3 w-[100%]relative"
                  onClick={() => setOpenDishMenus(!openDishMenus)}
                >
                  <div className="justify-between flex mx-2">
                    Select Dish
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>

                {openDishMenus && (
                  <div className="border  cursor-pointer w-[100%] absolute mt-10  ">
                    {selectedOptions.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleItemClick(item)}
                        style={{
                          backgroundColor: selectedItems.includes(item)
                            ? "gray"
                            : "white",
                        }}
                      >
                        <p className="pl-2">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Dish;
