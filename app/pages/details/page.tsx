"use client";
import React, { Component, useState } from "react";
import Navbar from "@/app/component/Navbar";
import MarqueeAvailability from "./selectHall";
import UserInformation from "./userInformation";
import ChooseMenu from "./chooseMenu";
import Preview from "./preview";
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";

import {useStore} from "@/store"
const steps = [
  {
    title: "First",
  },
  {
    title: "Second",
  },
  {
    title: "Last",
  },
  {
    title: "Last",
  },
];
function Slider() { 
  const {Venues} = useStore();
  const [slider, setSlider] = useState(0);
  const [selectedHall, setSelectedHall] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [userInformation, setUserInformation] = useState("");
  const [hallInformation, setHallInformation] = useState([] );
  const asdas = useRouter()
  const params = useSearchParams()

  // console.log('parameter',params.get('data'))
  // console.log(params, "{searchParams}", asdas)

  const sendData = async () => {
    const users = {
      selectedHall: selectedHall,
      Menu: selectedMenu,
      UserInformation: userInformation,
    };
    setHallInformation([users])
    try {
      await addDoc(collection(db, "ContactUs"), users);
    } catch {
      console.log(" error");
    }
  };
  console.log(selectedMenu ,"dddselectedMendddu",selectedHall)
  // console.log(query ,"dddselectedMendddu12") 
  
  
  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <div className="flex justify-center mb-6">
          {
            steps.map((item, index)=>(
              <div key={item.title} className="flex items-center">
                <div onClick={()=>setSlider(index)} className={`flex  justify-center items-center w-8 h-8 rounded-full md:w-11 md:h-11 ${
                  slider >= index ? "bg-blue-500" : "bg-slate-300"
                } text-white`}>
                {index + 1}
                </div>
                {index !== steps.length - 1 && (
                <div className="w-12 md:w-28 border-b-8 border-slate-300"></div>
              )}
              </div>
            ))
          }
        </div>

        {slider === 0 ? (
          <MarqueeAvailability
            setSlider={setSlider}
            setSelectedHall={setSelectedHall}
            selectedHall={selectedHall}
          />
        ) : slider === 1 ? (
          <UserInformation
            setSlider={setSlider}
            selectedHall={selectedHall}
            selectedMenu={selectedMenu}
            setUserInformation={setUserInformation}
          />
        ) : slider === 2 ? (
          <ChooseMenu
            setSlider={setSlider}
            setSelectedMenu={setSelectedMenu}
            sendData={sendData}
            selectedMenu={selectedMenu}
          />
        ) : slider == 3 ? (
          <Preview hallInformation={hallInformation}/>
        ) : null}
      </div>
    </div>
  );
}

export default Slider;
