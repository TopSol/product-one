// "use client";
// import React, { useState } from "react";
// import dots from "../../assets/images/dots.svg";
// import Image from "next/image";
// import PhoneInput from "react-phone-number-input";
// import TextArea from "antd/es/input/TextArea";
// import { Input, Checkbox, Radio } from "antd";
// import { CheckboxValueType } from "antd/es/checkbox/Group";
// import "react-phone-number-input/style.css";

// function UserInformation({
//   setSlider,
//   selectedHall,
//   setUser,
//   user,
//   setSelectedOption,
//   selectedOption,
//   setUserInformation,
//   chooseMenu,
//   checkData,
//   preview,
//   setInputs,
//   inputs,
//   setStep,
// }) {
//   const [value, setValue] = useState()
//   const plainOptions = ["Heating", "Cooling", "MusicSystem"];
//   const handleInputChange = (checkedValues: CheckboxValueType[]) => {
//     setUser({ ...user, services: checkedValues });
//   };

//   const handleChange = (e, type) => {
//     if (e.target?.value && !type) {
//       setUser((prevState) => ({
//         ...prevState,
//         [e.target.name]: e.target.value,
//       }));
//     } else {
//       setSelectedOption(type);
//       setUser((prevState) => ({
//         ...prevState,
//         [e.target.name]: type,
//       }));
//     }
//   };

//   const nextPage = () => {
//     if (
//       !user.firstName ||
//       !user.lastName ||
//       !user.email ||
//       !user.address ||
//       !user.notes ||
//       !value ||
//       !user.tableShape ||
//       !user.services
//     ) {
//       alert("Please fill all the fields");
//       return;
//     }
//     const phone = value;
//     const convertedPhoneNumber = "92" + phone.replace(/^0/, "");
//     const users = {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       email: user.email,
//       address: user.address,
//       notes: user.notes,
//       // PhoneNumber: convertedPhoneNumber,
//       services: user.services,
//       tableShape: user.tableShape,
//     };
//     setUserInformation(users);
//     setSlider(1)
//   };

//   return (
//     <div className="md:container mx-auto text-textColor ">
//       <div className="md:w-[70%] mx-4 md:mx-auto border rounded-lg ">
//         <div className="flex w-full bg-primaryColor py-3 rounded-t-lg mx-auto text-white font-semibold text-lg">
//           <Image src={dots} alt="IMage" className="mx-6" />
//           <p>Details</p>
//         </div>
//         <div className="flex items-center justify-center mt-6 mb-8">
//           <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
//           <p className="md:mx-16 text-black font-bold">More Details</p>
//           <hr className="hidden md:block px-8 py-[1px] rounded-lg bg-matteBlack" />
//         </div>
//         <div className="mx-3 md:mx-0 font-semibold">
//           <div className=" lg:flex lg:justify-between md:mx-10">
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center font-Manrope">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1 font-Manrope">
//                   F/Name
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   type="firstName"
//                   name="firstName"
//                   value={user.firstName}
//                   onChange={handleChange}

//                   className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1 font-Manrope">
//                   L/Name
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   type="lastName"
//                   name="lastName"
//                   value={user.lastName}
//                   onChange={handleChange}

//                   className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="lg:flex lg:justify-between md:mx-10">
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
//                   Email
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   type="email"
//                   name="email"
//                   value={user.email}
//                   onChange={handleChange}

//                   className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
//                   Phone
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <PhoneInput
//                   type="PhoneNumber"
//                   name="PhoneNumber"
//                   international
//                   countryCallingCodeEditable={false}
//                   defaultCountry="PK"
//                   value={value}
//                   onChange={setValue}
//                   className="border rounded outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-6 mb-3 flex justify-center text-xs relative px-2"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="lg:flex lg:justify-between md:mx-10">
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute  top-[calc(50%_-_88.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
//                   Notes
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <TextArea
//                   rows={4}
//                   name="notes"
//                   value={user.notes}
//                   onChange={handleChange}
//                   className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute  top-[calc(50%_-_88.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
//                   Address
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <TextArea
//                   rows={4}
//                   name="address"
//                   value={user.address}
//                   onChange={handleChange}
//                   className="border outline-none md:w-96 lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col  md:flex md:flex-row items-center justify-between my-4 md:mx-5">
//           <div className="border p-5 rounded-xl mb-2 w-[95%] mx-4 md:w-96">
//             <p className="font-semibold mb-3">All available services</p>
//             <div className="flex flex-col justify-evenly">
//               <Checkbox.Group
//                 options={plainOptions}
//                 value={user.services as CheckboxValueType[]}
//                 onChange={handleInputChange}
//                 className=" outline-none md:w-[700px] w-full flex-col  z-10   py-5  flex  text-xs "
//               />
//             </div>
//           </div>

//           <div className="border p-5 rounded-xl  mb-2 w-[95%] mx-4 md:w-96 ">
//             <p className="font-semibold mb-3">Setting Arrangement</p>
//             <div className="flex flex-col text-textColor">
//               <Radio
//                 type="radio"
//                 value="roundTable"
//                 name="tableShape"
//                 checked={selectedOption === "roundTable" ? true : false}
//                 onChange={(e) => handleChange(e, "roundTable")}
//               >
//                 Round Table
//               </Radio>
//               <Radio
//                 type="radio"
//                 value="straitTable"
//                 name="tableShape"
//                 checked={selectedOption === "straitTable" ? true : false}
//                 onChange={(e) => handleChange(e, "straitTable")}
//                 className="my-2"
//               >
//                 Strait Table
//               </Radio>
//               <Radio
//                 type="radio"
//                 value="squareTable"
//                 name="tableShape"
//                 checked={selectedOption === "squareTable" ? true : false}
//                 onChange={(e) => handleChange(e, "squareTable")}
//               >
//                 Square Table
//               </Radio>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center ">
//           <button
//             className="border px-9 py-3 my-3 bg-primaryColor rounded-md text-white font-bold"
//             onClick={() => nextPage()}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UserInformation;
"use client";
import React, { useState } from "react";
import dots from "../../assets/images/dots.svg";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import TextArea from "antd/es/input/TextArea";
import { Input, Checkbox, Radio, Select } from "antd";
import { CheckboxValueType } from "antd/es/checkbox/Group";
import "react-phone-number-input/style.css";
import { log } from "util";
import { userInfo } from "os";

function UserInformation({
  setSlider,
  selectedHall,
  setUser,
  user,
  setSelectedOption,
  selectedOption,
  setUserInformation,
  chooseMenu,
  checkData,
  preview,
  setInputs,
  inputs,
  setStep,
}) {
  const [value, setValue] = useState();
  const plainOptions = ["Heating", "Cooling", "MusicSystem"];
  const handleInputChange = (checkedValues: CheckboxValueType[]) => {
    setUser({ ...user, services: checkedValues });
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
console.log(value,"valuevalue")
  const nextPage = () => {
    if (
      !user.firstName ||
      !user.lastName ||
      !user.email ||
      !user.address ||
      !user.notes ||
      !value ||
      !user.tableShape ||
      !user.services||
      !user.eventType
    ) {
      alert("Please fill all the fields");
      return;
    }
    const phone = value;
    const convertedPhoneNumber = "92" + phone.replace(/^0/, "");
    console.log(convertedPhoneNumber,"convertedPhoneNumber")
    const users = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      address: user.address,
      notes: user.notes,
      PhoneNumber: convertedPhoneNumber,
      services: user.services,
      tableShape: user.tableShape,
      eventType:user.eventType
    };
    console.log("userInformation", users);
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
        <div className="mx-5 md:mx-0 font-semibold">
          <div className=" lg:flex lg:flex-row lg:justify-between md:mx-10">
            <div className="flex flex-col items-center justify-center relative md:mt-3 mt-4 ">
              <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[100.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center font-Manrope">
                <p className="absolute text-lg leading-[100%] z-20 pt-1 font-Manrope">
                  First Name
                </p>
              </div>
              <div className="mb-6 w-[100%]">
                <Input
                  type="firstName"
                  name="firstName"
                  value={user.firstName}
                  onChange={handleChange}
                  className="border outline-none lg:w-72 xl:w-96 z-10 w-full py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>

            <div className="flex flex-col items-start relative md:mt-3 mt-4 ">
              <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[100.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1 font-Manrope">
                  Last Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  type="lastName"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleChange}
                  className="border outline-none  lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>

          <div className=" lg:flex lg:flex-row lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4 ">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
                  Email
                </p>
              </div>
              <div className="mb-6 w-[100%]">
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border outline-none  lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4 ">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
                  Phone
                </p>
              </div>
              <div className="mb-6 w-[100%]">
                <PhoneInput
                  type="PhoneNumber"
                  name="PhoneNumber"
                  international
                  countryCallingCodeEditable={false}
                  defaultCountry="PK"
                  value={user.PhoneNumber}
                  onChange={setValue}
                  className="border rounded outline-none  lg:w-72 xl:w-96 z-10 w-full  py-6 mb-3 flex justify-center text-xs relative px-2"
                />
              </div>
            </div>
          </div>
          <div className=" lg:flex lg:flex-row lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4 ">
              <div className="absolute  top-[calc(50%_-_88.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
                  Notes
                </p>
              </div>
              <div className="mb-6 w-[100%]">
                <TextArea
                  rows={4}
                  name="notes"
                  value={user.notes}
                  autoSize={false}
                  onChange={handleChange}
                  className=" textarea1 border outline-none  lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4 ">
              <div className="absolute  top-[calc(50%_-_88.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
                  Address
                </p>
              </div>
              <div className="mb-6 w-[100%]">
                <TextArea
                  rows={4}
                  name="address"
                  value={user.address}
                  onChange={handleChange}
                  className="  textarea1 border outline-none  lg:w-72 xl:w-96 z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                /> 
              </div>
            </div>
          </div>
          <div className=" lg:flex lg:flex-row lg:justify-between md:mx-10">
            <div className="flex flex-col items-start relative md:mt-3 mt-4 w-full">
              <div className="absolute  top-[calc(50%_-_63.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[166.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] font-Manrope z-20 pt-1">
                  Select Event Type
                </p>
              </div>
              <div className="mb-6 w-[100%]">
              <Input
                  type="eventType"
                  name="eventType"
                  value={user.eventType}
                  onChange={handleChange}
                  className="border outline-none z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              {/* <Select
                showSearch
                size={"large"}
                placeholder="Select Event"
                className="border rounded outline-none  z-10 w-full  py-6 mb-3 flex justify-center text-xs relative px-2"
                optionFilterProp="children"
                onChange={(e)=>{  setUser({...user,eventType:e}) }}
                value={user.eventType}
                // onSearch={onSearch}
                // filterOption={filterOption}
                options={[
                  {
                    value: 'Mehndi',
                    label: 'Mehndi',
                  },
                  {
                    value: 'Barat',
                    label: 'Barat',
                  },
                  {
                    value: 'Walima',
                    label: 'Walima',
                  },
                  {
                    value: 'Birthday',
                    label: 'Birthday',
                  },
                ]}
              /> */}
              </div>
            </div>
          </div>
        </div>

        <div className=" lg:flex lg:flex-row lg:justify-between mx-5 md:mx-10">
          <div className="rounded-lg border outline-none  lg:w-72 xl:w-96 p-4 mb-3 w-[100%] text-xs ">
            <p className="mb-2">All available services</p>
            <div className="">
              <Checkbox.Group
                options={plainOptions}
                value={user.services as CheckboxValueType[]}
                onChange={handleInputChange}
                className="flex flex-col space-y-2"
              />
            </div>
          </div>

          <div className="rounded-lg border outline-none  lg:w-72 xl:w-96  w-[100%]  p-4 mb-3  text-xs ">
            <p className="mb-2">Setting Arrangement</p>
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
        <div className="flex justify-between px-10 ">
          <button
            className="border px-9 py-3 my-3 bg-primaryColor rounded-md text-white font-bold"
            onClick={() => setSlider(0)}
          >
            Previous
          </button>
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
