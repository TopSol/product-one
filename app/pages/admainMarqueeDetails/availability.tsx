import MultipleDaySelectCalendar from "@/app/component/calender";
import { useStore } from "../../../store";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import "./style.css";
import { Button } from "antd";
import { db } from "@/app/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

function Availability() {
  const { Venues, dates, lunchDinner, userInformation } = useStore();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [venueDate, setVenueDate] = useState({});
  const [lunchType, setLunchType] = useState("Diner");
  const [venueDates, setVenueDates] = useState({});
  const [allDate, SetAllDate] = useState([]);
  const [showButton, setShowButton] = useState(false)
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
      setSelectedVenue(VenueName[0].value);
    }
  }, [Venues]);
  const handleVenueSelect = (value) => {
    const data = selectedDates.filter((item) => {
      if (item?.value === value) {
        setSelectVenue(item?.label);

        setSelectedVenue(item?.value);
        return item;
      }
    });
  };
  console.log(selectedVenue, "selectedVenue");

  const update = async (id, venueDate, venueDates) => {
    console.log(venueDate, "venueDate");
    const NotAvailableDate = {
      id: venueDate.userId,
      dates: venueDates,
    };
    try {
      await setDoc(doc(db, "bookDate", venueDate.userId), NotAvailableDate);
      console.log("Document successfully updated!");
    } catch (error) {
      console.log(error, "error");
    }
  };
  const SendDateInFirebase = async (item) => {
    console.log(dates, "sdfsdfdsf");
    const data = dates?.[item] || {};
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
        setVenueDate(user);
        update(item, user, venueDates);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
    setShowButton(false)
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
          const lunchDinnerValue = lunchDinner[selectedVenue];
          Object.keys(lunchDinnerValue).map((item) => {
            lunchDinnerValue[item].map((value) => {
              data.push({ title: item, start: value, end: value });
            });
          });
          SetAllDate(data);
          console.log(data, "dddggd");
          setLunchType("All");
        }
        break;
      default:
        break;
    }
  };
  console.log(userInformation.userId, "asdfasdfasdf");
  return (
    <div>
      <div className="flex mt-5">
        <div className="w-[100%] pr-0">
          <div className="flex">
            <Select
              className=" select my-3  ml-5"
              showSearch={false}
              style={{
                width: 200,
                backgroundColor: "#F99832",
                borderRadius: "10px",
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

            />
            <Select
              className=" select my-3  ml-5 "
              showSearch={false}
              style={{
                width: 200,
                backgroundColor: "#F99832",
                borderRadius: "10px",
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

            />
            {
              showButton && <div className=" ml-auto mr-2 flex justify-center items-center">
                <Button
                  onClick={() => SendDateInFirebase(selectedVenue)}
                  className="bg-primary text-white mr-3 px-6"
                >
                  Add Dates
                </Button>
                <Button
                  onClick={() => SendDateInFirebase(selectedVenue)}
                  className="bg-primary text-white "
                >
                  Delete Dates
                </Button>
              </div>
            }

          </div>

          <div className="md:px-5">
            <MultipleDaySelectCalendar
              selectedVenue={selectedVenue}
              lunchType={lunchType}
              setVenueDates={setVenueDates}
              venueDates={venueDates}
              allDate={allDate}
              setShowButton={setShowButton}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
export default Availability;
