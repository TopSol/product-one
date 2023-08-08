"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useStore } from "../../../store";
import { Input, Form } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import Loader from "@/app/component/Loader";
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

function Login() {
  const [user, setUser] = useState(initialFormState);
  const [loader, setLoader] = useState(false)
  const router = useRouter();
  const { userInformation, addUser } = useStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const registrationInformation = async (item) => {
    const docRef = doc(db, "users", item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      addUser(docSnap.data());
      console.log("Document data:", docSnap.data());
    } else {
      console.log("No document!");
    }
  };
  console.log(userInformation, "userInformation");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "signin", user.uid);
        if (user) {
          registrationInformation(user.uid);
          router.push("/pages/admainMarqueeDetails");
          setLoader(true)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className=" mx-auto my-auto w-full h-[100vh] flex flex-col lg:flex lg:flex-row">
      <div className="hidden md:block relative w-full lg:w-[42%] px-10 ">
        <img
          src="https://account.asus.com/img/login_img02.png"
          className=" lg:absolute inset-0 object-cover flex justify-center mx-auto mt-32 "
        />
      </div>

      <div className="w-full  lg:w-[60%] bg-bgColor  py-3   flex justify-center mx-auto items-start    ">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="w-full mx-auto"
        >
          <div className="flex justify-center items-center mx-auto mt-2 mb-14">
            {/* <img
              src=""
              // src="https://media.licdn.com/dms/image/D4D3DAQGLvK2QlE3Tlw/image-scale_191_1128/0/1679133066724?e=1689843600&v=beta&t=xhdlD8DfKXTKHe1tTXhhge8IW0k2I0lx8Bc9QMMATLQ"
              alt=""
              className="w-[70%]"
            /> */}
          </div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <h1 className=" flex justify-start items-start mb-5 text-2xl font-extrabold font-vollkorn  md:-ml-[205px] ">
              Login to access your account
            </h1>
            <div className="flex flex-col items-start">
              <label className="font-roboto font-bold my-2">
                EMAIL / PHONE
              </label>
              <Form.Item
                name="username"
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please input your Email/Phone!",
                  },
                ]}
              >
                <Input
                  className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72  py-4 mb-3 flex justify-center text-xs"
                  placeholder="Type Your Email / Phone"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div>
              <label className="font-roboto font-bold my-2">PASSWORD</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input
                  className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72  py-4 mb-3 flex justify-center text-xs"
                  placeholder="Type Your Password"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
              </Form.Item>
            </div>
            <p className="flex justify-end   md:ml-[360px] cursor-pointer font-bold items-end">
              Forgot Password?
            </p>
          </div>

          <button
            className="border md:w-[500px] w-72 flex justify-center mx-auto items-center rounded-md  my-5 py-4 px-10 font-extrabold cursor-pointer text-white bg-[#61ADFF] "
            onClick={handleLogin}
          >
            {" "}
            <>
            {
              loader? (<Loader/>) :("Login")
            }
            </>
          </button>
          <p className="flex justify-center font-extrabold items-center mx-auto md:-ml-[285px]">
            Don’t have an account?{" "}
            <Link
              className=" text-[#006CE1] ml-2 font-semibold"
              href="/pages/registration"
            >
              Register
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Login;
