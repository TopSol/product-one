"use client";
import React from "react";
import Navbar from "@/app/component/Navbar";
import Venues from "./venues";
import Menus from "./menus";
import Dish from "./dish";
function AdminMarqueeDetails() {
  return (
    <div>
      <Navbar />

      <div className="mt-28 md:container mx-auto ">
        <div>
          <p className="text-center text-xl">Venues</p>
          <Venues />
        </div>
        <div>
        <p className="text-center text-xl">Add Dish</p>
            <Menus/>
        </div>
        <div>
       
        <p className="text-center text-xl">Menus</p>
            <Dish/>
        </div>
      </div>
    </div>
  );
}

export default AdminMarqueeDetails;
