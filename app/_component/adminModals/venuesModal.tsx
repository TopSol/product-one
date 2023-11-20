// import { Button, Checkbox, Form, Input, Modal } from "antd";
// import React, { useState } from "react";
// import Loader from "../Loader";
// import { CheckboxValueType } from "antd/es/checkbox/Group";
// import Image from "next/image";
// import dots from "../../assets/images/dots.svg";
// function VenuesModal({
//   modalOpen,
//   setModalOpen,
//   HandleaddVenue,
//   handleSubmit,
//   updateVenue,
//   openEditVenue,
//   handleCheckboxChange,
//   plainOptions,
//   loading,
//   handleChange,
//   user,
//   setUser,
// }) {
//   const [form] = Form.useForm();
//   return (
//     <div>
//       <Modal
//         className=" modal text-center w-full md:height[620px]"
//         centered
//         open={modalOpen}
//         width={600}
//         style={{ height: 670, padding: 0 }}
//         onCancel={() => setModalOpen(false)}
//         okButtonProps={{ className: "custom-ok-button" }}
//         closeIcon={
//           <div className=" right-2 ">
//             <svg
//               onClick={() => setModalOpen(false)}
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-6 w-6 text-white cursor-pointer md:-mt-[10px]"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               width={20}
//               height={20}
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>{" "}
//           </div>
//         }
//         footer={[
//           <div className=" pb-5 mr-3" key={"index"}>
//             <Button
//               key="cancel"
//               onClick={() => setModalOpen(false)}
//               className=" border-primary text-primary "
//             >
//               Cancel
//             </Button>
//             <Button
//               key="ok"
//               type="primary"
//               onClick={() =>
//                 openEditVenue ? updateVenue(user.venueId) : HandleaddVenue()
//               }
//               className="AddVenue bg-primary text-white"
//             >
//               {loading ? <Loader /> : "Add"}
//             </Button>
//           </div>,
//         ]}
//       >
//         <div className=" w-full h-full flex justify-center items-center flex-col">
//           <div className="mr-auto bg-primary w-full flex rounded-t-lg">
//             <Image
//               alt="sdf"
//               src={dots}
//               width={40}
//               height={40}
//               className="ml-3"
//             />
//             <p className="text-xl pl-3 text-white py-4"> Add Venues</p>
//           </div>
//           <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[80%]  justify-center ">
//             <div className="flex flex-col items-start relative md:mt-3 mt-4">
//               <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1 ">
//                   Name
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   placeholder="Name"
//                   type="text"
//                   name="name"
//                   value={user.name}
//                   onChange={handleChange}
//                   className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <Form form={form} onFinish={handleSubmit}>
//               <div className="flex flex-col items-start relative">
//                 <div className="absolute top-[calc(50%_-_75.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[69.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                   <p className="absolute text-lg leading-[100%] z-20 pt-1">
//                     Images
//                   </p>
//                 </div>
//                 <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                   <Form.Item name="image">
//                     <Input
//                       placeholder="Basic usage"
//                       type="file"
//                       name="image"
//                       multiple
//                       onChange={(e) => {
//                         setUser({ ...user, image: e.target.files });
//                       }}
//                       className="border outline-none md:w-[440px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                     />
//                   </Form.Item>
//                 </div>
//               </div>
//             </Form>

//             <div className="flex flex-col items-start relative">
//               <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[165.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1">
//                   Minimum Capacity
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   placeholder="Minimum Capacity"
//                   type="number"
//                   name="minCapacity"
//                   value={user.minCapacity}
//                   onChange={handleChange}
//                   className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative">
//               <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[165.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1">
//                   Maximum Capacity
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   placeholder="Maximum Capacity"
//                   type="number"
//                   name="maxCapacity"
//                   value={user.maxCapacity}
//                   onChange={handleChange}
//                   className="border outline-none md:w-[700px] z-10 w-full py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative">
//               <div className="absolute top-[calc(50%_-_59.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
//                 <p className="absolute text-lg leading-[100%] z-20 pt-1">
//                   price
//                 </p>
//               </div>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   placeholder="Number"
//                   type="number"
//                   name="price"
//                   value={user.price}
//                   onChange={handleChange}
//                   className="border outline-none md:w-[700px] w-full z-10  py-5 mb-3 flex justify-center text-xs relative"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col items-start relative">
//               <label className=" text-lg ">services</label>

//               <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Checkbox.Group
//                   options={plainOptions}
//                   value={user.services as CheckboxValueType[]}
//                   onChange={handleCheckboxChange}
//                   className=" outline-none md:w-[700px] w-full  z-10   py-5  flex  text-xs "
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default VenuesModal;
