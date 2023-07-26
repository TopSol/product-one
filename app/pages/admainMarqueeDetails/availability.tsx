import MultipleDaySelectCalendar from "@/app/component/calender";
import { useStore } from "../../../store";
import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import { db } from "@/app/firebase";
import { Button } from "antd";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
function Availability() {
  const { Venues } = useStore();

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [datas, setDatas] = useState({});
  const { userInformation, addUser, Dishes, addDishes, Menus, dates, addDate } =
    useStore();
  useEffect(() => {
    const VenueName = Venues.map((item) => ({
      value: item.id,
      label: item.name,
      data: [],
    }));
    setSelectedDates(VenueName);
    if (VenueName.length > 0) {
      setSelectVenue(VenueName[0].label);
    }
  }, [Venues]);
  const handleVenueSelect = (value) => {
    const data = selectedDates.filter((item) => {
      console.log(item, "itemmm");
      if (item?.value === value) {
        console.log(item?.value, "ssdsddssd", item?.label);
        setSelectVenue(item?.label);
        return item;
      }
    });
    console.log(data, "datadd");
    setSelectedVenue(data);
  };
  const update=async(id)=>{
  const item={
    // ...datas,
    // dates:dates
  }
    try {
      await setDoc(doc(db, "Venues", id), item);

    } catch (error) {
      console.log(error, "errsssor");
    }
  }
  const SendDateInFirebase = async (item) => {
    const data = dates?.[item?.[0]?.label] || {};
    console.log(data, "datdddaddd");
    try {
      const docRef = doc(db, "Venues", item?.[0]?.value);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data", docSnap.data());
        const user = {
          ...docSnap.data(),
          dates: data,
        };
        console.log(user, "usddder")
        setDatas(user);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
    update(item?.[0]?.value)
    //     const data = dates?.[item[0]?.label]
    //     console.log(data, "datdddaddd");
    //     try {
    //       const docRef = doc(db, "Venues", item?.[0]?.value);
    //       const docSnap = await getDoc(docRef);
    //       if (docSnap.exists()) {
    //         console.log("Documentdata", docSnap.data());
    //         // setData(docSnap.data());
    //       } else {
    //         console.log("No such document!");
    //       }
    //     } catch (error) {
    //       console.error("Error fetching document:", error);
    //     }

    // const user = {
    //   ...docSnap.data(),
    //   dates: data,
    // };

    //     try {
    //       await setDoc(doc(db, "Dish", item?.[0]?.value), user);
    //       const updatedIndex = Dishes.findIndex((dish) => dish.id === item?.[0]?.value);
    //       if (updatedIndex !== -1) {
    //         const updatedDishes = [...Dishes];
    //         updatedDishes[updatedIndex] = { ...user, id: item?.[0]?.value };
    //         addDishes(updatedDishes);
    //       } else {
    //         addDishes([...Dishes, { ...user, id: item?.[0]?.value }]);
    //       }
    //     } catch (error) {
    //       console.log(error, "error");
    //     }
  };
  console.log(selectedDates, "selectedDates");
  console.log(
    selectVenue,
    "valudddeddcdddssdcdd",
    selectedVenue,
    selectedVenue[0]?.value
  );
  return (
    <div>
      <div className="flex ">
        <div className="w-[80%] pr-0">
          <Select
            showSearch
            style={{
              width: 200,
            }}
            placeholder="Search to Select"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.label.toLowerCase().includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
              optionA.label
                .toLowerCase()
                .localeCompare(optionB.label.toLowerCase())
            }
            options={selectedDates}
            onChange={handleVenueSelect}
            value={selectVenue}
            className=" select my-3"
          />
          <div className="md:px-5">
            <MultipleDaySelectCalendar selectVenue={selectVenue} />
          </div>
        </div>
        <div className="w-[20%] border shadow-lg h-[100vh]">
          <Button onClick={() => SendDateInFirebase(selectedVenue)}>
            Send Data
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Availability;
