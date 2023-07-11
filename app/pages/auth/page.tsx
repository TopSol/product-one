"use client";
import React, { use, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
const initialFormState = {
  email: "",
  password: "",
};
function Login() {
  const [user, setUser] = useState(initialFormState);
  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const users = signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          e.preventDefault();
          router.push("/pages/admainMarqueeDetails");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Email or password is incorrect");
      });
  };

  return (
    <div className=" mx-auto my-auto w-full h-[100vh] flex flex-col lg:flex lg:flex-row">
      <h1 className="font-bold lg:hidden ml-10 mb-3 text-3xl font-vollkorn text-textColor items-center">
       Login
      </h1>
      <div className="relative w-full lg:w-[65%] px-10">
        <img
          src="https://images.pexels.com/photos/3887985/pexels-photo-3887985.jpeg?auto=compress&cs=tinysrgb&w=600"
          className=" lg:absolute inset-0 object-cover w-full h-full "
        />
        <div className="absolute  w-full inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"></div>
      </div>

      <div className="w-full  lg:w-[35%] px-10  py-3 rounded-md shadow-xl flex justify-center mx-auto items-center    ">
        <form className="border p-5 rounded-md shadow-xl ">
          <h1 className="hidden lg:block mb-5 text-3xl font-vollkorn text-textColor items-center">
          Login
          </h1>
          <div className="flex flex-col items-start">
            <label className="font-roboto">Email</label>
            <input
              type="email"
              placeholder="Enter email here..."
              name="name"
              value={user.email}
              onChange={handleChange}
              className="border-b w-[65%] outline-none  py-2 mb-3"
            />
          </div>
          <div className="flex flex-col items-start">
            <label className="font-roboto">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password here..."
              value={user.password}
              onChange={handleChange}
              className="border-b w-[65%] outline-none  py-2 mb-3"
            />
          </div>
      <button className="border flex justify-center mx-auto items-center rounded-md py-1 px-5 cursor-pointer bg-primaryColor " onClick={(e)=>handleLogin(e)}> Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;