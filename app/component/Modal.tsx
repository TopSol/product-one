import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  } 
 
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-white  ">
      <div className="bg-white rounded-lg  w-full">
        <button
          className="absolute top-0 right-0 m-4 hover:text-gray-800 focus:outline-none text-xl"
          onClick={onClose}
        >
            <FontAwesomeIcon icon={faXmark} className="text-2xl"/>
          {/* <FontAwesomeIcon icon={faXmark} className="text-4xl"/> */}
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
