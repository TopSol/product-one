import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag } from "antd";
// import Modal from "@/app/component/Modal";
import { db } from "@/app/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useStore } from "../../../store";
import { Input, Modal } from "antd";
const initialFormState = {
  name: "",
  price: "",
  dishes: [],
};
function Dish({ modalOpen, setModalOpen }) {
  const [user, setUser] = useState(initialFormState);
  const [selectedDish, setSelectedDish] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addVenues, setAddVenues] = useState([]);
  const { userInformation, addUser } = useStore();
  const [blogs, setBlogs] = useState([]);
  const { Column, ColumnGroup } = Table;
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
  console.log(user, "userddd");
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
        const response = await getDocs(collection(db, "Dish"));
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
    console.log(user, "user44444666");
    if (!user.name || !user.price || !user.dishes) {
      return;
    }
    const users = {
      name: user.name,
      userId: userInformation.userId,
      price: user.price,
      dishes: user.dishes,
    };
    try {
      await addDoc(collection(db, "Dish"), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  console.log(blogs, "blogs111");
  return (
    <div className="md:container mx-auto">
      <Table dataSource={blogs}>
        <Column title="Name" dataIndex="name" key="name"  />
        <Column title="Price" dataIndex="price" key="price" />
        <Column title="Dish" dataIndex="dishes" key="dishes" render={(dishes) => (
        <ul>
          {dishes?.map((dish, index) => (
            <li key={index}>{dish}</li>
          ))}
        </ul>
      )} />
      </Table>
      {/* {blogs.map((blog, index) => {
          console.log(blog, "blog43344");
           return (
            <div key={index} className="border p-5 rounded-md mb-2">
            <div className="flex justify-between " key={index}>
              <p>{blog.name}</p>
              <p>{blog.price}</p>
              <div className="flex flex-col">
                {blog.dishes?.map((item, subIndex) => (
                  <p key={subIndex}>{item}</p>
                ))}
              </div>
            </div>
            </div>
          );
        })} */}
      <Modal
        className="text-center"
        centered
        open={modalOpen}
        onOk={() => HandleAddVenues()}
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
              <div className="  flex   rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative mr-3 ">
                <div
                  className="border py-2 w-full  rounded-md relative"
                  onClick={() => setSelectedDish(!selectedDish)}
                >
                  <div className="justify-between flex mx-2">
                    Select Dish
                    <FontAwesomeIcon icon={faCaretDown} />
                  </div>
                </div>

                {selectedDish && (
                  <div className="border  cursor-pointer w-48  absolute mt-10  ">
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
                        <p>{item}</p>
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
