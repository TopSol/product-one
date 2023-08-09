"use client";
import React, { Component, use, useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import MarqueeAvailability from "./selectHall";
import UserInformation from "./userInformation";
import ChooseMenu from "./chooseMenu";
import Preview from "./preview";
import { useSearchParams} from "next/navigation";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs, doc,setDoc } from "firebase/firestore";
import { useStore } from "@/store";
import Success from "./success";
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
  const [marqueeData, setMarqueeData] = useState("")
  const [successPage,setSuccessPage]=useState(false)
  const params = useSearchParams();
    const [inputs, setInputs] = useState({
    Heating: false,
    Cooling: false,
    MusicSystem: false,
  });
  const id = params.get("id");
  const sendData = async () => {
    const fieldId=Math.random().toString(36).slice(2)  
    const users = {
      selectedHall: selectedHall,
      Menu: selectedMenu,
      UserInformation: userInformation,
      dates:bookedDates,
      id:fieldId,
      marqueeId:id
    }; 
    try {
      await setDoc(doc(db, "contactUs", fieldId), users);
    } catch(error) {
      console.log(" errosssssr",error);
    }
  };
   const preview =()=>{
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

      const [venuesSnapshot, menusSnapshot] = await Promise.all([
        getDocs(venuesQuery),
        getDocs(menusQuery),
      ]);

      let venueDataArr = [];
      venuesSnapshot.forEach((doc) => {
        venueDataArr.push(doc.data());
      });

      let menuDataArr = [];
      menusSnapshot.forEach((doc) => {
        menuDataArr.push(doc.data());
      });

      setMarqueeData({ venues: venueDataArr, dish: menuDataArr });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    fetchData().then(() => {
      if (isMounted) {
        // Update the state
        // setMarqueeData(data);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [id]);
    return (
    <div>
      {
         successPage ? (<Success setSuccessPage={setSuccessPage}/>):(
          <>
          <Navbar />
      <div className="mt-28">
        <div className="flex justify-center mb-6 ">
        {/* <div className="flex justify-center mb-6 mx-auto fixed z-10  w-full  "> */}
          {steps.map((item, index) => (
            <div key={index} className="flex items-center">
              <div
                onClick={() => setSlider(index)}
                className={`flex  justify-center items-center w-8 h-8 rounded-full md:w-11 md:h-11 ${
                  slider >= index ? "bg-blue-500" : "bg-slate-300"
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
            venus= {marqueeData.venues}
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
            dish ={marqueeData.dish}
            setSlider={setSlider}
            setSelectedMenu={setSelectedMenu}
            preview={preview}
            selectedMenu={selectedMenu}
            setMenuIndex={setMenuIndex}
            menuIndex={menuIndex}
          />
        ) : slider == 3 ? (
          <Preview hallInformation={hallInformation} 
            sendData={sendData}
            setSuccessPage={setSuccessPage}
            />
            
        ) : null}
      </div>
          </>
         )
      }
      
    </div>
  );
}

export default Slider;
