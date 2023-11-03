import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

function Success({ setSuccessPage }) {
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const handleButton = () => {
    setLoader(true);
    router.push("/")
      setLoader(false);
  };
  return (
    <div className="h-[100vh] mx-auto flex flex-col justify-center items-center bg-[]">
      <div className="box1 w-[80%]  h-[80%] bg-white rounded-md border shadow-2xl justify-center items-start mx-auto">
        <img
          className=" flex justify-center items-center mx-auto rounded-full h-52 w-52 object-contain"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyUdR2wGDRZFY5Y_gEnBVim1YacVLz72jZrGvQH5h-NjKcd7MUjskSFmzcOnsgOdCZZ8&usqp=CAU"
          alt=""
        />
        <p className="w-[55%] text-textColor justify-center text-center  mx-auto">
          We are pleased to inform you that your request has been successfully
          forwarded to the proprietor of the marquee. They will carefully assess
          your inquiry and promptly respond to you through either email or
          WhatsApp. Thank you for your patience and understanding.
        </p>
        <button
          className="flex justify-center items-end mx-auto border-primary w-36 rounded-md py-2 bg-primary my-4 text-white font-extrabold hover:bg-hoverPrimary hover:text-white"
          onClick={handleButton}
        >
          {loader ? <Spin /> : "Home"}
        </button>
      </div>
    </div>
  );
}

export default Success;
