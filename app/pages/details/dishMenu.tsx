import React, { useState } from 'react'

function DishMenu({item,handleClick,index,selectCheck,}) {
    // const [isHoverArray, setIsHoverArray] = useState(new Array(marqueeData?.dish?.length).fill(false));
    const [isHover, setIsHover] = useState(false);
    const handleMouseEnter = (index) => {
        const newArray = [...isHoverArray];
        newArray[index] = true;
        setIsHoverArray(newArray);
      };
      
      const handleMouseLeave = (index) => {
        const newArray = [...isHoverArray];
        newArray[index] = false;
        setIsHoverArray(newArray);
      };
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
          <div
            // className={"flex items-center justify-between mb-3"}
            className={`flex items-center justify-between mb-3  ${
                isHover ? "text-white" : "text-black"
              }    `}
          >
            <p className="text-center text-xl">{item.name}</p>
            <p className="text-xl flex flex-col justify-end my-auto">
              {" "}
              Rs {item.totalDiscount} / PerPerson
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
                    <div className="flex items-center" key={i}>
                      <div
                        className={`${
                          isHover ? "bg-white" : "bg-primaryColor"
                        }   h-3 w-3 rounded-full mr-3 `}
                        // className={"h-3 w-3 rounded-full mr-3 bg-primaryColor" }
                      ></div>
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
}

export default DishMenu