"use client";
import React, { use, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { useRouter } from 'next/navigation'
const initialFormState = {
  email: "",
  password: "",
};
function Login() {
  const [user, setUser] = useState(initialFormState);
  const router = useRouter()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = (e) =>{
    e.preventDefault()
   const users=  signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      const user = userCredential.user;
       if(user){
        e.preventDefault()
    router.push("/pages/admainMarqueeDetails")
        }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Email or password is incorrect")
    });
  }
  
  return (
    <div className="md:container mx-auto h-[90vh] flex items-center justify-center flex-col  ">
      <p className="mb-3 text-lg">Login</p>
      <div className="border rounded-md flex  flex-col  h-[40%] w-[90%] md:w-[50%] lg:w-[40%] px-6 justify-around">
        <div className="flex justify-between items-center">
          <label className="text-xl">Name:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border  rounded-md outline-none pl-3 py-2"
          />
        </div>

        <div className="flex justify-between items-center">
          <label className="text-xl">price:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            className="border rounded-md outline-none pl-3 py-2"
          />
        </div>
        
      {/* <Link href="/pages/admainMarqueeDetails"><button className="border rounded-md py-2 cursor-pointer" onClick={()=>handleLogin()}> Login</button></Link> */}
      <button className="border rounded-md py-2 cursor-pointer" onClick={(e)=>handleLogin(e)}> Login</button>
      </div>
    </div>
  );
}

export default Login;
