import React, { useState,useEffect } from "react";
import Modal from "@/app/component/Modal";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import {useStore} from "../../../store"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { add } from "date-fns/esm";
import { set } from "date-fns";
const initialFormState = {
  name: "",
  image: "",
  minCapacity: "",
  maxCapacity: "",
  // availability: "",
  price: "",
};
function Venues({modalOpen, setModalOpen}) {
  const [user, setUser] = useState(initialFormState);
  const [addVenues,setAddVenues] = useState([])
  const [blogs, setBlogs] = useState([]); 
  const[addVenuesImage,setAddVenuesImage] = useState([])
  const {userInformation,addUser} = useStore()
  // console.log(userInformation,"userInformationasrrs3333")
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
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await getDocs(collection(db, "Venues"));
  //       const tempArray = response.docs.filter((doc) => {
  //         if (userInformation.userId === doc.data().userId) {
  //           console.log(doc.data(), "doc.data()");
  //           return {
  //             ...doc.data(),
  //             id: doc.id,
  //           };
  //         }

  //       });
  
  //       setBlogs(tempArray);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };
  //   fetchBlogs();
  // }, [addVenues]);
 
  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await getDocs(collection(db, "Venues"));
  //       // const tempArray = response.docs.map((doc) => doc.data());
  //       const tempArray = response.docs.map((doc) =>{
             
  //         if(userInformation.userId === doc.data().userId){
  //           console.log(doc.data(),"doc.data()");
  //         }
  //          return {
  //           ...doc.data(),
  //           id: doc.id,
  //         };

  //       } )
  //       console.log(tempArray, "tempArray");


  //       setBlogs(tempArray);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  const handleUpload = async (img) => {
    const storageRef = ref(storage, "images/" + img.name);
    await uploadBytes(storageRef, img);
    
    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(storageRef);
    
    // Use the downloadURL for further processing or storing in Firebase Firestore
    // console.log(downloadURL,"downloadURL");
  };


  const HandleAddVenues = async () => {
    if (
      !user.name ||
      !user.image ||
      !user.minCapacity ||
      !user.maxCapacity ||
      // !user.availability ||
      !user.price
    ) {
      return;
    }
  
    const venue = {
      name: user.name,
      // image: user.image,
      minCapacity: user.minCapacity,
      maxCapacity: user.maxCapacity,
      userId: userInformation.userId,
      // availability: user.availability,
      price: user.price,
    };
    try {
      await addDoc(collection(db, "Venues"), venue);
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);
    // try {
    //   const response = await getDocs(collection(db, "Venues"));
    //   const tempArray = response.docs.map((doc) => doc.data());
    //   console.log(tempArray, "tempArray");
    //   setBlogs(tempArray);
    // } catch (error) {
    //   console.error("Error fetching blogs:", error);
    // }
    setModalOpen(false);
    setUser(initialFormState);
    
  };
  console.log(blogs, "blogsddd1ww3311",userInformation.userId);
  // const HandleAddVenues = async () => {
  //   if (
  //     !user.name ||
  //     !user.image ||
  //     !user.minCapacity ||
  //     !user.maxCapacity ||
  //     // !user.availability ||
  //     !user.price
  //   ) {
  //     return;
  //   }
    
  //   const users = {
  //     name: user.name,
  //     // image: user.image,
  //     minCapacity: user.minCapacity,
  //     maxCapacity: user.maxCapacity,
  //     userId:userInformation.userId,
  //     // availability: user.availability,
  //     price: user.price,
  //   };
  //   try {
  //     await addDoc(collection(db, "Venues"), users);
  //   } catch(error) {
  //     console.log(error,"error");
  //   }
  //   setAddVenues([...addVenues, user]);
  //   try {
  //     const response = await getDocs(collection(db, "Venues"));
  //     const tempArray = response.docs.map((doc) => doc.data());
  //     console.log(tempArray, "tempArray");
  //     setBlogs(tempArray);
  //   } catch (error) {
  //     console.error("Error fetching blogs:", error);
  //   }
  //   setModalOpen(false);
  //   setUser(initialFormState);
  //   console.log(blogs, "blogsddd111");
  // };
  return (
    <>
      <div className="md:container mx-auto">
        {
          blogs.map((item, index) => {
            // console.log(item, "item333");
            return (
              <div key={index} className="border p-5 rounded-md mb-2">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.minCapacity}</p>
                  <p>{item.maxCapacity}</p>
                  {/* <p>{item.availability}</p> */}
                  <p>{item.price}</p>
                </div>
                {/* <div className="flex flex-wrap">
                  {item.image &&
                    Object.values(item.image).map((img, index) => {
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                
                      // Call the handleUpload function to upload the image
                      // handleUpload(img);
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                      // setAddVenuesImage((prevImages) => [...prevImages, imageUrl]);
                      
                      // console.log(URL.createObjectURL(img), "img1a22211");
                      return (
                        <img
                          src={URL.createObjectURL(img)}
                          alt=""
                          key={index}
                          className="w-[25%]"
                        />
                      );
                    })}
                </div> */}
              </div>
            );
          })
        }
        {/* {
          addVenues.map((item, index) => {
            // console.log(item, "item333");
            return (
              <div key={index} className="border p-5 rounded-md mb-2">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>{item.minCapacity}</p>
                  <p>{item.maxCapacity}</p>
                  <p>{item.availability}</p>
                  <p>{item.price}</p>
                </div>
                <div className="flex flex-wrap">
                  {item.image &&
                    Object.values(item.image).map((img, index) => {
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                
                      // Call the handleUpload function to upload the image
                      // handleUpload(img);
                      // const imageUrl = URL.createObjectURL(img);
                      // console.log(imageUrl, "img1a22211");
                      // setAddVenuesImage((prevImages) => [...prevImages, imageUrl]);
                      
                      // console.log(URL.createObjectURL(img), "img1a22211");
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
            );
          }
        )} */}
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
              {/* <img src={user.image ? URL.createObjectURL(user.image) : ''} alt="" /> */}
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
            {/* <div className="flex flex-wrap">
              {user.image &&()
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
            </div> */}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Venues;
