import MultipleDaySelectCalendar from "@/app/component/calender";
import { useStore } from "../../../store";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import "./style.css";
import { Button } from "antd";
import { db } from "@/app/firebase";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
function Availability() {
  const { Venues, dates, lunchDinner } = useStore();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [venueDate, setVenueDate] = useState({});
  const [lunchType, setLunchType] = useState("Diner");
  const [venueDates, setVenueDates] = useState({});
  const [allDate, SetAllDate] = useState([]);
  const [menu, setMenu] = useState([
    {
      label: "Lunch",
      value: 1,
    },
    {
      label: "Diner",
      value: 2,
    },
    {
      label: "All",
      value: 3,
    },
  ]);
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
    console.log(value, "valueddd");
    const data = selectedDates.filter((item) => {
      if (item?.value === value) {
        setSelectVenue(item?.label);
        setSelectedVenue(item?.value);
        return item;
      }
    });
  };
  // const update = async (id, venueDate) => {
  //   console.log(venueDate, "venueDate");
  //   const NotAvailableDate = {
  //     dates: venueDate.dates,
  //     marqueeId: venueDate.userId,
  //     VenueId: venueDate.venueId,
  //   };
  //   console.log(NotAvailableDate, "NotAvailableDate");
  //   try {
  //     await setDoc(doc(db, "BookDate", id), NotAvailableDate);
  //     console.log("Document successfully updated!");
  //   } catch (error) {
  //     console.log(error, "error");
  //   }
  // };
  const update = async (id, venueDate, venueDates) => {
    console.log(venueDate, "venueDate");
    const NotAvailableDate = {
      // dates: venueDate.dates,
      id: venueDate.userId,
      // VenueId: venueDate.venueId,
      dates: venueDates,
    };
    console.log(NotAvailableDate, "NotAvailableDate");
    try {
      await setDoc(doc(db, "bookDate", venueDate.userId), NotAvailableDate);
      console.log("Document successfully updated!");
    } catch (error) {
      console.log(error, "error");
    }
  };
  const SendDateInFirebase = async (item) => {
    console.log(item, "itessm");
    console.log(dates?.[item], "dsssd", item);
    const data = dates?.[item] || {};
    console.log(data, "wwwww");
    try {
      const docRef = doc(db, "Venues", item);
      const docSnap = await getDoc(docRef);
      console.log(docSnap, "docSnap");
      if (docSnap.exists()) {
        console.log("Document data", docSnap.data());
        const user = {
          ...docSnap.data(),
          dates: data,
        };
        console.log(user, "qqqqqssqq");
        setVenueDate(user);
        update(item, user, venueDates);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  const handleMenuSelect = (e) => {
    let data = [];
    switch (e) {
      case 1:
        setLunchType("Lunch");

        break;
      case 2:
        setLunchType("Diner");

        break;
      case 3:
        {
          const lunchDinnerValue = lunchDinner[selectedVenue]
          Object.keys(lunchDinnerValue).map((item) => {
            lunchDinnerValue[item].map((value) => {
              data.push({title:item,start:value,end:value});
            }
            );
          });
          SetAllDate(data);
          console.log(data,"dddggd") 
          setLunchType("All");
        }
        break;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="flex ">
        <div className="w-[80%] pr-0">
          <div className="flex">
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
              className=" select my-3  ml-5 "
            />
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
              options={menu}
              onChange={handleMenuSelect}
              value={lunchType}
              className=" select my-3  ml-5 "
            />
          </div>
          <div className="md:px-5">
            <MultipleDaySelectCalendar
              selectedVenue={selectedVenue}
              lunchType={lunchType}
              setVenueDates={setVenueDates}
              venueDates={venueDates}
              allDate={allDate}
            />
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

// import MultipleDaySelectCalendar from "@/app/component/calender";
// import { useStore } from "../../../store";
// import React, { useState, useEffect } from "react";
// import Select from "antd/es/select";
// import { db } from "@/app/firebase";
// import "./style.css";
// import { Button } from "antd";
// import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
// function Availability() {
//   const { Venues, dates,addDate,userInformation } = useStore();
//   const [selectedDates, setSelectedDates] = useState([]);
//   const [selectedVenue, setSelectedVenue] = useState([]);
//   const [selectVenue, setSelectVenue] = useState("");
//   const [venueDate, setVenueDate] = useState({});
//   const [lunchType, setLunchType] = useState("Diner");
//   const [venueDates, setVenueDates] = useState({});
//   console.log(userInformation,"datuserInformationes")
//   const [menu, setMenu] = useState([
//     {
//       label: "Lunch",
//       value: 1,
//     },
//     {
//       label: "Diner",
//       value: 2,
//     },
//   ]);
//   useEffect(() => {
//     const VenueName = Venues.map((item) => ({
//       value: item.id,
//       label: item.name,
//       data: [],
//     }));
//     setSelectedDates(VenueName);
//     if (VenueName.length > 0) {
//       setSelectVenue(VenueName[0].label);
//     }
//     console.log(Venues, "VenueNssssame", dates);
//   }, [Venues]);
//   const handleVenueSelect = (value) => {
//     const data = selectedDates.filter((item) => {
//       if (item?.value === value) {
//         setSelectVenue(item?.label);
//         setSelectedVenue(item?.value);
//         return item;
//       }
//     });
//   };
//   console.log(dates,"datsses")
//   const getDates = async (item) => {
//   console.log(item,"selectdddedVenue")
//     try {
//       const docRef = doc(db, "bookDate", item);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         console.log("Documentdata", docSnap.data());
//         addDate(docSnap.data());
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.error("Error :", error);
//     }

//   };
//   useEffect(() => {
//     getDates(userInformation?.userId)
//   }, [venueDates]);
//   const update = async (id, venueDate,venueDates) => {
//     console.log(venueDate, "venueDate");
//     const NotAvailableDate = {
//       // dates: venueDate.dates,
//       id: venueDate.userId,
//       // VenueId: venueDate.venueId,
//       dates:venueDates,
//     };
//     console.log(NotAvailableDate, "NotAvailableDate");
//     try {
//       await setDoc(doc(db, "bookDate", venueDate.userId), NotAvailableDate);
//       console.log("Document successfully updated!");
//     } catch (error) {
//       console.log(error, "error");
//     }
//   };

//   const SendDateInFirebase = async (item) => {
//     console.log(item, "itessm");
//     console.log(dates?.[item], "dsssd", item);
//     const data = dates?.[item] || {};
//     console.log(data, "wwwww");
//     try {
//       const docRef = doc(db, "Venues", item);
//       const docSnap = await getDoc(docRef);
//       console.log(docSnap, "docSnap");
//       if (docSnap.exists()) {
//         console.log("Document data", docSnap.data());
//         const user = {
//           ...docSnap.data(),
//           dates: data,
//         };
//         console.log(user, "qqqqqssqq");
//         setVenueDate(user);
//         update(item, user,venueDates);
//       } else {
//         console.log("No such document!");
//       }
//     } catch (error) {
//       console.error("Error fetching document:", error);
//     }
//   };
//   const handleMenuSelect = (e) => {
//     switch (e) {
//       case 1:
//         setLunchType("Lunch");
//         console.log("Lunch");
//         break;
//       case 2:
//         setLunchType("Diner");
//         console.log("Diner");
//         break;
//       default:
//         break;
//     }
//   };
//   console.log(venueDates, "venueDate");
//   return (
//     <div>
//       <div className="flex ">
//         <div className="w-[80%] pr-0">
//           <div className="flex">
//             <Select
//               showSearch
//               style={{
//                 width: 200,
//               }}
//               placeholder="Search to Select"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//               filterSort={(optionA, optionB) =>
//                 optionA.label
//                   .toLowerCase()
//                   .localeCompare(optionB.label.toLowerCase())
//               }
//               options={selectedDates}
//               onChange={handleVenueSelect}
//               value={selectVenue}
//               className=" select my-3  ml-5 "
//             />
//             <Select
//               showSearch
//               style={{
//                 width: 200,
//               }}
//               placeholder="Search to Select"
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.label.toLowerCase().includes(input.toLowerCase())
//               }
//               filterSort={(optionA, optionB) =>
//                 optionA.label
//                   .toLowerCase()
//                   .localeCompare(optionB.label.toLowerCase())
//               }
//               options={menu}
//               onChange={handleMenuSelect}
//               value={lunchType}
//               className=" select my-3  ml-5 "
//             />
//           </div>
//           <div className="md:px-5">
//             <MultipleDaySelectCalendar
//               selectedVenue={selectedVenue}
//               lunchType={lunchType}
//               setVenueDates={setVenueDates}
//               venueDates={venueDates}
//             />
//           </div>
//         </div>
//         <div className="w-[20%] border shadow-lg h-[100vh]">
//           <Button onClick={() => SendDateInFirebase(selectedVenue)}>
//             Not Available
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default Availability;
