"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useStore } from "../../../store";
import { Input, Form, message } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Link from "next/link";
import Loader from "@/app/_component/Loader";
import Image from "next/image";
import restaurantImage from "@/app/assets/images/restaurant.png";

const initialFormState = {
  email: "",
  password: "",
};

const onFinish = (values) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Login = () => {
  const [user, setUser] = useState(initialFormState);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userInformation, addUser } = useStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  useEffect(()=>{
  console.log(userInformation, "userInfoemation");
if(Object.keys(userInformation).length){
  alert("YEs there is lenght")
}
},[])
  const registrationInformation = async (id) => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      addUser(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No document!");
    }
  };

  // const handleLogin = () => {
  //   signInWithEmailAndPassword(auth, user.email, user.password)
  //     .then((userCredential) => {
  //       const user = userCredential.user;
  //       if (user) {
  //         setLoader(true);
  //         registrationInformation(user.uid);
  //         router.push("http://localhost:3000/adminMarquee");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("useruser", user);
  //       if (!user.email || !user.password) {
  //       } else {
  //         message.error("Please Enter a valid Email or Password");
  //         const errorCode = error.code;
  //       }
  //     });
  // };
  const handleLogin = (e) => {
    e.preventDefault()
    if (!user.email || !user.password) {
      message.error("Please Enter a valid Email and Password");
      return;
    }
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setLoader(true);
          registrationInformation(user.uid);
          router.push("/adminMarquee");
        }
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
        switch (error.code) {
          case message.error("auth/invalid-email"):
          case message.error("auth/user-not-found"):
          case message.error("auth/wrong-password"):
            message.error("Invalid email or password. Please try again.");
            break;
          default:
            message.error("An error occurred during sign-in. Please try again later.");
            break;
        }
      });
  };


  return (
    <div className=" h-[100vh] flex  justify-center items-center lg:flex lg:flex-row">
      <div className="w-full flex justify-center items-center  md:w-[50%] bg-white py-3   mx-auto    ">
        <Form
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full mx-auto"
        >
          <div className="flex justify-center items-center mx-auto mt-2 mb-14"></div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <h1 className=" flex justify-start items-start mb-10 text-2xl md:text-5xl font-Poppins text-primary">
              Login Now
            </h1>
            <div className="flex flex-col items-start relative mb-5">
              <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px] rounded-3xs bg-white w-[53.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Email</b>
              </div>
              <Form.Item
                name="username"
                rules={[
                  {
                    required: false,
                    message: "Please Fillout Your Email Input!",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:max-lg:w-[400px] lg:w-[500px] z-10 w-72  py-5 mb-3 flex justify-center text-xs relative"
                  placeholder="Type Your Email Here"
                  type=""
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div className="flex flex-col items-start relative">
              <div className="absolute top-[calc(50%_-_58.5px)] z-20 left-[19.89px]  rounded-3xs bg-white w-[83.67px] h-[22.56px] flex flex-row py-px px-1 box-border items-center justify-center">
                <b className="absolute leading-[100%] z-20 pt-1">Password</b>
              </div>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please Fillout Your Password Input !",
                  },
                ]}
              >
                <Input
                  className="border outline-none md:max-lg:w-[400px] lg:w-[500px] z-10 w-72  py-5 mb-3 flex justify-center text-xs relative"
                  placeholder="Type Your Password Here"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <p className="flex justify-end  sm:text-lg md:max-lg:w-[380px] w-[300px] lg:w-[500px]      cursor-pointer my-5 items-end text-primary">
              Forgot Password?
            </p>
          </div>

          <button
            className="border md:max-lg:w-[400px] lg:w-[500px] w-72 md:text-2xl flex justify-center font-Poppins mx-auto items-center rounded-md  md:my-5 py-2 md:py-4 px-10  cursor-pointer text-white bg-primary "
            onClick={handleLogin}
          >
            {" "}
            <>{loader ? <Loader /> : "Log in"}</>
          </button>
          <p className="flex justify-center sm:text-base  lg:text-sm  items-center mx-auto font-Poppins mt-8">
            Do not have an account?{" "}
            <Link
              className=" text-[#006CE1] ml-2 font-semibold"
              href="/adminMarquee/registration"
            >
              <div className="text-primary sm:text-xl sm:text-primary">
                Register Now
              </div>
            </Link>
          </p>
        </Form>
      </div>
      <div className="hidden md:flex md:flex-col md:justify-center  md:w-[50%] md:h-[100vh] relative w-full  px-1 ">
        <Image
          className="object-cover object-center w-full h-full"
          src={restaurantImage}
          alt="Restaurant"
          quality={100}
        />
      </div>
    </div>
  );
};

export default Login;
