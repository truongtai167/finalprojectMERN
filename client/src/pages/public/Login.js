import React, { useCallback, useState } from "react";
import bgImage from "../../assets/bg_login.png";
import { Button, InputField } from "../../components";
import { apiRegister, apiLogin, apiForgotPassword } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { register } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log(location);
  const [payload, setpayload] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const resetPayload = () => {
    setpayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    });
  };
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    if (response.success) {
      toast.success(response.message, { theme: "colored" });
    } else {
      toast.info(response.message, { theme: "colored" });
    }
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
      {isForgotPassword && (
        <div className="absolute top-0 left-0 animate-slide-right bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            <label htmlFor="email" className="text-white text-lg font-bold ">
              Enter your email:
            </label>
            <input
              type="text"
              id="email"
              className="w-[800px] border-b outline-none p-4 placeholder:text-sm"
              placeholder="Exp: example@gmail.com"
              value={email}
              onChange={(el) => setEmail(el.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mt-4 gap-2">
            <Button
              name={"submit"}
              handleOnClick={handleForgotPassword}
              style={
                "px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
              }
            />
            <Button
              name={"Back"}
              handleOnClick={() => setIsForgotPassword(false)}
              style={
                "px-4 py-2 rounded-md text-white bg-red-500 text-semibold my-2"
              }
            />
          </div>
        </div>
      )}
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
                onClick={() => setIsForgotPassword(true)}
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
            {!isRegister && (
              <Link
                className="text-blue-500 hover:underline cursor-pointer"
                to={`/${path.HOME}`}
              >
                Homepage
              </Link>
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
