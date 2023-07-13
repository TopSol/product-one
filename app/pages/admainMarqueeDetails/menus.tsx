import React, { useState } from "react";
import Modal from "@/app/component/Modal";
import { db } from "@/app/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import {useStore} from "../../../store"
import { add } from "date-fns";
const initialFormState = {
  name: "",
  image: "",
  price: "",
  type: "",
  marqueeId: "",
  availability: "",
  description: "",
  // category: "",
};
function Menus({ modalOpen, setModalOpen }) {
  const {userInformation,addUser} = useStore()
  const [user, setUser] = useState(initialFormState);
  const [addVenues,setAddVenues] = useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const closeModal = () => {
    setModalOpen(false);
  };
  const HandleAddVenues =async () => {
    // addUser(user)
    console.log(userInformation,"userInformationasrrs")
    // console.log(user, "user44444666");
    if (
      !user.name ||
      !user.image ||
      !user.price ||
      !user.type ||
      !user.marqueeId ||
      !user.availability ||
      !user.description 
      // !user.category
    ) {
      return;
    }
    const users = {
      name: user.name,
      // image: user.image,
      type: user.type,
      marqueeId: user.marqueeId,
      availability: user.availability,
      description: user.description,
      // category: user.category,
      userId:userInformation.userId,
      price: user.price,
    };
    try {
      await addDoc(collection(db, "Menus"), users);
    } catch(error) {
      console.log(error,"error");
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // console.log(errorCode, errorMessage,"erererr");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  return (
    <div className="md:container mx-auto">
      {
        addVenues.map((item, index) => {
          // console.log(item, "item333");
          return (
            <div key={index} className="border p-5 rounded-md mb-2">
              <div className="flex justify-between flex-wrap">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.type}</p>
                <p>{item.marqueeId}</p>
                <p>{item.availability}</p>
                <p>{item.description}</p>
                {/* <p>{item.category}</p> */}
              </div>
              <div className="flex flex-wrap">
                {item.image &&
                  Object.values(item.image).map((img, index) => {
                    return (
                      <img
                        src={URL.createObjectURL(img)}
                        alt=""
                        key={index}
                        className="w-[25%]"
                      />
                    );
                  })}
              </div>
            </div>
          );
        })  
      }
       <Modal isOpen={modalOpen} onClose={closeModal}>
       <div className="flex justify-center">
        <div className="border p-5 rounded-md mb-2 w-[100%]  lg:w-[70%] ">
          <div className="md:flex md:justify-between">
            <div className="mb-6 flex flex-col md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">Name:</label>
              <input
                type="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">Images</label>
              <input
                type="file"
                name="image"
                multiple
                onChange={(e) => {
                  setUser({ ...user, image: e.target.files });
                }}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between  ">
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">price:</label>
              <input
                type="number"
                name="price"
                value={user.price}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between ">
              <label className="text-xl">type:</label>
              <input
                type="text"
                name="type"
                value={user.type}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between  ">
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">marqueeId:</label>
              <input
                type="text"
                name="marqueeId"
                value={user.marqueeId}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between ">
              <label className="text-xl">availability:</label>
              <input
                type="boolean"
                name="availability"
                value={user.availability}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between  ">
            <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
              <label className="text-xl">description:</label>
              <textarea
                name="description"
                // rows={5}
                cols={19}
                value={user.description}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="flex flex-wrap">
            {user.image &&
              Object.values(user.image).map((img, index) => {
                return (
                  <img
                    src={URL.createObjectURL(img)}
                    alt=""
                    key={index}
                    className="w-[25%]"
                  />
                );
              })}
          </div>
          <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>HandleAddVenues()}>Add Venues</button>
            </div>
        </div>
      </div>
       </Modal>
     
    </div>
  );
}

export default Menus;
