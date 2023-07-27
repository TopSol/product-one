import { Image } from "antd";
import React from "react";

const data = [
  {
    Menu: {
      dishes: ["Chicken", "Mutton", "Fish", "Egg"],
      name: "Menu 1",
      price: 1000,
    },
    userInformation: {
      firstName: "Rahul",
      lastName: "Kumar",
      email: "asdfasfdaf@gamil.com",
      phone: 1234567890,
      address: "Faisalabad Kenal Road",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    date: {
      date: [
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
      ],
    },
    selectHall: {
      image:
        "https://demo.himaratheme.com/wp-content/uploads/2022/04/pexels-max-vakhtbovych-6198654-scaled.jpg",
      hall: "Hall 1",
      capacity: 100,
      price: 1000,
      select: "Brat/wedding",
    },
  },
  {
    Menu: {
      dishes: ["Chicken", "Mutton", "Fish", "Egg"],
      name: "Menu 1",
      price: 1000,
    },
    userInformation: {
      firstName: "Rahul",
      lastName: "Kumar",
      email: "asdfasfdaf@gamil.com",
      phone: 1234567890,
      address: "Faisalabad Kenal Road",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
    },
    date: {
      date: [
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
        "2021-09-01",
      ],
    },
    selectHall: {
      image:
        "https://demo.himaratheme.com/wp-content/uploads/2022/04/pexels-pixabay-271639-scaled.jpg",
      hall: "Hall 1",
      capacity: 100,
      price: 1000,
      select: "Brat/wedding",
    },
  },
];
function BookedDate() {
  return (
    <div className="md:container mx-auto">
      <div className="flex">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className=" justify-center items-center md:m-2 border border-gray-300 md:w-[30%] rounded-md shadow-md my-2"
            >
              <div className="w-full">
                <div className="flex flex-col">
                  <img
                    className=" h-60 w-full object-cover"
                    src={item.selectHall.image}
                    alt=""
                  />
                  <div className="w-full ">
                    <div className="flex flex-col ">
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Name</p>
                        <p className="w-[40%]">
                          {item.userInformation.firstName +
                            " " +
                            item.userInformation.lastName}
                        </p>
                      </div>
                      <div className="flex justify-between border-b  py-2 shadow">
                        <p className=" text-lg pl-1">Phone Number</p>
                        <p className="w-[40%] ">{item.userInformation.phone}</p>
                      </div>
                      <div className="flex justify-between border-b  py-2 shadow">
                        <p className="text-lg pl-1">Email</p>
                        <p className="w-[40%] break-words">
                          {item.userInformation.email}
                        </p>
                      </div>
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Address</p>
                        <p className="w-[40%]">
                          {item.userInformation.address}
                        </p>
                      </div>

                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Hall Name</p>
                        <p className="w-[40%]">{item.selectHall.hall}</p>
                      </div>
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Hall Type</p>
                        <p className="w-[40%]">{item.selectHall.select}</p>
                      </div>
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Capacity</p>
                        <p className="w-[40%]">{item.selectHall.capacity}</p>
                      </div>
                      <div className="flex justify-between border-b py-2 shadow">
                        <p className="text-lg pl-1">Price</p>
                        <p className="w-[40%]"> {item.selectHall.price}</p>
                      </div>
                      <div className="flex justify-end border-b py-2 shadow">
                          <button className="px-3 py-3 bg-green-500 rounded-md mr-2">Accept</button>
                          <button className="px-3 py-3 bg-red-500 rounded-md mr-2">Reject</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// function BookedDate() {
//   return (
//     <div className="md:container mx-auto">
//   {

//     data.map((item,index)=>{
//       return(
//         <div key={index} className="flex flex-col md:flex-row border border-gray-300 rounded-md shadow-md my-2">
//         <div className="w-full md:w-1/2">
//           <div className="flex flex-col justify-center items-center">
//             <div className="flex flex-col justify-center items-center">
//               <img
//                 className="w-40 h-40 rounded-full object-cover"
//                 src={item.selectHall.image}
//                 alt=""
//               />
//               <h1 className="text-2xl font-bold">{item.selectHall.hall}</h1>
//               <h1 className="text-lg font-bold">{item.selectHall.select}</h1>
//               <h1 className="text-lg font-bold">{item.selectHall.capacity}</h1>
//               <h1 className="text-lg font-bold">{item.selectHall.price}</h1>
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-1/2">
//           <div className="flex flex-col justify-center items-center">
//             <div className="flex flex-col justify-center items-center">
//               <h1 className="text-2xl font-bold">Menu</h1>
//               <ul className="list-disc">
//                 {item.Menu.dishes.map((item,index)=>{
//                   return(
//                     <li key={index}>{item}</li>
//                   )
//                 })}
//               </ul>
//               <h1 className="text-2xl font-bold">Price</h1>
//               <h1 className="text-2xl font-bold">{item.Menu.price}</h1>
//             </div>
//           </div>
//         </div>
//       </div>
//       )
//     }
//     )
//   }
//     </div>
//   )
// }

export default BookedDate;
