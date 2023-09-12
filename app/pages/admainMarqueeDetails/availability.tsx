import MultipleDaySelectCalendar from "@/app/component/calender";
import { useStore } from "../../../store";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import "./style.css";
import { Button, message, Popconfirm } from "antd";
import { db } from "@/app/firebase";
import { getDoc, doc, setDoc, getDocs, collection } from "firebase/firestore";
function Availability() {
  const { Venues, dates, addDateKey, lunchDinner, userInformation, addDates } =
    useStore();
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [venueDate, setVenueDate] = useState({});
  const [lunchType, setLunchType] = useState("Diner");
  const [venueDates, setVenueDates] = useState({});
  const [allDate, SetAllDate] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const [deleteDates, setDeleteDates] = useState([]);
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
  function convertTimestampsToDate(data) {
    Object.keys(data.dates).forEach((venueId) => {
      Object.keys(data.dates[venueId]).forEach((mealType) => {
        data.dates[venueId][mealType] = data.dates[venueId][mealType].map(
          (timestamp) => {
            const seconds = timestamp.seconds;
            const nanoseconds = timestamp.nanoseconds;
            return new Date(seconds * 1000 + nanoseconds / 1000000);
          }
        );
      });
    });

    return data;
  }
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "bookDate"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().id)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
        const convertedData = convertTimestampsToDate(tempArray[0]);
        addDates(convertedData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

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
  console.log(lunchDinner, "deleteDates");
  const update = async (id, venueDate, venueDates) => {
    console.log(venueDate.userId, "venueDatesss");
    const NotAvailableDate = {
      id: venueDate.userId,
      dates: venueDates,
    };
    try {
      await setDoc(doc(db, "bookDate", venueDate.userId), NotAvailableDate);
      message.success("Date is successfully added");
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(lunchDinner, "lunchDinner");
  const SendDateInFirebase = async (item) => {
    setSelectedDate([]);
    const data = dates?.[item] || {};
    try {
      const docRef = doc(db, "Venues", item);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const user = {
          ...docSnap.data(),
          dates: data,
        };
        console.log(user, "useruseruser");
        setVenueDate(user);
        update(item, user, venueDates);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
    setShowButton(false);
  };
  const DeleteSendDateInFirebase = async (item) => {
    const data = dates?.[item] || {};
    const docRef = doc(db, "Venues", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = {
        ...docSnap.data(),
        dates: data,
      };
      const result = lunchDinner[selectedVenue]?.[lunchType]?.filter(
        (value) => {
          return !deleteDates.some((item) => value === item.date);
        }
      );
      console.log(
        user.userId,
        "Id",
        result,
        "resultresult",
        selectedVenue,
        lunchType
      );
      addDateKey(selectedVenue, lunchType, result);
      const NotAvailableDate = {
        id: user.userId,
        dates: result,
      };
      try {
        await setDoc(doc(db, "bookDate", user.userId), NotAvailableDate);
        message.success("Date is successfully deleted");
      } catch (error) {
        console.log(error, "error");
      }
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
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };
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
            <div className=" ml-auto mr-2 flex justify-center items-center">
              <Button
                onClick={() => SendDateInFirebase(selectedVenue)}
                className="bg-primary text-white mr-3 px-6"
              >
                Add Dates
              </Button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => DeleteSendDateInFirebase(selectedVenue)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  // onClick={() => DeleteSendDateInFirebase(selectedVenue)}
                  className="bg-primary text-white "
                >
                  Delete Dates
                </Button>
              </Popconfirm>
            </div>
          </div>

          <div className="md:px-5">
            <MultipleDaySelectCalendar
              selectedVenue={selectedVenue}
              lunchType={lunchType}
              setVenueDates={setVenueDates}
              venueDates={venueDates}
              allDate={allDate}
              setShowButton={setShowButton}
              setSelectedDate={setSelectedDate}
              selectedDate={selectedDate}
              setDeleteDates={setDeleteDates}
              deleteDates={deleteDates}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Availability;
