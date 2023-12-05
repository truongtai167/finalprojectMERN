import React, { useCallback, useEffect, useState } from "react";
import bgImage from "../../assets/bg_login.png";
import { Button, InputField, Loading } from "../../components";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiVerify,
} from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { showModel } from "../../store/app/appSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { validate } from "../../ultils/helpers";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const location = useLocation();
  // console.log(location);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });
  const [invalidFields, setInvalidFields] = useState([]);
  const [isRegister, setIsRegister] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [token, setToken] = useState("");
  const [isVerifyEmail, setIsVerifyEmail] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
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
  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  // submit
  // console.log(validate(payload));
  const handleSubmit = useCallback(async () => {
    const { name, phoneNumber, ...data } = payload;
    // console.log("isRegister", isRegister);
    // console.log("payload", payload);
    // console.log("data", data);
    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        dispatch(showModel({ isShowModel: true, modelChildren: <Loading /> }));
        const response = await apiRegister(payload);
        dispatch(showModel({ isShowModel: false, modelChildren: null }));
        if (response.success) {
          setIsVerifyEmail(true);
        } else Swal.fire("Oops", response.message, "error");
      } else {
        const result = await apiLogin(data); // login
        if (result.success) {
          dispatch(
            login({
              isLoggedIn: true,
              token: result.accessToken,
              userData: result.userData,
            })
          );
          navigate(`/${path.HOME}`);
        } else Swal.fire("Oops", result.message, "error");
      }
    }
  }, [payload, isRegister]);

  const finalRegister = async () => {
    console.log({ token });
    const response = await apiVerify(token);
    if (response.success) {
      Swal.fire("Congratulation", response.message, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire("Oops", response.message, "error");
    setIsVerifyEmail(false);
    setToken("");
  };

  return (
    <div className="w-screen h-screen relative">
      {isVerifyEmail && (
        <div className="absolute top-0 left-0 animate-slide-right bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50">
          <div className="flex flex-col gap-4">
            {/* <h4 className="text-2xl font-semibold text-main mb-4">
            We've sent you a registration code. Please check your email and
            enter the code:
          </h4> */}
            <label htmlFor="text" className="text-white text-lg font-bold ">
              We've sent you a registration code. Please check your email and
              enter the code:
            </label>
            <input
              type="text"
              id="token"
              className="w-[800px] border-b outline-none p-4 placeholder:text-sm"
              placeholder="Exp: DEBUGBOY-xxxxxxxxx "
              value={token}
              onChange={(el) => setToken(el.target.value)}
            />
          </div>
          <div className="flex items-center justify-end mt-4 gap-2">
            <Button
              name={"submit"}
              handleOnClick={finalRegister}
              style={
                "px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
              }
            />
            {/* <Button
              name={"Cancel"}
              handleOnClick={() => setIsVerifyEmail(false)}
              style={
                "px-4 py-2 rounded-md text-white bg-red-500 text-semibold my-2"
              }
            /> */}
          </div>
        </div>
      )}

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
              setValue={setPayload}
              nameKey="name"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            type={"email"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type={"password"}
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            fullWidth
          />
          {isRegister && (
            <InputField
              value={payload.phoneNumber}
              setValue={setPayload}
              nameKey="phoneNumber"
              type={"tel"}
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
              fullWidth
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
