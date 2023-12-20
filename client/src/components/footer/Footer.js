import React, { memo } from "react";

import { FaFacebookF, FaDiscord } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

import path from "ultils/path";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-blue-900 flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO BOOKING PITCHES
            </span>
            <small className="text-[13px] text-gray-300">
              Receive weekly football news
            </small>
          </div>
          <div className="text-3xl hover:text-yellow-500 transition duration-500 hover:scale-125 hover:-translate-x-5 cursor-pointer transform">
            <a
              href="https://www.facebook.com/profile.php?id=61554601046418"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <FaFacebookF size={20}></FaFacebookF>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="h-[250px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-blue-900 pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">
                <a
                  href="https://www.google.com/maps/place/Tr%C6%B0%E1%BB%9Dng+%C4%90%E1%BA%A1i+h%E1%BB%8Dc+S%C6%B0+ph%E1%BA%A1m+K%E1%BB%B9+thu%E1%BA%ADt+Th%C3%A0nh+ph%E1%BB%91+H%E1%BB%93+Ch%C3%AD+Minh/@10.8506376,106.7670422,17z/data=!3m1!4b1!4m6!3m5!1s0x31752763f23816ab:0x282f711441b6916f!8m2!3d10.8506324!4d106.7719131!16s%2Fm%2F02pz17z?hl=vi-VN&entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  1 Vo Van Ngan Street, Thu Duc District
                </a>
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+84) 0909 0909 09</span>
            </span>
            <span>
              <span>Mail: </span>
              <span className="opacity-70">debugboy@gmail.com</span>
            </span>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/profile.php?id=61554601046418"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-[50px] w-[50px] bg-[#3d3c3c] rounded-md  flex items-center justify-center text-white">
                  <FaFacebookF size={20}></FaFacebookF>
                </div>
              </a>
              <a
                href="https://discord.gg/wHRUjCBt"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-[50px] w-[50px] bg-[#3d3c3c] rounded-md flex items-center justify-center text-white">
                  <FaDiscord size={18}></FaDiscord>
                </div>
              </a>

              <a
                href="mailto:debugboy@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="h-[50px] w-[50px] bg-[#3d3c3c] rounded-md flex items-center justify-center text-white">
                  <BiLogoGmail size={18}></BiLogoGmail>
                </div>
              </a>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-blue-900 pl-[15px]">
              INFORMATION
            </h3>
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/${path.PITCHES}`)}
            >
              Gallery
            </span>
            {/* <span className="cursor-pointer">Store Location</span> */}
            <span
              className="cursor-pointer"
              onClick={() => window.scrollTo(350, 350)}
            >
              Today's Deals
            </span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-blue-900 pl-[15px]">
              WHO WE ARE
            </h3>
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/${path.FAQ}`)}
            >
              Help
            </span>
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/${path.FAQ}`)}
            >
              FAQs
            </span>
            <span
              className="cursor-pointer"
              onClick={() => navigate(`/${path.FAQ}`)}
            >
              Contact
            </span>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-blue-900 pl-[15px]">
              #BOOKINGPITCHESWEBSITE
            </h3>
            <p className="text-justify">
              Welcome to BookingPitches Website. We are passionate about
              providing a seamless and enjoyable experience for all football
              enthusiasts. Our state-of-the-art facilities and user-friendly
              platform make it easy for you to reserve the perfect pitch for
              your game.
            </p>
            <p className="mt-2 text-justify">
              Get in touch with us for any inquiries or assistance. We're here
              to enhance your football experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
