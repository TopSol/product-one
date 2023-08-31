import React, { useState } from "react";
import dots from "../../assets/images/dots.svg";
import userIcon from "../../assets/images/user.svg";
import email from "../../assets/images/email-1-svgrepo-com.svg";
import call from "../../assets/images/call.svg";
import address from "../../assets/images/address-location-map-svgrepo-com 1.svg";
import notes from "../../assets/images/notes.svg";
import Image from "next/image";
import { Input, Checkbox, Radio } from "antd";
import { useStore } from "@/store";

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
    <div className="md:container mx-auto text-textColor ">
      <div className="md:w-[70%] mx-4 md:mx-auto border rounded-lg ">
        <div className="flex w-full bg-primaryColor py-3 rounded-t-lg mx-auto text-white font-semibold text-lg">
          <Image src={dots} alt="IMage" className="mx-6" />
          <p>Details</p>
        </div>
        <div className="flex items-center justify-center mt-6 mb-8">
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
          <p className="md:mx-16 text-black font-bold">More Details</p>
          <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
        </div>
        <div className="mx-3 md:mx-0 font-semibold">
          <div className=" lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                  suffix={
                    <Image
                      src={userIcon}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  L/Nmae
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  suffix={
                    <Image
                      src={userIcon}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                  suffix={
                    <Image
                      src={email}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                  suffix={
                    <Image
                      src={call}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>

          <div className="lg:flex lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                  suffix={
                    <Image
                      src={notes}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
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
                  suffix={
                    <Image
                      src={address}
                      alt="User Icon"
                      className="inline-block h-6 w-6"
                    />
                  }
                  className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col  md:flex md:flex-row items-center justify-between my-4 md:mx-5">
          <div className="border p-5 rounded-xl mb-2 w-[95%] mx-4 md:w-96">
            <p className="font-extrabold mb-3">All available services</p>
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

          <div className="border p-5 rounded-xl  mb-2 w-[95%] mx-4 md:w-96 ">
            <p className="font-extrabold mb-3">Setting Arrangement</p>
            <div className="flex flex-col text-textColor">
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
