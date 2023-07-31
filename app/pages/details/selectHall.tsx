import React, { useState } from "react";
import data from "./data";
import ImageLightbox from "react-image-lightbox";
import {useStore} from "@/store"
import { useSearchParams } from "next/navigation";
function MarqueeAvailability({ setSlider,setSelectedHall,selectedHall }) {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [selectImage, setSelectImage] = useState("");
  // const[selectedHall,setSelectedHall]=useState('')
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = (item,index) => {
    setClickedIndex(index);
    setSelectedHall(item)
  };
  const {Venues} = useStore()
  const searchParams = useSearchParams()
  const id = searchParams.get("id");
  console.log(id, "iddiidididi");
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
      <div className="flex justify-center">
        <div className="border p-5 rounded-md mb-2 w-3/4 ">
          <div className="hidden md:flex justify-around items-center bg-primaryColor py-2.5 rounded-md mb-4">
            <p className="w-56 text-center text-xl ">Images</p>
            <p className="w-29 text-center text-xl ">Venue Details</p>
            <p className="w-28 text-center text-xl ">Availability</p>
          </div>
          <div className="h-[510px] ">
            {Venues.map((item, index) => ( 
              <div
                key={index}
                className="flex flex-col justify-center  md:flex md:flex-row md:justify-around md:items-center pb-2 border  rounded-md mb-3 md:border-none "
               >
                <div className=" md:border md:rounded-md  ">
                  <div onClick={() => handleImageModal(index)}>
                    <img
                      src={item.image}
                      alt=""
                      className=" md:w-[200px] md:h-[175px] rounded-t-md  cursor-pointer object-cover "
                    />
                  </div>
                  <div className="px-2 items-center text-center py-3">
                    <p> {item.select}</p>
                    <p> $ {item.price}</p>
                  </div>
                </div>
                <div className=" flex flex-col justify-center mx-auto md:-mt-5 md:flex md:flex-col md:justify-center ">
                  <p className="">Siting Capacity</p>
                  <p className="text-center border p-3 w-28 bg-slate-300 rounded-md">{item.minCapacity}->{item.maxCapacity}</p>
                </div>
                <div className={` border p-3 rounded-md w-28 text-center mt-3  md:mt-0 flex justify-center mx-auto md:block  ${
                    clickedIndex === index ? "bg-red-500" : "bg-primaryColor"
                  }`}
                  onClick={() => handleClick(item,index)}>
                 <p>
                 {item.availability}
                  </p> 
                </div>
              </div>
            ))}
          </div>
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
          className="border px-7 py-2 bg-bgColor rounded-md"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MarqueeAvailability;
