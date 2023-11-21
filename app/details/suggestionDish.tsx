import Image from "next/image";
import React, { useState } from "react";
import add from "../assets/images/add.svg";
import search from "../assets/images/search.svg";
import subtract from "../assets/images/subtract.svg";
import { Input } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
function SuggestionDish({
  suggestionDish,
  item,
  handleItemBackground,
  AddDish,
  clickedItems,
  index,
  key,
  searchIndex,
  setSearchIndex,
}) {
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="flex flex-col w-[full] pl-2" key={item}>
      <div className="bg-primaryColor flex items-center justify-between p-3 rounded-t-md">
        <p className="text-lg text-white">{item}</p>
        <div className="ml-3 cursor-pointer">
          {searchQuery || (searchIndex == index && searchVisible) ? (
            <div className="">
              <Input
                type="text"
                suffix={
                  <CloseOutlined
                    onClick={() => {
                      setSearchQuery("");
                      setSearchVisible(!searchVisible);
                    }}
                  />
                }
                placeholder="Search Dish"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-2 rounded-md pl-2"
                autoFocus
              />
            </div>
          ) : (
            <Image
              alt="sdf"
              src={search}
              width={40}
              height={40}
              onClick={() => {
                setSearchVisible(true);
                setSearchIndex(index);
              }}
            />
          )}
        </div>
      </div>
      <div className="border">
        {suggestionDish[item]?.filter((item1) =>
          item1.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
        )?.length === 0 ? (
          <p>Dish not found</p>
        ) : (
          suggestionDish[item]
            ?.filter((item1) =>
              item1.name?.toLowerCase()?.includes(searchQuery.toLowerCase())
            )
            ?.map((dish, index) => {
              const itemBackgroundColor =
                clickedItems[dish.name] || "bg-secondary";
              const textClass =
                clickedItems[dish.name] === "bg-lightPrimary"
                  ? "text-white"
                  : "";
              const imageSrc =
                clickedItems[dish.name] === "bg-lightPrimary" ? subtract : add;
              return (
                <div
                  key={index}
                  className={`flex items-center ${itemBackgroundColor} m-3 rounded-md justify-between p-3 `}
                  onClick={() => {
                    handleItemBackground(dish.name);
                    AddDish(dish.name, dish.price);
                  }}
                >
                  <div className={`${textClass} justify-around flex w-full`}>
                    <p>{dish.name}</p>
                    <div className="border"></div>
                  </div>
                  <div className="justify-around flex w-full">
                    <p className={`${textClass} font-poppins `}>
                      RS{dish.price}
                    </p>
                    <Image
                      alt="sdf"
                      src={imageSrc}
                      width={30}
                      height={30}
                      className="ml-3"
                    />
                  </div>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
}

export default SuggestionDish;
