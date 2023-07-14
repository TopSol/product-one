import React, { useState,useEffect } from "react";
import Modal from "@/app/component/Modal";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import {useStore} from "../../../store"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  price: "",
};
function Venues({modalOpen, setModalOpen}) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues,setAddVenues] = useState([])
  const [blogs, setBlogs] = useState([]); 
  const[addVenuesImage,setAddVenuesImage] = useState([])
  const {userInformation,addUser} = useStore()
  const storage = getStorage();
  console.log(userInformation,"userInformationasrrs3333333")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getDocs(collection(db, "Venues"));
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
  // const handleUpload = async (img) => {
  //   const storageRef = ref(storage, "images/" + img.name);
  //   await uploadBytes(storageRef, img);
    
  //   // Get the download URL for the uploaded image
  //   const downloadURL = await getDownloadURL(storageRef);
    
  //   // Use the downloadURL for further processing or storing in Firebase Firestore
  //   // console.log(downloadURL,"downloadURL");
  // };


  const HandleAddVenues = async () => {
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      !user.price
    ) {
      return;
    }
  
    const venue = {
      name: user.name,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      price: user.price,
    };
    try {
      await addDoc(collection(db, "Venues"), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    setModalOpen(false);
    setUser(initialFormState);
    
  };
  console.log(blogs, "blogsddd1ww3311",userInformation.userId);
  return (
    <>
      <div className="md:container mx-auto">
        {
          blogs.map((item, index) => {
            return (
              <div key={index} className="border p-5 rounded-md mb-2">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.minCapacity}</p>
                  <p>{item.maxCapacity}</p>
                  <p>{item.price}</p>
                </div>
               
              </div>
            );
          })
        }
        
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal}>
      <div className="flex justify-center">
          <div className="border p-5 rounded-md mb-2 w-[100%]  lg:w-[70%] ">
            <div className="md:flex md:justify-between">
              <div className="mb-6 flex flex-col md:flex-row w-70 md:w-[40%] md:justify-between">
                <label className="text-xl">Name:</label>
                <input
                  type="name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="border  rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col md:flex-row w-70 md:w-[40%] md:justify-between">
                <label className="text-xl">Images</label>
                <input
                  type="file"
                  name="image"
                  multiple
                  onChange={(e) => {
                    setUser({ ...user, image: e.target.files });
                  }}
                  className="border rounded-md outline-none"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between  ">
              <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
                <label className="text-xl">Minimum Capacity:</label>
                <input
                  type="number"
                  name="minCapacity"
                  value={user.minCapacity}
                  onChange={handleChange}
                  className="border  rounded-md outline-none"
                />
              </div>
              <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between ">
                <label className="text-xl">Maximum Capacity:</label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={user.maxCapacity}
                  onChange={handleChange}
                  className="border rounded-md outline-none"
                />
              </div>
            </div>
            <div className="md:flex md:justify-between  ">
              <div className="mb-6 flex flex-col  md:flex-row w-70 md:w-[40%] md:justify-between">
                <label className="text-xl">price:</label>
                <input
                  type="number"
                  name="price"
                  value={user.price}
                  onChange={handleChange}
                  className="border rounded-md outline-none"
                />
              </div>
            </div>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={()=>HandleAddVenues()}>Add Venues</button>
            </div>
            
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
