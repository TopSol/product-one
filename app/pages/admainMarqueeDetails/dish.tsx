import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCirclePlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/app/component/Modal";
const initialFormState = {
  name: "",
  price: "",
  dishes: [],
};
function Dish({ modalOpen, setModalOpen }) {
  const [user, setUser] = useState(initialFormState);
  const [selectedDish, setSelectedDish] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [addVenues,setAddVenues] = useState([])
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
  const HandleAddVenues = () => {
    console.log(user, "user44444666");
    if (
      !user.name ||
      !user.price ||
      !user.dishes 
      ) {
      return;
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  return (
    <div className="md:container mx-auto">
      {
  addVenues.map((item, index) => {
    console.log(item, "item333");
    return (
      <div key={index} className="border p-5 rounded-md mb-2">
        <div className="flex justify-between flex-wrap">
          <p>{item.name}</p>
          <p>{item.price}</p>
          <div className="flex flex-col">

          {
            item.dishes.map((dish, dishIndex) => {
              return (
                <p key={dishIndex}>{dish}</p>
                );
              })
            }
            </div>
        </div>
      </div>
    );
  })
}
      <Modal isOpen={modalOpen} onClose={closeModal}>
      <div className="flex justify-center">
        <div className="border p-5 rounded-md mb-2 w-[100%]  lg:w-[70%] ">
          <div className="md:flex md:justify-between">
            <div className="mb-6 flex flex-col md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">Name:</label>
              <input
                type="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">price:</label>
              <input
                type="number"
                name="price"
                value={user.price}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="  flex   rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative mr-3 ">
            <div
              className="border py-2 w-48  rounded-md relative"
              onClick={() => setSelectedDish(!selectedDish)}
            >
              <div className="justify-between flex mx-2 ">
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
          <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>HandleAddVenues()}>Add Venues</button>
            </div>
        </div>
      </div>
      </Modal>
    </div>
  );
}

export default Dish;
