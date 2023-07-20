// import React from 'react'

// function dishModal() {
//   return (
//     <div>
//         <Modal
//         className="text-center"
//         centered
//         open={modalOpen}
//         // onOk={() => HandleAddVenues()}
//         onOk={() =>
//           openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()
//         }
//         onCancel={() => setModalOpen(false)}
//         width={700}
//         bodyStyle={{ height: 800 }}
//         okButtonProps={{ className: "custom-ok-button" }}
//       >
//         <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
//           <div className="mr-auto">
//             <p className="text-2xl">Dish</p>
//           </div>
//           <hr className="w-full bg-black my-3" />
//           <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[100%]  justify-center ">
//             <div className="md:justify-between flex flex-col">
//               <label className="text-xl my-1">
//                 {" "}
//                 <span className="text-red-600">*</span> Name
//               </label>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
//                 <Input
//                   placeholder="Name"
//                   type="text"
//                   name="name"
//                   value={user.name}
//                   onChange={handleChange}
//                   className="rounded-none flex w-full py-2 lg:py-3"
//                 />
//               </div>
//               <label className="text-xl my-1">
//                 {" "}
//                 <span className="text-red-600">*</span> Images
//               </label>
//               <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
//                 <Input
//                   placeholder="Basic usage"
//                   type="file"
//                   name="image"
//                   multiple
//                   onChange={(e) => {
//                     setUser({ ...user, image: e.target.files });
//                   }}
//                   className="rounded-none w-full py-2 lg:py-3"
//                 />
//               </div>
//             </div>
//             <div className="md:flex md:justify-between flex flex-col ">
//               <label className="text-xl my-1">Price</label>
//               <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
//                 <Input
//                   placeholder="Minimum Capacity"
//                   type="number"
//                   name="price"
//                   value={user.price}
//                   onChange={handleChange}
//                   className="rounded-none w-full py-2 lg:py-3"
//                 />
//               </div>
//               <label className="text-xl my-1">Type</label>
//               <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
//                 <Input
//                   placeholder="Enter Type Here"
//                   type="text"
//                   name="type"
//                   value={user.type}
//                   onChange={handleChange}
//                   className="rounded-none w-full py-2 lg:py-3"
//                 />
//               </div>
//             </div>
//             {/* <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
//               <label className="text-xl my-1">Avalibility</label>
//               <div className="flex flex-col  md:flex-row  md:justify-between">
//                 <Input
//                   placeholder="Enter Avalibility Here"
//                   type="text"
//                   name="availability"
//                   value={user.availability}
//                   onChange={handleChange}
//                   className="rounded-none w-full py-2 lg:py-3"
//                 />
//               </div>
//             </div> */}
//             <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
//               <label className="text-xl my-1">Description</label>
//               <div className="flex flex-col  md:flex-row  md:justify-between">
//                 <TextArea
//                   rows={4}
//                   maxLength={6}
//                   placeholder="Enter Description Here"
//                   name="description"
//                   typeof="text"
//                   value={user.description}
//                   onChange={handleChange}
//                   className="rounded-none w-full py-2 lg:py-3"
//                 />
//               </div>
//             </div>

//             {/* <div className="flex flex-wrap">
//               {user.image &&
//                 Object.values(user.image).map((img, index) => {
//                   return (
//                     <img
//                       src={URL.createObjectURL(img)}
//                       alt=""
//                       key={index}
//                       className="w-[25%]"
//                     />
//                   );
//                 })}
//             </div> */}
//           </div>
//         </div>
//       </Modal>
//     </div>
//   )
// }

// export default dishModal