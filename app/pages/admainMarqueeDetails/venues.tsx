import React, { useState } from "react";
import Modal from "@/app/component/Modal";
import { add } from "date-fns/esm";
import { set } from "date-fns";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  // availability: "",
  price: "",
};
function Venues({modalOpen, setModalOpen}) {
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
  const HandleAddVenues = () => {
    console.log(user, "user44444");
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  return (
    <>
      <div className="md:container mx-auto">
        {
          addVenues.map((item, index) => {
            console.log(item, "item333");
            return (
              <div key={index} className="border p-5 rounded-md mb-2">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.minCapacity}</p>
                  <p>{item.maxCapacity}</p>
                  <p>{item.availability}</p>
                  <p>{item.price}</p>
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
          }
        )}
      </div>
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
              {/* <img src={user.image ? URL.createObjectURL(user.image) : ''} alt="" /> */}
            </div>
            <div className="md:flex md:justify-between  ">
              <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
                <label className="text-xl">Minimum Capacity:</label>
                <input
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="border  rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between ">
                <label className="text-xl">Maximum Capacity:</label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
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
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>HandleAddVenues()}>Add Venues</button>
            </div>
            {/* <div className="flex flex-wrap">
              {user.image &&()
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
            </div> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
