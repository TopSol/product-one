import React, { useState } from "react";
import data from "./data";
import ImageLightbox from "react-image-lightbox";
function MarqueeAvailability({ setSlider }) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectImage, setSelectImage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (index) => {
    setClickedIndex(index);
  };

  const handleImageModal = (index) => {
    setSelectImage(data[index].image);
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };
  const nextPage = () => {
    setSlider(1);
  };
  return (
    <div className="md:container mx-auto ">
      <div className="border p-5 rounded-md mb-2">
        <div className="flex justify-around items-center bg-primaryColor py-2.5 rounded-md mb-4  ">
          <p className="w-56 text-center text-xl ">Images</p>
          <p className="w-28 text-center text-xl ">Capacity</p>
          <p className="w-28 text-center text-xl ">Availability</p>
        </div>
        <div className="h-[520px] overflow-scroll">
          {data.map((item, index) => (
            <div key={index} className="flex justify-around items-center pb-2 ">
              <div className=" border  ">
                <div onClick={() => handleImageModal(index)}>
                  <img
                    src={item.image}
                    alt=""
                    className=" w-[200px] h-[180px]  cursor-pointer object-cover "
                  />
                </div>
                <div className="px-2 items-center text-center py-3">
                  <p> {item.select}</p>
                  <p> {item.price}</p>
                </div>
              </div>
              <div className="border p-3 w-28 bg-slate-300 rounded-md">
                <p className="text-center">{item.capacity}</p>
              </div>
              <div
                className={`border p-3 rounded-md w-28 ${
                  clickedIndex === index ? "bg-red-500" : "bg-primaryColor"
                }`}
                onClick={() => handleClick(index)}
              >
                <p className="text-center cursor-pointer">
                  {item.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isOpen && (
        <ImageLightbox
          mainSrc={selectImage}
          nextSrc={data[(photoIndex + 1) % data.length].image}
          prevSrc={data[(photoIndex + data.length - 1) % data.length].image}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + data.length - 1) % data.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % data.length)
          }
        />
      )}
      <div className="flex justify-end ">
        <button
          className="border px-7 py-3 bg-bgColor rounded-md"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MarqueeAvailability;
