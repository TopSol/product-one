import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Switch,
  Popconfirm,
  Badge,
  Select,
  Table,
  Upload,
  message,
  Spin,
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
  { label: "Unavailable", value: "Unavailable" },
];
const initialFormState = {
  name: "",
  image: "",
  price: 0,
  type: "",
  description: "",
  // status: plainOptions[0].value,
  status: "",
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
  const [isloading, setIsLoading] = useState(true);

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
            setAddVenuesImage((prevState) => [...prevState, url] as any);
          });
        });
      })
      .catch((error) => { });
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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);

  const HandleAddVenues = async () => {
    if (
      !user.name ||
      !user.status ||
      !user.price ||
      !user.type ||
      !user.description
    ) {
      return;
    }
    setLoading(true);
    const folderName = `images`;
    const urls = await Promise.all(
      imageObject.map(async (image) => {
        const fileName = `${folderName}/${(image as any).name}`;
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
      // status: "Available",
      status: user.status,
    };
    try {
      await setDoc(doc(db, "Menus", MenuId), users);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user] as any);
    setModalOpen(false);
    setUser(initialFormState);
    setFileList([]);
    setImageObject([]);
    setLoading(false);
    fetchData();
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
      console.log(docSnap.data());
      setUser(docSnap.data() as any);
      console.log(user);
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
        const fileName = `${folderName}/${(image as any).name}`;
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
  const handlestatusChange = (e) => {
    setUser({ ...user, status: e });
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
  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const img = new window.Image();
      (img as any).src = reader.result;

      img.onload = () => {
        const width = img.width;
        const height = img.height;

        if (width < 1500 || height < 1000) {
          message.warning(
            "Please upload an image with a width of at least 1500px and a height of at least 1000px."
          );
        } else {
          setFileList((prev) => [...prev, { url: reader.result } as any]);
          setImageObject((prevImageObject) => [...prevImageObject, file] as any);
        }
      };
    };

    return false;
  };
  const handleRemove = (file) => {
    const index = fileList.indexOf(file);
    const newFileList = [...fileList];
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };
  return (
    <>
      {isloading ? (
        <div className="flex justify-center items-center h-[80vh] spinner">
          <Spin size="default" />
        </div>
      ) : (
        <>
          <div className="md:px-10">
            <Table dataSource={Menus} pagination={false} className="myTable" bordered={false}>
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
                    <div className="flex items-center cursor-pointer">
                      <img
                        width={80}
                        height={60}
                        src={
                          image.length > 0 ? image[0] : "fallback-image-url.jpg"
                        }
                        alt="Image"
                        onClick={() => {
                          setIsOpen(true);
                          setPreviewImage(image);
                          setPhotoIndex(0);
                        }}
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
                  </>
                )}
              />
              <Column
                title="Status"
                dataIndex="status"
                key="status"
                className="text-base"
                render={(v) => {
                  return (
                    <Badge
                      status={v === "Available" ? "success" : "error"}
                      text={v}
                    />
                  );
                }}
              />

              <Column
                title="Edit"
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
                    ></Popconfirm>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="ml-3 text-green-500 text-lg cursor-pointer"
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
              onCancel={() => {
                setModalOpen(false);
                setUser(initialFormState);
                setFileList([]);
                setImageObject([]);
                setOpenEditVenue(false);
              }}
              closeIcon={
                <div className=" right-2 ">
                  <svg
                    onClick={() => {
                      setModalOpen(false);
                      setOpenEditVenue(false);
                    }}
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
              style={{ height: 840, padding: 0 }}
              okButtonProps={{ className: "custom-ok-button" }}
              footer={[
                <div className="pb-5 mr-3" key={"index"}>
                  <Button
                    key="cancel"
                    onClick={() => {
                      setModalOpen(false);
                      setUser(initialFormState);
                      setFileList([]);
                      setImageObject([]);
                      setOpenEditVenue(false);
                    }}
                    className=" AddVenue border-primary text-primary "
                  >
                    Cancel
                  </Button>
                  <Button
                    key="ok"
                    type="primary"
                    onClick={() =>
                      openEditVenue
                        ? updateVenue((user as any).menuId)
                        : HandleAddVenues()
                    }
                    className="AddVenue  bg-primary text-white"
                  >
                    {openEditVenue ? (
                      loading ? (
                        <Loader />
                      ) : (
                        "Update"
                      )
                    ) : loading ? (
                      <Loader />
                    ) : (
                      "Add"
                    )}
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
                      <p className="absolute text-lg leading-[100%] z-20 pt-1 ">
                        Name
                      </p>
                    </div>
                    <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                      <Input
                        placeholder="Name"
                        type="text"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        className="border outline-none md:w-[700px] z-10 w-full rounded-[10px]  mb-8 py-5 flex justify-center text-xs relative"
                      />
                    </div>
                  </div>
                  <p className="mb-2 font-Manrope font-bold  pl-5 lg:pl-0">
                    Image
                  </p>
                  <div className=" flex flex-start w-full pl-5 lg:pl-0 mb-8">
                    <ImgCrop
                      modalClassName="btns"
                      rotationSlider
                      modalWidth={800}
                      modalTitle={"Edit your Image"}
                      modalOk={"Crop"}
                      aspect={aspectRatio}
                      maxZoom={1.2}
                    >
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture-card"
                        fileList={fileList}
                        onRemove={handleRemove}
                        beforeUpload={beforeUpload}
                        showUploadList={{
                          showPreviewIcon: false,

                          showRemoveIcon: true,
                        }}
                      >
                        {fileList?.length < 5 && "+ Upload"}
                      </Upload>
                    </ImgCrop>
                  </div>

                  <div className="flex flex-col items-start relative md:mt-3 mt-4">
                    <div className="absolute top-[calc(50%_-_57.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                      <p className="absolute  text-lg leading-[100%] z-20 pt-1">
                        Price
                      </p>
                    </div>
                    <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                      <Input
                        placeholder="Minimum Capacity"
                        type="number"
                        name="price"
                        value={user.price}
                        onChange={handleChange}
                        className="border outline-none md:w-[700px] z-10 w-full rounded-[10px]  mb-8 py-5 flex justify-center text-xs relative"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col items-start relative md:mb-8 mt-4">
                    <div className="absolute top-[calc(50%_-_42.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                      <p className="absolute text-lg leading-[100%] z-20 pt-1">
                        Type
                      </p>
                    </div>
                    <div className=" flex flex-col md:flex-row  md:justify-between w-[100%]">
                      <Select
                        className="type mb-8"
                        showSearch
                        style={{
                          width: "100%",
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
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

                  <div className="flex flex-col items-start relative md:mb-8 mt-4">
                    <div className="absolute top-[calc(50%_-_42.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[65.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                      <p className="absolute text-lg leading-[100%] z-20 pt-1">
                        Status
                      </p>
                    </div>
                    <div className="   flex flex-col md:flex-row  md:justify-between w-[100%]">
                      <Select
                        className="type mb-8"
                        showSearch
                        style={{
                          width: "100%",
                        }}
                        placeholder="Search to Select"
                        optionFilterProp="children"
                        filterOption={(input, option: any) =>
                          option.label
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                          optionA.label
                            .toLowerCase()
                            .localeCompare(optionB.label.toLowerCase())
                        }
                        options={plainOptions}
                        onChange={handlestatusChange}
                        value={user.status}
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
                        className="border outline-none md:w-[700px] z-10 w-full rounded-[10px]  mb-8 py-5 flex justify-center text-xs relative"
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
        </>
      )}
    </>
  );
}
export default Menus;
