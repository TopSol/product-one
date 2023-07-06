import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
const menu = [
  {
    menu: "Menu 1",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "$2000",
  },
  {
    menu: "Menu 2",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: '$4000',
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
const data = ["baryani", "chicken", "mutton"];
function ChooseMenu({ setSlider, setSelectedMenu, sendData }) {
  const nextPage = () => {
    sendData();
    setSlider(3);
  };
  return (
    <div className="md:container mx-auto">
      <div className="md:border p-5 rounded-md mb-2 flex justify-center items-center flex-col md:flex-row ">
        {menu?.map((item, index) => (
          <div
            key={index}
            className="border p-3 rounded-md flex  w-4/5 flex-col mb-2 ml-3 cursor-pointer hover:bg-primaryColor hover:text-black"
            onClick={() => setSelectedMenu(item)}
          >
            <div>
              <p className="text-center text-xl">{item.menu}</p>
            </div>
            <div className="w-1/2">
              {item.dish.map((dish, index) => (
                <li> {dish}</li>
              ))}
            </div>
            <div className=" flex justify-center items-center w-full">
              <p className="text-xl"> {item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex-wrap lg:flex items-center border rounded-md cursor-pointer">
        {data.map((item, index) => (
          <div key={index} className=" flex justify-center items-center p-3   ">
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="pl-1 pr-3">Add</p>
            <p className="border p-2  rounded-md font-semibold text-textColor font-roboto">{item}</p>
          </div>
        ))}
      </div>

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
