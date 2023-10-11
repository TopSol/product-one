import { Form, Input, Modal } from "antd";
import Image from "next/image";
import dots from "../../../assets/images/dots.svg";
import TextArea from "antd/es/input/TextArea";
import sendEmail from "@/app/api/route";
import { useState } from "react";
import { GetServerSideProps } from "next";
function mailSender({ modalOpen, setModalOpen, email }) {
  const [mailData, setMailData] = useState({
    email:"",
    subject:"",
    description:""
  })
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  console.log("email", email);

  const handleMail = () => {
    // sendEmail(mailData)

  };
  const handleChange = (e)=>{
    const {name, value} = e.target
    setMailData({...mailData ,email:email})
    setMailData((pre) => ({...pre,
      [name]:value
    }))
  }
console.log(mailData);

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
            <p className="text-white font-semibold text-lg">Send Mail</p>
          </div>
        </div>
        <div className="w-full flex flex-col  mt-10">
          <Form
            className="w-full"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="w-[100%] flex flex-col relative px-14  mb-4">
              <div className="absolute top-[calc(50%_-_50.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[35.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  To
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="to"
                initialValue={email}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none  z-10  py-4 flex justify-center text-xs relative"
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={mailData.email}
                />
              </Form.Item>
            </div>
            <div className="w-[100%] flex flex-col items-start relative px-14 mb-4">
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
                    required: true,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none  z-10  py-4 flex justify-center text-xs relative"
                  type="subject"
                  name="subject"
                  onChange={handleChange}
                  value={mailData.subject}
                />
              </Form.Item>
            </div>
            <div className="w-[100%] flex flex-col items-start relative px-14 ">
              <div className="absolute top-[calc(50%_-_97.5px)] z-20 left-[70.89px] rounded-3xs bg-white w-[90.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1 font-Manrope font-bold my-2">
                  Description
                </b>
              </div>{" "}
              <Form.Item
                className="w-[100%]"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout This Input!",
                  },
                ]}
              >
                <TextArea
                  className="border outline-none z-10  py-4 flex justify-center text-xs relative"
                  rows={6}
                  maxLength={500}
                  style={{
                    height: 130,
                    resize: "none",
                  }}
                  name="description"
                  typeof="text"
                  onChange={handleChange}
                  value={mailData.description}
                />
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className="w-[90%] flex justify-end  my-4">
          <button
            onClick={handleMail}
            className="bg-primary px-8 py-2 rounded-md text-white font-semibold  "
          >
            Send
          </button>
        </div>
      </Modal>
     
    </div>
  );
}

export default mailSender;


// export const getServerSideProps = (async (context) => {
//   const res = await fetch('')
//   const repo = await res.json()
//   return { props: { repo } }
// }) satisfies GetServerSideProps<{
// }>