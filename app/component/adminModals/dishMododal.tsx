import { Button, Form, Input, Modal, Select } from 'antd';
import React, { use } from 'react'
import Loader from '../Loader';
import Image from 'next/image';
import dots from "../../assets/images/dots.svg";

function DishMododal({modalOpen,setModalOpen,menu,handleMenuSelect,handleSubmit,setUser,openEditVenue,updateVenue,user,loading,handleChange}) {
    const [form] = Form.useForm();
  return (
    <div>
         {/* <Modal
        className=" modal  w-full text-center"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer md:-mt-[10px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        }
        width={600}
        bodyStyle={{ height: 620, padding: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <div className="pb-5 mr-3">
            <Button
              key="cancel"
              onClick={() => setModalOpen(false)}
              className=" border-primary text-primary "
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              // onClick={() =>
                // openEditVenue ? updateVenue(user.menuId) : ""
              // }
              className="AddVenue  bg-primary text-white"
            >
              {loading ? <Loader /> : "Add"}
            </Button>
          </div>,
        ]}
      >
        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              alt="sdf"
              src={dots}
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4"> Add Dish</p> 
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[90%]  justify-center ">
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Name
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
            <Form form={form} onFinish={handleSubmit}>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_62.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Images
                </p>
              </div>
              <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
              <Form.Item name="image">
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="border outline-none md:w-[500px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
                </Form.Item>
              </div>
            </div>
            </Form>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_60.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute  text-lg leading-[100%] z-20 pt-1">
                  Price
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div> 
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_49.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Type
                </p>
              </div>
              <div className="  mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Select
                  className="type "
                  showSearch
                  style={{
                    width: "100%",
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
                  value={user.type}
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute z-20 left-[19.89px] -mt-3 rounded-3xs bg-white w-[104.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 ">
                  Description
                </p>
              </div>
              <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  rows={4}
                  maxLength={200}
                  placeholder="Enter Description Here"
                  name="description"
                  typeof="text"
                  value={user.description}
                  onChange={handleChange}
                  className="border h-[90px] outline-none md:w-[700px] z-10 w-full  py-3 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal> */}

<Modal
        className=" modal  w-full text-center"
        centered
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        closeIcon={
          <div className=" right-2 ">
            <svg
              onClick={() => setModalOpen(false)}
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white cursor-pointer md:-mt-[10px]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width={20}
              height={20}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>{" "}
          </div>
        }
        width={600}
        bodyStyle={{ height: 620, padding: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <div className="pb-5 mr-3">
            <Button
              key="cancel"
              onClick={() => setModalOpen(false)}
              className=" border-primary text-primary "
            >
              Cancel
            </Button>
            <Button
              key="ok"
              type="primary"
              onClick={() =>
                openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()
              }
              className="AddVenue  bg-primary text-white"
            >
              {loading ? <Loader /> : "Add"}
            </Button>
          </div>,
        ]}
      >
        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto bg-primary w-full flex rounded-t-lg">
            <Image
              alt="sdf"
              src={dots}
              width={40}
              height={40}
              className="ml-3"
            />
            <p className="text-xl pl-3 text-white py-4"> Add Dish</p> 
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[90%]  justify-center ">
          <Form form={form} onFinish={handleSubmit}>

            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_56.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[60.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Name
                </p>
              </div>
              <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
              <Form.Item name="name">
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border outline-none md:w-[500px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_62.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Images
                </p>
              </div>
              <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
              <Form.Item name="image">
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="border outline-none md:w-[500px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
                </Form.Item>
              </div>
            </div>
            </Form>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_60.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute  text-lg leading-[100%] z-20 pt-1">
                  Price
                </p>
              </div>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="border outline-none md:w-[700px] z-10 w-full  py-5 mb-3 flex justify-center text-xs relative"
                />
              </div> 
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute top-[calc(50%_-_49.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 pt-1">
                  Type
                </p>
              </div>
              <div className="  mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Select
                  className="type "
                  showSearch
                  style={{
                    width: "100%",
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
                  value={user.type}
                />
              </div>
            </div>
            <div className="flex flex-col items-start relative md:mt-3 mt-4">
              <div className="absolute z-20 left-[19.89px] -mt-3 rounded-3xs bg-white w-[104.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <p className="absolute text-lg leading-[100%] z-20 ">
                  Description
                </p>
              </div>
              <div className="flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  rows={4}
                  maxLength={200}
                  placeholder="Enter Description Here"
                  name="description"
                  typeof="text"
                  value={user.description}
                  onChange={handleChange}
                  className="border h-[90px] outline-none md:w-[700px] z-10 w-full  py-3 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DishMododal