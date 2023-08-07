"use client";
import React, { Component, useEffect, useState } from "react";
import Navbar from "@/app/component/Navbar";
import MarqueeAvailability from "./selectHall";
import UserInformation from "./userInformation";
import ChooseMenu from "./chooseMenu";
import Preview from "./preview";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/app/firebase";
import { collection, query, where, getDocs, addDoc,setDoc } from "firebase/firestore";
import {
  getDoc,
 
  doc,
  deleteDoc,
} from "firebase/firestore";

import { useStore } from "@/store";
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
  const { Venues } = useStore();
  const [slider, setSlider] = useState(0);
  const [selectedHall, setSelectedHall] = useState({});
  const [selectedMenu, setSelectedMenu] = useState("");
  const [userInformation, setUserInformation] = useState("");
  const [hallInformation, setHallInformation] = useState([]);
  const [marqueeData, setMarqueeData] = useState("")
  const params = useSearchParams();
  const id = params.get("id");
  console.log(id, "abcIDIDID");

  const sendData = async () => {
    const id=Math.random().toString(36).slice(2)
    const users = {
      selectedHall: selectedHall,
      Menu: selectedMenu,
      UserInformation: userInformation,
      id:id
    };
    setHallInformation([users]);
    try {
      // await addDoc(collection(db, "ContactUs"), users);
      await setDoc(doc(db, "ContactUs", id), users);
    } catch {
      console.log(" error");
    }
  };

  console.log(hallInformation,"hallInformationhallInformation")
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
      // Check if the component is still mounted before updating the state
      if (isMounted) {
        // Update the state
        // setMarqueeData(data);
      }
    });

    // Cleanup function to cancel any pending fetches if the component unmounts
    return () => {
      isMounted = false;
    };
  }, [id]);
  console.log(marqueeData,"marqueemarqueeDatesDates")
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const q = query(collection(db, "Venues"), where("userId", "==", id));
  //       const querySnapshot = await getDocs(q);
  //       let dataArr = []
  //       querySnapshot.forEach((doc) => {
  //         dataArr.push(doc.data())
  //         console.log(dataArr, "marqueggggeData");
  //       });
  //       setMarqueeData(dataArr)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //     try {
  //       const q = query(collection(db, "Menus"), where("userId", "==", id));
  //       const querySnapshot = await getDocs(q);
  //       let dataArr1 = []
  //       querySnapshot.forEach((doc) => {
  //         dataArr1.push(doc.data())
  //         console.log(dataArr1, "marqueggggeDagfdfdta");
  //       });
  //       // setMarqueeData(dataArr)
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
    
  //   fetchData();
  // }, [id]);

  // useEffect(() => {
  //   const fetchData = async () => {
      // try {
      //   const q = query(collection(db, "Menus"), where("userId", "==", id));
      //   const querySnapshot = await getDocs(q);
      //   let dataArr = []
      //   querySnapshot.forEach((doc) => {
      //     dataArr.push(doc.data())
      //     console.log(dataArr, "marqueggggeData");
      //   });
      //   setMarqueeData(dataArr)
      // } catch (error) {
      //   console.error("Error fetching data:", error);
      // }
  //   };
    
  //   fetchData();
  // }, [id]);
  
  console.log(marqueeData, "dataArrrrrrr");

  return (
    <div>
      <Navbar />
      <div className="mt-28">
        <div className="flex justify-center mb-6">
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
                <div className="w-12 md:w-28 border-b-8 border-slate-300"></div>
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
          />
        ) : slider === 1 ? (
          <UserInformation
            setSlider={setSlider}
            selectedHall={selectedHall}
            selectedMenu={selectedMenu}
            setUserInformation={setUserInformation}
          />
        ) : slider === 2 ? (
          <ChooseMenu
          dish ={marqueeData.dish}
            setSlider={setSlider}
            setSelectedMenu={setSelectedMenu}
            sendData={sendData}
            selectedMenu={selectedMenu}
          />
        ) : slider == 3 ? (
          <Preview hallInformation={hallInformation} 
          sendData={sendData}/>
        ) : null}
      </div>
    </div>
  );
}

export default Slider;
