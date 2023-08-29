import React, { useState } from "react";
import dots from "../../assets/images/dots.svg";
import userIcon from "../../assets/images/user.svg";
import Image from "next/image";
import { Input, Checkbox, Radio } from "antd";
import { useStore } from "@/store";
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
  const { addUserInformation } = useStore();
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
  const handleChange = (e, type) => {
    // const { name, value } = e.target;
    // setSelectedOption(name)
    // console.log(name,"sdfsdf",value)
    if (e.target?.value && !type) {
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    } else {
      setSelectedOption(type);
      setUser((prevState) => ({
        ...prevState,
        [e.target.name]: type,
      }));
    }
  };
  const { TextArea } = Input;
  const nextPage = () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.address ||
      !user.notes ||
      !user.PhoneNumber ||
      !user.tableShape
    ) {
      alert("Please fill all the fields");
      return;
    }
    const phone = user.PhoneNumber;
    const convertedPhoneNumber = "92" + phone.replace(/^0/, "");
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

  return (
    <div className="md:container mx-auto">
      <div className="md:w-[70%] mx-4 md:mx-auto border rounded-lg">
        <div className="flex w-full bg-primaryColor py-3 rounded-t-lg mx-auto text-white font-semibold text-lg">
          <Image src={dots} alt="IMage" className="mx-6" />
          <p>Details</p>
        </div>

        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 font-bold">More Details</p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
        </div>

        <div className="mx-3 md:mx-0">
          <div className="lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[75.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  F/Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  L/Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Email
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Phone
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="PhoneNumber"
                  name="PhoneNumber"
                  value={user.PhoneNumber}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Notes
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  rows={4}
                  name="notes"
                  value={user.notes}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Address
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  rows={4}
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="border outline-none md:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:flex md:flex-row items-center justify-between my-4 md:mx-5">
          <div className="border p-5 rounded-xl mb-2 w-[95%] mx-4 md:w-96">
            <p className="font-bold mb-3">All available services</p>
            <div className="flex flex-col justify-evenly">
              <Checkbox
                type="checkbox"
                name="Heating"
                checked={inputs.Heating}
                onChange={handleInputChange}
              >
                Heating
              </Checkbox>
              <Checkbox
                type="checkbox"
                name="Cooling"
                checked={inputs.Cooling}
                onChange={handleInputChange}
                className="my-2"
              >
                Cooling
              </Checkbox>
              <Checkbox
                type="checkbox"
                name="MusicSystem"
                checked={inputs.MusicSystem}
                onChange={handleInputChange}
              >
                Music System
              </Checkbox>
            </div>
          </div>

          <div className="border p-5 rounded-xl mb-2 w-[95%] mx-4 md:w-96 ">
            <p className="font-bold mb-3">Setting Arrangement</p>
            <div className="flex flex-col">
              <Radio
                type="radio"
                value="roundTable"
                name="tableShape"
                checked={selectedOption === "roundTable" ? true : false}
                onChange={(e) => handleChange(e, "roundTable")}
              >
                Round Table
              </Radio>
              <Radio
                type="radio"
                value="straitTable"
                name="tableShape"
                checked={selectedOption === "straitTable" ? true : false}
                onChange={(e) => handleChange(e, "straitTable")}
                className="my-2"
              >
                Strait Table
              </Radio>
              <Radio
                type="radio"
                value="squareTable"
                name="tableShape"
                checked={selectedOption === "squareTable" ? true : false}
                onChange={(e) => handleChange(e, "squareTable")}
              >
                Square Table
              </Radio>
            </div>
          </div>
        </div>

        <div className="flex justify-center ">
          <button
            className="border px-9 py-3 my-3 bg-primaryColor rounded-md text-white font-bold"
            onClick={() => nextPage()}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserInformation;
