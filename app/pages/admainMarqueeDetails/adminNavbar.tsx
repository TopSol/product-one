"use client";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faGear } from "@fortawesome/free-solid-svg-icons";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "antd";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { faHotel } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { faBellConcierge, faUtensils } from "@fortawesome/free-solid-svg-icons";
import Venues from "./venues";
import Menus from "./menus";
import Dish from "./dish";
import { useStore } from "../../../store";
export default function AdminNavbar({setModalOpen2}) {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [component, setComponent] = React.useState("Venues");

  const { userInformation,registration} = useStore();
  console.log(registration,"registration")
  const handleLogout = () => {
    router.push("/pages/auth");
  };
  const items = [
    {
      label: <p>{registration.name}</p>,
      key: "0",
      icon: <FontAwesomeIcon icon={faHotel} 
      className="text-primaryColor"
      />,
    },
    {
      label: <p>{registration.email}</p>,
      key: "1",
      icon: <FontAwesomeIcon icon={faEnvelope} 
      className="text-blue-500"
      />,
    },
    {
      label: <p>Setting</p>,
      key: "2",
      icon: <FontAwesomeIcon icon={faGear} 
      className="text-gray-500"
      />,
    },

    {
      label: <p onClick={handleLogout}>Logout</p>,
      key: "3",
      icon: <FontAwesomeIcon icon={faRightFromBracket} 
      className="text-red-500"
      />,
    },
  ];
  const sideBar = [
    {
      name: "Venues",
      icon: faBellConcierge,
    },
    {
      name: "Dish",
      icon: faUtensils,
    },
    {
      name: "Menu",
      icon: faUtensils,
    },
  ];
  return (
    <div className="bg-white fixed top-0 left-0 right-0 z-50">
      <div className=" mx-auto flex justify-between items-center py-2 px-4 md:px-7 shadow">
        <div className="block md:hidden">
          <p>
            <FontAwesomeIcon
              icon={faBarsStaggered}
              size="sm"
              className="h-7 text-[#DEB666] absolute cursor-pointer"
              onClick={() => setModalOpen2((prev => !prev))}
            />
          </p>
        </div>
        {/* {isModelOpen ? (
          <div className="md:hidden fixed top-[56px] left-0 w-full  z-40 h-full">
            <div className="w-[65%] md:w-[15%] border flex flex-col h-full bg-white">
              <p className=" text-xl pl-2 py-5">Marquee</p>
              {sideBar.map((item, index) => (
                <div key={index}>
                  <button
                    className={`side w-full text-left py-2 ${
                      component === item.name ? "bg-sidebarColor" : ""
                    }`}
                    onClick={() => {
                      console.log(item.name, "item.name");
                      setComponent(item.name);
                      setShow(!show);
                      if (window.innerWidth <= 768) {
                        setIsModelOpen(!isModelOpen);
                      }
                    }}
                  >
                    {component === item.name ? (
                      <span className="bg-sidebarItemColor px-[2px] pt-[11px] pb-[9px]" />
                    ) : null}
                    <span
                      className={`pl-${
                        component === item.name ? "8" : ""
                      } pl-[29px] text-${
                        component !== item.name ? "sidebarColorText" : ""
                      }`}
                    >
                      <FontAwesomeIcon icon={item.icon} className="pr-3" />
                      {item.name}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null} */}

        <div className="block md:flex md:items-center ">
          <div className="mr-0 md:mr-16">
            <p className="text-black font-extrabold">BOOKING NOW.</p>
          </div>
          <div className="hidden md:block">
            <p>
              <FontAwesomeIcon
                icon={faBarsStaggered}
                size="sm"
                className="h-7 text-[#DEB666] cursor-pointer"
              />
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
            trigger={["click"]}
            overlayStyle={{ width: "250px" }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                alt=""
              />
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

// import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBarsStaggered, faBellConcierge, faUtensils } from "@fortawesome/free-solid-svg-icons";

// export default function AdminNavbar() {
//   const [showSidebar, setShowSidebar] = useState(false);
//   const [component, setComponent] = React.useState("Venues");

//   const sideBar = [
//     {
//       name: "Venues",
//       icon: faBellConcierge,
//     },
//     {
//       name: "Dish",
//       icon: faUtensils,
//     },
//     {
//       name: "Menu",
//       icon: faUtensils,
//     },
//   ];

//   const handleToggleSidebar = () => {
//     setShowSidebar(!showSidebar);
//   };

//   return (
//     <div className="bg-white fixed top-0 left-0 right-0 z-50">
//       <div className="mx-auto flex justify-between items-center py-2 px-4 md:px-7 shadow-lg">
//         <div className="block md:hidden">
//           <p>
//             <FontAwesomeIcon
//               icon={faBarsStaggered}
//               size="sm"
//               className="h-7 text-[#DEB666] cursor-pointer"
//               onClick={handleToggleSidebar}
//             />
//           </p>
//         </div>
//         <div className="block md:flex md:items-center">
//           <div className="mr-0 md:mr-16">
//             <p className="text-black font-extrabold">BOOKING NOW.</p>
//           </div>
//           <div className="hidden md:block">
//             <p>
//               <FontAwesomeIcon
//                 icon={faBarsStaggered}
//                 size="sm"
//                 className="h-7 text-[#DEB666] cursor-pointer"
//                 onClick={handleToggleSidebar}
//               />
//             </p>
//           </div>
//         </div>
//       </div>
//       {showSidebar && (
//         <div className="md:hidden fixed top-[40px] left-0 w-full  z-40 h-full">
//           <div className="w-[65%] md:w-[15%] border flex flex-col h-full bg-white">
//             <p className=" text-xl pl-2 py-5">Marquee</p>
//             {sideBar.map((item, index) => (
//               <div key={index}>
//                 <button
//                   className={`side w-full text-left py-2 ${
//                     component === item.name ? "bg-sidebarColor" : ""
//                   }`}
//                   onClick={() => {
//                     setComponent(item.name);
//                     setShowSidebar(!showSidebar);
//                   }}
//                 >
//                   {component === item.name && (
//                     <span className="bg-sidebarItemColor px-[2px] pt-[11px] pb-[9px]" />
//                   )}
//                   <span
//                     className={`pl-${
//                       component === item.name ? "8" : ""
//                     } pl-[29px] text-${
//                       component !== item.name ? "sidebarColorText" : ""
//                     }`}
//                   >
//                     <FontAwesomeIcon icon={item.icon} className="pr-3" />
//                     {item.name}
//                   </span>
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


{/* <div>
{component === "Venues" ? (
  <Venues
    modalOpen={isModelOpen}
    setModalOpen={setIsModelOpen}
    handleClick={handleClick}
  />
) : component === "Dish" ? (
  <Menus
    modalOpen={isModelOpen}
    setModalOpen={setIsModelOpen}
    handleClick={handleClick}
  />
) : component === "Menu" ? (
  <Dish modalOpen={isModelOpen} setModalOpen={setIsModelOpen} />
) : null}
</div> */}