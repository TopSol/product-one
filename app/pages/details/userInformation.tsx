import React, { useState } from "react";
// import { collection, getDocs, addDoc } from "firebase/firestore";
// import { db } from "@/app/firebase";
import { Input, Space } from "antd";
import { Radio } from "antd";
import { Checkbox } from "antd";
import {useStore} from "@/store"
// const initialFormState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   address: "",
//   notes: "",
//   PhoneNumber: "",
//   tableShape: "",
// };
function UserInformation({
  setSlider,
  selectedHall,
  setUser,
  user,
  setSelectedOption,
  selectedOption,
  setUserInformation,
  setInputs,
  inputs,
}) {
  const {addUserInformation} = useStore();
  // const [user, setUser] = useState(initialFormState);
  // const [inputs, setInputs] = useState({
  //   Heating: false,
  //   Cooling: false,
  //   MusicSystem: false,
  // });
  // const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState(1);
  console.log(selectedHall, "selectedHallselectedHall");

  const handleInputChange = (event) => {
    const { name, checked } = event.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const handleChange = (e,type) => {
    // const { name, value } = e.target;
    // setSelectedOption(name)
    // console.log(name,"sdfsdf",value)
    if(e.target?.value && !type){
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }else{
      setSelectedOption(type)
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: type,
      }));
    }
   
  };
  const { TextArea } = Input;
  const nextPage = () => {
if(!user.firstName || !user.lastName || !user.email || !user.address || !user.notes || !user.PhoneNumber || !user.tableShape){
  alert("Please fill all the fields")
  return
}
    const phone = user.PhoneNumber;
    const convertedPhoneNumber = "92" + phone.replace(/^0/, '');
    const users = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      notes: user.notes,
      PhoneNumber: convertedPhoneNumber,
      Heating: inputs.Heating,
      Cooling: inputs.Cooling,
      MusicSystem: inputs.MusicSystem,
      tableShape: user.tableShape,
    };
    setUserInformation(users);
    setSlider(2);
  };
  console.log(user, "useruseruser");
  return (
    <div className="md:container mx-auto">
      <div className="border p-5 rounded-md mb-2 flex justify-center items-center  flex-col w-full ">
        <div className="border p-5 rounded-md mb-2 md:w-[74%] ">
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
              <TextArea
                rows={4}
                name="notes"
                value={user.notes}
                onChange={handleChange}
                className="border rounded-md outline-none"
              />
            </div>

            <label className="text-xl">Address:</label>
            <div className="mb-6 flex flex-col  md:flex-row md:w-80 md:justify-between">
              <TextArea
                rows={4}
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
              // onChange={onChange}
              type="checkbox"
              name="Heating"
              checked={inputs.Heating}
              onChange={handleInputChange}
            >
              Heating
            </Checkbox>
            <Checkbox
              // onChange={onChange}
              type="checkbox"
              name="Cooling"
              checked={inputs.Cooling}
              onChange={handleInputChange}
            >
              Cooling
            </Checkbox>
            <Checkbox
              // onChange={onChange}
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
            {/* <Radio.Group onChange={handleChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>Option A</Radio>
                <Radio value={2}>Option B</Radio>
                <Radio value={3}>Option C</Radio>
              </Space>
            </Radio.Group> */}
            <Radio
              type="radio"
              value="roundTable"
              name="tableShape"
              checked={selectedOption === "roundTable"?true:false}
              onChange={(e)=>handleChange(e,"roundTable")}
            >
              Round Table
            </Radio>
            <Radio
              type="radio"
              value="straitTable"
              name="tableShape"
              checked={selectedOption === "straitTable"?true:false}
              onChange={(e)=>handleChange(e,"straitTable")}
            >
              Strait Table
            </Radio>
            <Radio
              type="radio"
              value="squareTable"
              name="tableShape"
              checked={selectedOption === "squareTable"?true:false}
              onChange={(e)=>handleChange(e,"squareTable")}
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
