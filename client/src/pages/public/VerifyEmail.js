import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import Swal from "sweetalert2";

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
  return <div className="h-screen w-screen bg-red-100"></div>;
};

export default VerifyEmail;
