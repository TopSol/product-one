import React from "react";
import chair from "../../assets/images/chair.svg";
import dollor from "../../assets/images/dollor.svg";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

function MarqueeAvailability({
  setSlider,
  setSelectedHall,
  setClickedIndex,
  clickedIndex,
  venus,
}) {
  const handleClick = (item, index) => {
    setClickedIndex(index);
    setSelectedHall(item);
  };

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const nextPage = () => {
    if (clickedIndex !== null) {
      setSlider(1);
    }
  };

  return (
    <div>
      <div className="md:container mx-4 md:mx-auto px-32 mt-20 grid gap-16 md:grid-cols-2 font-poppins text-textColor">
        {venus?.map((item, index) => {
          return (
            <div
              key={index}
              className="border rounded-xl  flex flex-col-reverse md:flex md:flex-row h-auto md:h-96"
            >
              <div className="w-full md:w-[55%] flex flex-col justify-evenly ">
                <div className="mt-6 md:mt-0 md:text-2xl text-black font-bold mx-8">
                  <p>{item.select}</p>
                  <p>{item.name}</p>
                </div>

                <div className="mx-7 my-6">
                  <div className="flex items-center text-textColor">
                    <div>
                      <Image
                        src={chair}
                        alt="Chair"
                        height={30}
                        width={30}
                        className="mr-3"
                      />
                    </div>
                    <div>
                      <p className="font-bold md:text-xl">Siting Capacity</p>
                      <p className="underline">
                        {item.minCapacity} to {item.maxCapacity}
                      </p>
                    </div>
                  </div>

                  <div className="text-textColor flex items-center mt-4">
                    <div>
                      <Image
                        src={dollor}
                        alt="dollor"
                        height={30}
                        width={30}
                        className="mr-3"
                      />
                    </div>
                    <div>
                      <p className="font-bold md:text-xl">Price</p>
                      <p className="underline">{item.price}</p>
                    </div>
                  </div>
                </div>
                <div
                  className={`w-32 py-2 my-6 rounded-md text-center flex justify-center mx-auto items-center text-white font-bold cursor-pointer hover:bg-hoverPrimary ${
                    clickedIndex === index
                      ? "bg-hoverPrimary"
                      : "bg-primaryColor"
                  }`}
                  onClick={() => handleClick(item, index)}
                >
                  <p className="">Select</p>
                </div>
              </div>
              <div className="w-full md:w-[45%]">
                <img
                  src={item.image}
                  alt=""
                  className="w-[100%] h-[100%] object-cover rounded-tr-xl rounded-tl-xl md:rounded-tl-none md:rounded-br-lg cursor-pointer  "
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-end w-3/4 mx-auto">
        <button
          className="border px-8 py-2 my-3 bg-bgColor rounded-md"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MarqueeAvailability;
