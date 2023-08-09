import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/component/Loader";
function Success({ setSuccessPage }) {
  const [loader ,setLoader ] = useState(false)
   const router = useRouter()
   useEffect(()=>{
      // setLoader((prev)=>(!prev))

   },[])
  return (
    <div className="h-[100vh] mx-auto flex flex-col justify-center items-center bg-[]">
      <div className="box1 w-[70%]  h-[70%] bg-white rounded-md border shadow-2xl justify-center items-start mx-auto">
        <img
          className=" flex justify-center items-center mx-auto rounded-full h-52 w-52 object-contain"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsyUdR2wGDRZFY5Y_gEnBVim1YacVLz72jZrGvQH5h-NjKcd7MUjskSFmzcOnsgOdCZZ8&usqp=CAU"
          alt=""
        />
        <p className="w-96 justify-center text-center mx-auto">
          Your request has been  <samp className="text-green-700 font-extrabold">{" "}successfully {" "}</samp>sent to the owner of the marquee.
          They will review your request and get back to you soon
        </p>
        <button
          className="flex justify-end items-end mx-auto border-green-600 px-10 rounded-md py-2 bg-green-500 my-4 text-white font-extrabold hover:bg-green-900 hover:text-white"
          onClick={() => {
            // setSuccessPage(false)
            setLoader(true)
            router.push("/")
            setLoader(false)
          }}
        >
        {
          loader ? <Loader/> : "ok"
        }  
        </button>
      </div>
    </div>
  );
}

export default Success;
