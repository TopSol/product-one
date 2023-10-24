import React, { useEffect, useState } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { RangePickerProps } from "antd/es/date-picker";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

type SelectDateProps = {
  setBookDate: (newBookDate: any[]) => void;
  setVenuesPrice: (newVenuesPrice: any[]) => void;
  setUserData: (newUserData: any[]) => void;
  setSelectedDateRange: any;
  selectedDateRange: any;
};

const { RangePicker } = DatePicker;
const SelectDate: React.FC<SelectDateProps> = ({
  setBookDate,
  setVenuesPrice,
  setUserData,
  selectedDateRange,
  setSelectedDateRange,
}: any) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    const today = dayjs().endOf("day");
    return current && current < today;
    // return current && current < dayjs().endOf("day");
  };
  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
  };
  let adminMarqueeUser;
  const getDate = async () => {
    let q = query(collection(db, "users"), where("status", "==", "active"));
    const querySnapshot = await getDocs(q);
    adminMarqueeUser = [];
    querySnapshot.forEach((doc) => {
      adminMarqueeUser.push({ id: doc.id, data: doc.data() });
    });
    const venueSnapshot = await getDocs(collection(db, "Venues"));
    const bookDateSnapshot = await getDocs(collection(db, "bookDate"));
    const VenueArr = [];
    venueSnapshot.forEach((doc) => {
      VenueArr.push({ id: doc.id, data: doc.data() });
    });
    const bookDateArr = [];
    bookDateSnapshot.forEach((doc) => {
      bookDateArr.push({ id: doc.id, data: doc.data() });
    });
    console.log(VenueArr, "sdfdsfsdfsdfsfdsfsdfds");
    setVenuesPrice(VenueArr);
    setBookDate(bookDateArr);
    setUserData(adminMarqueeUser);
  };
  useEffect(() => {
    getDate();
  }, []);
  return (
    <>
      <DatePicker
        disabledDate={disabledDate}
        onChange={handleDateRangeChange}
        value={selectedDateRange}
      />
    </>
  );
};

export default SelectDate;
