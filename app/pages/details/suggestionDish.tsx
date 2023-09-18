import Image from 'next/image';
import React, { useState } from 'react'
import add from "../../assets/images/add.svg";
import search from "../../assets/images/search.svg";
import subtract from "../../assets/images/subtract.svg";
function SuggestionDish({suggestionDish,item,handleItemBackground,AddDish,clickedItems,setClickedItems}) {
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchQuery,setSearchQuery]=useState("")
  return (
    <div className="flex flex-col w-[full] pl-2" key={item}>
    <div className="bg-primaryColor flex items-center justify-between p-3 rounded-t-md">
      <p className="text-lg text-white">{item}</p>
      <div
        className="ml-3 cursor-pointer"
        onClick={() => {
          setSearchVisible(true);
   
        }}
      >
        {
          
          searchVisible == true  ? ( <div className="">
          <input
            type="text"
            placeholder="Search Dish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 rounded-md"
            // onBlur={()=> setSearchVisible(false)}
            autoFocus
          />
        </div>):(<Image alt="sdf" src={search} width={40} height={40} />)
        }
      </div>
    </div>
      <div className="border">
        {suggestionDish[item]?.filter((item1)=>(item1.name?.toLowerCase()?.includes(searchQuery.toLowerCase())))?.map((dish, index) => {
            console.log(dish,"lldddd")
          const itemBackgroundColor =
            clickedItems[dish.name] || "bg-secondary";
          const textClass =
            clickedItems[dish.name] === "bg-lightPrimary"
              ? "text-white"
              : "";
          const imageSrc =
            clickedItems[dish.name] === "bg-lightPrimary"
              ? subtract
              : add;
          return (
            
            <div
              key={index}
              className={`flex items-center ${itemBackgroundColor} m-3 rounded-md justify-between p-3`}
              onClick={() => {
                handleItemBackground(dish.name);
                AddDish(dish.name, dish.price);
              }}
            >  
              <p className={textClass}>{dish.name}</p>
              <Image
                alt="sdf"
                src={imageSrc}
                width={30}
                height={30}
                className="ml-3"
              />
            </div>
          );
        })
        }
      </div>
  </div>
  )
}

export default SuggestionDish