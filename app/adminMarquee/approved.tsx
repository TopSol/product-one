import React, { useEffect, useState } from "react";
import { Spin, Table, Tag } from "antd";
import { getFormatDates } from "../utils";
import { useRouter } from "next/navigation";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import "./style.css";
import { useStore } from "@/store";
import moment from "moment";

function ApprovedMarquee() {
  const [isShowApproved, setIsShowApproved] = useState();
  const [isloading, setIsLoading] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const { Column } = Table;
  const { userInformation } = useStore();
  const router = useRouter();
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "approvedMarquee"));

    // const q = query(
    //   collection(db, "approvedMarquee"),
    //   where("userId", "==", userInformation.userId)
    // );
    // const querySnapshot = await getDocs(q);
    const dataArr: any[] = [];
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setIsShowApproved(dataArr as any);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const handleRowClick = (id) => {
    router.push(`/adminMarquee/previewDetails?id=${id}`
    )
  }
  return (
    <>
      {isloading ? (
        <div className="flex justify-center items-center h-[80vh] spinner ">
          <Spin size="default" />
        </div>
      ) : (
        <>
          <div className="md:container md:px-6 my-4">
            <p className="md:text-2xl font-bold font-poppins">
              Approved Marquees
            </p>
            <p className="text-matteBlack py-4">
              List Of Approved Marquee Are As Following :
            </p>
            <Table
              dataSource={isShowApproved}
              pagination={false}
              rowClassName={(row, index) => "clickable-row cursor-pointer customCursor"}
              onRow={(row) => {
                return {
                  onClick: () => {
                    handleRowClick(row.id)
                    localStorage.setItem('component', 'Approved')
                    setIsLoading(true)
                  }
                };
              }}
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

                  const fromDate = isShowApproved.from?.seconds ? new Date(isShowApproved.from.seconds * 1000) : isShowApproved.from
                  const toDate = isShowApproved.to?.seconds ? new Date(isShowApproved.to.seconds * 1000) : isShowApproved.to

                  const fromFormat = moment(fromDate)?.format("MMM DD,YYYY")
                  const toFormat = moment(toDate)?.format("MMM DD,YYYY")

                  if (isShowApproved && isShowApproved.from && isShowApproved.to) {
                    return `${fromFormat} – ${toFormat}`;
                  } else if (!toDate && fromDate) {
                    return `${fromFormat} – ${fromFormat}`;
                  } else if (isShowApproved.to && !isShowApproved.from) {

                    return `${toFormat} – ${toFormat}`;
                  }
                  return "Invalid Date Range"; // Handle invalid or missing dates


                }}
              />
              {/* <Column
  title="Date"
  dataIndex="dates"
  key="dates"
  render={(isShowApproved) => {
    
    if (isShowApproved && isShowApproved.from && isShowApproved.to) {
      const fromDate = new Date(isShowApproved.from);
      const toDate = new Date(isShowApproved.to);
      

      const fromDateString = moment(fromDate).format()
      const toDateString = moment(toDate).format()

      return `${fromDateString} - ${toDateString}`;
    } else {
      return "Invalid Date Range"; // Handle invalid or missing dates
    }
  }}
/> */}


              <Column title="Name" dataIndex="firstName" key="firstName" className="text-sm" />
              <Column title="Mealtype" dataIndex="mealType" key="mealType" />
              <Column
                title="Guests"
                dataIndex="NumberOfPeople"
                key="NumberOfPeople"
              />
              <Column title="Hallname" dataIndex="venueName" key="venueName" />
              <Column
                title="Menu"
                dataIndex="dishes"
                key="dishes"
                render={(isShowApproved) => {
                  let dishElements = null;
                  if (Array.isArray(isShowApproved?.nameAndPriceArray)) {
                    const chunkSize = 3;
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
              <Column title="Address" dataIndex="address" key="address" className="text-sm" />
              <Column
                rowScope="row"
                title="Per/Head"
                dataIndex="dishes"
                key="dishes"
                render={(item) => {
                  if (item.totalDiscount == undefined) {
                    return <p>{item?.perHead}</p>;
                  } else {
                    return <p>{item?.totalDiscount}</p>;

                  }
                }}
              />
            </Table>
          </div>
        </>
      )}
    </>
  );
}

export default ApprovedMarquee;
