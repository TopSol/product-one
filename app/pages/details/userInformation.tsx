import React, { useState } from "react";
const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  notes: "",
};
function UserInformation({ setSlider }) {
  const [user, setUser] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const sendData = (e) => {
    e.preventDefault();
    console.log(user, "sdsd");
  };
  const nextPage = () => {
    setSlider(2);
  };
  return (
    <div className="md:container mx-auto">
      <div className="md:container mx-auto border p-5 rounded-md mb-2 flex justify-center">
        <div className="border p-5 rounded-md mb-2 bg-primaryColor md:w-2/4">
          <div className="mb-6 flex flex-col md:flex-row md:justify-between">
            <label className="text-xl">FirstName:</label>
            <input
              type="firstName"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className="border  rounded-lg outline-none"
            />
          </div>
          <div className="mb-6 flex flex-col md:flex-row md:justify-between">
            <label className="text-xl">LastName:</label>
            <input
              type="lastName"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className="border  rounded-lg outline-none"
            />
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:justify-between">
            <label className="text-xl">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="border  rounded-lg outline-none"
            />
          </div>

          <div className="mb-6 flex flex-col md:flex-row md:justify-between">
            <label className="text-xl">Address:</label>
            <input
              type="address"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="border  rounded-lg outline-none"
            />
          </div>
          <div className="mb-6 flex flex-col md:flex-row md:justify-between">
            <label className="text-xl">Notes:</label>
            <input
              type="notes"
              name="notes"
              value={user.notes}
              onChange={handleChange}
              className="border  rounded-lg outline-none"
            />
          </div>
          {/* <button type="submit" onClick={(e) => sendData(e)}>
            Login
          </button> */}
        </div>
      </div>
      <div className="flex justify-end ">
        <button
          className="border px-7 py-3 bg-bgColor rounded-md"
          onClick={() => nextPage()}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default UserInformation;
