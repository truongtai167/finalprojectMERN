import React, { memo, useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import icons from "../../ultils/icons";
import { Link, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { getCurrent } from "../../store/user/asyncAction";
import { logout, clearMessage } from "../../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { showOrder } from "../../store/app/appSlice";

const Header = () => {
  const { FaUserCircle, CiLogout, BsCart } = icons;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowOption, setisShowOption] = useState(false);
  const { isLoggedIn, current, message } = useSelector((state) => state.user);
  useEffect(() => {
    const setTimeoutId = setTimeout(() => {
      if (isLoggedIn) dispatch(getCurrent());
    }, 300);
    return () => {
      clearTimeout(setTimeoutId);
    };
  }, [dispatch, isLoggedIn]);
  useEffect(() => {
    if (message)
      Swal.fire("Oops!", message, "info").then(() => {
        dispatch(clearMessage());
        navigate(`/${path.LOGIN}`);
      });
  }, [message]);
  useEffect(() => {
    const handleClickoutOptions = (e) => {
      const profile = document.getElementById("profile");
      if (!profile?.contains(e.target)) setisShowOption(false);
    };
    document.addEventListener("click", handleClickoutOptions);
    return () => {
      document.removeEventListener("click", handleClickoutOptions);
    };
  }, []);
  return (
    <div className="border w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>

      <div className="flex items-center justify-end px-6 gap-2  border-gray-300">
        {isLoggedIn && current ? (
          <div
            className="flex cursor-pointer items-center justify-center px-6 gap-2 relative"
            onClick={() => setisShowOption((prev) => !prev)}
            id="profile"
          >
            <FaUserCircle size={24}></FaUserCircle>
            <span>{current?.name}</span>
            {isShowOption && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-full flex-col flex left-[16px] bg-gray-100 border min-w-[150px] py-2"
              >
                <Link
                  className="p-2 w-full hover:bg-sky-100"
                  to={`/${path.MEMBER}/${path.PERSONAL}`}
                >
                  Personal
                </Link>
                {+current.role === 20110394 && (
                  <Link
                    className="p-2 w-full hover:bg-sky-100"
                    to={`/${path.ADMIN}/${path.DASHBOARD}`}
                  >
                    Admin workspace
                  </Link>
                )}
                {+current.role === 20110396 && (
                  <Link
                    className="p-2 w-full hover:bg-sky-100"
                    to={`/${path.PITCH_OWNER}/${path.DASHBOARD_OWNER}`}
                  >
                    PitchOwner
                  </Link>
                )}
                <span
                  onClick={() => dispatch(logout())}
                  className="p-2 w-full hover:bg-sky-100"
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer ">
            <FaUserCircle size={24} className="text-red-500" />
            <Link className="pl-1 hover:text-red-500 " to={`/${path.LOGIN}`}>
              Sign In / Sign Up
            </Link>
          </div>
        )}
        {current && (
          <div
            className="flex items-center gap-1 cursor-pointer "
            onClick={() => dispatch(showOrder())}
          >
            <BsCart size={24} className="text-red-500" />
            <span className="hover:text-red-500">Booking</span>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
