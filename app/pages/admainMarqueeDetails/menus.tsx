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
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useStore } from "../../../store";
import { Modal } from "antd";
const initialFormState = {
  name: "",
  image: "",
  price: "",
  type: "",
  // marqueeId: "",
  availability: "",
  description: "",
  // category: "",
};
function Menus({ modalOpen, setModalOpen }) {
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
  const closeModal = () => {
    setModalOpen(false);
  };

  const HandleAddVenues = async () => {
    const images = Object.values(user.image);
    const folderName = `images`;
    let imagesUrls = [];
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
    const users = {
      name: user.name,
      image: urls,
      type: user.type,
      // marqueeId: user.marqueeId,
      availability: user.availability,
      description: user.description,
      // category: user.category,
      userId: userInformation.userId,
      price: user.price,
    };

    try {
      console.log(imageUrls, "images1112");
      await addDoc(collection(db, "Menus"), users);
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
                    width={30}
                    height={30}
                  />
                );
              })}
            </div>
          )}
        />
      </Table>

      {/* {blogs.map((item, index) => {
        console.log(item, "item22");
        return (
          <div key={index} className="border p-5 rounded-md mb-2">
            <div className="flex justify-between flex-wrap">
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.type}</p>
              <p>{item.marqueeId}</p>
              <p>{item.availability}</p>
              <p>{item.description}</p>

              {item?.image &&
                item?.image.map((img, index) => (
                  <div key={index} className="w-[20%] h-[20%] bg-slate-500">
                    <img src={img} alt="img" className="w-full h-full" />
                  </div>
                ))}
            </div>
          </div>
        );
      })} */}
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
