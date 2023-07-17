import React, { useState } from "react";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "@/app/firebase";
import { Input } from "antd";
import { Radio } from "antd";
import { Checkbox } from "antd";
const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  notes: "",
  PhoneNumber: "",
};
function UserInformation({
  setSlider,
  selectedHall,
  selectedMenu,
  setUserInformation,
}) {
  const [user, setUser] = useState(initialFormState);
  const [inputs, setInputs] = useState({
    Heating: false,
    Cooling: false,
    MusicSystem: false,
  });

  const [selectedOption, setSelectedOption] = useState("");
  console.log(selectedHall, "selectedHallselectedHall");
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, checked } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const { TextArea } = Input;
  // const sendData = async (e) => {
  //   e.preventDefault();
  //   const users = {
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     address: user.address,
  //     notes: user.notes,
  //     PhoneNumber: user.PhoneNumber,
  //     Heating: inputs.Heating,
  //     Cooling: inputs.Cooling,
  //     MusicSystem: inputs.MusicSystem,
  //     selectedOption: selectedOption,
  //     selectedHall: selectedHall,
  //     Menu:selectedMenu
  //   };
  //   try {
  //     await addDoc(collection(db, "ContactUs"), users);
  //     setUser(initialFormState);
  //   } catch {
  //     console.log("error");
  //   }
  // };
  const nextPage = () => {
    const users = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      notes: user.notes,
      PhoneNumber: user.PhoneNumber,
      Heating: inputs.Heating,
      Cooling: inputs.Cooling,
      MusicSystem: inputs.MusicSystem,
    };
    setUserInformation(users);
    setSlider(2);
  };
  return (
    <div className="md:container mx-auto">
      <div className="border p-5 rounded-md mb-2 flex justify-center items-center  flex-col w-full">
        <div className="border p-5 rounded-md mb-2 md:w-[74%]">
          <div className="md:flex md:justify-between">
              <label className="text-xl">F/Name:</label>
            <div className="mb-6 flex flex-col md:flex-row md:w-80 md:justify-between">
              <Input
                type="firstName"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="border lg:-ml-3 rounded-md outline-none"
              />
            </div>

              <label className="text-xl">L/Name:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
              <Input
                type="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between  ">
              <label className="text-xl">Email:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
              <Input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
              <label className="text-xl">Phone:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
              <Input
                type="PhoneNumber"
                name="PhoneNumber"
                value={user.PhoneNumber}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>
          </div>
          <div className="md:flex md:justify-between  ">
              <label className="text-xl">Notes:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
               <TextArea rows={4} 
                name="notes"
                value={user.notes}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>

              <label className="text-xl">Address:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
              < TextArea rows={4} 
                name="address"
                value={user.address}
                onChange={handleChange}
                className="border  rounded-md outline-none"
              />
            </div>
          </div>
        </div>
        <div className="border p-5 rounded-md mb-2 md:w-2/4">
          <p>All available services</p>
          <div className="flex flex-col">
            <Checkbox
              onChange={onChange}
              type="checkbox"
              name="Heating"
              checked={inputs.Heating}
              onChange={handleInputChange}
            >
              Heating
            </Checkbox>
            <Checkbox
              onChange={onChange}
              type="checkbox"
              name="Cooling"
              checked={inputs.Cooling}
              onChange={handleInputChange}
            >
              Cooling
            </Checkbox>
            <Checkbox
              onChange={onChange}
              type="checkbox"
              name="MusicSystem"
              checked={inputs.MusicSystem}
              onChange={handleInputChange}
            >
              Music System
            </Checkbox>
          </div>
        </div>
        <div className="border p-5 rounded-md mb-2 md:w-2/4">
          <p>Setting Arrangement</p>
          <div className="flex flex-col">
            <Radio
              type="radio"
              value="roundTable"
              checked={selectedOption === "roundTable"}
              onChange={handleOptionChange}
            >
              Round Table
            </Radio>
            <Radio
              type="radio"
              value="straitTable"
              checked={selectedOption === "straitTable"}
              onChange={handleOptionChange}
            >
              Strait Table
            </Radio>
            <Radio
              type="radio"
              value="squareTable"
              checked={selectedOption === "squareTable"}
              onChange={handleOptionChange}
            >
              Square Table
            </Radio>
          </div>
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
