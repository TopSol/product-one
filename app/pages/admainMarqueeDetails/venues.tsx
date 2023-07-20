import React, { useState, useEffect } from "react";
// import Modal from "@/app/component/Modal";
import ImageLightbox from "react-image-lightbox";
import { Input } from "antd";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/app/firebase";
import "./style.css";
import { Table } from "antd";
import { useStore } from "../../../store";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  price: "",
};
function Venues({ modalOpen, setModalOpen,handleClick }) {
  const [user, setUser] = useState(initialFormState);
  const [addVenue, setaddVenue] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { Column } = Table;
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [addVenueImage, setaddVenueImage] = useState([]);
  const { userInformation, addUser,Venues,addVenues } = useStore();
  const storage = getStorage();
  const ImageRef = ref(storage, "images/");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  useEffect(() => {
    // listAll(ImageRef)
    //   .then((res) => {
    //     res.items.forEach((itemRef) => {
    //       getDownloadURL(itemRef).then((url) => {
    //         setaddVenueImage((prevState) => [...prevState, url]);
    //       });
    //     });
    //   })
    //   .catch((error) => {});

    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Venues"));
        const tempArray = response.docs
          .filter((doc) => userInformation.userId === doc.data().userId)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          addVenues(tempArray);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [addVenue]);
  const HandleaddVenue = async () => {
    console.log( "dddduser");
    const images = Object.values(user.image);
    const folderName = `images`;
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const urls = await getDownloadURL(storageRef);
        console.log("imageUrls123", urls);
        return urls;
      })
    );
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
    const VenueId = Math.random().toString(36).substring(2);
    const venue = {
      name: user.name,
      image: imageUrls,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      venueId: VenueId,
      // availability: user.availability,
      price: user.price,
    };
    try {
      await setDoc(doc(db, "Venues", VenueId), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setaddVenue([...addVenue, user]);
    setModalOpen(false);
    setUser(initialFormState);
  };
  const deleteVenue = async (VenueId) => {
    try {
      await deleteDoc(doc(db, "Venues", VenueId));
      const newBlogs = Venues.filter((blog) => blog.id !== VenueId);
      addVenues(newBlogs);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  const EditVenue = async (dishId) => {
    setOpenEditVenue(true);
    setModalOpen((prevState) => !prevState);
    const docRef = doc(db, "Venues", dishId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUser(docSnap.data());
      // setSelectedItems(docSnap.data().dishes);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const updateVenue = async (venueId) => {

    const images = Object.values(user.image);
    const folderName = `images`;
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const fileName = `${folderName}/${image.name}`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const urls = await getDownloadURL(storageRef);
        console.log("imageUrls123", urls);
        return urls;
      })
    );
    console.log("imageUrls", imageUrls);
    
    try {
      const updatedUser = JSON.parse(JSON.stringify(user));
      updatedUser.image = imageUrls;
    
      await setDoc(doc(db, "Venues", venueId), updatedUser);
    
      const updatedIndex = Venues.findIndex((venue) => venue.id === venueId);
      if (updatedIndex !== -1) {
        const updatedVenues = [...Venues];
        updatedVenues[updatedIndex] = { ...updatedUser, id: venueId };
        console.log(updatedVenues, "updatedVenues");
        addVenues(updatedVenues);
      } else {
        addVenues([...Venues, { ...updatedUser, id: venueId }]);
      }
    } catch (error) {
      console.log(error, "error");
    }
      // try {
      //   await setDoc(doc(db, "Venues", venueId), user);
      //   const newBlogs = Venues.filter((blog) => blog.id !== venueId);
      //   console.log(newBlogs,"newBlogs33",user)
      //   addVenues([...newBlogs,{...user,id:venueId}])
      // } catch (error) {
      //   console.log(error, "error");
      // }
    setModalOpen(false);
    setUser(initialFormState);
    setOpenEditVenue(false);
  };
  return (
    <>
      <div className="">
        <Table dataSource={Venues} className="myTable">
          <Column title="Name" dataIndex="name" key="name" />
          <Column
            title="Minimum Capacity"
            dataIndex="minCapacity"
            key="minCapacity"
          />
          <Column
            title="Maximum Capacity"
            dataIndex="maxCapacity"
            key="maxCapacity"
          />
          <Column title="Price" dataIndex="price" key="price" />
          <Column
            title="Images"
            dataIndex="image"
            key="image"
            render={(image) => (
              <div className="flex">
                {image?.map((dish, index) => {
                  return (
                    <img
                      key={index}
                      src={dish}
                      alt="img"
                      width={50}
                      height={50}
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
            dataIndex="venueId"
            key="venueId"
            render={(venueId) => (
              <div>
                <FontAwesomeIcon
                  icon={faTrashCan}
                  width={15}
                  // height={15}
                  className="text-red-500 cursor-pointer text-xl"
                  onClick={() => deleteVenue(venueId)}
                />
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  width={15}
                  // height={20}
                  className="ml-3 text-green-500 text-xl"
                  onClick={() => EditVenue(venueId)}
                />
              </div>
            )}
          />
        </Table>
        </div>
      <Modal
        className="text-center w-full"
        centered
        open={modalOpen}
        // onOk={() => HandleaddVenue()}
        onOk={() => (openEditVenue ?  updateVenue(user?.venueId)  : HandleaddVenue())} 
        onCancel={() => setModalOpen(false)}
        width={700}
        bodyStyle={{ height: 630 }}
        okButtonProps={{ className: "custom-ok-button" }}
      >
        <div className=" w-full h-full flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl mt-5  ">Venues</p>
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
                <span className="text-red-600">*</span> Image
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
              <label className="text-xl my-1">Minimum Capacity:</label>
              <div className="mb-6 flex flex-col  md:flex-row md:justify-between">
                <Input
                  placeholder="Minimum Capacity"
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
              <label className="text-xl my-1">Maximum Capacity:</label>
              <div className="mb-6 flex flex-col  md:flex-row  md:justify-between ">
                <Input
                  placeholder="Maximum Capacity"
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between flex flex-col ">
              <label className="text-xl my-1">price:</label>
              <div className="flex flex-col  md:flex-row  md:justify-between">
                <Input
                  placeholder="Number"
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="rounded-none w-full py-2 lg:py-3"
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              {/* {user.image &&
                Object.values(user.image).map((img, index) => {
                  return (
                    <img
                      src={URL.createObjectURL(img)}
                      alt=""
                      key={index}
                      className="w-[25%]"
                    />
                  );
                })} */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
