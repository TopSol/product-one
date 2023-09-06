import React from "react";
import { List, Checkbox, Popconfirm } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function MenuTable({ dishesData, onChange, EditDish, openModal }) {
  return (
    <List.Item className="last-child-style bg-gray-100 my-2 flex justify-between"> 
      <div className="flex items-center pl-3 w-[10%]">
        <Checkbox onClick={() => onChange(dishesData.dishId)} />
      </div>
      <div className="flex justify-center items-center break-all w-[10%]">{dishesData.name}</div>
      <div className="flex justify-center items-center break-all w-[10%]">
        {
          <ul>
            <li
              className="cursor-pointer"
              onClick={() => openModal(dishesData.dishes)}
            >
              {" "}
              <Link className="text-blue-600 underline" href="">
                {dishesData?.dishes?.length} Dishes
              </Link>
            </li>
          </ul>
        }
      </div>
      <div className="flex justify-center items-center break-all w-[10%]">{dishesData.price}</div>
      <div className="flex justify-center items-center break-all w-[10%]">{dishesData.discount}</div>
      <div className="flex justify-center items-center break-all w-[10%]">{dishesData.totalDiscount}</div>
      <div className="w-[10%] flex justify-end">
        <FontAwesomeIcon
          icon={faPenToSquare}
          width={15}
          className="text-green-500 text-xl pr-3"
          onClick={() => EditDish(dishesData.dishId)}
        />
      </div>
    </List.Item>
  );
}

export default MenuTable;
