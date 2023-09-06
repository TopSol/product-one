// "use client";
// import React from "react";
// import { useState } from "react";
// import { message } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
// import Image from "next/image";
// import boxes from "../../assets/images/boxes.svg";
// import whiteBoxes from "../../assets/images/whiteBoxes.svg";

// function ChooseMenu({
//   setSlider,
//   setSelectedMenu,
//   preview,
//   selectedMenu,
//   dish,
//   setMarqueeData,
//   marqueeData,
//   setMenuIndex,
//   menuIndex,
//   withoutVenueDish,
// }) {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedType, setSelectedType] = useState("Dessert");
//   const [menuPrice, setMenuPrice] = useState(0);
//   const [selectedMenuIndex, setSelectedMenuIndex] = useState(-1);
//   const [subtractPrice, setSubtractPrice] = useState(0);
//   const [suggestionDish, setSuggestionDish] = useState([]);
//   const [isImage, setIsImage] = useState(false);
//   const [dishIndex,setDishIndex]=useState(0)
//   const nextPage = () => {
//     preview();
//      setSlider(3);
//     // if (menuIndex !== null) {
//     //   setSlider(3);
//     //   preview();
//     // }
//   };

//   const arr = selectedMenu.dishes;
//   console.log(selectedMenu,"befor")
//   const AddDish = (item, price) => {
//     setSubtractPrice(price);
//     const lowercaseItem = item.toLowerCase();
//     const isDuplicate = arr.some(
//       (existingItem) => existingItem.toLowerCase() === lowercaseItem
//     );

//     if (!isDuplicate) {
//       arr.push(item);
//       setSelectedMenu({ ...selectedMenu, dishes: arr });
//       setMenuPrice(menuPrice + price);
//     } else {
//       message.error("This dish is already added to the menu.");
//     }
//   };
//   console.log(selectedMenu,"after")

//   console.log(selectedMenuIndex,"selectedMenuIndex",)

//   const removeDish = (item,index) => {
//     if(index >=dishIndex){
//       withoutVenueDish.filter((removeDish) => {
//         if (removeDish.name === item) {
//           setMenuPrice(menuPrice - removeDish.price);
//         }
//       });
//       setSelectedMenu({
//         ...selectedMenu,
//         dishes: arr.filter((dish) => dish !== item),
//       });
//       // setMarqueeData({
//       //   ...marqueeData[selectedMenuIndex],dishes:arr.filter((dish) => dish !== item)
//       // })
//       // setSuggestionDish( suggestionDish.filter((dish) => dish !== item))
//     }
//   };
//   console.log(marqueeData,"dish")
//   const handleClick = (venueDish, index) => {
//     const name = withoutVenueDish.filter((item) => {
//       return !venueDish.dishes.includes(item?.name);
//     });
//     console.log(name,"namemnafs",dish)
//     setDishIndex(venueDish.dishes.length)
//     setSuggestionDish(name);
//     setSelectedMenu(venueDish);
//     setSelectedMenuIndex(index);
//     setMenuPrice(venueDish.totalDiscount);
//   };
//   return (
//     <>
//       {dish.length > 0 && (
//         <div className="md:container md:mx-auto mx-5">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 md:px-16 font-sc text-textColor">
//             {dish?.map((item, index) => {
//               const getIndex = selectedMenuIndex == index;
//               const [isHover, setIsHover] = useState(false);
//               return (
//                 <div
//                   onMouseEnter={() => setIsHover(true)}
//                   onMouseLeave={() => setIsHover(false)}
//                   key={index}
//                   className={`
//                 border border-primary p-3 rounded-xl flex md:mx-0 flex-col mb-2 cursor-pointer
//                 hover:bg-primaryColor hover:border-primaryColor hover:text-white h-64
//                 ${selectedMenuIndex === index
//                       ? "bg-primaryColor border-primaryColor text-white"
//                       : ""
//                     }
//               `}
//                   onClick={() => handleClick(item, index)}
//                 >
//                   <div
//                     className={`flex items-center justify-between mb-3  ${isHover ? "text-white" : "text-black"
//                       }  ${selectedMenuIndex === index ? "text-white" : "text-black"
//                       }  `}
//                   >
//                     <p className="text-center text-xl">{item.name}</p>
//                     <p className="text-xl flex flex-col justify-end my-auto">
//                       {" "}
//                       Rs {item.totalDiscount}
//                     </p>
//                   </div>
//                   <div>
//                     <p className=" md:w-56 font-sc my-4">
//                       This menu contains the following items :
//                     </p>
//                   </div>
//                   <div className="w-1/2">
//                     <ul>
//                       {item?.dishes?.map((dish, i) => {
//                         if (i < 3) {
//                           return (
//                             <div className="flex items-center" key={i}>
//                               <div
//                                 className={`${isHover ? "bg-white" : "bg-primaryColor"
//                                   }  ${selectedMenuIndex === index
//                                     ? "bg-white"
//                                     : "bg-primaryColor"
//                                   }  h-3 w-3 rounded-full mr-3 `}
//                               ></div>
//                               <li className="">{dish}</li>
//                             </div>
//                           );
//                         }
//                         return null;
//                       })}
//                     </ul>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {suggestionDish.length > 0 && (
//             <div className="border flex rounded-md my-5 cursor-pointer">
//               {suggestionDish.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-center items-center"
//                   onClick={() => AddDish(item?.name, item?.price)}
//                 >
//                   {item.status === "Available" && (
//                     <>
//                       <FontAwesomeIcon icon={faCirclePlus} className="pl-2" />
//                       <p className="pl-1 pr-3">Add</p>
//                       <p className="border m-2 py-1 px-3 rounded-md font-semibold text-textColor font-roboto">
//                         {item.name}
//                       </p>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//           {selectedMenu?.dishes?.length > 0 && (
//             <div className="flex  items-center flex-wrap border mb-3">
//               {selectedMenu?.dishes?.map((dish, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center border ml-2 justify-between  m-2 py-1 px-3  rounded-md my-2"
//                 >
//                   <p>{dish}</p>
//                   <div onClick={() => removeDish(dish,index)} className="pl-1">
//                     <FontAwesomeIcon icon={faXmark} />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           <button
//             onMouseEnter={() => setIsImage(true)}
//             onMouseLeave={() => setIsImage(false)}
//             className="flex justify-start  items-center w-full md:w-auto text-lg md:ml-16 md:mt-20
//              text-primaryColor border-primaryColor hover:bg-primaryColor hover:text-white
//              px-4 md:px-8 py-2 my-7 rounded-lg border"
//           >
//             {isImage ? (
//               <Image src={whiteBoxes} alt="Image" className="" />
//             ) : (
//               <Image src={boxes} alt="Image" className="" />
//             )}
//             <p className="ml-3">Add Item</p>
//           </button>

//           <div className="flex justify-between md:justify-end items-center space-x-2 font-semibold my-5 md:mr-16">
//             <p>Total</p>
//             <button className=" w-32 py-2 text-center rounded-md bg-lightPrimary text-white">
//               {" "}
//               Rs {menuPrice}{" "}
//             </button>
//             <button
//               className="border w-32 py-2 bg-primaryColor hover:bg-hoverPrimary text-white  rounded-md"
//               onClick={() => nextPage()}
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChooseMenu;
"use client";
import React from "react";
import { useState } from "react";
import { Select, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import boxes from "../../assets/images/boxes.svg";
import whiteBoxes from "../../assets/images/whiteBoxes.svg";

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
  const [suggestionDish, setSuggestionDish] = useState([]);
  console.log(suggestionDish,"suggestionDish")
  const handleClick = (item, index) => {
    const arr = marqueeData?.dish?.map((val, idx) => {
      if (idx === index) {
        return { ...val, selected: true };
      } else {
        return { ...val, selected: false };
      }
    });
    setMarqueeData({ ...marqueeData, dish: arr });
    const name = withoutVenueDish.filter((item1) => {
      return !item.dishes.includes(item1?.name);
    });
    console.log(name, "namemnafs");
    // setDishIndex(venueDish.dishes.length)
    setSuggestionDish(name);
    // setSelectedMenu(venueDish);
    // setSelectedMenuIndex(index);
    // setMenuPrice(venueDish.totalDiscount);
  };
  // const AddDish = (item, price) => {
  //   let Dishes;
  //   let dishPrice;
  //   marqueeData?.dish?.forEach((val1) => {
  //     if (val1.selected && val1.dishes.length > 0) {
  //       Dishes = val1.dishes;
  //       dishPrice = val1.totalDiscount;
  //     }
  //   });
  //   Dishes.push(item);
  //   dishPrice = dishPrice + price;
  //   setMarqueeData([...marqueeData,{dish:Dishes}])
  // };
  const AddDish = (item, price) => {
    // Create a copy of the current marqueeData object
    let updatedMarqueeData = { ...marqueeData };
  
    // Initialize Dishes and dishPrice
    let Dishes = [];
    let dishPrice = 0;
  
    // Check if 'dish' property exists in marqueeData
    if (updatedMarqueeData.dish && Array.isArray(updatedMarqueeData.dish)) {
      // Find the selected dish and its totalDiscount
      for (let val1 of updatedMarqueeData.dish) {
        if (val1.selected && val1.dishes.length > 0) {
          Dishes = [...val1.dishes]; // Create a copy of the dishes array
          dishPrice = val1.totalDiscount;
          break; // Exit the loop once the selected dish is found
        }
      }
  
      // Add the new item and update the price
      if(!Dishes.includes(item)){
        Dishes.push(item);
        dishPrice += price;
      }
     
  
      // Update the marqueeData with the modified Dishes and dishPrice
      updatedMarqueeData.dish = updatedMarqueeData.dish.map((val1) => {
        if (val1.selected && val1.dishes.length > 0) {
          return {
            ...val1,
            dishes: Dishes,
            totalDiscount: dishPrice,
          };
        }
        return val1;
      });
  
      // Update the state with the modified marqueeData object
      setMarqueeData(updatedMarqueeData);
    } else {
      // Handle the case where 'dish' property is missing or not an array
      console.error("marqueeData.dish is missing or not an array");
    }
  };
  const removeDish = (item, index) => {
    // Create a copy of the current marqueeData object
    let updatedMarqueeData = { ...marqueeData };
  
    // Check if 'dish' property exists in marqueeData
    if (updatedMarqueeData.dish && Array.isArray(updatedMarqueeData.dish)) {
      // Find the selected dish and its totalDiscount
      for (let val1 of updatedMarqueeData.dish) {
        if (val1.selected && val1.dishes.length > 0) {
          let Dishes = [...val1.dishes]; // Create a copy of the dishes array
          console.log(val1,"val1")
          let dishPrice = val1.totalDiscount;
          // Check if the item to remove exists in Dishes
          
          if (Dishes[index] === item) {
            
            const priceList =suggestionDish.filter((val)=>( val.name===Dishes[index] ))
            // Determine the price of the removed dish (replace 'priceOfRemovedDish' with the correct value)
            // const priceOfRemovedDish =dishPrice /* Calculate or obtain the price here */
            
            // Remove the dish and update the price
          ;
            if(priceList.length>0){
               dishPrice = dishPrice - priceList[0].price;
               Dishes.splice(index, 1)
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
            // console.log(dishPrice,"sdfsdf",updatedDishPrice)
             
            // Update the marqueeData with the modified Dishes and updatedDishPrice
            
  
            // Update the state with the modified marqueeData object
  
            // Exit the loop once the dish is removed
            break;
          }
        }
      }
    } else {
      // Handle the case where 'dish' property is missing or not an array
      console.error("marqueeData.dish is missing or not an array");
    }
  };
  
  const nextPage = () => {};
  const renderDishes = (name) => {
    let values = [];
    let price;
    if (name == "DishName") {
      marqueeData?.dish?.forEach((val1) => {
        val1.selected &&
          val1.dishes.length > 0 &&
          val1.dishes.map((item) => {
            values.push(item);
          });
      });
      return values;
    } else {
      marqueeData?.dish?.forEach((val1) => {
        if (val1.selected) {
          price = val1.totalDiscount;
        }
      });
      return price;
    }
  };
  return (
    <>
      {marqueeData?.dish?.length > 0 && (
        <div className="md:container md:mx-auto mx-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-16 md:px-16 font-sc text-textColor">
            {marqueeData?.dish?.map((item, index) => {
              // const getIndex = selectedMenuIndex == index;
              // const [isHover, setIsHover] = useState(false);
              return (
                <div
                  // onMouseEnter={() => setIsHover(true)}
                  // onMouseLeave={() => setIsHover(false)}
                  key={index}
                  className={`
                border border-primary p-3 rounded-xl flex md:mx-0 flex-col mb-2 cursor-pointer
                hover:bg-primaryColor hover:border-primaryColor hover:text-white h-64
                ${item.selected ? " border-primary border-2 " : ""}
              `}
                  onClick={() => handleClick(item, index)}
                >
                  <div
                  // className={`flex items-center justify-between mb-3  ${isHover ? "text-white" : "text-black"
                  //   }    `}
                  >
                    <p className="text-center text-xl">{item.name}</p>
                    <p className="text-xl flex flex-col justify-end my-auto">
                      {" "}
                      Rs {item.totalDiscount}
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
                              // className={`${isHover ? "bg-white" : "bg-primaryColor"
                              //   }   h-3 w-3 rounded-full mr-3 `}
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
            })}
          </div>

          {suggestionDish.length > 0 && (
            <div className="border flex rounded-md my-5 cursor-pointer">
              {suggestionDish.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-center items-center"
                  onClick={() => AddDish(item?.name, item?.price)}
                >
                  {item.status === "Available" && (
                    <>
                      <FontAwesomeIcon icon={faCirclePlus} className="pl-2" />
                      <p className="pl-1 pr-3">Add</p>
                      <p className="border m-2 py-1 px-3 rounded-md font-semibold text-textColor font-roboto">
                        {item.name}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="flex  items-center flex-wrap border mb-3">
            {renderDishes("DishName")?.map((dish, index) => (
              <div
                key={index}
                className="flex items-center border ml-2 justify-between  m-2 py-1 px-3  rounded-md my-2"
              >
                <p>{dish}</p>
                <div onClick={() => removeDish(dish, index)} className="pl-1">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            ))}
          </div>

          <button
            onMouseEnter={() => setIsImage(true)}
            onMouseLeave={() => setIsImage(false)}
            className="flex justify-start  items-center w-full md:w-auto text-lg md:ml-16 md:mt-20 
             text-primaryColor border-primaryColor hover:bg-primaryColor hover:text-white
             px-4 md:px-8 py-2 my-7 rounded-lg border"
          >
            {isImage ? (
              <Image src={whiteBoxes} alt="Image" className="" />
            ) : (
              <Image src={boxes} alt="Image" className="" />
            )}
            <p className="ml-3">Add Item</p>
          </button>

          <div className="flex justify-between md:justify-end items-center space-x-2 font-semibold my-5 md:mr-16">
            <p>Total</p>
            <button className=" w-32 py-2 text-center rounded-md bg-lightPrimary text-white">
              {" "}
              {renderDishes("price") && renderDishes("price")}
            </button>
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
