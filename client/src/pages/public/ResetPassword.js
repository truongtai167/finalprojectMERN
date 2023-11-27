import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiResetPassword } from "../../apis/user";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import bgImage from "../../assets/bg_login.png";
import icons from "../../ultils/icons";

const { FaEye, FaEyeSlash } = icons;
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { token } = useParams();
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token });
    if (response.success) {
      toast.success(response.message, { theme: "colored" });
    } else {
      toast.info(response.message, { theme: "colored" });
    }
    // console.log(response);
  };
  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-0 left-0 animate-slide-right bottom-0 right-0 bg-overlay flex flex-col items-center py-8 z-50">
        <div className="flex flex-col gap-4">
          <label htmlFor="password" className="text-white text-lg font-bold ">
            Enter your new password:
          </label>
          <div className="relative flex">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[400px] border-b outline-none p-2 placeholder:text-sm"
              placeholder="Type here ..."
              value={password}
              onChange={(el) => setPassword(el.target.value)}
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <span onClick={handleTogglePassword}>
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 gap-2">
          <Button
            name={"submit"}
            handleOnClick={handleResetPassword}
            style={
              "px-4 py-2 rounded-md text-white bg-green-500 text-semibold my-2"
            }
          />
          <Link to="/login">
            <Button
              name="Back to login"
              style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2"
            ></Button>
          </Link>
        </div>
      </div>

      <img
        src={bgImage}
        alt="login background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ResetPassword;
