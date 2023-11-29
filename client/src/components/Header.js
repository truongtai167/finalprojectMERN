import React, { useEffect } from "react";
import logo from "../assets/logo.png";
import icons from "../ultils/icons";
import { Link } from "react-router-dom";
import path from "..//ultils/path";
import { getCurrent } from "../store/user/asyncAction";
import { logout } from "../store/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Header = () => {
  const { FaUserCircle, CiLogout, BsCart } = icons;
  const dispatch = useDispatch();
  const { isLoggedIn, current } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getCurrent());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="border w-main flex justify-between h-[110px] py-[35px]">
      <Link to={`/${path.HOME}`}>
        <img src={logo} alt="logo" className="w-[234px] object-contain" />
      </Link>

      <div>
        {/* <div>
          <form className="flex-nowrap justify-between items-center bg-zinc-100 shadow-sm border border-zinc-200 rounded-full lg:mx-4 py-1 px-2 inline-flex max-w-[449px]">
            <div className="px-2 lg:w-[296px] lg:px-0">
              <div
                className="lg:px-4 xs:pl-0"
                style={{ display: "flex", alignItems: "center" }}
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 256 256"
                  className="text-lg text-zinc-900"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></path>
                </svg>
                <div style={{ zIndex: 100000, width: "100%" }}>
                  <input
                    type="Text"
                    placeholder="Location"
                    autocomplete="off"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded="false"
                  />
                  <div className="fixed z-[10000] rounded-xl overflow-hidden md:mt-2 text-[1.1rem] border border-zinc-50 shadow"></div>
                </div>
              </div>
            </div>
            <div className="items-center hidden lg:block">
              <button
                type="button"
                class="min-w-[11.75rem] w-fit gap-2 justify-start text-left font-normal lg:px-4 py-2 flex items-center xs:pl-0 text-zinc-500"
                aria-haspopup="dialog"
                aria-expanded="false"
                aria-controls="radix-0"
                data-state="closed"
              >
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 256 256"
                  className="text-lg text-zinc-900"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path>
                </svg>
                <span>Pick a Date</span>
              </button>
            </div>
            <button
              type="button"
              className="h-10 px-5 flex items-center justify-center rounded-full bg-white border border-zinc-200/50 shadow-sm group/search"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 256 256"
                className="text-lg text-zinc-900"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </button>
          </form>
        </div> */}
      </div>

      <div className="flex items-center justify-end px-6 gap-2  border-gray-300">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 cursor-pointer ">
            <div
              className="flex items-center gap-2 cursor-pointer group border-r-2"
              onClick={() => {
                /* handle user profile click */
              }}
            >
              <FaUserCircle size={24} className="group-hover:text-red-500" />
              <span className="group-hover:text-red-500 mr-2">
                {current?.name}
              </span>
            </div>
            <div
              className="flex items-center gap-2 cursor-pointer group border-r-2 mr-2"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <CiLogout size={24} className="group-hover:text-red-500" />
              <span className="group-hover:text-red-500 mr-2 ">Logout</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer group">
            <FaUserCircle size={24} className="group-hover:text-red-500" />
            <Link
              className="pl-1 group-hover:text-red-500"
              to={`/${path.LOGIN}`}
            >
              Sign In / Sign Up
            </Link>
          </div>
        )}
        <div className="flex items-center gap-1 cursor-pointer group">
          <BsCart size={24} className="group-hover:text-red-500" />
          <span className="group-hover:text-red-500">Dat San</span>
        </div>
      </div>
    </div>
  );
};
export default Header;
