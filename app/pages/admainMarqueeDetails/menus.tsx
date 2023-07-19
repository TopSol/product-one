import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { Input, Table } from "antd";
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
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { useStore } from "../../../store";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const initialFormState = {
  name: "",
  image: "",
  price: "",
  type: "",
  availability: "",
  description: "",
  // category: "",
};
function Menus({ modalOpen, setModalOpen,handleClick}) {
  const { userInformation, addUser } = useStore();
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const { Column } = Table;
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const storage = getStorage();
  const ImageRef = ref(storage, "images/");
  const [blogs, setBlogs] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log("imageUrls", imageUrls);
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

        setBlogs(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenues]);
  const HandleAddVenues = async () => {
    console.log("imageUrlseeee");
    const images = Object.values(user.image);
    const folderName = `images`;

    const urls = await Promise.all(
      images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const utls = await getDownloadURL(storageRef);
        console.log("imageUrls123", utls);
        return utls;
      })
    );

    console.log("imageUr22ls", urls);
    setImageUrls(imageUrls);
    if (
      !user.name ||
      !user.image ||
      !user.price ||
      !user.type ||
      // !user.marqueeId ||
      !user.availability ||
      !user.description
    ) {
      return;
    }
    const MenuId = Math.random().toString(36).substring(2);
    const users = {
      name: user.name,
      image: urls,
      type: user.type,
      availability: user.availability,
      description: user.description,
      menuId: MenuId,
      // category: user.category,
      userId: userInformation.userId,
      price: user.price,
    };

    try {
      console.log(imageUrls, "images1112");
      await setDoc(doc(db, "Menus", MenuId), users);
      console.log("close2");
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);

    setModalOpen(false);
    console.log("close4");
    setUser(initialFormState);
  };
  const { TextArea } = Input;
  const deleteMenu = async (menuId) => {
    try {
      await deleteDoc(doc(db, "Menus", menuId));
      const newBlogs = blogs.filter((blog) => blog.id !== menuId);
      setBlogs(newBlogs);
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(blogs, "blogs");
  return (
    <div className="">
      <Table dataSource={blogs} className="myTable">
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Type" dataIndex="type" key="type" />
        <Column title="Description" dataIndex="description" key="description" />
        <Column title="Price" dataIndex="price" key="price" />
        <Column
          title="Images"
          dataIndex="image"
          key="image"
          render={(image) => (
            <div className="flex">
              {image?.map((dish, index) => {
                console.log(dish, "dishee");
                return (
                  <img
                    key={index}
                    src={dish}
                    alt="img"
                    width={60}
                      height={60}
                      className="mr-2"
                      onClick={() => handleClick(image,index)}
                  />
                );
              })}
            </div>
          )}
        />
        <Column
          title="Action"
          dataIndex="menuId"
          key="menuId"
          render={(menuId) => (
            <div>
              <FontAwesomeIcon
                icon={faTrashCan}
                className="text-red-500 cursor-pointer text-xl"
                width={40}
                height={40}
                onClick={() => deleteMenu(menuId)}
              />
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="ml-3 text-green-500 text-xl"
                width={40}
                height={40}
              />
            </div>
          )}
        />
      </Table>
      <Modal
        className="text-center"
        centered
        open={modalOpen}
        onOk={() => HandleAddVenues()}
        onCancel={() => setModalOpen(false)}
        width={700}
        bodyStyle={{ height: 800 }}
        okButtonProps={{ className: "custom-ok-button" }}
      >
        {/* <div className=" w-full h-full flex justify-center items-center flex-col">
          <div>
            <p className="text-2xl mb-2">Menus</p>
          </div>
          <div className=" md:p-5 rounded-md mb-2 flex flex-col md:border-2 w-[100%] md:w-[70%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <div className=" mb-3 md:md:mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl">Name:</label>
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
              <div className="mb-3 md:mb-6 flex flex-col md:flex-row  md:justify-between">
                <label className="text-xl">Images:</label>
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="md:mb-6 flex flex-col  md:flex-row md:justify-between">
                <label className="text-xl">Price:</label>
                <Input
                  placeholder="Price"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
              <div className="mb-3 md:mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <label className="text-xl">Type:</label>
                <Input
                  placeholder="Type"
                  type="text"
                  name="type"
                  value={user.type}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <div className="mb-3 md:mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <label className="text-xl">availability:</label>
                <Input
                  placeholder="availability"
                  type="text"
                  name="availability"
                  value={user.availability}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="mb-3 md:flex md:justify-between flex flex-col ">
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <label className="text-xl">description:</label>
                <TextArea
                  rows={4}
                  maxLength={6}
                  placeholder="Number"
                  name="description"
                  value={user.description}
                  onChange={handleChange}
                  className="md:w-[50%]"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              {user.image &&
                Object.values(user.image).map((img, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })}
            </div>
          </div>
        </div> */}

        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl    ">Menus</p>
          </div>
          <hr className="w-full bg-black my-3" />
          <div className=" md:p-5 rounded-md mb-2 flex flex-col  w-[100%]  justify-center ">
            <div className="md:justify-between flex flex-col">
              <label className="text-xl my-1">
                {" "}
                <span className="text-red-600">*</span> Name
              </label>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between w-[100%]">
                <Input
                  placeholder="Name"
                  type="text"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="rounded-none flex w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">
                {" "}
                <span className="text-red-600">*</span> Images
              </label>
              <div className="mb-6 flex flex-col md:flex-row  md:justify-between">
                <Input
                  placeholder="Basic usage"
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">Price</label>
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">Type</label>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <Input
                  placeholder="Enter Type Here"
                  type="text"
                  name="type"
                  value={user.type}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
              <label className="text-xl my-1">Avalibility</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <Input
                  placeholder="Enter Avalibility Here"
                  type="text"
                  name="availability"
                  value={user.availability}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="mb-6 flex flex-col  md:flex-col  md:justify-between ">
              <label className="text-xl my-1">Description</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <TextArea
                  rows={4}
                  maxLength={6}
                  placeholder="Enter Description Here"
                  name="description"
                  typeof="text"
                  value={user.description}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              {user.image &&
                Object.values(user.image).map((img, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Menus;
