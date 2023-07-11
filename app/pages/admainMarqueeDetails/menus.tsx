import React, { useState } from "react";
const initialFormState = {
  name: "",
  image: "",
  price: "",
  description: "",
  type: "",
  category: "",
  availability: "",
  marqueeId: "",
};
function Menus() {
  const [user, setUser] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <div className="md:container mx-auto">
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
        </div>
      </div>
    </div>
  );
}

export default Menus;
