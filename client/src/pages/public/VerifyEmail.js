import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";
import bgImage from "../../assets/bg_login.png";
const VerifyEmail = () => {
  const { status } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === "fail")
      Swal.fire("Oop!", "Failed to register", "error").then(() => {
        navigate(`/${path.LOGIN}`);
      });
    if (status === "success")
      Swal.fire("Congratulation", "Successfully to register", "success").then(
        () => {
          navigate(`/${path.LOGIN}`);
        }
      );
  }, []);
  return (
    <div className="w-screen h-screen relative">
      <img
        src={bgImage}
        alt="login background"
        className="w-full h-full object-cover"
      />{" "}
    </div>
  );
};

export default VerifyEmail;
