"use client";
import React, { useState } from "react";
import Navbar from "@/app/component/Navbar";
import Venues from "./venues";
import Menus from "./menus";
import Dish from "./dish";
function AdminMarqueeDetails() {
  const [component, setComponent] = React.useState("Venues");
  // const [isOpen, setIsOpen] = React.useState(" ");
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  return (
    <div>
      <Navbar />
      <div className="mt-28 md:container mx-auto">
        <div className="flex h-[85vh] ">
          <div className="w-[30%] border flex flex-col">
            <button
              className="w-full border-b text-left py-2 pl-1"
              onClick={() => setComponent("Venues")}
            >
              Venu
            </button>
            <button
              className="w-full border-b text-left py-2 pl-1"
              onClick={() => setComponent("menu")}
            >
              Menu
            </button>
            <button
              className="w-full border-b text-left py-2 pl-1"
              onClick={() => setComponent("dish")}
            >
              Dish
            </button>
          </div>
          <div className="w-[70%] bg-slate-300 h-[85vh] overflow-y-auto scrollbar-thumb-blue-500 scrollbar-track-blue-200 " >
            <div className="flex justify-end">
              {component === "Venues" ? (
                <button className="border rounded-md px-3 py-3 m-2" onClick={()=>openModal()}>
                  Add venues
                </button>
              ) : component === "menu" ? (
                <button className="border rounded-md px-3 py-3 m-2"  onClick={()=>openModal()}>
                  Add Menu
                </button>
              ) : component === "dish" ? (
                <button className="border rounded-md px-3 py-3 m-2" onClick={()=>openModal()}>
                  Add Dish
                </button>
              ) : null}
            </div>
            <div>
              {component === "Venues" ? (
                <Venues modalOpen={modalOpen} setModalOpen={setModalOpen}/>
              ) : component === "menu" ? (
                <Menus modalOpen={modalOpen} setModalOpen={setModalOpen}/>
              ) : component === "dish" ? (
                <Dish modalOpen={modalOpen} setModalOpen={setModalOpen}/>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMarqueeDetails;
