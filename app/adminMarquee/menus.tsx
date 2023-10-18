import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  Button,
  Checkbox,
  Form,
  Input,
  List,
  Popconfirm,
  Row,
  Select,
  Table,
  Upload,
} from "antd";
import Loader from "@/app/_component/Loader";
import DishTable from "./dishTable";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";

import Lightbox from "react-image-lightbox";
import Image from "next/image";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
// import { Image } from "antd";
import dots from "@/app/assets/images/dots.svg";
import Link from "next/link";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { useStore } from "../../store";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImgCrop from "antd-img-crop";
const plainOptions = [
  { label: "Available", value: "Available" },
  { label: "Not Available", value: "NotAvailable" },
];
const initialFormState = {
  name: "",
  image: "",
  price: 0,
  type: "",
  description: "",
  status: plainOptions[0].value,
};
function Menus({
  modalOpen,
  setModalOpen,
  loading,
  setLoading,
  setDeleteMenus,
  deleteMenus,
  fetchData,
}) {
  const { userInformation, addUser, addMenus, Menus, Dishes } = useStore();
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const { Column } = Table;
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const storage = getStorage();
  const ImageRef = ref(storage, "images/");
  const [status, setStatus] = useState();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [imageObject, setImageObject] = useState([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [menu, setMenu] = useState([
    {
      label: "Venue Dish",
      value: "1",
    },
    {
      label: "Drink",
      value: "2",
    },
    {
      label: "Dessert",
      value: "3",
    },
    {
      label: "food",
      value: "4",
    },
  ]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStatus(value);
    setUser((prevState) => ({
      ...prevState,
      [name]: name == "price" ? Number(value) : value,
    }));
  };
  useEffect(() => {
    listAll(ImageRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            setAddVenuesImage((prevState) => [...prevState, url]);
          });
        });
      })
      .catch((error) => {});
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Menus"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

        addMenus(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);

  const HandleAddVenues = async () => {
    if (
      !user.name ||
      // !user.image ||
      !user.price ||
      !user.type ||
      !user.description
    ) {
      return;
    }
    setLoading(true);
    // const images = Object.values(user.image);
    const folderName = `images`;
    const urls = await Promise.all(
      imageObject.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const utls = await getDownloadURL(storageRef);
        return utls;
      })
    );
    const MenuId = Math.random().toString(36).substring(2);
    const users = {
      name: user.name,
      image: urls,
      type: user.type,
      description: user.description,
      menuId: MenuId,
      userId: userInformation.userId,
      cropImage: fileList,
      price: user.price,
      status: "Available",
    };
    try {
      await setDoc(doc(db, "Menus", MenuId), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
    // handleSubmit();
    setFileList([]);
    setImageObject([]);
    setLoading(false);
    fetchData();
    // if (
    //   !user.name ||
    //   // !user.image ||
    //   !user.price ||
    //   !user.type ||
    //   !user.description
    // ) {
    //   return;
    // }
    // setLoading(true);
    // const images = Object.values(user.image);
    // const folderName = `images`;

    // const urls = await Promise.all(
    //   images.map(async (image) => {
    //     const fileName = `${folderName}/${image.name}`;
    //     const storageRef = ref(storage, fileName);
    //     await uploadBytes(storageRef, image);
    //     const utls = await getDownloadURL(storageRef);
    //     return utls;
    //   })
    // );

    // const MenuId = Math.random().toString(36).substring(2);
    // const users = {
    //   name: user.name,
    //   image: urls,
    //   type: user.type,
    //   description: user.description,
    //   menuId: MenuId,
    //   userId: userInformation.userId,
    //   price: user.price,
    //   status: "Available",
    // };

    // try {
    //   await setDoc(doc(db, "Menus", MenuId), users);
    // } catch (error) {
    //   console.log(error, "error");
    // }
    // setAddVenues([...addVenues, user]);

    // setModalOpen(false);
    // setUser(initialFormState);
    // handleSubmit();
    // setLoading(false);
    // fetchData();
  };
  const { TextArea } = Input;
  const deleteMenu = async (menuId) => {
    try {
      await deleteDoc(doc(db, "Menus", menuId));
      const newBlogs = Menus.filter((blog) => blog.id !== menuId);
      addMenus(newBlogs);
    } catch (error) {
      console.log(error, "error");
    }
  };
  const EditVenue = async (dishId) => {
    setOpenEditVenue(true);
    setModalOpen((prevState) => !prevState);
    const docRef = doc(db, "Menus", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      setFileList(docSnap.data().cropImage);
    } else {
      console.log("No such document!");
    }
  };
  const updateVenue = async (venueId) => {
    setLoading((prevState) => !prevState);
    const folderName = `images`;
    const urls = await Promise.all(
      imageObject.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const utls = await getDownloadURL(storageRef);
        return utls;
      })
    );
    try {
      const updatedUser = JSON.parse(JSON.stringify(user));
      updatedUser.image = [...updatedUser.image, ...urls];
      updatedUser.cropImage = [...fileList];
      await setDoc(doc(db, "Menus", venueId), updatedUser);

      const updatedIndex = Menus.findIndex((menu) => menu.id === venueId);
      if (updatedIndex !== -1) {
        const updatedMenus = [...Menus];
        updatedMenus[updatedIndex] = { ...updatedUser, id: venueId };
        addMenus(updatedMenus);
      } else {
        addMenus([...Menus, { ...updatedUser, id: venueId }]);
      }
    } catch (error) {
      console.log(error, "error");
    }
    setModalOpen(false);
    setUser(initialFormState);
    setFileList([]);
    setImageObject([]);
    setOpenEditVenue(false);
    setLoading((prevState) => !prevState);
  };
  const handleMenuSelect = (e) => {
    switch (e) {
      case "1":
        setUser({ ...user, type: "Venue Dish" });
        break;
      case "2":
        setUser({ ...user, type: "Drink" });
        break;
      case "3":
        setUser({ ...user, type: "Dessert" });
        break;
      case "4":
        setUser({ ...user, type: "food" });
        break;
      default:
        break;
    }
  };
  const onChange = (id) => {
    if (deleteMenus.includes(id)) {
      const data = deleteMenus.filter((item) => item !== id);
      setDeleteMenus(data);
    } else {
      setDeleteMenus([...deleteMenus, id]);
    }
  };
  const onChangeStatus = async (value, id) => {
    const convertedString = value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    const docRef = doc(db, "Menus", id);
    await updateDoc(docRef, {
      status: convertedString,
    });
    Menus.map((menu) => {
      if (menu.menuId === id) {
        menu.status = convertedString;
      }
      addMenus(Menus);
    });
  };
  const renderHeader = () => (
    <div className="header-container flex justify-between text-center">
      <div className="bg-primary py-4 text-white rounded-tl-lg w-[13%]"></div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white   w-[13%]">Name</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto w-[10%]"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%]">Type</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%]">Description</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%]">Price</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%]">Images</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%]">Status</div>
      <div className=" flex justify-center bg-primary">
        <span className="h-6 border-l-2 border-white my-auto"></span>
      </div>
      <div className="bg-primary py-4 text-white  w-[13%] rounded-tr-lg  flex justify-end pr-2">
        Action
      </div>
    </div>
  );

  const width = 2000;
  const height = 1300;
  const aspectRatio = width / height;
  console.log(user, "useruser");
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader, "readerre");
    reader.onload = () => {
      setFileList((prev) => [...prev, { url: reader.result }]);
    };
    setImageObject((prevImageObject) => [...prevImageObject, file]);
    return false;
  };
  return (
    <div className="md:px-10">
      {/* {renderHeader()}
      <List
        dataSource={Menus}
        renderItem={(Menus, index) => (
          <DishTable
            menus={Menus}
            onChange={onChange}
            EditVenue={EditVenue}
            setIsOpen={setIsOpen}
            setPreviewImage={setPreviewImage}
            setPhotoIndex={setPhotoIndex}
            onChangeStatus={onChangeStatus}
          />
        )}
      /> */}
      <Table dataSource={Menus} className="myTable" bordered={false}>
        <Column
          title="Check box"
          dataIndex="menuId"
          key="menuId"
          className="text-base"
          render={(menuId) => (
            <div>
              <Checkbox onClick={() => onChange(menuId)} />
            </div>
          )}
        />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          className="text-base"
        />
        <Column
          title="Type"
          dataIndex="type"
          key="type"
          className="text-base"
        />
        <Column
          title="Description"
          dataIndex="description"
          key="description"
          className="text-base "
        />
        <Column
          title="Price"
          dataIndex="price"
          key="price"
          className="text-base"
        />
        <Column
          title="Images"
          dataIndex="image"
          key="image"
          render={(image) => (
            <>
              <div className="flex items-center">
                <img
                  width={80}
                  height={60}
                  src={image.length > 0 ? image[0] : "fallback-image-url.jpg"}
                  alt="Description of the image"
                />
                {
                  <Link
                    onClick={() => {
                      setIsOpen(true);
                      setPreviewImage(image);
                      setPhotoIndex(0);
                    }}
                    className="text-blue-600 underline ml-2"
                    href=""
                  >
                    {image.length > 1 && `${image.length - 1} more`}
                  </Link>
                }
              </div>
              {/* <div className="flex items-center">
              <img
                width={80}
                height={80}
                src={image.length > 0 ? image[0] : "fallback-image-url.jpg"}
                alt="Description of the image"
              />
              {
                <Link
                  onClick={() => {
                    setPreviewImage(image);
                    setIsOpen(true);
                    setPhotoIndex(0);
                  }}
                  className="text-blue-600 underline ml-2"
                  href=""
                >
                  {image?.length - 1} more
                </Link>
              }
            </div>
            <div className="flex">
              <Image.PreviewGroup>
                {image?.map((dish, index) => {
                  return (
                    <Image
                      key={index}
                      width={80}
                      height={35}
                      // visible={false}
                      style={{ objectFit: "cover", paddingRight: 10 }}
                      src={dish}
                      onClick={() => {
                        Image.previewGroup?.show({
                          current: index,
                        });
                      }}
                    />
                  );
                })}
              </Image.PreviewGroup> */}
              {/* </div> */}
            </>
          )}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          className="text-base"
          render={(status, record) => (
            <Select
              // showSearch
              className={"status"}
              // className={`status .ant-select-arrow ${status === "Available" ? "text-red" : "text-#F9E1D7"}`}
              placeholder="Select a status"
              optionFilterProp="children"
              onChange={(value) => onChangeStatus(value, record.menuId)}
              style={{
                width: 200,
                backgroundColor: status === "Available" ? "#D4EAD8" : "#F9E1D7",
                borderRadius: 15,
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              defaultValue={status}
              value={status}
            >
              {status === "Available" ? (
                <Select.Option value="not-available">
                  Not Available
                </Select.Option>
              ) : (
                <Select.Option value="available">Available</Select.Option>
              )}
            </Select>
          )}
        />
        <Column
          title="Action"
          dataIndex="menuId"
          key="menuId"
          className="text-base"
          render={(menuId) => (
            <div>
              <Popconfirm
                title="Delete Dish?"
                description="Are you sure to delete Dish?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => deleteMenu(menuId)}
              >
                {/* <FontAwesomeIcon
                  icon={faTrashCan}
                  width={15}
                  // height={15}
                  className="text-red-500 cursor-pointer text-xl"
                  // onClick={() => deleteVenue(venueId)}
                />  */}
              </Popconfirm>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="ml-3 text-green-500 text-xl"
                width={25}
                onClick={() => EditVenue(menuId)}
              />
            </div>
          )}
        />
      </Table>

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
        bodyStyle={{ height: 655, padding: 0 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <div className="pb-5 mr-3" key={"index"}>
            <Button
              key="cancel"
              onClick={() => setModalOpen(false)}
              className=" AddVenue border-primary text-primary "
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
            <p className="mb-2 font-Manrope font-bold  pl-5 lg:pl-0">Image</p>
            <div className="mb-3 flex flex-start w-full pl-5 lg:pl-0">
              <ImgCrop
                rotationSlider
                aspect={aspectRatio}
                modalWidth={800}
                modalTitle={"Edit your Image"}
              >
                <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  showUploadList={{
                    showPreviewIcon: false,
                    showRemoveIcon: false,
                  }}
                >
                  {fileList?.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </div>
            {/* <Form form={form} onFinish={handleSubmit}>
              <div className="flex flex-col items-start relative md:mt-3 mt-4">
                <div className="absolute top-[calc(50%_-_75.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[70.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                  <p className="absolute text-lg leading-[100%] z-20 pt-1">
                    Images
                  </p>
                </div>
                <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
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
            </Form> */}
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
                <TextArea
                  rows={4}
                  maxLength={200}
                  placeholder="Enter Description Here"
                  name="description"
                  typeof="text"
                  value={user.description}
                  onChange={handleChange}
                  style={{
                    resize: "none",
                  }}
                  className="border h-[90px] outline-none md:w-[700px] z-10 w-full  py-3 mb-3 flex justify-center text-xs relative"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {isOpen && (
        <Lightbox
          mainSrc={previewImage[photoIndex]}
          nextSrc={previewImage[(photoIndex + 1) % previewImage.length]}
          prevSrc={
            previewImage[
              (photoIndex + previewImage.length - 1) % previewImage.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + previewImage.length - 1) % previewImage.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % previewImage.length)
          }
        />
      )}
    </div>
  );
}
export default Menus;
