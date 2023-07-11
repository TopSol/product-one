"use client";
import React, { use, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebase";
const initialFormState = {
  email: "",
  password: "",
};
function Login() {
  const [user, setUser] = useState(initialFormState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // const auth = getAuth();
  const handleLogin = () =>{
   const users= createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user, "userdd44222",users);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
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
        <button className="border rounded-md py-2 cursor-pointer" onClick={()=>handleLogin()}> Login</button>
      </div>
    </div>
  );
}

export default Login;
