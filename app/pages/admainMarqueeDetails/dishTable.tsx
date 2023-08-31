import React from "react";
import { List, Checkbox, Popconfirm, Select } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function DishTable({
  menus,
  onChange,
  EditVenue,
  setIsOpen,
  setPreviewImage,
  setPhotoIndex,
  onChangeStatus
}) {
  return (
    <>
      <List.Item className="last-child-style bg-gray-100 my-2 "
      >
       <div className="flex items-center pl-3 w-[10%]">
          <Checkbox onClick={() => onChange(menus.menuId)} />
        </div>
        <div className="flex justify-center items-center break-all w-[10%]">{menus.name}</div>
        <div className="flex justify-center items-center break-all w-[10%]">{menus.type}</div>
        <div className="flex justify-center items-center break-all w-[10%]">{menus.description}</div>
        <div className="flex justify-center break-all w-[10%]">{menus.price}</div>
        <div className="flex  justify-center items-center w-[10%] ">
          <img
            width={80}
            height={80}
            src={
              menus.image.length > 0 ? menus.image[0] : "fallback-image-url.jpg"
            }
            alt="Description of the image"
          />
          <Link
            onClick={() => {
              setIsOpen(true);
              setPreviewImage(menus.image);
              setPhotoIndex(0);
            }}
            className="text-blue-600 underline ml-2"
            href=""
          >
            {menus.image.length > 1 && `${menus.image.length - 1} more`}
          </Link>
        </div>
        <div className="flex justify-center text-overflow w-[10%]">
          <Select
            className="status"
            placeholder="Select a status"
            optionFilterProp="children"
            onChange={(value) => onChangeStatus(value, menus.menuId)}
            style={{
              width: 200,
              backgroundColor: menus.status === "Available" ? "#D4EAD8" : "#F9E1D7",
              borderRadius: 15,
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            defaultValue={menus.status}
            value={menus.status}
          >
           {
               menus.status === "Available" ? (
                  <Select.Option value="not-available">Not Available</Select.Option>
                  ) : (
                  <Select.Option value="available">Available</Select.Option>
                )
               }
          </Select>
        </div>
        <div className=" w-[10%] flex justify-end">
            <FontAwesomeIcon
              icon={faPenToSquare}
              width={15}
              className="text-green-500 text-xl pr-3"
              onClick={() => EditVenue(menus.menuId)}
            />
          </div>
      </List.Item>

    </>
  );
}

export default DishTable;
