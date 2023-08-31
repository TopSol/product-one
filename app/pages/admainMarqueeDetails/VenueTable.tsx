import React from "react";
import { List, Checkbox, Popconfirm } from "antd";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
function VenueData({
  venue,
  onChange,
  EditVenue,
  setIsOpen,
  setPreviewImage,
  setPhotoIndex, 
}) {
  return (
    <>
      <List.Item className= "last-child-style bg-gray-100 my-2 flex justify-between">
          <div className="flex items-center pl-3 w-[10%]">
            <Checkbox onClick={() => onChange(venue.venueId)} />
          </div>
          <div className="flex justify-center items-center break-all w-[10%]">{venue.name}</div>
          <div className="flex justify-center items-center break-all w-[10%]">{venue.minCapacity}</div>
          <div className="flex justify-center items-center break-all w-[10%]">{venue.maxCapacity}</div>
          <div className="flex justify-center items-center break-all w-[10%]">{venue.price}</div>
          <div className="flex  justify-center break-all w-[10%]">
            <img
              width={80}
              height={80}
              src={
                venue.image.length > 0
                  ? venue.image[0]
                  : "fallback-image-url.jpg"
              }
              alt="Description of the image"
            />
            <Link
              onClick={() => {
                setIsOpen(true);
                setPreviewImage(venue.image);
                setPhotoIndex(0);
              }}
              className="text-blue-600 underline ml-2"
              href=""
            >
              {venue.image.length > 1 && `${venue.image.length - 1} more`}
            </Link>
          </div>
          <div className="w-[10%] flex justify-end">
            <FontAwesomeIcon
              icon={faPenToSquare}
              width={15}
              className="text-green-500 text-xl pr-3"
              onClick={() => EditVenue(venue.venueId)}
            />
          </div>
      </List.Item>
    </>
  );
}

export default VenueData;
