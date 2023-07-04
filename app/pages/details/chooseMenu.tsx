import React from "react";

const menu = [
  {
    menu: "Menu 1",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "RS 20000",
  },
  {
    menu: "Menu 2",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "RS 40000",
  },
  {
    menu: "Menu 3",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "RS 5000",
  },
  {
    menu: "Menu 4",
    dish: ["Chicken", "Biryani", "Kabab"],
    price: "RS 8000",
  },
];
function ChooseMenu({ setSlider }) {
  return (
    <div className="md:container mx-auto">
      <div className="md:border p-5 rounded-md mb-2 flex justify-center items-center flex-col md:flex-row ">
        {menu?.map((item, index) => (
          <div
            key={index}
            className="border p-3 rounded-md flex  w-4/5 flex-col mb-2 ml-3 cursor-pointer hover:bg-primaryColor hover:text-black"
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
              <p className="text-xl">{item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChooseMenu;
