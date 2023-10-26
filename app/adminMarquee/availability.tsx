import MultipleDaySelectCalendar from "@/app/_component/calender";
import { useStore } from "../../store";
import React, { useState, useEffect } from "react";
import Select from "antd/es/select";
import "./style.css";
import { Button, message, Popconfirm } from "antd";
import { db } from "@/app/firebase";
import {
  getDoc,
  doc,
  setDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

interface type {
  value: string;
  label: string;
  data: any[]; // You might want to replace `any[]` with a more specific type if the data has a specific structure.
}
interface LunchDinner {
  [key: string]: {
    [key: string]: any[]; // Specify the appropriate type for the array items
  };
}
function Availability() {
  const { Venues, dates, addDateKey, lunchDinner, userInformation, addDates } =
    useStore();
  const [selectedDates, setSelectedDates] = useState<type[]>([]);
  const [selectedVenue, setSelectedVenue] = useState([]);
  const [selectVenue, setSelectVenue] = useState("");
  const [venueDate, setVenueDate] = useState({});
  const [lunchType, setLunchType] = useState("Diner");
  const [venueDates, setVenueDates] = useState({});
  const [allDate, SetAllDate] = useState<any[]>([]);
  const [showButton, setShowButton] = useState(false);
  const [selectedDate, setSelectedDate] = useState([]);
  const [deleteDates, setDeleteDates] = useState([]);
  const [updateDateAfterDelete, setUpdateDateAfterDelete] = useState({});
  const [isDateDelete, setIsDateDelete] = useState(false);
  const [deleteVenueId, setDeleteVenueId] = useState("");
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
  console.log(selectedDates, "selectedDatesselectedDates");
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
    isDateDelete && updateDeleteDate(lunchDinner);
  }, [isDateDelete]);
  const updateDeleteDate = async (lunch) => {
    let singleVenueDate = null;
    Object.keys(lunchDinner).find((item) => {
      if (deleteVenueId === item) {
        singleVenueDate = lunchDinner?.[item];
      }
    });

    if (singleVenueDate !== null) {
      const docRef = doc(db, "Venues", deleteVenueId); // Adjust the collection name
      const dateOfVenue = {
        dates: singleVenueDate,
      };

      try {
        await updateDoc(docRef, dateOfVenue);
        console.log("Value of an Existing Document Field has been updated");
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No matching item found in lunchDinner for deleteVenueId");
    }
    const NotAvailableDate = {
      id: "wLA6R1rC5mNAcPItqqK7nIleYKB2",
      dates: lunch,
    };
    if (deleteDates?.length) {
      try {
        await setDoc(
          doc(db, "bookDate", "wLA6R1rC5mNAcPItqqK7nIleYKB2"),
          NotAvailableDate
        );
        message.success("Date is successfully deleted");
        setIsDateDelete(false);
      } catch (error) {
        console.log(error, "errorssss");
      }
    }
  };
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
        setSelectedVenue((item as any)?.value);
        return item;
      }
    });
  };
  const update = async (id, venueDate, venueDates) => {
    let singleVenueDate = {};
    const data = Object.keys(lunchDinner).find((item) => {
      if (id === item) {
        singleVenueDate = lunchDinner?.[item];
      }
    });
    const NotAvailableDate = {
      id: venueDate.userId,
      dates: venueDates,
    };
    const dateOfVenue = {
      dates: singleVenueDate,
    };
    try {
      await setDoc(doc(db, "bookDate", venueDate.userId), NotAvailableDate);
      await setDoc(doc(db, "Venues", id), dateOfVenue, { merge: true });
      message.success("Date is successfully added");
    } catch (error) {
      console.log(error, "error");
    }
  };
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
    setDeleteVenueId(item);
    const data = dates?.[item] || {};
    const docRef = doc(db, "Venues", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const user = {
        ...docSnap.data(),
        dates: data,
      };

      const result = lunchDinner[selectedVenue as any]?.[lunchType]?.filter(
        (value) => {
          return !deleteDates.some((item) => value === (item as any).date);
        }
      );
      addDateKey(selectedVenue, lunchType, result);
      setIsDateDelete(true);

      const NotAvailableDate = {
        id: (user as any).userId,
        dates: venueDates,
      };
    }
  };

  const handleMenuSelect = (e) => {
    // Build

    const data: { title: string; start: any; end: any }[] = [];
    //  Build
    // let data = [];
    switch (e) {
      case 1:
        setLunchType("Lunch");
        break;
      case 2:
        setLunchType("Diner");

        break;
      case 3:
        {
          const lunchDinnerValue = lunchDinner[selectedVenue as any];
          Object.keys(lunchDinnerValue).map((item) => {
            lunchDinnerValue[item].map((value) => {
              data.push({ title: item, start: value, end: value } as any);
            });
          });
          SetAllDate(data);
          setLunchType("All");
        }
        break;
      default:
        break;
    }
  };
  const cancel = (e) => {
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
              size="large"
              style={{
                width: 200,
                backgroundColor: "#F99832",
                borderRadius: "10px",
              }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
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
              size="large"
              style={{
                width: 200,
                backgroundColor: "#F99832",
                borderRadius: "10px",
              }}
              placeholder="Search to Select"
              optionFilterProp="children"
              filterOption={(input, option: any) =>
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
              <button
                onClick={() => SendDateInFirebase(selectedVenue)}
                className="bg-primary text-white mr-3 px-5 py-2 rounded-lg"
              >
                Add Dates
              </button>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => DeleteSendDateInFirebase(selectedVenue)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <button className="bg-primary text-white  px-5 py-2 rounded-lg">
                  Delete Dates
                </button>
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
