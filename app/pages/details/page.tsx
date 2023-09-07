"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { useStore } from "@/store";
import { message } from 'antd';
import Success from "./success";
import Navbar from "@/app/component/Navbar";
import MarqueeAvailability from "./selectHall";
import UserInformation from "./userInformation";
import ChooseMenu from "./chooseMenu";
import Preview from "./preview";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  notes: "",
  PhoneNumber: "",
  tableShape: "",
};
const steps = [
  {
    title: "First",
  },
  {
    title: "Second",
  },
  {
    title: "Third",
  },
  {
    title: "Last",
  },
];
function Slider() {
  const { bookedDates } = useStore();
  const [slider, setSlider] = useState(0);
  const [user, setUser] = useState(initialFormState);
  const [selectedOption, setSelectedOption] = useState("");
  const [clickedIndex, setClickedIndex] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const [selectedHall, setSelectedHall] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");
  const [userInformation, setUserInformation] = useState("");
  const [hallInformation, setHallInformation] = useState([]);
  const [marqueeData, setMarqueeData] = useState([])
  const [successPage, setSuccessPage] = useState(false)

  const params = useSearchParams();
  const [inputs, setInputs] = useState({
    Heating: false,
    Cooling: false,
    MusicSystem: false,
  });

  const id = params.get("id");
  const sendData = async () => {
    const fieldId = Math.random().toString(36).slice(2)

    const users = {
      selectedHall: selectedHall,
      Menu: selectedMenu,
      UserInformation: userInformation,
      dates: bookedDates,
      id: fieldId,
      marqueeId: id,
      services: [],
    };
    console.log("usersdfsdfsdfdsff", users);
    try {
      await setDoc(doc(db, "contactUs", fieldId), users);
    } catch (error) {
      console.log(" errosssssr", error);
    }
  };

  const preview = () => {
    const users = {
      selectedHall: selectedHall,
      Menu: selectedMenu,
      UserInformation: userInformation,
    };
    setHallInformation([users]);
  }

  const fetchData = async () => {
    try {
      const venuesQuery = query(collection(db, "Venues"), where("userId", "==", id));
      const menusQuery = query(collection(db, "Dish"), where("userId", "==", id));
      const marqueeDishes = query(collection(db, "Menus"), where("userId", "==", id));
      const [venuesSnapshot, menusSnapshot, dishSnapshot] = await Promise.all([
        getDocs(venuesQuery),
        getDocs(menusQuery),
        getDocs(marqueeDishes),
      ]);

      let venueDataArr = [];
      venuesSnapshot.forEach((doc) => {
        venueDataArr.push(doc.data());
      });

      let menuDataArr = [];
      menusSnapshot.forEach((doc) => {
        const items = doc.data()
        console.log(items,"doc")
        menuDataArr.push({...items,selected:false});
      });
      let withoutVenueDish = [];
      dishSnapshot.forEach((doc) => {
        withoutVenueDish.push(doc.data());
      });
      setMarqueeData({ venues: venueDataArr, dish: menuDataArr, withoutVenueDish: withoutVenueDish });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchData().then(() => {
      if (isMounted) {
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);

  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';
  const openMessage = () => {
    messageApi.open({
      key,
      type: 'loading',
      content: 'Loading...',
    });
    setTimeout(() => {
      messageApi.open({
        key,
        type: 'success',
        content: 'Successfully Done',
        duration: 2,
      });
    }, 100);
  };

  return (
    <div>
      {
        successPage ? (<Success setSuccessPage={setSuccessPage} />) : (
          <>
            <Navbar />
            <div className="mt-28">
              <div className="flex justify-center mb-6 ">
                {steps.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      onClick={() => setSlider(index)}
                      className={`flex  justify-center items-center w-8 h-8 rounded-full md:w-11 md:h-11 ${slider >= index ? "bg-blue-500" : "bg-slate-300"
                        } text-white`}
                    >
                      {index + 1}
                    </div>
                    {index !== steps.length - 1 && (
                      <div className={`w-12 md:w-28 border-b-8 ${slider > index ? "border-blue-500" : "bg-white"}`} />
                    )}
                  </div>
                ))}
              </div>
              {slider === 0 ? (
                <MarqueeAvailability
                  venus={marqueeData.venues}
                  setSlider={setSlider}
                  setSelectedHall={setSelectedHall}
                  selectedHall={selectedHall}
                  setClickedIndex={setClickedIndex}
                  clickedIndex={clickedIndex}
                />
              ) : slider === 1 ? (
                <UserInformation
                  setSlider={setSlider}
                  selectedHall={selectedHall}
                  selectedMenu={selectedMenu}
                  setUserInformation={setUserInformation}
                  setUser={setUser}
                  user={user}
                  setSelectedOption={setSelectedOption}
                  selectedOption={selectedOption}
                  setInputs={setInputs}
                  inputs={inputs}
                />
              ) : slider === 2 ? (
                <ChooseMenu
                  // dish={marqueeData.dish}
                  marqueeData={marqueeData}
                  setMarqueeData={setMarqueeData}
                  setSlider={setSlider}
                  setSelectedMenu={setSelectedMenu}
                  preview={preview}
                  selectedMenu={selectedMenu}
                  setMenuIndex={setMenuIndex}
                  menuIndex={menuIndex}
                  withoutVenueDish={marqueeData.withoutVenueDish}
                />
              ) : slider == 3 ? (
                <Preview hallInformation={hallInformation}
                  sendData={sendData}
                  setSuccessPage={setSuccessPage}
                  openMessage={openMessage}

                />

              ) : null}
            </div>
          </>
        )
      }
      {contextHolder}

    </div>
  );
}

export default Slider;
