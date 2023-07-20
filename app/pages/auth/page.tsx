// "use client";
// import React, { use, useState } from "react";
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
// import Link from "next/link";
// import { auth } from "@/app/firebase";
// import { useRouter } from "next/navigation";
// import { useStore } from "../../../store";
// import { Input, Space } from "antd";
// import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

// const initialFormState = {
//   email: "",
//   password: "",
// };

// function Login() {
//   const [user, setUser] = useState(initialFormState);
//   const [color, setColor] = useState()
//   const router = useRouter();
//   const { userInformation, addUser } = useStore();
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const users = signInWithEmailAndPassword(auth, user.email, user.password)
//       .then((userCredential) => {
//         const user = userCredential.user;
//         console.log(user, "signin", user.uid);
//         if (user) {
//           e.preventDefault();
//           addUser(user.uid);
//           console.log(userInformation, "userInformation");
//           router.push("/pages/admainMarqueeDetails");
//         }
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert("Email or password is incorrect");
//       });

//       if (user.email || user.password == "") {
//       }
//   };

//   return (
//     <div className=" mx-auto my-auto w-full h-[100vh] flex flex-col lg:flex lg:flex-row">
//       <div className="hidden md:block relative w-full lg:w-[42%] px-10 bg-bgColor">
//         <img
//           src="https://app.gigsasa.com/static/media/login.32e3bd42.png"
//           className=" lg:absolute inset-0 object-fill flex justify-center mx-auto h-[80%] mt-32 "
//         />
//         {/* <div className="absolute  w-full inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-60"></div> */}
//       </div>

//       <div className="w-full  lg:w-[60%]   py-3 rounded-md  flex justify-center mx-auto items-start    ">
//         <form className="w-full mx-auto">
//           <div className="flex justify-center items-center mx-auto mt-2 mb-14">
//           <img src="https://media.licdn.com/dms/image/D4D3DAQGLvK2QlE3Tlw/image-scale_191_1128/0/1679133066724?e=1689843600&v=beta&t=xhdlD8DfKXTKHe1tTXhhge8IW0k2I0lx8Bc9QMMATLQ" alt="" className="w-[70%]"/>
//           </div>
//           <div className="flex flex-col justify-center items-center mx-auto">

//           <h1 className=" flex justify-start items-start mb-5 text-xl font-bold font-roboto  text-primaryColor  md:-ml-[220px] ">
//             Login to access your account
//           </h1>
//           <div className="flex flex-col items-start">
//             <label className="font-roboto font-bold my-2">EMAIL / PHONE</label>
//             <Input
//               type="email"
//               placeholder="Type Your Email / Phone"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72  py-4 mb-3 flex justify-center "            />
//           </div>
//           <div className="flex flex-col items-start">
//             <Space direction="vertical">
//             <label className="font-roboto font-bold">PASSWORD</label>
//               <Input.Password
//                 placeholder="Type Your Password"
//                 type="password"
//                 name="password"
//                 value={user.password}
//                 onChange={handleChange}
//                 className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72 py-4 mb-3 flex justify-center "
//                 iconRender={(visible) =>
//                   visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
//                 }
//               />
//             </Space>
//           </div>
//           <p className="flex justify-end  md:ml-[360px] cursor-pointer text-primaryColor font-bold items-end">Forgot Password?</p>
//           </div>
//           <button
//             className="border md:w-[500px] w-72 flex justify-center mx-auto items-center rounded-md  my-5 py-4 px-10 cursor-pointer text-white bg-secondaryColor "
//             onClick={(e) => handleLogin(e)}
//           >
//             {" "}
//             Login
//           </button>
//           <p className="flex justify-center items-center mx-auto md:-ml-[260px]">
//           Don’t have an account? <Link className=" text-primaryColor  font-semibold" href='/pages/registration'>Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
// export default Login;

"use client";
import React, { use, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { auth } from "@/app/firebase";
import { useRouter } from "next/navigation";
import { useStore } from "../../../store";
import { Input, Space, Button, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

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
  const router = useRouter(); // Use useRouter instead of next/navigation
  const { userInformation, addUser } = useStore();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleLogin = () => {
 
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user, "signin", user.uid);
        if (user) {
          addUser(user.uid);
          console.log(userInformation, "userInformation");
          console.log(user, "user");
          router.push("/pages/admainMarqueeDetails");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Handle the error, show an alert, or display an error message to the user.
        // alert("Email or password is incorrect");
      });
  };
  return (
    <div className=" mx-auto my-auto w-full h-[100vh] flex flex-col lg:flex lg:flex-row">
      <div className="hidden md:block relative w-full lg:w-[42%] px-10 bg-bgColor">
        <img
          src="https://app.gigsasa.com/static/media/login.32e3bd42.png"
          className=" lg:absolute inset-0 object-fill flex justify-center mx-auto h-[80%] mt-32 "
        />
      </div>

      <div className="w-full  lg:w-[60%]   py-3 rounded-md  flex justify-center mx-auto items-start    ">
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
            <img
              src="https://media.licdn.com/dms/image/D4D3DAQGLvK2QlE3Tlw/image-scale_191_1128/0/1679133066724?e=1689843600&v=beta&t=xhdlD8DfKXTKHe1tTXhhge8IW0k2I0lx8Bc9QMMATLQ"
              alt=""
              className="w-[70%]"
            />
          </div>
          <div className="flex flex-col justify-center items-center mx-auto">
            <h1 className=" flex justify-start items-start mb-5 text-xl font-bold font-roboto  text-primaryColor  md:-ml-[220px] ">
              Login to access your account
            </h1>
            <div className="flex flex-col items-start">
              <label className="font-roboto font-bold my-2">EMAIL / PHONE</label>
              <Form.Item
                name="username"
                rules={[
                  {
                    type:"email",
                    required: true,
                    message: "Please input your Email/Phone!",
                  },
                ]}
              >
                <Input 
                className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72  py-4 mb-3 flex justify-center "
                placeholder="Type Your Email / Phone"
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                />
              </Form.Item>
            </div>
            <div>
            <label className="font-roboto font-bold my-2">Password</label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input 
              className="border-[2px] md:border-[3px]   outline-none md:w-[500px] w-72  py-4 mb-3 flex justify-center "
              placeholder="Type Your Password"
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              />
            </Form.Item>
            </div>
            <p className="flex justify-end   md:ml-[360px] cursor-pointer text-primaryColor font-bold items-end">
              Forgot Password?
            </p>
          </div>
          
          <button
            className="border md:w-[500px] w-72 flex justify-center mx-auto items-center rounded-md  my-5 py-4 px-10 cursor-pointer text-white bg-secondaryColor "
            onClick={handleLogin}
          >
            {" "}
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
