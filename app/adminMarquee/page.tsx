"use client";
import React, { useEffect, useState } from "react";
import AdminNavbar from "./adminNavbar";
// import "react-image-lightbox/style.css";
import MarqueeVenues from "./venues";
import MarqueeMenus from "./menus";
import Availability from "./availability";
import Dish from "./dish";
import ApprovedMarquee from "./approved";
import "./style.css";
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    updateDoc,
    getDoc,
    getCountFromServer,
} from "firebase/firestore";
// import Lightbox from "react-image-lightbox";
import { getAuth, signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "@/store";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import Loader from "@/app/_component/Loader";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import BookedDate from "./bookedDate";
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import addVenue from "@/app/assets/images/Group2.svg";
import approvedIcon from "../assets/images/approved.svg";
import approvedWhiteIcon from "../assets/images/approvedWhite.svg";
import menuIcon from "@/app/assets/images/menuIcon.svg";
import availabilityIcon from "@/app/assets/images/availabilityIcon.svg";
import bookingIcon from "@/app/assets/images/bookingIcon.svg";
import dishIcon from "@/app/assets/images/dishIcon.svg";
import menuWIcon from "@/app/assets/images/menuWIcon.svg";
import availabilityWIcon from "@/app/assets/images/availabilityWIcon.svg";
import bookingWIcon from "@/app/assets/images/bookingWIcon.svg";
import dishWIcon from "@/app/assets/images/dishWIcon.svg";
import venueIcon from "@/app/assets/images/venue.svg";
import venueWIcon from "@/app/assets/images/venueIcon.svg";
import hall2 from "../assets/images/hallbg.svg";
import hallWhite from "@/app/assets/images/hallWhite.svg";
import { Button, message, Popconfirm, Spin } from "antd";
import { async } from "@firebase/util";

function AdminMarqueeDetails() {
    // const [component, setComponent] = React.useState(() => {
    //     let prev = localStorage.getItem('component');
    //     if (prev) {
    //         return prev
    //     }
    //     return "Halls"
    // });
    const [component, setComponent] = React.useState(() => {
        if (typeof localStorage !== 'undefined') {
            let prev = localStorage.getItem('component');
            if (prev) {
                return prev;
            }
        }
        return "Halls";
    });

    useEffect(() => {

        localStorage.removeItem('component');

    }, []);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [removeMenuIcon, setRemoveMenuIcon] = useState(true);
    const [showIcon, setShowIcon] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    const [selectImage, setSelectImage] = useState("");
    const [image, setImage] = useState([]);
    const [dishModalOpen, setDishModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isBookingAvailable, setIsBookingAvailable] = useState(false)
    const [isLoader, setIsLoader] = useState(true);
    const {
        userInformation,
        getDates,
        addVenues,
        Venues,
        addMenus,
        Menus,
        Dishes,
        addDishes,
        handleCounting,
        counting
    } = useStore();
    const [deleteVenues, setDeleteVenues] = useState([]);
    const [deleteMenus, setDeleteMenus] = useState([]);
    const [deleteDishes, setDeleteDishes] = useState([]);
    const [activeMarquee, setActiveMarquee] = useState(false);
    const sideBar = [
        {
            name: "Halls",
            icon: hall2,
            wIcon: hallWhite,
            color: "gray",
        },
        {
            name: "Dishes",
            icon: dishIcon,
            wIcon: dishWIcon,
            color: "gray",
        },
        {
            name: "Menus",
            icon: menuIcon,
            wIcon: menuWIcon,
            color: "gray",
        },
        {
            name: "Availability",
            icon: availabilityIcon,
            wIcon: availabilityWIcon,
            color: "gray",
        },
        {
            name: "Bookings",
            icon: bookingIcon,
            wIcon: bookingWIcon,
            color: "gray",
        },
        {
            name: "Approved",
            icon: approvedIcon,
            wIcon: approvedWhiteIcon,
            color: "gray",
        },
    ];
    const router = useRouter();


    const fetchContactData = async () => {
        const querySnapshot = await getDocs(collection(db, 'contactUs'));
        querySnapshot.forEach((doc) => {
            const docData = doc.data();
        });
        const coll = collection(db, "contactUs");
        const q = query(coll, where('userId', '==', userInformation?.userId));
        const snapshot = await getCountFromServer(q);
        const numbers = snapshot.data().count
        console.log(numbers);   
        console.log(counting);


        if (counting < numbers) {
            setIsBookingAvailable(true)
            sendNotification();
            handleCounting(snapshot.data().count)
        } else {
            null
        }
    }

    useEffect(() => {
        fetchContactData()
    }, [counting])

    const sendNotification = () => {
        if ('Notification' in window && Notification.permission === 'granted') {
            const options = {
                body: 'Click Check Your Orders',
                icon: `https://res.cloudinary.com/dnpmouapi/image/upload/v1700215266/Marq_logo_3_d6bksy.svg`,
            };

            const notification = new Notification('Reserve Orders', options);
            notification.onclick = () => {
                handleNofiNotificationClick()
            };
        } else {
            alert('Notification permission not granted');
        }
    };

    const params = useSearchParams();
    const isBooking = params.get("isBooking");



    const handleNofiNotificationClick = () => {
        setComponent("Bookings")
    }

    useEffect(() => {
        if (!userInformation) {
            router.push("/adminMarquee/login");
        } else {
            setIsLoader(false);
        }
    }, [userInformation]);

    useEffect(() => {
        const handleResize = () => {
            const windowWidth = window.innerWidth;
            if (windowWidth >= 768) {
                setModalOpen2(true);
            } else {
                setModalOpen2(false);
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const openModal = () => {
        setModalOpen(true);
    };

    const fetchData = async () => {
        try {
            if (!userInformation?.userId) {
                throw new Error("Invalid user ID.");
            }
            const washingtonRef = doc(db, "users", userInformation?.userId);
            await updateDoc(washingtonRef, {
                status: "active",
            });
        } catch (error: any) {
            console.error("Error updating document:", error.message);
        }
    };

    const inactiveMarquee = async () => {
        try {
            if (!userInformation?.userId) {
                throw new Error("Invalid user ID.");
            }
            const washingtonRef = doc(db, "users", userInformation?.userId);
            await updateDoc(washingtonRef, {
                status: "inactive",
            });
        } catch (error: any) {
            console.error("Error updating document:", error.message);
        }
    };

    useEffect(() => {
        if (Venues.length > 0 && Dishes.length > 0 && Menus.length > 0) {
            fetchData();
        } else if (Venues.length == 0 || Dishes.length == 0 || Menus.length == 0) {
            inactiveMarquee();
        }
    }, []);

    const handleDeleteVenues = async () => {
        try {
            await Promise.all(
                deleteVenues.map(async (VenueId) => {
                    await deleteDoc(doc(db, "Venues", VenueId));
                })
            );
            const newBlogs = Venues.filter(
                (blog) => !(deleteVenues as any).includes(blog.id)
            );
            addVenues(newBlogs);
            setDeleteVenues([]);
        } catch (error) {
            console.error("Error removing document(s): ", error);
        }
        inactiveMarquee();
    };

    const handleDeleteMenus = async () => {
        try {
            await Promise.all(
                deleteMenus.map(async (VenueId) => {
                    await deleteDoc(doc(db, "Menus", VenueId));
                })
            );
            const newBlogs = Menus.filter(
                (blog) => !(deleteMenus as any).includes(blog.id)
            );
            addMenus(newBlogs);
            setDeleteMenus([]);
        } catch (error) {
            console.error("Error removing document(s): ", error);
        }
        inactiveMarquee();
    };

    const handleDeleteDish = async () => {
        try {
            await Promise.all(
                deleteDishes.map(async (VenueId) => {
                    await deleteDoc(doc(db, "Dish", VenueId));
                })
            );
            const newBlogs = Dishes.filter(
                (blog) => !(deleteDishes as any).includes(blog.id)
            );
            addDishes(newBlogs);
            setDeleteDishes([]);
        } catch (error) {
            console.error("Error removing document(s): ", error);
        }
        inactiveMarquee();
    };


    return (
        <>
            {isLoader ? (
                <div className="absolute, flex justify-center items-center mx-auto h-[100vh] spinner">
                    <Spin />
                </div>
            ) : (
                <div className=" h-[100vh]">
                    <div className="">
                        <AdminNavbar
                            setModalOpen2={setModalOpen2}
                            // setShowIcon={setShowIcon}
                            setRemoveMenuIcon={setRemoveMenuIcon}
                        />
                        <div className="sidebar flex">
                            <div className="hidden p-2  absolute"></div>
                            {modalOpen2 ? (
                                <div
                                    className={` h-[100vh] min-[640px]:w-[40%] max-[1536px]:w-[150px] ${showIcon ? "lg:w-[15%]" : "lg:w-[5%]  "
                                        } border flex flex-col shadow-lg z-20 lg:z-0 bg-white relative md:block`}
                                >
                                    <div className="flex justify-between">
                                        <p className="  flex  items-center  text-xl  pl-[30px] py-5">
                                            {showIcon ? "Marquee" : null}
                                        </p>
                                        {removeMenuIcon ? (
                                            <FontAwesomeIcon
                                                icon={faBarsStaggered}
                                                size="sm"
                                                className="h-7 text-primary  cursor-pointer py-5 pr-[30px]"
                                                onClick={() => setShowIcon((prev) => !prev)}
                                            />
                                        ) : null}
                                    </div>
                                    {sideBar.map((item, index) => (
                                        <div
                                            key={index}
                                            className="cursor-pointer hover:bg-gray-200 "
                                        >
                                            <div
                                                className={`side w-full text-left flex py-2 ${component === item.name ? "bg-primary" : ""
                                                    }`}
                                                onClick={() => {
                                                    setIsBookingAvailable(false)
                                                    setComponent(item.name);
                                                    setModalOpen1(!modalOpen1);
                                                    if (item.name === "Availability") {
                                                        getDates();
                                                    }
                                                    if (window.innerWidth <= 768) {
                                                        setModalOpen2(!modalOpen2);
                                                    }
                                                }}
                                            >
                                                <div
                                                    className={`flex pl-${component === item.name ? "8" : ""
                                                        } top-0 bottom-0 left-0 right-0  pl-[30px] text-${component !== item.name ? "sidebarColor" : "white"
                                                        }`}
                                                >
                                                    <Image
                                                        src={
                                                            component !== item.name ? item.icon : item.wIcon
                                                        }
                                                        width={40}
                                                        alt="Picture of the author"
                                                        className={` pr-5 text-${component !== item.name ? "sidebarColor" : "white"
                                                            } transition-colors duration-200`}
                                                    />
                                                    {showIcon ? item.name : null}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}

                            <div className="w-[100%]  h-[100vh] z-10 lg:z-0 flex-1 overflow-y-auto absolute md:relative pt-14">
                                {component === "Halls" ? (
                                    <div className="flex md:px-5 border rounded-md justify-between  items-center px-4 my-5 mx-5 ">
                                        <p className="md:text-2xl py-3">Halls</p>
                                        {Venues.length == 0 && (
                                            <p className="text-red-700">Please add Halls</p>
                                        )}
                                        <div className="flex justify-center items-center">
                                            <button
                                                className="border rounded-md py-2 px-1 md:px-2 mr-2 pont-poppins text-primary border-primary  md:py-2"
                                                onClick={() => openModal()}
                                            >
                                                <span className="flex">
                                                    <Image
                                                        src={addVenue}
                                                        alt="Picture of the author"
                                                        width={20}
                                                        height={20}
                                                        className="pr-1"
                                                    />
                                                    <p className=" text-xs md:text-base">Add venues</p>
                                                </span>
                                            </button>
                                            {deleteVenues.length > 0 && (
                                                <Popconfirm
                                                    title="Delete the venue"
                                                    description="Are you sure to delete this venue?"
                                                    onConfirm={() => handleDeleteVenues()}
                                                    okText={
                                                        <span
                                                            style={{
                                                                backgroundColor: "#F59832",
                                                                color: "white",
                                                                border: "none",
                                                            }}
                                                        >
                                                            Yes
                                                        </span>
                                                    }
                                                    cancelText="No"
                                                    okButtonProps={{
                                                        style: {
                                                            backgroundColor: "#F59832",
                                                            border: "none",
                                                        },
                                                    }}
                                                    cancelButtonProps={{
                                                        style: {
                                                            backgroundColor: "transparent",
                                                            border: "none",
                                                        },
                                                    }}
                                                >
                                                    {Venues.length != 0 && (
                                                        <button className="border rounded-md px-2 md:px-8 pont-poppins text-white bg-primary py-1 md:py-2">
                                                            Delete
                                                        </button>
                                                    )}
                                                </Popconfirm>
                                            )}
                                        </div>
                                    </div>
                                ) : component === "Menus" ? (
                                    <div className="flex md:px-5 border rounded-md justify-between  items-center px-4 my-5 mx-5 ">
                                        <p className="md:text-2xl py-3">Menus</p>
                                        {Dishes.length == 0 && (
                                            <p className="text-red-700">Please add Menus</p>
                                        )}
                                        <div className="flex justify-center items-center">
                                            <button
                                                className="border rounded-md py-2 px-1 md:px-2 mr-2 pont-poppins text-primary border-primary  md:py-2"
                                                onClick={() => {
                                                    openModal();
                                                    setActiveMarquee((pre) => !pre);
                                                }}
                                            >
                                                <span className="flex">
                                                    <Image
                                                        src={addVenue}
                                                        alt="Picture of the author"
                                                        width={20}
                                                        className="pr-1"
                                                    />
                                                    <p className=" text-xs md:text-base">Add Menu</p>
                                                </span>
                                            </button>
                                            {deleteDishes.length > 0 && (
                                                <Popconfirm
                                                    title="Delete the dish"
                                                    description="Are you sure to delete this dish?"
                                                    onConfirm={() => {
                                                        handleDeleteDish();
                                                        setActiveMarquee((pre) => !pre);
                                                    }}
                                                    okText={
                                                        <span
                                                            style={{
                                                                backgroundColor: "#F59832",
                                                                color: "white",
                                                                border: "none",
                                                            }}
                                                        >
                                                            Yes
                                                        </span>
                                                    }
                                                    cancelText="No"
                                                    okButtonProps={{
                                                        style: {
                                                            backgroundColor: "#F59832",
                                                            border: "none",
                                                        },
                                                    }}
                                                    cancelButtonProps={{
                                                        style: {
                                                            backgroundColor: "transparent",
                                                            border: "none",
                                                        },
                                                    }}
                                                >
                                                    {Dishes.length != 0 && (
                                                        <button className="border rounded-md px-2 md:px-8 pont-poppins text-white bg-primary py-1 md:py-2">
                                                            Delete
                                                        </button>
                                                    )}
                                                </Popconfirm>
                                            )}
                                        </div>
                                    </div>
                                ) : component === "Dishes" ? (
                                    <div className="flex md:px-5 border rounded-md justify-between  items-center px-4 my-5 mx-5 ">
                                        <p className="md:text-2xl py-3">Dishes</p>
                                        {Menus.length == 0 && (
                                            <p className="text-red-700">Please add Dish</p>
                                        )}

                                        <div className="flex justify-center items-center">
                                            <button
                                                className="border rounded-md py-2 px-1 md:px-2 mr-2 pont-poppins text-primary border-primary  md:py-2"
                                                onClick={() => openModal()}
                                            >
                                                <span className="flex">
                                                    <Image
                                                        src={addVenue}
                                                        alt="Picture of the author"
                                                        width={20}
                                                        className="pr-1"
                                                    />
                                                    <p className=" text-xs md:text-base">Add Dish</p>
                                                </span>
                                            </button>
                                            {deleteMenus.length > 0 && (
                                                <Popconfirm
                                                    title="Delete the menu"
                                                    description="Are you sure to delete this menu?"
                                                    onConfirm={() => handleDeleteMenus()}
                                                    okText={
                                                        <span
                                                            style={{
                                                                backgroundColor: "#F59832",
                                                                color: "white",
                                                                border: "none",
                                                            }}
                                                        >
                                                            Yes
                                                        </span>
                                                    }
                                                    cancelText="No"
                                                    okButtonProps={{
                                                        style: {
                                                            backgroundColor: "#F59832",
                                                            border: "none",
                                                        },
                                                    }}
                                                    cancelButtonProps={{
                                                        style: {
                                                            backgroundColor: "transparent",
                                                            border: "none",
                                                        },
                                                    }}
                                                >
                                                    {Menus.length != 0 && (
                                                        <button className="border rounded-md px-2 md:px-8 pont-poppins text-white bg-primary py-1 md:py-2">
                                                            Delete
                                                        </button>
                                                    )}
                                                </Popconfirm>
                                            )}
                                            {/* {
                        deleteMenus?.length > 0 && 
                        <Popconfirm
                        title="Delete the dish"
                        description="Are you sure to delete this dish?"
                        onConfirm={() => handleDeleteMenus()}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        {Menus.length != 0 && (
                          <button className="border rounded-md px-2 md:px-8 pont-poppins text-white bg-primary py-1 md:py-2">
                            Delete
                          </button>
                        )}
                      </Popconfirm>
                      } */}
                                        </div>
                                    </div>
                                ) : null}
                                <div>

                                    {component === "Halls" ? (
                                        <MarqueeVenues
                                            modalOpen={modalOpen}
                                            setModalOpen={setModalOpen}
                                            loading={loading}
                                            setLoading={setLoading}
                                            setDeleteVenues={setDeleteVenues}
                                            deleteVenues={deleteVenues}
                                            fetchData={fetchData}
                                        />
                                    ) : component === "Dishes" ? (
                                        <MarqueeMenus
                                            modalOpen={modalOpen}
                                            setModalOpen={setModalOpen}
                                            loading={loading}
                                            setLoading={setLoading}
                                            setDeleteMenus={setDeleteMenus}
                                            deleteMenus={deleteMenus}
                                            fetchData={fetchData}
                                        />
                                    ) : component === "Menus" ? (
                                        <Dish
                                            modalOpen={modalOpen}
                                            setModalOpen={setModalOpen}
                                            loading={loading}
                                            setLoading={setLoading}
                                            dishModalOpen={dishModalOpen}
                                            setDishModalOpen={setDishModalOpen}
                                            setDeleteDishes={setDeleteDishes}
                                            deleteDishes={deleteDishes}
                                            fetchData={fetchData}
                                        />
                                    ) : component === "Bookings" || isBookingAvailable ? (
                                        <BookedDate />
                                    )
                                        : component === "Availability" ? (
                                            <Availability />
                                        ) : component === "Approved" ? (
                                            <ApprovedMarquee />
                                        ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* {isOpen && (
                        <Lightbox
                            mainSrc={selectImage}
                            nextSrc={image[(photoIndex + 1) % image.length]}
                            prevSrc={image[(photoIndex + image.length - 1) % image.length]}
                            onCloseRequest={() => setIsOpen(false)}
                            onMovePrevRequest={() =>
                                setPhotoIndex((photoIndex + image.length - 1) % image.length)
                            }
                            onMoveNextRequest={() =>
                                setPhotoIndex((photoIndex + 1) % image.length)
                            }
                        />
                    )} */}
                </div>
            )}
        </>
    );
}

export default AdminMarqueeDetails;

