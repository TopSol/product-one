"use client";
import { Form, Input, Modal, message } from "antd";
import Image from "next/image";
import dots from "../../assets/images/dots.svg";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import Loader from "@/app/_component/Loader";
import { getFormatDates } from "@/app/utils";
import { marqueeReservationTemplete } from "@/templetes";

function mailSender({ modalOpen, setModalOpen, email, sendData }) {
  const [isloader, setIsLoader] = useState(false);
  const [mailData, setMailData] = useState({
    email: email,
    subject: "Marquee Reservation",
    description: "",
  });

  const [defaultDescription, setDefaultDescription] = useState("");

  useEffect(() => {
    const initialDescription = `
     Are you sure to approve this upcoming Marquee reservation with the following details :
      ${sendData?.NumberOfPeople}
      ${sendData?.eventType}
      `;

    setDefaultDescription(initialDescription);
    setMailData((prevMailData) => ({
      ...prevMailData,
      description: initialDescription,
    }));
  }, [sendData]);

  const handleMail = async () => {
    try {
      if (!mailData.description || !mailData.subject) {
        return;
      } else {
        setIsLoader(true);
      }
      const response = await fetch("http://localhost:3000/api/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...mailData,
          email,
          html: marqueeReservationTemplete(sendData, formattedDateRange),
        }),
      });

      if (response.status === 200) {
        message.success("Your email has been successfully sent");
        setIsLoader(false);
        setModalOpen(false);
      } else {
        console.error("API call failed:", response.statusText);
        message.error("Oops, something went wrong");
        setIsLoader(false);
      }
    } catch (error) {
      console.error("Error calling API:", error);
      setIsLoader(false);
    }
  };
  console.log(sendData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailData((prevMailData) => ({
      ...prevMailData,
      [name]: value,
    }));
  };

  const formatDate = (timestamp) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const date = new Date(timestamp * 1000);
    const month = months[date.getMonth()];
    const day = date.getDate();

    let daySuffix = "th";
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = "st";
    } else if (day === 2 || day === 22) {
      daySuffix = "nd";
    } else if (day === 3 || day === 23) {
      daySuffix = "rd";
    }

    return `${month} ${day}${daySuffix}, ${date.getFullYear()}`;
  };

  const fromTimestamp = 1697482800;
  const toTimestamp = 1697655600;

  const fromDate = formatDate(fromTimestamp);
  const toDate = formatDate(toTimestamp);

  const formattedDateRange = `${fromDate}–${toDate}`;
  console.log("Date Range:", formattedDateRange);

  return (
    <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
      <Modal
        className=" modal  w-full text-center md:container"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={550}
        bodyStyle={{ height: 550, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto bg-primary w-full flex rounded-t-lg py-6 px-5">
          <div className="flex justify-start items-center space-x-3">
            <Image src={dots} width={40} height={40} alt="abc" />
            <p className="text-white font-semibold text-lg">
              Event Confimation
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col  mt-10">
          <Form
            className="w-full"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            {/* <div className="w-[100%] flex flex-col items-start relative px-14 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[65.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Subject
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="subject"
                rules={[
                  {
                    required: false,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none  z-10  py-4 flex justify-center text-xs relative"
                  type="subject"
                  name="subject"
                  defaultValue={"MARQUEE RESERVATION"}
                  onChange={handleChange}
                  value={mailData.subject}
                />
              </Form.Item>
            </div> */}
            <div className="w-[100%] flex flex-col items-start relative px-14 ">
              <div className="absolute top-[calc(50%_-_133.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Approval
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="description"
                rules={[
                  {
                    required: false,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <TextArea
                  className="border outline-none z-10 py-4 flex justify-center text-xs relative"
                  rows={10}
                  maxLength={500}
                  defaultValue={` Dear Admin,
                Are you sure to approve this upcoming Marquee reservation, for which I have provided the following details:
                Date : ${formattedDateRange}
                Event Type : ${sendData?.eventType}
                Guest: ${sendData?.NumberOfPeople}
                Location : ${sendData?.address}
                Meal's Type : ${sendData?.mealType}  
                `}
                  style={{
                    resize: "none",
                  }}
                  name="description"
                  typeof="text"
                  onChange={handleChange}
                  value={mailData.description}
                />
              </Form.Item>
            </div>
            <div className="w-full flex justify-end pr-14">
              <button
                onClick={handleMail}
                className="bg-primary px-8 py-2 rounded-md text-white font-semibold  flex justify-end"
              >
                {isloader ? <Loader /> : "Approve"}
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default mailSender;
