import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { apiGetPitch, apiGetPitches } from "../../apis";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import icons from "../../ultils/icons";
import { PitchExtraInformation } from "../../ultils/constants";
import {
  Breadcrumb,
  Button,
  PitchExtraInfo,
  PitchInformation,
  CustomSlider,
  ChooseDate,
} from "../../components";
// import ReactImageMagnify from "react-image-magnify";
import {
  formatMoney,
  formatPrice,
  renderStarFromNumber,
} from "../../ultils/helpers";
const {
  FaCalendarAlt,
  FaShieldAlt,
  FaCar,
  AiOutlineSafety,
  FaWifi,
  IoFastFood,
  BsFillTelephoneForwardFill,
} = icons;
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
};

function DetailPitch() {
  const { pitchId, title, category, brand } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [pitch, setPitch] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [relatedPitches, setRelatedPitches] = useState(null);
  const [update, setUpdate] = useState(false);
  const fetchPitchData = async () => {
    const response = await apiGetPitch(pitchId);
    if (response.success) {
      setPitch(response.PitchData);
      setCurrentImage(response.PitchData?.images[0]);
    }
  };
  const fetchPitches = async () => {
    const response = await apiGetPitches({ brand });
    if (response.success) setRelatedPitches(response.pitches);
  };

  const handleClickImage = (e, el) => {
    e.stopPropagation();
    setCurrentImage(el);
  };
  useEffect(() => {
    if (pitchId) {
      fetchPitchData();
      fetchPitches();
    }
    window.scrollTo(0, 0);
  }, [pitchId]);
  useEffect(() => {
    if (pitchId) {
      fetchPitchData();
    }
  }, [update]);

  const rerender = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  return (
    <div className="w-full">
      <div className="h-[81px] flex justify-center items-center bg-gray-100">
        <div className="w-main ml-2">
          <h3 className="font-semibold ">{title}</h3>
          <Breadcrumb
            title={title}
            category={category}
            brand={brand}
          ></Breadcrumb>
        </div>
      </div>
      <div className="w-main flex m-auto mt-4">
        <div className="flex flex-col gap-3 w-2/5 ">
          <img
            src={currentImage}
            alt="pitch"
            className="border h-[470px] w-[520px] object-cover"
          />
          <div className="w-[520px]">
            <Slider className="image-slider" {...settings}>
              {pitch?.images?.map((el, index) => (
                <div className="flex w-full gap-1" key={index}>
                  <img
                    onClick={(e) => handleClickImage(e, el)}
                    src={el}
                    alt="sub-pitch"
                    className="h-[150px] w-[180px] cursor-pointer border object-cover"
                  ></img>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-2/5 pr-[24px] gap-4">
          <h2 className="text-[30px] font-semibold">{pitch?.name}</h2>
          <h3 className="text-[30px] font-semibold">{`${formatMoney(
            formatPrice(pitch?.price)
          )} VNĐ`}</h3>
          <div className="flex items-center mt-2">
            {renderStarFromNumber(pitch?.totalRatings, 24)?.map((el, index) => (
              <span key={index}>{el}</span>
            ))}
          </div>
          <h2 className="font-semibold pt-2">Brand:</h2>
          <span>{pitch?.brand} </span>
          <h2 className="font-semibold pt-2 ">Description:</h2>
          <ul className="list-item list-disc text-sm text-gray-500 ml-4">
            {pitch?.description?.map((el) => (
              <li className="leading-6" key={el}>
                {el}
              </li>
            ))}
          </ul>
          <h2 className="font-semibold">Address:</h2>

          <ul className="list-item text-sm text-gray-500">{pitch?.address}</ul>
          <div>
            <h2 className="font-semibold">Shift:</h2>
          </div>
          <div>
            <h2 className="font-semibold">Date:</h2>
            <div className="border font-bold mb-4 p-2 flex items-center">
              <FaCalendarAlt className="mr-2" />
              {/* <ChooseDate /> */}
              {/* <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                showPopperArrow={false}
                className="w-full border-none outline-none"
                popperClassName="datepicker-popper"
              /> */}
            </div>
          </div>
          <div>
            <Button name="Booking" fw></Button>
          </div>
        </div>

        <div className="w-1/5">
          {PitchExtraInformation?.map((el) => (
            <PitchExtraInfo
              key={el.id}
              title={el.title}
              icon={el.icon}
              sub={el.sub}
            />
          ))}
        </div>
      </div>
      <div className="w-main m-auto mt-8">
        <PitchInformation
          totalRatings={pitch.totalRatings}
          ratings={pitch?.ratings}
          namePitch={pitch?.name}
          pid={pitch?._id}
          rerender={rerender}
        />
      </div>
      <div className="w-main m-auto mt-8">
        <h3 className="text-[20px] font-semibold py-[15px] border-b-2 border-main">
          OTHER PITCHES
        </h3>
        <CustomSlider pitches={relatedPitches} normal={true} />
      </div>
      <div className="h-[300px]"> </div>
    </div>
  );
}

export default DetailPitch;
