import MultipleDaySelectCalendar from "@/app/component/calender";
import { useStore } from "../../../store";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import { db } from "@/app/firebase";
import "./style.css";
import { Button } from "antd";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
function Availability() {
  const { Venues,dates } = useStore();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [venueDate, setVenueDate] = useState({});
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
    console.log(Venues, "VenueNssssame",dates)
  }, [Venues]);
  const update = async (id, venueDate) => {
    console.log(venueDate, "venueDate")
    const NotAvailableDate={
      dates:venueDate.dates,
      marqueeId:venueDate.userId,
      VenueId:venueDate.venueId
      }
      console.log(NotAvailableDate,"NotAvailableDate")
      try {
        await setDoc(doc(db, "BookDate", id), NotAvailableDate);
        console.log("Document successfully updated!");
      } catch (error) {
        console.log(error, "error");
      }
    };
    
  const SendDateInFirebase = async (item) => {
    console.log(item,"itessm")
    // const data=dates?.item || {};
    console.log(dates?.[item],"dsssd",item)
    // const data = dates?.[item?.[0]?.label] || {};
    const data = dates?.[item] || {};
    console.log(data, "wwwww");
    try {
      const docRef = doc(db, "Venues", item);
      const docSnap = await getDoc(docRef);
      console.log(docSnap,"docSnap")
      if (docSnap.exists()) {
        console.log("Document data", docSnap.data());
        const user = {
          ...docSnap.data(),
          dates: data,
        };
        console.log(user, "qqqqqssqq");
        setVenueDate(user);
      update(item, user);

      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  return (
    <div>
      <div className="flex ">
        <div className="w-[80%] pr-0">
          <div className="md:px-5">
            <MultipleDaySelectCalendar selectedVenue={selectedVenue} />
          </div>
        </div>
        <div className="w-[20%] border shadow-lg h-[100vh]">
          <Button onClick={() => SendDateInFirebase(selectedVenue)}>
            Not Available
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Availability;
