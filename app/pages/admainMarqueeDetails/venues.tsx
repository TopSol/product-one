import React, { useState } from "react";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  availability: "",
  price: "",
};
function Venues() {
  const [user, setUser] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(user, "userdfdfdf");
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

export default Venues;
