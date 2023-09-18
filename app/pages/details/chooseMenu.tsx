"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Select, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import SuggestionDish from "./suggestionDish";
function ChooseMenu({
  setSlider,
  setSelectedMenu,
  preview,
  selectedMenu,
  dish,
  setMarqueeData,
  marqueeData,
  setMenuIndex,
  menuIndex,
  withoutVenueDish,
}) {
  const [isImage, setIsImage] = useState(false);
  const [suggestionDish, setSuggestionDish] = useState({});
  const [clickedItems, setClickedItems] = useState({});
  const [newData, setNewData] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState({});
  const [searchIndex, setSearchIndex] = useState();
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    setNewData(marqueeData);
  }, []);
  const handleClick = (item, index) => {
    setClickedItems({});
    const array = marqueeData?.dish?.map((val, idx) => {
      if (idx === index) {
        setSelectedMenu(val);
        return { ...val, selected: true };
      } else {
        return { ...val, selected: false };
      }
    });
    setMarqueeData({ ...marqueeData, dish: array });
    const arr = newData?.dish?.map((val, idx) => {
      if (idx === index) {
        setSelectedMenu(val);
        return { ...val, selected: true };
      } else {
        return { ...val, selected: false };
      }
    });
    setNewData({ ...newData, dish: arr });
    const name = withoutVenueDish.filter((item1) => {
      return !item.dishes.includes(item1?.name);
    });
    const categorizedData = {};

    name.forEach((item) => {
      if (!categorizedData[item.type]) {
        categorizedData[item.type] = [];
      }
      categorizedData[item.type].push(item);
    });
    setSuggestionDish(categorizedData);
  };
  const AddDish = (item, price) => {
    let updatedMarqueeData = { ...newData };
    let Dishes = [];
    let dishPrice = 0;

    if (updatedMarqueeData.dish && Array.isArray(updatedMarqueeData.dish)) {
      for (let val1 of updatedMarqueeData.dish) {
        if (val1.selected && val1.dishes.length > 0) {
          if (val1.dishes.includes(item)) {
            const stringIndex = val1.dishes.indexOf(item);
            Dishes = [...val1.dishes];
            Dishes.splice(stringIndex, 1);
            dishPrice = val1.totalDiscount;
            dishPrice -= price;
          } else {
            Dishes = [...val1.dishes];
            dishPrice = val1.totalDiscount;
            Dishes.push(item);
            dishPrice += price;
          }
          break;
        }
      }
      console.log(dishPrice, "dishPricedishPrice", Dishes);
      updatedMarqueeData.dish = updatedMarqueeData.dish.map((val1) => {
        if (val1.selected && val1.dishes.length > 0) {
          setSelectedMenu({
            ...selectedMenu,
            dishes: Dishes,
            totalDiscount: dishPrice,
          });
          return {
            ...val1,
            dishes: Dishes,
            totalDiscount: dishPrice,
          };
        }
        return val1;
      });
      setNewData(updatedMarqueeData);
      console.log(updatedMarqueeData, "updatedMarqueeData");
    } else {
      console.error("marqueeData.dish is missing or not an array");
    }
  };
  const removeDish = (item, index) => {
    let updatedMarqueeData = { ...marqueeData };
    if (updatedMarqueeData.dish && Array.isArray(updatedMarqueeData.dish)) {
      for (let val1 of updatedMarqueeData.dish) {
        if (val1.selected && val1.dishes.length > 0) {
          let Dishes = [...val1.dishes];
          console.log(val1, "val1");
          let dishPrice = val1.totalDiscount;
          if (Dishes[index] === item) {
            const priceList = suggestionDish?.filter(
              (val) => val.name === Dishes[index]
            );

            if (priceList.length > 0) {
              dishPrice = dishPrice - priceList[0].price;
              Dishes.splice(index, 1);
              updatedMarqueeData.dish = updatedMarqueeData.dish.map((val2) => {
                if (val2.selected && val2.dishes.length > 0) {
                  return {
                    ...val2,
                    dishes: Dishes,
                    totalDiscount: dishPrice,
                  };
                }
                return val2;
              });
              setMarqueeData(updatedMarqueeData);
            }
          }
        }
      }
    } else {
      console.error("marqueeData.dish is missing or not an array");
    }
  };
  console.log(newData, "ggggg");
  const nextPage = () => {
    if (!selectCheck?.length)
      return message.warning(
        "Something went wrong please fillout all the fields"
      );

    setSlider(1);
  };

  const renderDishes = (name) => {
    let values = [];
    let price;
    if (name == "DishName") {
      newData?.dish?.forEach((val1) => {
        val1.selected &&
          val1.dishes.length > 0 &&
          val1.dishes.map((item) => {
            values.push(item);
          });
      });
      return values;
    } else {
      newData?.dish?.forEach((val1) => {
        if (val1.selected) {
          price = val1.totalDiscount;
        }
      });
      return price;
    }
  };
  const handleItemBackground = (name) => {
    const updatedClickedItems = { ...clickedItems };
    updatedClickedItems[name] =
      updatedClickedItems[name] === "bg-lightPrimary"
        ? "bg-secondary"
        : "bg-lightPrimary";
    setClickedItems(updatedClickedItems);
  };
  console.log(selectedMenu, "selectedMenuselectedMenu");
  const selectCheck = marqueeData?.dish?.filter((v) => v.selected);
  console.log(filteredSuggestions, "filteredSuggestions");
  const handleSearch = () => {
    // if(e!= "" && key!==""){
    //   setSearchQuery(e.target.value)
    // }
    const filtered = {};
    Object.keys(suggestionDish).forEach((item) => {
      console.log(item, "jjjj");
      const filteredItems = suggestionDish[item].filter((dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (filteredItems.length > 0) {
        filtered[item] = filteredItems;
      }
    });
    console.log(filtered, "filtered");
    setFilteredSuggestions(filtered);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setFilteredSuggestions({});
    setSearchVisible(false);
  };
  console.log(searchVisible, "searchVisible");
  return (
    <>
      {marqueeData?.dish?.length > 0 && (
        <div className="md:container md:mx-auto mx-5">
          <p className="text-2xl py-5 md:px-16  mx-auto mb-3">Main Course</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 md:px-16 font-sc text-textColor">
            {marqueeData?.dish?.map((item, index) => {
              return (
                <div
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                  key={index}
                  className={`
                border border-primary p-3 rounded-xl flex md:mx-0 flex-col mb-2 cursor-pointer
                hover:bg-primaryColor hover:border-primaryColor hover:text-white h-64
                ${
                  selectCheck?.length
                    ? item.selected
                      ? "border-primary border-2"
                      : "opacity-50"
                    : ""
                }
              `}
                  onClick={() => handleClick(item, index)}
                >
                  <div className="flex items-center justify-between mb-3 text-black">
                    <p className="text-center text-xl">{item.name}</p>
                    <p className="text-xl flex flex-col justify-end my-auto">
                      {" "}
                      Rs {item.totalDiscount} / perHead
                    </p>
                  </div>
                  <div>
                    <p className=" md:w-56 font-sc my-4">
                      This menu contains the following items :
                    </p>
                  </div>
                  <div className="w-1/2">
                    <ul>
                      {item?.dishes?.map((dish, i) => {
                        if (i < 3) {
                          return (
                            <div className="flex items-center w-[130%]" key={i}>
                              <div className="bg-primaryColor h-3 w-3 rounded-full mr-3 "></div>
                              <li className="">{dish}</li>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border w-1/2 border-primaryColor mx-auto my-10"></div>
          <p className="text-2xl py-5 md:px-16  mx-auto">Add One</p>
          <div className="">
            {Object.keys(suggestionDish).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 md:px-16 font-sc text-textColor rounded-md my-5 cursor-pointer">
                {Object.keys(suggestionDish).map((item, index) => (
                  <SuggestionDish
                    clickedItems={clickedItems}
                    setClickedItems={setClickedItems}
                    handleItemBackground={handleItemBackground}
                    AddDish={AddDish}
                    item={item}
                    suggestionDish={suggestionDish}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex  justify-between md:justify-end items-center space-x-2 font-semibold my-5 md:mr-16">
            {renderDishes("price") && (
              <>
                <p>Total</p>
                <div className="text-2xl px-3"> {renderDishes("price")}</div>
              </>
            )}
            <button
              className="border w-32 py-2 bg-primaryColor hover:bg-hoverPrimary text-white  rounded-md"
              onClick={() => nextPage()}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChooseMenu;
