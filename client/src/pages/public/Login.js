import React, { useCallback, useState } from "react";
import bgImage from "../../assets/bg_login.png";
import { Button, InputField } from "../../components";
import { apiRegister, apiLogin } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location);
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setpayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };
  const handleSubmit = useCallback(async () => {
    const { name, phoneNumber, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      if (response.success) {
        Swal.fire("Congratulation", response.message, "success").then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else Swal.fire("Oops", response.message, "error");
    } else {
      const result = await apiLogin(data); // login
      if (result.success) {
        dispatch(
          register({
            isLoggedIn: true,
            token: result.accessToken,
            userData: result.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else Swal.fire("Oops", result.message, "error");
    }
  }, [payload, isRegister]);
  return (
    <div className="w-screen h-screen relative">
      <img
        src={bgImage}
        alt="login background"
        className="w-full h-full object-cover"
      />
      <div className="absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex">
        <div className="p-8 bg-white flex flex-col items-center rounded-md min-w-[500px]">
          <h1 className="text-[28px] font-semibold text-main">
            {isRegister ? "Register" : "login"}
          </h1>
          {isRegister && (
            <InputField
              value={payload.name}
              setValue={setpayload}
              nameKey="name"
            />
          )}
          <InputField
            value={payload.email}
            setValue={setpayload}
            nameKey="email"
            type={"email"}
          />
          <InputField
            value={payload.password}
            setValue={setpayload}
            nameKey="password"
            type={"password"}
          />
          {isRegister && (
            <InputField
              value={payload.phoneNumber}
              setValue={setpayload}
              nameKey="phoneNumber"
              type={"tel"}
            />
          )}
          <Button
            name={isRegister ? "Register" : "login"}
            handleOnClick={handleSubmit}
            fw
          />

          <div className="flex items-center justify-between my-2 w-full">
            {!isRegister && (
              <span
                // onClick={() => setisForgotPassword(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Forgot password
              </span>
            )}
            {!isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer"
                onClick={() => setIsRegister(true)}
              >
                Sign Up
              </span>
            )}
            {isRegister && (
              <span
                className="text-blue-500 hover:underline cursor-pointer w-full text-center"
                onClick={() => setIsRegister(false)}
              >
                Back to Login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
