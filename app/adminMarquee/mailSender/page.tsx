// "use client";
// import { useEffect, useState } from "react";
// import { Modal, message } from "antd";
// import { marqueeReservationTemplete } from "@/templetes";
// import Image from "next/image";
// import successIcon from "../../assets/images/success.svg";
// import rejectIcon from "../../assets/images/reject.svg";
// import TextArea from "antd/es/input/TextArea";
// import Loader from "@/app/_component/Loader";
// import { deleteDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "@/app/firebase";

// function MailSender({
//   modalOpen,
//   setModalOpen,
//   email,
//   sendData,
//   setIsNestedModalOpen,
//   isNestedModalOpen,
// }: any) {
//   const [isloader, setIsLoader] = useState(false);
//   const [isReject, setIsReject] = useState("Reject");
//   const [defaultDescription, setDefaultDescription] = useState("");
//   const [mailData, setMailData] = useState({
//     email: email,
//     subject: "Marquee Reservation",
//     description: "",
//     reason: "",
//   });

//   useEffect(() => {
//     const initialDescription = ` Dear Admin,
//     Are you sure to approve this upcoming Marquee reservation, for which I have 
//     provided the following details:
//     Date : ${formattedDateRange}
//     Event Type : ${sendData?.eventType}
//     Guest: ${sendData?.NumberOfPeople}
//     Location : ${sendData?.address}
//     Meal's Type : ${sendData?.mealType}  
//     `;
//     setDefaultDescription(initialDescription);
//     setMailData((prevMailData) => ({
//       ...prevMailData,
//       description: initialDescription,
//     }));
//   }, [sendData]);

//   const handleMail = async () => {
//     try {
//       if (!mailData.description) {
//         return;
//       } else {
//         setIsLoader(true);
//       }
//       const response = await fetch("http://localhost:3000/api/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...mailData,
//           email,
//           html: marqueeReservationTemplete(
//             sendData,
//             formattedDateRange,
//             "",
//             ""
//           ),
//         }),
//       });

//       if (response.status === 200) {
//         message.success("Your email has been successfully sent");
//         setIsLoader(false);
//         setModalOpen(false);
//         const approvedId = Math.random().toString(36).substring(2);
//         const approvedMarqueeData = { ...sendData, approvedId: approvedId };
//         await setDoc(
//           doc(db, "approvedMarquee", approvedId),
//           approvedMarqueeData
//         );
//         await deleteDoc(doc(db, "contactUs", sendData?.id));
//       } else {
//         console.error("API call failed:", response.statusText);
//         message.error("Oops, something went wrong");
//         setIsLoader(false);
//       }
//     } catch (error) {
//       console.error("Error calling API:", error);
//       setIsLoader(false);
//     }
//   };

//   const handleRejectMail = async () => {
//     try {
//       if (!mailData.description || !mailData.subject) {
//         return;
//       } else {
//         setIsLoader(true);
//       }
//       const response = await fetch("http://localhost:3000/api/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...mailData,
//           email,
//           html: marqueeReservationTemplete(
//             sendData,
//             formattedDateRange,
//             isReject,
//             mailData
//           ),
//         }),
//       });

//       if (response.status === 200) {
//         message.success("Your email has been successfully sent");
//         setIsLoader(false);
//         setIsNestedModalOpen(false);
//         await deleteDoc(doc(db, "contactUs", sendData?.id));
//       } else {
//         console.error("API call failed:", response.statusText);
//         message.error("Oops, something went wrong");
//         setIsLoader(false);
//       }
//     } catch (error) {
//       console.error("Error calling API:", error);
//       setIsLoader(false);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setMailData((prevMailData) => ({
//       ...prevMailData,
//       [name]: value,
//     }));
//   };

//   const formatDate = (timestamp) => {
//     const months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     const date = new Date(timestamp * 1000);
//     const month = months[date.getMonth()];
//     const day = date.getDate();

//     let daySuffix = "th";
//     if (day === 1 || day === 21 || day === 31) {
//       daySuffix = "st";
//     } else if (day === 2 || day === 22) {
//       daySuffix = "nd";
//     } else if (day === 3 || day === 23) {
//       daySuffix = "rd";
//     }

//     return `${month} ${day}${daySuffix}, ${date.getFullYear()}`;
//   };

//   const fromTimestamp = 1697482800;
//   const toTimestamp = 1697655600;
//   const fromDate = formatDate(fromTimestamp);
//   const toDate = formatDate(toTimestamp);
//   const formattedDateRange = `${fromDate}–${toDate}`;

//   return (
//     <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
//       <Modal
//         className=" modal w-full text-center md:container"
//         centered
//         open={modalOpen}
//         onCancel={() => setModalOpen(false)}
//         width={635}
//         bodyStyle={{ height: 500, padding: 0, margin: 0 }}
//         okButtonProps={{ className: "custom-ok-button" }}
//         footer={null}
//       >
//         <div className="mr-auto w-full flex rounded-t-lg py-6 px-5 justify-center">
//           <Image src={successIcon} alt="Image" className="-mt-[65px]" />
//         </div>
//         <p className="text-successColor w-full flex justify-center text-xl md:text-3xl font-poppins">
//           Do you want to Approve?
//         </p>
//         <hr className="bg-successColor flex justify-center mx-auto py-[1px] mt-5 w-72 md:w-96 px-5" />
//         <div className="w-full flex flex-col mt-10  px-10">
//           <TextArea
//             className="outline-none border-bgColor py-4 text-sm flex justify-center bg-bgColor mb-7 font-poppins"
//             rows={9}
//             maxLength={500}
//             defaultValue={defaultDescription}
//             style={{
//               resize: "none",
//               fontSize: "12px",
//             }}
//             name="description"
//             typeof="text"
//             onChange={handleChange}
//             value={mailData.description}
//           />
//           <div className="w-full flex justify-center">
//             <button
//               onClick={handleMail}
//               className="bg-successColor py-2 font-poppins rounded-lg text-white text-xl w-full font-semibold"
//             >
//               {isloader ? <Loader /> : "Approve"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//       <Modal
//         className=" modal  w-full text-center md:container"
//         centered
//         open={isNestedModalOpen}
//         onCancel={() => setIsNestedModalOpen(false)}
//         width={635}
//         bodyStyle={{ height: 500, padding: 0, margin: 0 }}
//         okButtonProps={{ className: "custom-ok-button" }}
//         footer={null}
//       >
//         <div className="mr-auto w-full flex rounded-t-lg py-6 px-5 justify-center">
//           <Image src={rejectIcon} alt="Image" className="-mt-[65px]" />
//         </div>
//         <p className="text-rejectColor w-full flex justify-center text-xl md:text-3xl font-poppins">
//           Do you want to reject?
//         </p>
//         <hr className="bg-rejectColor flex justify-center mx-auto py-[1px] mt-4 w-72 md:w-96" />
//         <div className="w-full flex flex-col  mt-5  px-10">
//           <p className="text-[#565656] my-3">Reason (optional)</p>
//           <TextArea
//             className="outline-none border-bgColor py-4 flex justify-center bg-bgColor font-poppins text-[#565656]"
//             rows={6}
//             maxLength={100}
//             style={{
//               resize: "none",
//               fontSize: "12px",
//             }}
//             name="reason"
//             placeholder="Type Here"
//             defaultValue={""}
//             typeof="text"
//             onChange={handleChange}
//             value={mailData.reason}
//           />
//           <p className="my-5 text-[#565656]">
//             Are you sure to Reject this upcoming Marquee reservation
//           </p>
//           <div className="w-full flex justify-center">
//             <button
//               onClick={handleRejectMail}
//               className="bg-rejectColor py-2 font-poppins rounded-lg text-white text-xl w-full font-semibold"
//             >
//               {isloader ? <Loader /> : "Reject"}
//             </button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default MailSender;



"use client";
import { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { marqueeReservationTemplete } from "@/templetes";
import Image from "next/image";
import successIcon from "../../assets/images/success.svg";
import rejectIcon from "../../assets/images/reject.svg";
import TextArea from "antd/es/input/TextArea";
import Loader from "@/app/_component/Loader";
import { deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { db } from "@/app/firebase";
function mailSender({
  modalOpen,
  setModalOpen,
  email,
  sendData,
  setIsNestedModalOpen,
  isNestedModalOpen,
}) {
  const [isloader, setIsLoader] = useState(false);
  const [isReject, setIsReject] = useState("Reject");
  const [defaultDescription, setDefaultDescription] = useState("");
  const [mailData, setMailData] = useState({
    email: email,
    subject: "Marquee Reservation",
    description: "",
    reason: "",
  });

  useEffect(() => {
    const initialDescription = ` Dear Admin,
    Are you sure to approve this upcoming Marquee reservation, for which I have 
    provided the following details:
    Date : ${formattedDateRange}
    Event Type : ${sendData?.eventType}
    Guest: ${sendData?.NumberOfPeople}
    Location : ${sendData?.address}
    Meal's Type : ${sendData?.mealType}  
    `;
    setDefaultDescription(initialDescription);
    setMailData((prevMailData) => ({
      ...prevMailData,
      description: initialDescription,
    }));
  }, [sendData]);

  const handleMail = async () => {
    try {
      if (!mailData.description) {
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
          html: marqueeReservationTemplete(
            sendData,
            formattedDateRange,
            "",
            ""
          ),
        }),
      });

      if (response.status === 200) {
        message.success("Your email has been successfully sent");
        setIsLoader(false);
        setModalOpen(false);
        const approvedId = Math.random().toString(36).substring(2);
        const approvedMarqueeData= {...sendData,approvedId:approvedId}
        await setDoc(doc(db, "approvedMarquee", approvedId), approvedMarqueeData);
        await deleteDoc(doc(db, "contactUs",sendData?.id));

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

  const handleRejectMail = async () => {
    try {
      if (!mailData.description) {
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
          html: marqueeReservationTemplete(
            sendData,
            formattedDateRange,
            isReject,
            mailData
          ),
        }),
      });

      if (response.status === 200) {
        message.success("Your email has been successfully sent");
        setIsLoader(false);
        setIsNestedModalOpen(false);
        await deleteDoc(doc(db, "contactUs",sendData?.id));
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

  return (
    <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
      {/* <Modal
        className=" modal  w-full text-center md:container"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={550}
        bodyStyle={{ height: 550, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto bg-[#62C554] w-full flex rounded-t-lg py-6 px-5">
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
      </Modal> */}

      <Modal
        className=" modal w-full text-center md:container"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={635}
        bodyStyle={{ height: 500, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto w-full flex rounded-t-lg py-6 px-5 justify-center">
          <Image src={successIcon} alt="Image" className="-mt-[65px]" />
        </div>
        <p className="text-successColor w-full flex justify-center text-xl md:text-3xl font-poppins">
          Do you want to Approve?
        </p>
        <hr className="bg-successColor flex justify-center mx-auto py-[1px] mt-5 w-72 md:w-96 px-5"  />
        <div className="w-full flex flex-col mt-10  px-10">
          <TextArea
            className="outline-none border-bgColor py-4 text-sm flex justify-center bg-bgColor mb-7 font-poppins"
            rows={9}
            maxLength={500}
            defaultValue={defaultDescription}
            style={{
              resize: "none",
              fontSize:"12px"
            }}
            name="description"
            typeof="text"
            onChange={handleChange}
            value={mailData.description}
          />
          <div className="w-full flex justify-center">
            <button
              onClick={handleMail}
              className="bg-successColor py-2 font-poppins rounded-lg text-white text-xl w-full font-semibold"
            >
              {isloader ? <Loader /> : "Approve"}
            </button>
          </div>
        </div>
      </Modal>

      {/* <Modal
        className=" modal  w-full text-center md:container"
        centered
        open={isNestedModalOpen}
        onCancel={() => setIsNestedModalOpen(false)}
        width={550}
        bodyStyle={{ height: 550, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto bg-primary w-full flex rounded-t-lg py-6 px-5">
          <div className="flex justify-start items-center space-x-3">
            <Image src={dots} width={40} height={40} alt="abc" />
            <p className="text-white font-semibold text-lg">Event Rejection</p>
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
            <div className="w-[100%] flex flex-col items-start relative px-14 mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[65.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Subject
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="reason"
                rules={[
                  {
                    required: false,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none  z-10  py-4 flex justify-center text-xs relative"
                  type="reason"
                  name="reason"
                  placeholder="Enter reason here of rejection"
                  onChange={handleChange}
                  value={mailData.reason}
                />
              </Form.Item>
            </div>
            <div className="w-[100%] flex flex-col items-start relative px-14 ">
              <div className="absolute top-[calc(50%_-_132.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[80.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Rejection
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
                Are you sure to reject this upcoming Marquee reservation, for which I have provided the following details:
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
                onClick={handleRejectMail}
                className="bg-primary px-8 py-2 rounded-md text-white font-semibold  flex justify-end"
              >
                {isloader ? <Loader /> : "Reject"}
              </button>
            </div>
          </Form>
        </div>
      </Modal> */}

      <Modal
        className=" modal  w-full text-center md:container"
        centered
        open={isNestedModalOpen}
        onCancel={() => setIsNestedModalOpen(false)}
        width={635}
        bodyStyle={{ height: 500, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto w-full flex rounded-t-lg py-6 px-5 justify-center">
          <Image src={rejectIcon} alt="Image" className="-mt-[65px]" />
        </div>
        <p className="text-rejectColor w-full flex justify-center text-xl md:text-3xl font-poppins">
          Do you want to reject?
        </p>
        <hr className="bg-rejectColor flex justify-center mx-auto py-[1px] mt-4 w-72 md:w-96" />
        <div className="w-full flex flex-col  mt-5  px-10">
          <p className="text-[#565656] my-3">Reason (optional)</p>
          <TextArea
            className="outline-none border-bgColor py-4 flex justify-center bg-bgColor font-poppins text-[#565656]"
            rows={6}
            maxLength={100}
            style={{
              resize: "none",
              fontSize:"12px",
            }}
            name="reason"
            placeholder="Type Here"
            defaultValue={""}
            typeof="text"
            onChange={handleChange}
            value={mailData.reason}
          />
          <p className="my-5 text-[#565656]">
            Are you sure to Reject this upcoming Marquee reservation
          </p>
          <div className="w-full flex justify-center">
            <button
              onClick={handleRejectMail}
              className="bg-rejectColor py-2 font-poppins rounded-lg text-white text-xl w-full font-semibold"
            >
              {isloader ? <Loader /> : "Reject"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default mailSender;