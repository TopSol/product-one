// import React, { useState } from "react";
// import { message } from "antd";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCaretDown,
//   faCirclePlus,
//   faXmark,
// } from "@fortawesome/free-solid-svg-icons";
// const menu = [
//   {
//     menu: "Menu 1",
//     dish: ["Chicken", "Biryani", "Kabab"],
//     price: "$2000",
//   },
//   {
//     menu: "Menu 2",
//     dish: ["Chicken", "Biryani", "Kabab"],
//     price: "$4000",
//   },
//   {
//     menu: "Menu 3",
//     dish: ["Chicken", "Biryani", "Kabab"],
//     price: "$5000",
//   },
//   {
//     menu: "Menu 4",
//     dish: ["Chicken", "Biryani", "Kabab"],
//     price: "$8000",
//   },
// ];
// const data = ["biryani", "chicken", "mutton"];

// function ChooseMenu({
//   setSlider,
//   setSelectedMenu,
//   preview,
//   selectedMenu,
//   dish,
//   setMenuIndex,
//   menuIndex,
//   withoutVenueDish,
// }) {
//   const [selectedDish, setSelectedDish] = useState(false);
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedType, setSelectedType] = useState("Dessert");
//   const [menuPrice, setMenuPrice] = useState(0);
//   const [subtractPrice, setSubtractPrice] = useState(0);
//   const [suggestionDish, setSuggestionDish] = useState([]);
//   const nextPage = () => {
//     console.log(menuIndex, "menuIndex");
//     if (menuIndex !== null) {
//       preview();
//       setSlider(3);
//     }
//   };
//   const removeDish = (item) => {
//     console.log(item, "itemmmmmmm");
//     withoutVenueDish.filter((removeDish)=>{
//    if( removeDish.name === item){
//     setMenuPrice(menuPrice - removeDish.price);
//    }
//     })
//     setSelectedMenu({
//       ...selectedMenu,
//       dishes: selectedMenu.dishes.filter((dish) => dish !== item),
//     });
//   };
//   console.log(dish, "dishdish");
//   const arr = selectedMenu.dishes;
//   const AddDish = (item, price) => {
//     setSubtractPrice(price);
//     // setMenuPrice(menuPrice + price);
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
//   const handleItemClick = (item) => {
//     setSelectedType(item);
//     // console.log(item, "ddddddddwwwwsssssdd");
//     const lowercaseItem = item.toLowerCase();

//     // if (
//     //   !arr?.some((existingItem) => existingItem.toLowerCase() === lowercaseItem)
//     // ) {
//     //   arr.push(item);
//     //   setSelectedMenu({ ...selectedMenu, dish: arr });
//     // } else {
//     //   alert("This dish is already added to the menu.");
//     // }

//     if (
//       selectedItems.some(
//         (selectedItem) => selectedItem.toLowerCase() === lowercaseItem
//       )
//     ) {
//       setSelectedItems(
//         selectedItems.filter(
//           (selectedItem) => selectedItem.toLowerCase() !== lowercaseItem
//         )
//       );
//     } else {
//       setSelectedItems([item]);
//       // setSelectedItems([...selectedItems, item]);
//     }
//   };
//   const [selectedOptions, setSelectedOptions] = useState([
//     "Drink",
//     "Dessert",
//     "food",
//   ]);
//   const handleClick = (venueDish, index) => {
//     const name = withoutVenueDish.filter((item) => {
//       return !venueDish.dishes.includes(item?.name);
//     });
//     setSuggestionDish(name);
//     setSelectedMenu(venueDish);
//     setMenuIndex(index);
//     setMenuPrice(venueDish.totalDiscount);
//   };
//   console.log(selectedMenu, "selectedMenuselectedMenu");
//   return (
//     <div className="md:container mx-auto">
//       <div className="md:border p-5 rounded-md mb-2 flex justify-center items-center flex-col md:flex-row ">
//         {dish?.map((item, index) => (
//           <div
//             key={index}
//             className={`border p-3 rounded-md flex  w-4/5  flex-col mb-2 ml-3 cursor-pointer hover:bg-primaryColor hover:text-black h-48 ${
//               menuIndex === index && `bg-primaryColor`
//             }
//             `}
//             onClick={() => handleClick(item, index)}
//           >
//             <div>
//               <p className="text-center text-xl">{item.name}</p>
//             </div>
//             <div className="w-1/2">
//               <ul>
//                 {item?.dishes?.map((dish, index) => {
//                   if (index < 3) {
//                     return <li key={index}>{dish}</li>;
//                   }
//                   return null;
//                 })}
//               </ul>
//             </div>
//             <div className=" flex justify-center items-end my-auto w-full">
//               <p className="text-xl flex flex-col justify-end my-auto">
//                 {" "}
//                 Rs {item.totalDiscount}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {suggestionDish.length > 0 && (
//         <div className="border flex rounded-md my-5 cursor-pointer">
//           {suggestionDish.map((item, index) => (
//             <div
//               key={index}
//               className="flex justify-center items-center"
//               onClick={() => AddDish(item?.name, item?.price)}
//             >
//               {item.status === "Available" && (
//                 <>
//                   <FontAwesomeIcon icon={faCirclePlus} className="pl-2" />
//                   <p className="pl-1 pr-3">Add</p>
//                   <p className="border m-2 py-1 px-3 rounded-md font-semibold text-textColor font-roboto">
//                   {item.name}
//               </p>
//                 </>
//               )}
              
//             </div>
//           ))}
//         </div>
//       )}

//       {/* <div className=" flex-wrap lg:flex items-center border rounded-md cursor-pointer mb-5 justify-between  ">
//         <div className=" md:flex">
//           {withoutVenueDish.map((item, index) => (
//             <div
//               key={index}
//               className=" flex justify-center items-center "
//               onClick={() => AddDish(item?.name, item?.price)}
//             >
//               {item.type === selectedType && item.status === "Available" ? (
//                 <>
//                   <FontAwesomeIcon icon={faCirclePlus} className="pl-2" />
//                   <p className="pl-1 pr-3 ">Add</p>
//                   <p className="border m-2 py-1 px-3  rounded-md font-semibold text-textColor font-roboto">
//                     {item.name}
//                   </p>
//                 </>
//               ) : null}
//             </div>
//           ))}
//         </div>
//         <div className="  flex items-center  rounded-md cursor-pointer  mb-2 md:mb-0  flex-col relative ">
//           <div
//             className="border py-2 w-48 rounded-md relative"
//             onClick={() => setSelectedDish((prev) => !prev)}
//           >
//             <div className="justify-between flex mx-2">
//               {selectedType}
//               <FontAwesomeIcon icon={faCaretDown} />
//             </div>
//           </div>
//           {selectedDish && (
//             <div className="border cursor-pointer w-48 absolute mt-10">
//               {withoutVenueDish
//                 .reduce((uniqueItems, item) => {
//                   if (!uniqueItems.includes(item.type)) {
//                     uniqueItems.push(item.type);
//                     return uniqueItems;
//                   }
//                   return uniqueItems;
//                 }, [])
//                 .map((uniqueType, index) => {
//                   console.log(uniqueType, "uniqueTyssspe");
//                   return (
//                     <div
//                       key={index}
//                       onClick={() => {
//                         handleItemClick(uniqueType);
//                         setSelectedDish(false);
//                       }}
//                       style={{
//                         backgroundColor: selectedItems.includes(uniqueType)
//                           ? "gray"
//                           : "white",
//                       }}
//                     >
//                       <p> {uniqueType !== "Venue Dish" && uniqueType}</p>
//                     </div>
//                   );
//                 })}
//             </div>
//           )}
//         </div>
//       </div> */}
//       {selectedMenu?.dishes?.length > 0 && (
//         <div className="flex  items-center flex-wrap border mb-3">
//           {selectedMenu?.dishes?.map((dish, index) => (
//             <div
//               key={index}
//               className="flex items-center border ml-2 justify-between  m-2 py-1 px-3  rounded-md my-2"
//             >
//               <p>{dish}</p>
//               <div onClick={() => removeDish(dish)} className="pl-1">
//                 <FontAwesomeIcon icon={faXmark} />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//       <div className="flex justify-end ">
//         <p className="my-3 py-2 text-center rounded-md bg-primaryColor mr-2 w-[8%] ">
//           {" "}
//           Rs {menuPrice}{" "}
//         </p>
//         <button
//           className="border px-7 py-2 my-3 bg-bgColor rounded-md"
//           onClick={() => nextPage()}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ChooseMenu;
import React, { useState } from "react";
import { message } from "antd";
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

function ChooseMenu({
  setSlider,
  setSelectedMenu,
  preview,
  selectedMenu,
  dish,
  setMenuIndex,
  menuIndex,
  withoutVenueDish,
}) {
  const [selectedDish, setSelectedDish] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedType, setSelectedType] = useState("Dessert");
  const [menuPrice, setMenuPrice] = useState(0);
  const [subtractPrice, setSubtractPrice] = useState(0);
  const [suggestionDish, setSuggestionDish] = useState([]);
  const nextPage = () => {
    console.log(menuIndex, "menuIndex");
    if (menuIndex !== null) {
      preview();
      setSlider(3);
    }
  };
  const removeDish = (item) => {
    console.log(item, "itemmmmmmm");
    withoutVenueDish.filter((removeDish)=>{
   if( removeDish.name === item){
    setMenuPrice(menuPrice - removeDish.price);
   }
    })
    setSelectedMenu({
      ...selectedMenu,
      dishes: selectedMenu.dishes.filter((dish) => dish !== item),
    });
  };
  console.log(dish, "dishdish");
  const arr = selectedMenu.dishes;
  const AddDish = (item, price) => {
    setSubtractPrice(price);
    // setMenuPrice(menuPrice + price);
    const lowercaseItem = item.toLowerCase();
    const isDuplicate = arr.some(
      (existingItem) => existingItem.toLowerCase() === lowercaseItem
    );

    if (!isDuplicate) {
      arr.push(item);
      setSelectedMenu({ ...selectedMenu, dishes: arr });
      setMenuPrice(menuPrice + price);
    } else {
      message.error("This dish is already added to the menu.");
    }
  };
  const handleItemClick = (item) => {
    setSelectedType(item);
    // console.log(item, "ddddddddwwwwsssssdd");
    const lowercaseItem = item.toLowerCase();

    // if (
    //   !arr?.some((existingItem) => existingItem.toLowerCase() === lowercaseItem)
    // ) {
    //   arr.push(item);
    //   setSelectedMenu({ ...selectedMenu, dish: arr });
    // } else {
    //   alert("This dish is already added to the menu.");
    // }

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
      setSelectedItems([item]);
      // setSelectedItems([...selectedItems, item]);
    }
  };
  const [selectedOptions, setSelectedOptions] = useState([
    "Drink",
    "Dessert",
    "food",
  ]);
  const handleClick = (venueDish, index) => {
    const name = withoutVenueDish.filter((item) => {
      return !venueDish.dishes.includes(item?.name);
    });
    setSuggestionDish(name);
    setSelectedMenu(venueDish);
    setMenuIndex(index);
    setMenuPrice(venueDish.totalDiscount);
  };
  console.log(selectedMenu, "selectedMenuselectedMenu");
  return (
    <>
    {
      dish.length>0 && (
        <div className="md:container mx-auto">
        <div className="md:border p-5 rounded-md mb-2 flex justify-center items-center flex-col md:flex-row ">
          {dish?.map((item, index) => (
            <div
              key={index}
              className={`border p-3 rounded-md flex  w-4/5  flex-col mb-2 ml-3 cursor-pointer hover:bg-primaryColor hover:text-black h-48 ${
                menuIndex === index && `bg-primaryColor`
              }
              `}
              onClick={() => handleClick(item, index)}
            >
              <div>
                <p className="text-center text-xl">{item.name}</p>
              </div>
              <div className="w-1/2">
                <ul>
                  {item?.dishes?.map((dish, index) => {
                    if (index < 3) {
                      return <li key={index}>{dish}</li>;
                    }
                    return null;
                  })}
                </ul>
              </div>
              <div className=" flex justify-center items-end my-auto w-full">
                <p className="text-xl flex flex-col justify-end my-auto">
                  {" "}
                  Rs {item.totalDiscount}
                </p>
              </div>
            </div>
          ))}
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
        {selectedMenu?.dishes?.length > 0 && (
          <div className="flex  items-center flex-wrap border mb-3">
            {selectedMenu?.dishes?.map((dish, index) => (
              <div
                key={index}
                className="flex items-center border ml-2 justify-between  m-2 py-1 px-3  rounded-md my-2"
              >
                <p>{dish}</p>
                <div onClick={() => removeDish(dish)} className="pl-1">
                  <FontAwesomeIcon icon={faXmark} />
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end ">
          <p className="my-3 py-2 text-center rounded-md bg-primaryColor mr-2 w-[8%] ">
            {" "}
            Rs {menuPrice}{" "}
          </p>
          <button
            className="border px-7 py-2 my-3 bg-bgColor rounded-md"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
      )
    }
    </>
 
  );
}

export default ChooseMenu;
