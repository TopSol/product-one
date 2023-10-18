import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./style.css";

function ApprovedMarquee() {
  const [isShowApproved, setIsShowApproved] = useState();
  const { Column } = Table;

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "approvedMarquee"));
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setIsShowApproved(dataArr);
  };
  console.log("isShowApproved", isShowApproved);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="md:container md:px-6 my-4">
      <p className="md:text-2xl font-bold font-poppins">Approved Marquees</p>
      <p className="text-matteBlack py-4">
        List Of Approved Marquee Are As Following :
      </p>
      <Table
        dataSource={isShowApproved}
        className="myTable md:container"
        scroll={{
          x: 1000,
        }}
      >
        <Column
          title="Date"
          dataIndex="dates"
          key="dates"
          render={(isShowApproved) => {
            const formatDate = (timestamp) => {
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];

              const date = new Date(timestamp * 1000);
              const month = months[date.getMonth()];
              const day = date.getDate();

              return `${month} ${day}, ${date.getFullYear()}`;
            };

            const fromTimestamp = 1697482800;
            const toTimestamp = 1697655600;
            const fromDate = formatDate(fromTimestamp);
            const toDate = formatDate(toTimestamp);
            const formattedDateRange = `${fromDate} – ${toDate}`;
            return <div>{formattedDateRange}</div>;
          }}
        />
        <Column title="Meal's Type" dataIndex="mealType" key="mealType" />
        <Column title="Name" dataIndex="firstName" key="firstName" />
        <Column title="Hall Name" dataIndex="venueName" key="venueName" />

        <Column
          title="Guests"
          dataIndex="NumberOfPeople"
          key="NumberOfPeople"
        />

        <Column
          title="Menu"
          dataIndex="dishes"
          key="dishes"
          render={(isShowApproved) => {
            let dishElements = null;
            if (Array.isArray(isShowApproved?.nameAndPriceArray)) {
              const chunkSize = 4;
              const dishGroups = isShowApproved.nameAndPriceArray.reduce(
                (acc, item, index) => {
                  const chunkIndex = Math.floor(index / chunkSize);
                  acc[chunkIndex] = acc[chunkIndex] || [];
                  acc[chunkIndex].push(item);
                  return acc;
                },
                []
              );
              dishElements = dishGroups.map((chunk, index) => (
                <div key={index} className="flex items-center text-xs">
                  {chunk.map((item, itemIndex) => (
                    <div key={itemIndex} className="inline-block">
                      <p className="bg-bgColor rounded-lg px-4 py-2 mx-1 w-20 mb-2 flex justify-center">
                        {item.name.length > 10
                          ? `${item.name.substring(0, 7)}..`
                          : item.name}
                      </p>
                    </div>
                  ))}
                </div>
              ));
            }

            return (
              <div>
                {isShowApproved?.name && (
                  <p className="text-lg">{isShowApproved?.name}</p>
                )}
                {dishElements}
              </div>
            );
          }}
        />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          rowScope="row"
          title="Per/Head"
          dataIndex="dishes"
          key="dishes"
          render={(item) => {
            return <p>{item?.perHead}</p>;
          }}
        />
      </Table>
    </div>
  );
}

export default ApprovedMarquee;
