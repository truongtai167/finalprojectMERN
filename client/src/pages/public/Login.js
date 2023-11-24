import React, { useCallback, useState } from "react";
import bgImage from "../../assets/bg_login.png";
import { Button, InputField } from "../../components";
const Login = () => {
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handleSubmit = useCallback(() => {console.log(payload)}, [payload]);
  return (
    <div className="w-screen h-screen relative">
      <img
        src={bgImage}
        alt="login background"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main">Login</h1>
          {/* <InputField
            value={payload.email}
            setValue={setpayload}
            nameKey="name"
          /> */}
          <InputField
            value={payload.email}
            setValue={setpayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setpayload}
            nameKey="password"
            type={'password'}
          />
          <span> </span>
          <Button name={"login"} handleOnClick={handleSubmit} fw />

          <div className="flex items-center justify-between my-2 w-full">
            <span className="text-blue-500 hover:underline cursor-pointer w-full">
              Forgot password
            </span>
            <span className="text-blue-500 hover:underline cursor-pointer w-full">
              Sign Up
            </span>
            <span className="text-blue-500 hover:underline cursor-pointer w-full text-center">
              Back to Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
