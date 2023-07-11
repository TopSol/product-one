import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faCirclePlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const menu = [
  {
    menu: "Menu 1",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "$2000",
  },
  {
    menu: "Menu 2",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "$4000",
  },
  {
    menu: "Menu 3",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "$5000",
  },
  {
    menu: "Menu 4",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "$8000",
  },
];
const data = ["biryani", "chicken", "mutton"];

function ChooseMenu({ setSlider, setSelectedMenu, sendData, selectedMenu }) {
  const [selectedDish, setSelectedDish] = useState(false);

  const [selectedItems, setSelectedItems] = useState([]);
  const nextPage = () => {
    sendData();
    setSlider(3);
  };

  const removeDish = (item) => {
    setSelectedMenu({
      ...selectedMenu,
      dish: selectedMenu.dish.filter((dish) => dish !== item),
    });
  };
  const arr = selectedMenu.dish;
  const AddDish = (item) => {
    const lowercaseItem = item.toLowerCase();
    const isDuplicate = arr.some(
      (existingItem) => existingItem.toLowerCase() === lowercaseItem
    );

    if (!isDuplicate) {
      arr.push(item);
      setSelectedMenu({ ...selectedMenu, dish: arr });
    } else {
      alert("This dish is already added to the menu.");
    }
  };
  const handleItemClick = (item) => {
    const lowercaseItem = item.toLowerCase();

    if (
      !arr.some((existingItem) => existingItem.toLowerCase() === lowercaseItem)
    ) {
      arr.push(item);
      setSelectedMenu({ ...selectedMenu, dish: arr });
    } else {
      alert("This dish is already added to the menu.");
    }

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
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([
    "Mutton",
    "Chicken",
    "Biryani",
  ]);
  return (
    <div className="md:container mx-auto">
      <div className="md:border p-5 rounded-md mb-2 flex justify-center items-center flex-col md:flex-row ">
        {menu?.map((item, index) => (
          <div
            key={index}
            className={`border p-3 rounded-md flex  w-4/5 flex-col mb-2 ml-3 cursor-pointer hover:bg-primaryColor hover:text-black ${
              selectedMenu?.menu === item.menu ? "bg-primaryColor" : ""
            }`}
            onClick={() => setSelectedMenu(item)}
          >
            <div>
              <p className="text-center text-xl">{item.menu}</p>
            </div>
            <div className="w-1/2">
              <ul>
                {item?.dish?.map((dish, index) => {
                  if (index < 3) {
                    return <li>{dish}</li>;
                    // return <li key={index}>{dish}</li>;
                  }
                  return null;
                })}
              </ul>
            </div>
            <div className=" flex justify-center items-center w-full">
              <p className="text-xl"> {item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex-wrap lg:flex items-center border rounded-md cursor-pointer mb-5 justify-between  ">
        <div className=" md:flex">
          {data.map((item, index) => (
            <div
              key={index}
              className=" flex justify-center items-center p-3   "
            >
              <FontAwesomeIcon icon={faCirclePlus} />
              <p className="pl-1 pr-3" onClick={() => AddDish(item)}>
                Add
              </p>
              <p className="border p-2  rounded-md font-semibold text-textColor font-roboto">
                {item}
              </p>
            </div>
          ))}
        </div>
        <div className="  flex items-center  rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative mr-3 ">
          <div
            className="border py-2 w-48  rounded-md relative"
            onClick={() => setSelectedDish(!selectedDish)}
          >
            <div className="justify-between flex mx-2 "> 
              Select More Dish
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
      {selectedMenu?.dish?.length > 0 && (
        <div className="flex  items-center flex-wrap border mb-3">
          {selectedMenu?.dish?.map((dish, index) => (
            <div
              key={index}
              className="flex items-center border ml-2 justify-between w-24 p-2 rounded-md my-2"
            >
              <p>{dish}</p>
              <div onClick={() => removeDish(dish)}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-end ">
        <button
          className="border px-7 py-2 bg-bgColor rounded-md"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ChooseMenu;
