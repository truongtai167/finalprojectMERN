import React, { memo } from "react";
import icons from "../ultils/icons";

const { MdEmail, FaFacebook, FaDiscord, FaYoutube, BiLogoGmail } = icons;
const Footer = () => {
  return (
    <div className="w-full">
      <div className="h-[103px] w-full bg-main flex items-center justify-center">
        <div className="w-main flex items-center justify-between">
          <div className="flex flex-col flex-1">
            <span className="text-[20px] text-gray-100">
              SIGN UP TO BOOKING PITCHES
            </span>
            <small className="text-[15px] text-gray-300">
              Receive weekly football news
            </small>
          </div>
          <div className="flex-1 flex tems-center">
            <input
              type="text"
              className="p-4 pr-0 rounded-l-full w-full bg-[#F04646] outline-none text-gray-100 placeholder:text-sm 
                        placeholder:text-gray-200 placeholder:italic placeholder:opacity-50"
              placeholder="Email address"
            ></input>
            <div className="h-[56px] w-[56px] bg-[#F04646] rounded-r-full flex items-center justify-center text-white">
              <MdEmail size={18}></MdEmail>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[407px] w-full bg-gray-800 flex items-center justify-center text-white text-[13px]">
        <div className="w-main flex">
          <div className="flex-2 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              ABOUT US
            </h3>
            <span>
              <span>Address: </span>
              <span className="opacity-70">
                1 Vo Van Ngan Street, Thu Duc District
              </span>
            </span>
            <span>
              <span>Phone: </span>
              <span className="opacity-70">(+84) 0909 0909 09</span>
            </span>
            <span>
              <span>Email: </span>
              <span className="opacity-70">debugboy@gmail.com</span>
            </span>
            <div className="flex gap-4">
              <div className="h-[50px] w-[50px] bg-[#3d3c3c]  flex items-center justify-center text-white">
                <FaFacebook size={20}></FaFacebook>
              </div>
              <div className="h-[50px] w-[50px] bg-[#3d3c3c]  flex items-center justify-center text-white">
                <FaDiscord size={18}></FaDiscord>
              </div>
              <div className="h-[50px] w-[50px] bg-[#3d3c3c]  flex items-center justify-center text-white">
                <FaYoutube size={18}></FaYoutube>
              </div>
              <div className="h-[50px] w-[50px] bg-[#3d3c3c]  flex items-center justify-center text-white">
                <BiLogoGmail size={18}></BiLogoGmail>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              INFORMATION
            </h3>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              WHO WE ARE
            </h3>
            <span>Help</span>
            <span>FAQs</span>
            <span>Contact</span>
            <span>Return & Exchange</span>
          </div>
          <div className="flex-1 flex flex-col gap-2 mr-4">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
              NEWS & UPDATES
            </h3>
            <p>
              Subscribe to our newsletter for the latest news, promotions, and
              exclusive offers. Sign up now!
            </p>
          </div>
          <div className="flex-1">
            <h3 className="mb-[20px] text-[15px] font-medium border-l-2 border-main pl-[15px]">
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
