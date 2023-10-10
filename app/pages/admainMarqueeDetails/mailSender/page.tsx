"use client";
import { Input, Modal } from "antd";
import Image from "next/image";
import React, { useState } from "react";
import dots from "../../../assets/images/dots.svg";
import TextArea from "antd/es/input/TextArea";
function mailSender({ modalOpen, setModalOpen }) {
  return (
    <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
      <Modal
        className=" modal  w-full text-center md:container"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={600}
        bodyStyle={{ height: 550, padding: 0, margin: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={null}
      >
        <div className="mr-auto bg-primary w-full flex rounded-t-lg py-6">
          <div className="flex justify-start items-center space-x-3">
            <Image src={dots} width={40} height={40} alt="abc" />
            <p className="text-white font-semibold text-lg">Send Mail</p>
          </div>
        </div>
        <div className="flex w-full justify-center items-center mx-auto flex-col mt-10 mb-5">
          <div className="flex flex-col items-start relative ">
            <div className="absolute top-[calc(50%_-_41.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[40.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
              <p className="absolute text-lg leading-[100%] z-20 pt-1">To</p>
            </div>
            <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
              <Input
                type="text"
                name="name"
                className="border outline-none md:w-[500px] z-10 w-full  py-5 flex justify-center text-xs relative"
              />
            </div>
          </div>{" "}
          <div className="flex flex-col items-start relative my-12">
            <div className="absolute top-[calc(50%_-_41.5px)] z-20 left-[16.89px] rounded-3xs bg-white w-[75.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
              <p className="absolute text-lg leading-[100%] z-20 pt-1">
                Subject
              </p>
            </div>
            <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
              <Input
                type="text"
                name="name"
                className="border outline-none md:w-[500px] z-10 w-full  py-5 flex justify-center text-xs relative"
              />
            </div>
          </div>
          <div className="flex flex-col items-start relative mb-5">
            <div className="absolute z-20 left-[19.89px] -mt-3 rounded-3xs bg-white w-[104.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
              <p className="absolute text-lg leading-[100%] z-20 ">
                Description
              </p>
            </div>
            <div className="flex flex-col md:flex-row  md:justify-between">
              <TextArea
                rows={6}
                maxLength={500}
                style={{
                  height: 130,
                  resize: "none",
                }}
                name="description"
                typeof="text"
                className="border outline-none md:w-[500px] z-10 w-full  py-3 flex justify-center text-xs relative"
              />
            </div>
          </div>
          <button className="bg-primary px-8 py-2 rounded-md text-white font-semibold  ">
            Send
          </button>
        </div>
        <div className="w-full flex justify-end">

        </div>

      </Modal>
    </div>
  );
}

export default mailSender;