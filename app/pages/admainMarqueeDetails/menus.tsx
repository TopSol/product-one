import React, { useEffect, useState } from "react";
import { db } from "@/app/firebase";
import { Button, Input, Popconfirm, Table } from "antd";
import Loader from "../../component/Loader"; 
import { Image } from "antd";
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
} from "firebase/firestore";
import { useStore } from "../../../store";
import { Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
const initialFormState = {
  name: "",
  image: "",
  price: 0,
  type: "",
  description: "",
 
};
function Menus({ modalOpen, setModalOpen, handleClick,loading,setLoading }) {
  const { userInformation, addUser, addMenus, Menus,Dishes } = useStore();
  const [user, setUser] = useState(initialFormState);
  const [addVenues, setAddVenues] = useState([]);
  const { Column } = Table;
  const [openEditVenue, setOpenEditVenue] = useState(false);
  const [addVenuesImage, setAddVenuesImage] = useState([]);
  const storage = getStorage();
  const ImageRef = ref(storage, "images/");
  const [blogs, setBlogs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: name == 'price' ? Number(value) : value,
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
      !user.image ||
      !user.price ||
      !user.type ||
      !user.description
    ) {
      return;
    }
    setLoading(true);
    const images = Object.values(user.image);
    const folderName = `images`;

    const urls = await Promise.all(
      images.map(async (image) => {
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
      price: user.price,
    };

    try {
      await setDoc(doc(db, "Menus", MenuId), users);
      console.log("close2");
    } catch (error) {
      console.log(error, "error");
    }
    setAddVenues([...addVenues, user]);

    setModalOpen(false);
    console.log("close4");
    setUser(initialFormState);
    setLoading(false);
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
      // setSelectedItems(docSnap.data().dishes);
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No such document!");
    }
  };
  const updateVenue = async (venueId) => {
    setLoading((prevState) => !prevState);
     if( typeof user?.image[0]==="string"){
      try {
        await setDoc(doc(db, "Menus", venueId), user);
  
        const updatedIndex = Menus.findIndex((menu) => menu.id === venueId);
        if (updatedIndex !== -1) {
          const updatedMenus = [...Menus];
          updatedMenus[updatedIndex] = { ...user, id: venueId };
          addMenus(updatedMenus);
        } else {
          addMenus([...Menus, { ...user, id: venueId }]);
        }
      } catch (error) {
        console.log(error, "error");
      }
      setModalOpen(false);
      setUser(initialFormState);
      setOpenEditVenue(false);
    }else{
      const images = Object.values(user.image);
      const folderName = `images`;
      const urls = await Promise.all(
        images.map(async (image) => {
          const fileName = `${folderName}/${image.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, image);
          const url = await getDownloadURL(storageRef);
          return url;
        }))
       try {
        const updatedUser = JSON.parse(JSON.stringify(user));
        updatedUser.image = urls;
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
  
      // try {
      //   await setDoc(doc(db, "Menus", venueId), user);
      //   const newBlogs = Menus.filter((blog) => blog.id !== venueId);
      //   console.log(newBlogs,"newBlogs33",user)
      //   addMenus([...newBlogs,{...user,id:venueId}])
      // } catch (error) {
      //   console.log(error, "error");
      // }
     
    }
    setModalOpen(false);
      setUser(initialFormState);
      setOpenEditVenue(false);
      setLoading((prevState) => !prevState);
  };
  console.log(user, "usdddder")
  return (
    <div className="">
      <Table dataSource={Menus} className="myTable">
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
                <Image.PreviewGroup
                >
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
                </Image.PreviewGroup>
              </div>
            )}
          />

        {/* <Column
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
                    onClick={() => handleClick(image, index)}
                  />
                );
              })}
            </div>
          )}
        /> */}
        <Column
          title="Action"
          dataIndex="menuId"
          key="menuId"
          render={(menuId) => (
            <div>
               <Popconfirm
                  title="Delete Dish?"
                  description="Are you sure to delete Dish?"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => deleteMenu(menuId)} 
                >
                  <FontAwesomeIcon
                    icon={faTrashCan} 
                    width={15}
                    // height={15}
                    className="text-red-500 cursor-pointer text-xl"
                    // onClick={() => deleteVenue(venueId)}
                  />
                </Popconfirm>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="ml-3 text-green-500 text-xl"
                width={15}
                // height={30}
                onClick={() => EditVenue(menuId)}
              />
            </div>
          )}
        />
      </Table>
      
      <Modal
        className="text-center"
        centered
        open={modalOpen}
        // onOk={() =>
        //   openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()
        // }
        onCancel={() => setModalOpen(false)}
        width={700}
        bodyStyle={{ height: 800 }}
        okButtonProps={{ className: "custom-ok-button" }}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="ok" type="primary" onClick={() =>
            openEditVenue ? updateVenue(user.menuId) : HandleAddVenues()} className="bg-blue-500">
            {
                  loading ? (
                    <Loader />
                  ) : (
                    "Ok"
                  ) 
            }
            
          </Button>,
        ]}
      >
        <div className=" w-full h-full mt-4 flex justify-center items-center flex-col">
          <div className="mr-auto">
            <p className="text-2xl">Dish</p>
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
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Menus;
