"use client";
import React, { Component, useState } from "react";
import Navbar from "@/app/component/Navbar";
import MarqueeAvailability from "./selectHall";
import UserInformation from "./userInformation";
import ChooseMenu from "./chooseMenu";
function Slider() {
  const [slider,setSlider] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="mt-28" >
      {slider === 0 ? <MarqueeAvailability setSlider={setSlider} /> : slider === 1 ? <UserInformation setSlider={setSlider} /> : slider === 2 ?<ChooseMenu setSlider={setSlider}/>:null}
      </div>
    </div>
  );
}

export default Slider;
